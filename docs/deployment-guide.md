# 배포 가이드

이 문서는 실험 서비스를 외부에서 접속할 수 있는 상태로 만드는 방법을 설명합니다.

## 배포 플랫폼 선택 기준

| 상황 | 사용 플랫폼 |
| --- | --- |
| 신규 실험 서비스 | **Netlify 우선** |
| 기존부터 Vercel로 운영 중인 핵심 Next.js 서비스 | Vercel 유지 가능 |
| 새로 만드는 Next.js 서비스라도 실험 단계 | Netlify 권장 |

> 신규 실험 서비스는 Netlify를 우선합니다. 비용·속도·세팅 단순성 측면에서 실험 단계에 적합하기 때문입니다.
> 기존부터 Vercel에서 운영 중인 핵심 Next.js 서비스는 굳이 옮길 필요 없이 Vercel을 유지해도 됩니다.

## Netlify 배포 절차

1. https://app.netlify.com 에 접속해 GitHub 계정으로 로그인
2. **Add new site → Import an existing project** 클릭
3. 서비스 GitHub repo 선택
4. Build 설정 자동 인식 확인 (대부분 자동)
5. 환경 변수 추가: **Site settings → Environment variables**
6. **Deploy** 클릭

배포가 끝나면 자동으로 `*.netlify.app` 주소가 발급됩니다.
도메인 연결이 필요하면 **Domain management** 메뉴에서 설정합니다.

## Vercel 배포 절차 (기존 서비스 유지용)

1. https://vercel.com 접속
2. **New Project → GitHub repo 선택**
3. 환경 변수 추가
4. **Deploy**

## 배포 완료 후

배포 URL을 메모해 둡니다.

이 URL을 메인서비스에 바로 노출하지 않습니다.
**노출은 별도 단계**이며 [`docs/exposure-policy.md`](./exposure-policy.md)에서 다룹니다.

## 자주 하는 실수

- `.env` 파일을 그대로 GitHub에 올림 → 배포 직후 키 노출
- 환경 변수를 Netlify/Vercel 대시보드에 추가하지 않고 코드에 하드코딩
- 배포 후 모바일 점검을 빼먹음
