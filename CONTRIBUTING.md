# 기여 가이드

이 저장소는 실험 서비스 제작을 돕기 위한 **가이드 / 체크리스트 / 템플릿**을 모으는 곳입니다. 실제 서비스 코드는 들어오지 않습니다.

> **이 repo의 성격**
> 확인용 가벼운 저장소입니다. 무거운 토론보다 **명확하게 읽히는 문서**를 만드는 데 집중합니다.

## 무엇이 들어오는가
- 새 실험 서비스 유형의 템플릿 추가
- 기존 가이드 / 체크리스트 업데이트
- 표현 / 오타 / 깨진 링크 수정
- 운영 정책 변경 사항 반영

## 무엇이 들어오지 않는가
- 실제 서비스 운영 코드
- 메인서비스 노출 목록 (메인서비스 repo의 `serviceLinks`에서 관리)
- GitHub Actions workflow (`.github/workflows/` 사용 금지)
- `registry/` 폴더

## 브랜치 네이밍

| 접두어 | 사용 시점 | 예시 |
| --- | --- | --- |
| `docs/` | 가이드 문서 추가/수정 | `docs/add-payment-policy` |
| `checklist/` | 체크리스트 변경 | `checklist/expose-mobile-only` |
| `template/` | 템플릿 추가/변경 | `template/landing-meta-tags` |
| `chore/` | 그 외 운영성 변경 | `chore/contributing-and-pr-template` |

## 커밋 메시지

짧고 명확하게. 한 줄 요약 + 필요하면 본문.

권장 prefix:
- `docs: ...`
- `checklist: ...`
- `template: ...`
- `chore: ...`

예) `docs: clarify Netlify-first policy for new experiments`

## PR 작성

- `.github/PULL_REQUEST_TEMPLATE.md`의 항목을 채워주세요.
- **작은 단위로 자주** 올리는 쪽을 권장합니다. 한 PR에는 가능하면 한 가지 주제만.
- PR 제목은 커밋 메시지와 같은 prefix 규칙을 따릅니다.

## 리뷰 원칙

이 repo의 PR 리뷰에서 가장 중요한 질문은 다음 두 가지입니다.

1. **비개발자가 이 문서만 보고도 따라할 수 있는가?**
2. **자리표시자, 링크, 표기가 일관적인가?**

세부 표현보다 위 두 가지에 집중합니다.

## 머지

- 1명 이상의 승인 후 **squash merge** 권장
- 머지 후 브랜치는 삭제

## 잊지 말 것 (핵심 정책)

- 배포 완료 ≠ 메인서비스 노출
- 메인서비스 노출은 메인서비스 repo의 `serviceLinks`에서만 관리
- 신규 실험 서비스는 **Netlify 우선**
- DB는 가능한 한 낮은 단계에서 시작 (없음 → Neon → Supabase)
