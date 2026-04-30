# Playground Hub

Playground Hub는 실험 서비스 제작, 배포, 검수 기준을 관리하는 운영 저장소입니다.

## 이 저장소에서 관리하는 것

- 실험 서비스 생성 가이드
- Netlify/Vercel 배포 가이드
- 개인정보 처리 체크리스트
- QA 체크리스트
- 서비스 유형별 템플릿
- DB 선택 기준

## 이 저장소에서 관리하지 않는 것

- 메인서비스 전체 서비스 메뉴 노출 목록
- 실제 운영 서비스 코드 전체
- 사용자 데이터
- 배포 플랫폼 계정 정보

## 운영 원칙

1. 실험 서비스는 독립 repo로 생성한다.
2. GitHub Actions는 기본 사용하지 않는다.
3. 신규 실험 서비스는 Netlify 배포를 우선한다.
4. 기존 Vercel 서비스는 유지할 수 있다.
5. 배포 완료와 메인서비스 노출은 분리한다.
6. 메인서비스 노출 여부는 메인서비스 코드에서 관리한다.
7. 개인정보/AI/DB 사용 여부는 노출 전 반드시 확인한다.

## 빠른 시작

새로운 실험 서비스를 만들고 메인서비스에 노출하기까지의 흐름입니다. 비개발자/기획자도 따라할 수 있도록 단계별로 정리했습니다.

1. **가이드 읽기** — [`docs/service-create-guide.md`](./docs/service-create-guide.md)에서 전체 절차를 먼저 확인합니다.
2. **템플릿 선택** — [`templates/`](./templates) 안에서 만들고 싶은 서비스 유형에 맞는 폴더를 고릅니다.
   - 한 페이지 안내 → `landing-service`
   - AI 사용 → `ai-service`
   - 결과형 테스트 → `quiz-service`
   - 데이터 저장 도구 → `simple-crud-service`
3. **새 private repo 생성** — `lab-{service-name}` 형식의 이름으로 GitHub **private repo**를 만들고, 위에서 고른 템플릿 폴더 내용을 복사합니다. 이름 규칙은 [`docs/service-create-guide.md`](./docs/service-create-guide.md#repo-이름-규칙) 참고.
4. **Netlify / Vercel 배포** — 신규 실험 서비스는 [Netlify 우선](./docs/deployment-guide.md). 기존부터 Vercel로 운영 중인 핵심 Next.js만 Vercel을 유지합니다.
5. **QA / 개인정보 체크** — [`checklists/qa-checklist.md`](./checklists/qa-checklist.md)와 [`checklists/privacy-checklist.md`](./checklists/privacy-checklist.md)를 모두 통과시킵니다.
6. **메인서비스 노출 요청** — [`checklists/exposure-checklist.md`](./checklists/exposure-checklist.md) 통과 후, 메인서비스 repo의 `serviceLinks` 코드에 항목을 추가하도록 요청합니다.

> 노출은 자동이 아닙니다. 배포가 끝나도 메인서비스에 자동으로 보이지 않으며, 항상 별도 단계로 요청합니다. 자세한 정책은 [`docs/exposure-policy.md`](./docs/exposure-policy.md)를 참고하세요.

## 프로젝트 구조
```
playground-hub/
  README.md
  CONTRIBUTING.md
  .github/
    PULL_REQUEST_TEMPLATE.md

  docs/
    service-create-guide.md
    deployment-guide.md
    exposure-policy.md
    privacy-guide.md
    db-selection-guide.md
    qa-guide.md

  templates/
    landing-service/
    ai-service/
    quiz-service/
    simple-crud-service/

  checklists/
    exposure-checklist.md
    privacy-checklist.md
    qa-checklist.md
```

## 기여하기

이 저장소는 확인용 가벼운 repo입니다. 기여 방법, 브랜치/커밋 규칙, 리뷰 원칙은 [`CONTRIBUTING.md`](./CONTRIBUTING.md)를 참고하세요.

## 엔지니어링 상세 가이드

이 저장소는 **정책 / 운영 레이어**입니다. 코드, SQL, 클라이언트 셋업 같은 **엔지니어링 상세**는 별도 가이드 모음에 있습니다.

| 무엇이 궁금할 때 | 어디로 |
| --- | --- |
| 어떤 서비스를 만들지 / 누구에게 보일지 / 노출 정책 | **playground-hub** (이 저장소) |
| 어떤 SQL / 클라이언트 셋업 / 트리거 / 코드 패턴을 쓸지 | **Playground 엔지니어링 가이드** |

### Playground 엔지니어링 가이드 (다른 저장소)

현재 위치: 운영 중인 서비스 repo 내 `docs/` (예: `loveclinic/docs/`). 조직 차원에서 `playground-docs` 같은 별도 저장소로 분리할 예정입니다.

포함 문서 (한 줄 요약):

| 가이드 | 다루는 내용 |
| --- | --- |
| Playground 운영 공약 | 명명 / 레포 구조 / 기본 스택 등 조직 컨벤션 |
| Netlify 브랜치 미리보기 워크플로우 | PR 기반 안전 배포 흐름 |
| Supabase 스키마 격리 | 한 Supabase 프로젝트에 여러 서비스를 충돌 없이 얹는 법 |
| 익명 가입 + RLS 격리 | 회원가입 마찰 0 + 사용자별 데이터 격리 |
| 컬럼 레벨 암호화 | 일기 / 메모 / 대화 등 PII급 데이터 AES-256-GCM 암호화 |
| Rate Limit + 관리자 우회 | LLM / 외부 API 비용 통제 + 운영자 한도 우회 |
| LLM 프롬프트 다국어 전략 | 사용자 입력 언어로 응답 + code-switching 차단 |

### 두 저장소의 톤 차이

- **playground-hub**: 비개발자도 읽을 수 있게. "무엇을 / 왜" 중심.
- **엔지니어링 가이드**: 그대로 따라할 수 있는 SQL / TypeScript 스니펫 중심. "어떻게" 중심.

같은 주제(예: 개인정보, DB, 배포)에 대해 양쪽이 다 있는 것은 의도적입니다. 정책 합의는 여기서, 구현은 엔지니어링 가이드에서 봅니다.
