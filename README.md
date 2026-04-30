# Playground Hub

Playground Hub는 실험 서비스 제작, 배포, 검수 기준을 관리하는 운영 저장소입니다.

> **용어가 어려우면** [`docs/glossary.md`](./docs/glossary.md)를 먼저 보세요. Netlify, Supabase, RLS, OG 이미지 같은 자주 나오는 단어를 한 줄로 풀어 적었습니다.

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

## 한 장 치트시트

> 본문 안 읽고도 80% 결정이 끝나도록 정리했습니다. 의심되면 본문을 보세요.

### 어떤 템플릿을 쓸까

| 만들려는 것 | 템플릿 |
| --- | --- |
| 한 페이지 안내 / 사전 신청 폼 | `templates/landing-service` |
| OpenAI / Claude 호출 (AI 응답) | `templates/ai-service` |
| MBTI / 성향 / 결과형 테스트 | `templates/quiz-service` |
| 데이터 저장이 필요한 단순 도구 | `templates/simple-crud-service` |

### DB는 뭐 쓸까

| 저장할 데이터 | 권장 DB |
| --- | --- |
| 없음 (결과만 보여주고 끝) | **DB 없음** |
| 단순 저장 (이메일, 응답 수, 점수) | **Neon** |
| 로그인 / 파일 업로드 / 사용자별 기록 | **Supabase** |

자세한 기준은 [`docs/db-selection-guide.md`](./docs/db-selection-guide.md).

### 고위험 서비스인가?

다음 중 **하나라도** 해당하면 고위험. [`docs/privacy-guide.md`](./docs/privacy-guide.md)의 추가 점검 필수.

- AI에 사용자 자유 텍스트가 전송됨
- 연애 / 심리 / 건강 / 법률 조언
- 커뮤니티 / 게시글 / 댓글
- 파일 / 이미지 업로드
- 위치 기반 서비스

### 노출까지 가는 길

```
배포 → QA / privacy 체크리스트 통과 → 메인서비스 serviceLinks에 추가 요청
                                       (배포 ≠ 노출, 항상 별도 단계)
```

자세한 흐름은 아래 "빠른 시작" 6단계 또는 [`docs/exposure-policy.md`](./docs/exposure-policy.md).

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
    glossary.md

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
