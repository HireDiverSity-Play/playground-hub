# 배포 가이드 — AI Service

## 권장 플랫폼
**Netlify** (신규 실험 서비스 우선)

## 절차
1. https://app.netlify.com 로그인
2. **Add new site → GitHub repo 선택**
3. 환경 변수에 다음 항목 추가
   - `OPENAI_API_KEY` (또는 사용 중인 AI 키)
   - `SERVICE_NAME`, `SERVICE_URL`
   - `RATE_LIMIT_PER_MIN` (선택)
4. **Deploy**

## 배포 후 점검
- AI 호출이 실제로 동작하는지 한 번 시도해본다
- 호출 비용 / 사용량을 AI 사업자 대시보드에서 모니터링할 수 있도록 설정
- `qa-checklist.md` 점검
- 메인서비스 노출은 별도 절차 ([`docs/exposure-policy.md`](../../docs/exposure-policy.md))

## 비용 보호
배포 직후 트래픽이 몰릴 수 있으니 다음을 반드시 확인합니다.

- AI 사업자 대시보드에서 사용량 한도(monthly cap) 설정
- 비정상 호출이 감지되면 사이트를 임시로 내릴 수 있는 절차 마련
- 호출 제한(rate limit)이 동작하는지 부하 시나리오로 확인
