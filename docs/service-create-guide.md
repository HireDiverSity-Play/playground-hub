# 실험 서비스 생성 가이드

이 문서는 새로운 실험 서비스를 빠르게 만드는 절차를 설명합니다. 비개발자도 따라할 수 있도록 단계별로 정리했습니다.

## 1. 서비스 유형 결정

먼저 만들려는 서비스가 어떤 유형인지 정합니다. 유형에 맞는 템플릿이 `templates/` 폴더에 준비되어 있습니다.

| 유형 | 설명 | 템플릿 |
| --- | --- | --- |
| 랜딩 페이지 | 한 페이지로 정보를 전달하는 서비스 | `templates/landing-service` |
| AI 서비스 | OpenAI / Claude 등 외부 AI를 사용하는 서비스 | `templates/ai-service` |
| 퀴즈 / 테스트 | MBTI, 성향 테스트 같은 결과형 서비스 | `templates/quiz-service` |
| 간단 CRUD | 데이터 저장이 필요한 단순 도구 | `templates/simple-crud-service` |

## 2. 새 repo 생성

실험 서비스는 **독립된 GitHub repo**로 만듭니다. playground-hub 안에 직접 코드를 넣지 않습니다.

1. GitHub에서 새 repo 생성 (예: `mbti-test-2026`)
2. 위 표에서 고른 템플릿 폴더 내용을 새 repo에 복사
3. 템플릿 안 README, privacy.md, terms.md를 서비스 이름에 맞게 수정

## 3. 환경 변수 설정

`.env.example` 파일을 `.env`로 복사한 뒤 실제 값을 채웁니다.
`.env` 파일은 절대 GitHub에 올리지 않습니다.

## 4. DB 선택

데이터 저장이 필요한지 먼저 판단합니다.
자세한 기준은 [`docs/db-selection-guide.md`](./db-selection-guide.md)를 참고하세요.

## 5. 배포

[`docs/deployment-guide.md`](./deployment-guide.md)를 따라 Netlify 또는 Vercel로 배포합니다.

## 6. QA

[`checklists/qa-checklist.md`](../checklists/qa-checklist.md)와 템플릿별 QA 체크리스트를 따라 모든 항목을 점검합니다.

## 7. 메인서비스 노출

배포가 끝났다고 해서 메인서비스에 자동 노출되지 않습니다.
노출은 **항상 별도 절차**이며 [`docs/exposure-policy.md`](./exposure-policy.md)에서 설명합니다.

## 한눈에 보는 흐름

```
유형 선택 → 새 repo 생성 → 템플릿 복사 → 환경변수 → DB 결정
       → 배포 → QA → (별도) 메인서비스 노출
```
