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

1. GitHub에서 새 repo 생성 — 이름은 [Repo 이름 규칙](#repo-이름-규칙) 따르기 (예: `lab-loveclinic`)
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

## Repo 이름 규칙

새로 만드는 실험 서비스 repo의 이름은 다음 규칙을 권장합니다.

- **형식**: `lab-{service-name}`
- **글자**: 영어 소문자 + 하이픈(`-`)만 사용
- **목적**: 메인서비스 repo와 한눈에 구분되도록 `lab-` 접두어를 붙임

### 예시
- `lab-loveclinic`
- `lab-topik-quiz`
- `lab-fortune-test`
- `lab-pharmacy-finder`

### 피해야 할 이름
| 나쁜 예 | 이유 |
| --- | --- |
| `LoveClinic` | 대문자 사용 |
| `lab_loveclinic` | 언더스코어 사용 |
| `loveclinic` | `lab-` 접두어 누락 |
| `love-clinic-final-v2` | 의미 없는 접미어 |

## 비개발자용 서비스 아이디어 작성 양식

새 실험 서비스를 제안할 때 아래 양식을 채워서 공유해주세요.
개발자가 보고 어떤 템플릿 / DB / 노출 흐름을 따를지 빠르게 판단할 수 있습니다.

```
서비스명: 
한 줄 설명: 
사용 대상: 
사용자가 입력하는 정보: 
사용자가 받는 결과: 
AI 사용 여부: (예 / 아니오 / 검토 중)
DB 저장 여부: (없음 / 있음 — 어떤 데이터?)
개인정보 가능성: (없음 / 낮음 / 높음 — 이유)
참고 URL: 
메인서비스 노출 희망 여부: (예 / 아니오 / 추후)
```

### 작성 예시

```
서비스명: LoveClinic
한 줄 설명: 연애 고민을 입력하면 AI가 맞춤 조언을 주는 서비스
사용 대상: 20~30대 연애 중인 사용자
사용자가 입력하는 정보: 연애 상황 / 고민 내용 (자유 텍스트)
사용자가 받는 결과: AI 기반 조언 텍스트
AI 사용 여부: 예 (OpenAI 사용 예정)
DB 저장 여부: 없음 (대화 기록 비저장)
개인정보 가능성: 높음 (자유 텍스트에 식별 가능 정보 포함 가능)
참고 URL: 
메인서비스 노출 희망 여부: 추후 (베타 테스트 후 결정)
```

### 항목 설명

- **서비스명**: `lab-` 접두어 없이 사람이 읽는 이름 (예: `LoveClinic`)
- **한 줄 설명**: 메인서비스 메뉴에 그대로 노출해도 될 만큼 간결하게
- **사용 대상**: 누가 쓸 서비스인지 (연령대 / 상황)
- **개인정보 가능성**: 단순한 입력이라도 자유 텍스트라면 "높음"으로 적습니다
- **메인서비스 노출 희망 여부**: 노출은 항상 별도 단계입니다. "예"로 적어도 자동 노출되지 않습니다 ([`exposure-policy.md`](./exposure-policy.md))

> 양식 작성 후 GitHub Issue 또는 담당자에게 공유합니다.
