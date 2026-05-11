// privacy.md 본문을 그대로 렌더. 실제 서비스에서는 privacy.md 내용을 정확히 채우고
// 이 페이지의 마크다운 텍스트도 동기화. 자동 마크다운 렌더가 필요하면 react-markdown 도입 검토.

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보 처리방침',
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-10 prose prose-slate">
      <h1>개인정보 처리방침</h1>
      <p className="text-sm text-slate-500">
        실제 내용은 <code>templates/ai-service/privacy.md</code> 파일을 참고해
        서비스별로 정확히 채워 주세요. 임시 안내입니다.
      </p>

      <h2>1. 수집하는 정보</h2>
      <p>본 서비스는 사용자의 [입력 텍스트]를 외부 AI 서비스(OpenAI 또는 Google)로 전송하여 응답을 생성합니다.</p>
      <p>전송된 데이터의 보관·재학습 정책은 각 AI 제공사의 정책을 따릅니다.</p>

      <h2>2. 보관 기간</h2>
      <p>본 서비스 자체는 사용자의 입력/응답을 별도로 저장하지 않습니다. (저장이 필요한 서비스라면 이 항목 수정)</p>

      <h2>3. 문의</h2>
      <p>개인정보 관련 문의: [담당자 이메일]</p>
    </article>
  );
}
