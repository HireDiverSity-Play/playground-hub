# 배포 가이드 — Quiz Service

## 권장 플랫폼
**Netlify** (신규 실험 서비스 우선)

## 절차
1. Netlify 로그인 → **Add new site → GitHub repo 선택**
2. Build 설정 자동 인식
3. 환경 변수 추가 (필요한 경우)
4. **Deploy**

## 결과 공유 URL 점검
- 결과 페이지 URL 구조가 변경되어도 기존 공유 링크가 깨지지 않도록 한다
- OG 메타데이터(`og:image`, `og:title`)가 SSR 또는 정적 파일로 제공되는지 확인
- 카카오톡, Slack, 트위터에서 직접 공유해보고 미리보기 확인

## 노출
배포 후 노출은 별도 절차 ([`docs/exposure-policy.md`](../../docs/exposure-policy.md))
