# AI Service Template

OpenAI 또는 Google Gemini를 호출하는 실험 서비스 **starter**입니다.
복사 후 환경변수만 채우면 `npm run dev`로 바로 굴러갑니다.

## 무엇이 들어 있나

- **Next.js 15** (App Router) + **React 19** + **TypeScript strict**
- **Tailwind v4** (CSS-first config, `tailwind.config` 없이 `@theme`로 토큰 정의)
- **AI provider 추상화** — OpenAI / Gemini를 동일 인터페이스로 사용 (`lib/ai.ts`)
- **환경변수 검증** — zod로 startup fail-fast (`lib/env.ts`)
- **스트리밍 API** — `/api/generate`에서 chunk 단위 push, 클라이언트 abort 전파
- **IP 기반 rate limit** — 시간당 N회 (env로 조정, `lib/rate-limit.ts`)
- **정책 페이지 3종** — `/privacy`, `/terms`, `/ai-notice` 라우트 (placeholder 채워야 함)
- **Netlify 배포 설정** — `netlify.toml` + `@netlify/plugin-nextjs`

## 적합한 서비스
- 텍스트 생성 / 요약 도구
- AI 기반 추천 / 평가 도구
- 자유 입력 → AI 응답 형태의 모든 도구

## 시작하기

### 1. 이 폴더 내용을 새 GitHub repo로 복사
- 이름 규칙: `lab-{service-name}` (예: `lab-loveclinic`)
- **private repo** 권장 (실험 서비스 정책)

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경변수 셋업
```bash
cp .env.example .env.local
```
`.env.local`에 OpenAI 또는 Gemini API 키를 채워 넣습니다. 둘 다 채워도 되고 `AI_PROVIDER`로 선택.

### 4. 로컬 실행
```bash
npm run dev
# → http://localhost:3000
```

### 5. 자리표시자 교체
- `app/layout.tsx`: `[서비스명]`, `[한 줄 설명]`
- `app/page.tsx`: 헤더, placeholder 문구
- `app/privacy/page.tsx`, `app/terms/page.tsx`, `app/ai-notice/page.tsx`: 실제 정책 내용
- `privacy.md`, `terms.md`, `ai-notice.md`: `[담당자 이메일]` 등 정책 마크다운 본문

### 6. AI 모델 변경 (옵션)
- 기본: OpenAI `gpt-4o-mini` / Gemini `gemini-2.0-flash-001`
- 다른 모델을 쓰려면 `.env.local`의 `OPENAI_MODEL` 또는 `GEMINI_MODEL` 지정
- 비용·속도 트레이드오프 확인 후 변경

### 7. Netlify 배포
1. https://app.netlify.com → **Add new site → Import an existing project**
2. 이 repo 선택
3. Build 설정은 `netlify.toml`이 자동 인식
4. **Site settings → Environment variables**에서 `OPENAI_API_KEY`/`GEMINI_API_KEY` 등 채움
5. **Deploy**

자세한 흐름은 [`deployment-guide.md`](./deployment-guide.md).

### 8. QA + 노출
- [`qa-checklist.md`](./qa-checklist.md) 점검
- 메인서비스 노출은 [`docs/exposure-policy.md`](../../docs/exposure-policy.md)에 따라 별도 단계

## 디렉토리

```
ai-service/
  app/
    layout.tsx          # 공통 layout + footer 링크
    page.tsx            # 메인 입력 폼 + 스트리밍 결과 UI
    globals.css         # Tailwind v4 + 브랜드 토큰
    api/
      generate/route.ts # 스트리밍 API (POST)
    privacy/page.tsx    # /privacy
    terms/page.tsx      # /terms
    ai-notice/page.tsx  # /ai-notice
  components/
    AiNoticeBanner.tsx  # 메인 페이지 상단 AI 고지 배너
  lib/
    env.ts              # zod 환경변수 검증
    ai.ts               # OpenAI / Gemini 추상화
    rate-limit.ts       # IP 기반 메모리 limiter
  netlify.toml          # Netlify 배포 설정
  .env.example          # 환경변수 템플릿
  privacy.md            # 정책 본문 (페이지와 동기화)
  terms.md
  ai-notice.md
  qa-checklist.md
  deployment-guide.md
```

## 특별 주의

- ⚠️ **AI API 키는 절대 클라이언트 코드에 두지 않는다.** `NEXT_PUBLIC_` 접두어 금지. `lib/ai.ts`는 서버에서만 import됨.
- ⚠️ 사용자 입력이 외부 AI에 전송된다는 사실을 화면에 명시 (`AiNoticeBanner` 컴포넌트 + `/ai-notice` 페이지).
- ⚠️ 비용 폭주를 막기 위해 `RATE_LIMIT_PER_HOUR` 환경변수로 호출 제한 — 기본 20회/시간.
- ⚠️ AI 응답을 그대로 신뢰하지 않도록 사용자에게 안내.

## 명령어

```bash
npm run dev        # 개발 서버 (http://localhost:3000)
npm run build      # 프로덕션 빌드
npm run start      # 프로덕션 서버 (build 후)
npm run lint       # ESLint
npm run typecheck  # TypeScript 검사 (no emit)
```
