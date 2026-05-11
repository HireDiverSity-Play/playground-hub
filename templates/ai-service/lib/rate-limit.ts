// 매우 단순한 IP 기반 rate limiter — 메모리 sliding window.
//
// 한계: 같은 프로세스 메모리 → 멀티 인스턴스(Netlify serverless cold start 포함)에서 정확하지 않음.
// 실험 서비스 단계의 비용 폭주 1차 방어용. 진짜로 엄격한 제한이 필요하면 Upstash Redis 등 외부 stateful 저장소로 교체.
//
// Netlify Edge에서는 globalThis가 fresh start되는 경우가 있어 이 limiter는 best-effort.

interface Bucket {
  /** 최근 호출 timestamp들 (oldest → newest, 1시간 윈도우). */
  timestamps: number[];
}

const HOUR_MS = 60 * 60 * 1000;

// 글로벌 Map 싱글톤 (dev HMR 안전).
const globalForLimiter = globalThis as unknown as { __aiRateLimitBuckets?: Map<string, Bucket> };
const buckets = globalForLimiter.__aiRateLimitBuckets ?? new Map<string, Bucket>();
if (!globalForLimiter.__aiRateLimitBuckets) globalForLimiter.__aiRateLimitBuckets = buckets;

export interface RateLimitResult {
  allowed: boolean;
  /** 현재 1시간 윈도우 내 호출 수. */
  current: number;
  /** 최대 허용 호출 수. */
  limit: number;
  /** allowed=false면 다음 호출 가능 시각(unix ms). */
  retryAt?: number;
}

/**
 * key별로 1시간 limit 검사 + 호출 1회 기록.
 * key는 보통 IP. limit=0이면 무제한(검사 skip).
 */
export function checkAndRecord(key: string, limit: number): RateLimitResult {
  if (limit <= 0) return { allowed: true, current: 0, limit: 0 };
  const now = Date.now();
  const windowStart = now - HOUR_MS;
  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = { timestamps: [] };
    buckets.set(key, bucket);
  }
  // 1시간 이전 timestamp는 제거.
  bucket.timestamps = bucket.timestamps.filter((t) => t > windowStart);
  if (bucket.timestamps.length >= limit) {
    const oldest = bucket.timestamps[0];
    return {
      allowed: false,
      current: bucket.timestamps.length,
      limit,
      retryAt: oldest + HOUR_MS,
    };
  }
  bucket.timestamps.push(now);
  return { allowed: true, current: bucket.timestamps.length, limit };
}

/**
 * NextRequest에서 IP 추출 — Netlify/Vercel 프록시 헤더 우선.
 * IP 없으면 'unknown'으로 fallback (한 키에 합산되어 보수적 제한).
 */
export function getClientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  const xrip = req.headers.get('x-real-ip');
  if (xrip) return xrip.trim();
  return 'unknown';
}
