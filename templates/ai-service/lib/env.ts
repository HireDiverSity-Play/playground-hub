// 환경변수 검증 — zod로 startup 시점에 빠르게 fail-fast.
//
// Netlify 대시보드(Site settings → Environment variables)에서 채우는 것을 권장.
// 로컬 개발은 .env.local에 같은 키를 채워 넣는다(.gitignore로 commit 방지).

import { z } from 'zod';

const envSchema = z.object({
  // 어떤 AI provider를 쓸지. 둘 다 지원하지만 하나만 채워도 됨.
  // AI_PROVIDER가 명시되면 그것 우선, 없으면 키가 있는 쪽 자동 선택.
  AI_PROVIDER: z.enum(['openai', 'gemini']).optional(),
  OPENAI_API_KEY: z.string().min(1).optional(),
  GEMINI_API_KEY: z.string().min(1).optional(),

  // 모델 ID — 비워두면 lib/ai.ts의 default 사용.
  // 사용자가 비용/성능 조절을 위해 override.
  OPENAI_MODEL: z.string().optional(),
  GEMINI_MODEL: z.string().optional(),

  // rate limit — IP당 시간당 최대 호출 수. 비용 폭주 방지.
  // 0이면 비활성, 기본 20.
  RATE_LIMIT_PER_HOUR: z.coerce.number().int().nonnegative().default(20),
});

export type Env = z.infer<typeof envSchema>;

let cachedEnv: Env | null = null;

export function getEnv(): Env {
  if (cachedEnv) return cachedEnv;
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    // 모든 에러를 한 번에 보여줘 디버깅 쉽게.
    const issues = parsed.error.issues.map((i) => `  - ${i.path.join('.')}: ${i.message}`).join('\n');
    throw new Error(`환경변수 검증 실패:\n${issues}\n\n.env.local 또는 Netlify 환경변수를 확인하세요.`);
  }
  cachedEnv = parsed.data;
  // 적어도 하나의 provider 키는 있어야 함 — schema에서 둘 다 optional이지만 runtime 검증.
  if (!cachedEnv.OPENAI_API_KEY && !cachedEnv.GEMINI_API_KEY) {
    throw new Error('OPENAI_API_KEY 또는 GEMINI_API_KEY 중 최소 하나는 필요합니다.');
  }
  return cachedEnv;
}

/** AI provider 결정 — env 명시 우선, 없으면 키가 있는 쪽 자동 선택. */
export function resolveProvider(env: Env): 'openai' | 'gemini' {
  if (env.AI_PROVIDER) {
    if (env.AI_PROVIDER === 'openai' && !env.OPENAI_API_KEY) {
      throw new Error('AI_PROVIDER=openai 이지만 OPENAI_API_KEY가 없습니다.');
    }
    if (env.AI_PROVIDER === 'gemini' && !env.GEMINI_API_KEY) {
      throw new Error('AI_PROVIDER=gemini 이지만 GEMINI_API_KEY가 없습니다.');
    }
    return env.AI_PROVIDER;
  }
  // 자동 선택 — OpenAI 우선(가장 흔함), 없으면 Gemini.
  if (env.OPENAI_API_KEY) return 'openai';
  return 'gemini';
}
