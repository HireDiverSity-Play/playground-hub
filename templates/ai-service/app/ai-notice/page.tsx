import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI 사용 고지',
};

export default function AiNoticePage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-10 prose prose-slate">
      <h1>AI 사용 고지</h1>
      <p className="text-sm text-slate-500">
        본 서비스는 외부 AI를 사용합니다. 실제 내용은 <code>templates/ai-service/ai-notice.md</code>를 참고해 서비스별로 채워 주세요.
      </p>

      <h2>사용 중인 AI</h2>
      <p>
        본 서비스는 OpenAI 또는 Google Gemini를 사용해 응답을 생성합니다.
        사용 모델은 운영자가 환경에 따라 변경할 수 있습니다.
      </p>

      <h2>전송되는 데이터</h2>
      <ul>
        <li>사용자가 입력한 텍스트 전체가 AI 제공사로 전송됩니다.</li>
        <li>해당 데이터의 보관/재학습 정책은 각 제공사의 정책을 따릅니다.</li>
      </ul>

      <h2>주의사항</h2>
      <ul>
        <li>민감한 개인정보(주민번호, 카드번호 등)는 입력하지 마세요.</li>
        <li>AI 응답은 부정확할 수 있으며, 의료/법률/금융 의사결정에 단독으로 사용하지 마세요.</li>
        <li>응답 결과의 정확성·완전성은 보장하지 않습니다.</li>
      </ul>
    </article>
  );
}
