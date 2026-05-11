// AI provider 추상화 — OpenAI / Gemini를 동일 인터페이스로.
//
// 사용:
//   const stream = await streamText({ system, prompt, signal });
//   for await (const chunk of stream) console.log(chunk);
//
// env로 provider 자동 선택. 둘 다 키가 있으면 AI_PROVIDER로 지정 가능.
// SDK 레벨 abort signal 전달 — 클라이언트가 연결 끊으면 외부 API도 abort.

import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';
import { getEnv, resolveProvider } from './env';

const DEFAULT_OPENAI_MODEL = 'gpt-4o-mini';
const DEFAULT_GEMINI_MODEL = 'gemini-2.0-flash-001';

export interface StreamTextOptions {
  /** 시스템 프롬프트 — 모델의 역할/제약 설정. 비워도 됨. */
  system?: string;
  /** 사용자 입력 프롬프트. 필수. */
  prompt: string;
  /** AbortSignal — 클라이언트 연결 종료 시 외부 API 호출도 중단. */
  signal?: AbortSignal;
  /** 0~2, 기본 0.7. 낮으면 일관성, 높으면 창의성. */
  temperature?: number;
  /** 응답 최대 토큰. 기본 1024. */
  maxTokens?: number;
}

/**
 * 스트리밍 텍스트 생성 — async iterable로 chunk 단위 yield.
 * route handler에서 ReadableStream에 enqueue하면 그대로 클라이언트로 흐름.
 */
export async function* streamText(opts: StreamTextOptions): AsyncIterable<string> {
  const env = getEnv();
  const provider = resolveProvider(env);

  if (provider === 'openai') {
    const client = new OpenAI({ apiKey: env.OPENAI_API_KEY! });
    const stream = await client.chat.completions.create(
      {
        model: env.OPENAI_MODEL ?? DEFAULT_OPENAI_MODEL,
        stream: true,
        temperature: opts.temperature ?? 0.7,
        max_tokens: opts.maxTokens ?? 1024,
        messages: [
          ...(opts.system ? [{ role: 'system' as const, content: opts.system }] : []),
          { role: 'user', content: opts.prompt },
        ],
      },
      opts.signal ? { signal: opts.signal } : undefined,
    );
    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content;
      if (delta) yield delta;
    }
    return;
  }

  // Gemini
  const client = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY! });
  const response = await client.models.generateContentStream({
    model: env.GEMINI_MODEL ?? DEFAULT_GEMINI_MODEL,
    contents: opts.prompt,
    config: {
      temperature: opts.temperature ?? 0.7,
      maxOutputTokens: opts.maxTokens ?? 1024,
      ...(opts.system ? { systemInstruction: opts.system } : {}),
    },
  });
  for await (const chunk of response) {
    // signal 수동 체크 — Gemini SDK가 signal을 직접 받지 않아 chunk 사이에 abort 확인.
    if (opts.signal?.aborted) {
      throw new DOMException('aborted', 'AbortError');
    }
    const text = chunk.text;
    if (text) yield text;
  }
}

/** 비스트리밍 — 한 번에 받는 단순 호출 (UI가 라이브 필요 없을 때). */
export async function generateText(opts: StreamTextOptions): Promise<string> {
  let result = '';
  for await (const chunk of streamText(opts)) {
    result += chunk;
  }
  return result;
}

/** 현재 활성 provider 정보 — UI 표시용. */
export function getActiveProvider(): { provider: 'openai' | 'gemini'; model: string } {
  const env = getEnv();
  const provider = resolveProvider(env);
  const model =
    provider === 'openai'
      ? env.OPENAI_MODEL ?? DEFAULT_OPENAI_MODEL
      : env.GEMINI_MODEL ?? DEFAULT_GEMINI_MODEL;
  return { provider, model };
}
