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
