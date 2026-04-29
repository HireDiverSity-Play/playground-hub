# AI Service Template

OpenAI, Claude 등 외부 AI를 호출하는 서비스 템플릿입니다.

## 적합한 서비스
- 텍스트 생성 / 요약 도구
- 이미지 / 문서 분석 도구
- AI 기반 추천 / 평가 도구

## 권장 스택
- Next.js, 또는 Express + 정적 프론트
- DB는 필요한 경우에만 사용 (대부분 결과 비저장 권장)

## 사용 절차
1. 이 폴더의 모든 파일을 새 GitHub repo로 복사
2. README, privacy.md, terms.md, ai-notice.md의 자리표시자를 채움
3. `.env.example`을 `.env`로 복사하고 API 키를 채움
4. ⚠️ AI API 키는 절대 클라이언트 코드에 두지 않고 **서버에서만** 사용
5. `deployment-guide.md`를 따라 Netlify로 배포
6. `qa-checklist.md` 점검

## 특별 주의
- 사용자 입력이 외부 AI에 전송된다는 사실을 화면에 명시 (`ai-notice.md` 활용)
- AI 응답을 그대로 신뢰하지 않도록 안내
- 비용 폭주를 막기 위해 호출 제한(rate limit)과 사용량 한도(monthly cap) 설정

## 포함 파일
- `README.md`
- `.env.example`
- `privacy.md`
- `terms.md`
- `ai-notice.md` — AI 사용 고지 (사용자 화면에도 노출 필요)
- `qa-checklist.md`
- `deployment-guide.md`
