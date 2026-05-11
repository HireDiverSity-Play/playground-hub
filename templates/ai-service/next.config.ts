import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Netlify는 @netlify/plugin-nextjs로 자동 어댑트 — output 기본값(서버) 유지.
  // 환경변수는 Netlify 대시보드 > Site settings > Environment variables 에서 관리.
  // (코드/저장소에 키 노출 금지)
  reactStrictMode: true,
  // template이 다른 lockfile 옆에 clone될 때 workspace root 잘못 추정하는 warning 차단.
  // 사용자가 새 repo로 옮기면 자동 정확 — 이 옵션은 template 안 안전망.
  outputFileTracingRoot: import.meta.dirname,
};

export default nextConfig;
