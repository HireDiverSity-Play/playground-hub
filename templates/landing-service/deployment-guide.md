# 배포 가이드 — Landing Service

## 권장 플랫폼
**Netlify** (신규 실험 서비스 우선)

## 절차
1. https://app.netlify.com 로그인
2. **Add new site → Import an existing project**
3. 서비스 GitHub repo 선택
4. Build 설정
   - 정적 HTML이면 자동 인식
   - Next.js이면 `next build` 자동 인식
5. **Site settings → Environment variables**에서 환경 변수 추가
6. **Deploy**

## 배포 후
- 발급된 `*.netlify.app` URL 접속해 동작 확인
- `qa-checklist.md` 점검
- 메인서비스 노출은 별도 절차 ([`docs/exposure-policy.md`](../../docs/exposure-policy.md))
