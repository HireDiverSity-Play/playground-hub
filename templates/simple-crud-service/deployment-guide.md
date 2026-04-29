# 배포 가이드 — Simple CRUD Service

## 권장 플랫폼
**Netlify** (신규 실험 서비스 우선)

## 절차
1. Netlify 로그인 → **Add new site → GitHub repo 선택**
2. 환경 변수 추가
   - `DATABASE_URL` (Neon) **또는**
   - `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
   - `SERVICE_NAME`, `SERVICE_URL`
3. **Build & Deploy**

## DB 마이그레이션
- 배포 전에 마이그레이션을 한 번 실행해 스키마를 맞춘다
- 가능하면 운영 DB와 개발 DB를 분리한다
- (Supabase) RLS 정책을 설정한 뒤에 실제 데이터 작업을 시작한다

## 노출
배포 후 노출은 별도 절차 ([`docs/exposure-policy.md`](../../docs/exposure-policy.md))
