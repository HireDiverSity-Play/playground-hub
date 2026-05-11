// /api/generate — AI 텍스트 생성 스트리밍 API.
//
// 요청: POST { prompt: string, system?: string }
// 응답: text/plain 스트림 (chunk 단위로 AI 응답 흐름)
//
// 보호:
//   - prompt 길이 제한 (서버 cost 방어)
//   - IP 기반 rate limit (시간당 N회, env로 조절)
//   - AbortSignal 전달 → 클라이언트 끊으면 AI API도 abort

import { NextRequest } from 'next/server';
import { z } from 'zod';
import { streamText } from '@/lib/ai';
import { getEnv } from '@/lib/env';
import { checkAndRecord, getClientIp } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const requestSchema = z.object({
  prompt: z.string().min(1).max(4000),
  system: z.string().max(2000).optional(),
});

export async function POST(req: NextRequest) {
  // env 검증 — startup이 아닌 첫 호출 시점에 빠르게 fail (Netlify cold start 호환).
  let env;
  try {
    env = getEnv();
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : 'env 검증 실패' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // rate limit
  const ip = getClientIp(req);
  const rl = checkAndRecord(ip, env.RATE_LIMIT_PER_HOUR);
  if (!rl.allowed) {
    return new Response(
      JSON.stringify({
        error: '시간당 요청 한도를 초과했습니다. 잠시 후 다시 시도해 주세요.',
        limit: rl.limit,
        retryAt: rl.retryAt,
      }),
      { status: 429, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // body 파싱 + 검증
  let body: z.infer<typeof requestSchema>;
  try {
    const raw = await req.json();
    body = requestSchema.parse(raw);
  } catch (err) {
    const msg =
      err instanceof z.ZodError ? err.issues.map((i) => i.message).join(', ') : 'invalid body';
    return new Response(JSON.stringify({ error: msg }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 클라이언트 abort 전파 — req.signal이 AbortSignal.
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of streamText({
          system: body.system,
          prompt: body.prompt,
          signal: req.signal,
        })) {
          controller.enqueue(encoder.encode(chunk));
        }
        controller.close();
      } catch (err) {
        // abort는 정상 — controller만 닫고 종료.
        if ((err as Error)?.name === 'AbortError') {
          try {
            controller.close();
          } catch {
            // already closed
          }
          return;
        }
        // 실제 에러 — 메시지를 stream에 한 줄 흘려보내고 종료. status code는 이미 200이라 별도 표시.
        const msg = err instanceof Error ? err.message : 'AI 호출 중 오류';
        try {
          controller.enqueue(encoder.encode(`\n\n[오류] ${msg}`));
          controller.close();
        } catch {
          // ignore
        }
      }
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
    },
  });
}
