# Landing Service Template

한 페이지짜리 정보 전달 서비스 템플릿입니다.

## 적합한 서비스
- 이벤트 / 캠페인 안내 페이지
- 출시 예정 사전 신청 페이지
- 간단한 소개 / 홍보 페이지

## 권장 스택
- 정적 사이트(HTML/CSS) 또는 Next.js, Astro
- DB 없음 또는 Neon (이메일 수집이 꼭 필요한 경우에만)

## 사용 절차
1. 이 폴더의 모든 파일을 새 GitHub repo로 복사한다
2. README, privacy.md, terms.md의 자리표시자 (예: `[서비스명]`, `[담당자 이메일]`) 를 실제 값으로 바꾼다
3. `.env.example` 을 `.env`로 복사하고 값을 채운다
4. `deployment-guide.md`를 따라 Netlify로 배포한다
5. `qa-checklist.md` 항목을 점검한다
6. 메인서비스 노출은 별도 절차 ([`docs/exposure-policy.md`](../../docs/exposure-policy.md))

## 포함 파일
- `README.md` (이 파일)
- `.env.example`
- `privacy.md` — 개인정보 처리방침 템플릿
- `terms.md` — 이용약관 템플릿
- `qa-checklist.md` — 랜딩 전용 QA
- `deployment-guide.md` — Netlify 배포 안내
