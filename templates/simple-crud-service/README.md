# Simple CRUD Service Template

데이터를 저장하고 보여주는 단순 도구 서비스 템플릿입니다.

## 적합한 서비스
- 사전 신청 폼 + 관리 페이지
- 단순 메모 / 리스트 도구
- 응답 모음 페이지

## 권장 스택
- Next.js + Neon (대부분의 경우)
- 사용자 인증 / 파일 업로드가 필요할 때만 Supabase

## DB 결정
저장 데이터가 단순하면 Neon, 사용자별 데이터 / 파일이 있으면 Supabase.
자세한 기준은 [`docs/db-selection-guide.md`](../../docs/db-selection-guide.md).

## 사용 절차
1. 이 폴더 내용을 새 GitHub repo로 복사
2. `.env`에 DB 연결 정보 추가
3. 스키마 정의 / 마이그레이션 실행
4. 배포 → QA → 노출 (각 단계 분리)

## 포함 파일
- `README.md`
- `.env.example`
- `privacy.md`
- `terms.md`
- `qa-checklist.md`
- `deployment-guide.md`
