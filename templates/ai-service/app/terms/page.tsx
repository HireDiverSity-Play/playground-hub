import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용약관',
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-10 prose prose-slate">
      <h1>이용약관</h1>
      <p className="text-sm text-slate-500">
        실제 내용은 <code>templates/ai-service/terms.md</code>를 참고해 서비스별로 채워 주세요. 임시 안내입니다.
      </p>

      <h2>1. 서비스 소개</h2>
      <p>[서비스명]은 외부 AI를 활용해 [목적]을 제공하는 실험 서비스입니다.</p>

      <h2>2. 책임 한계</h2>
      <p>AI 응답은 부정확하거나 편향될 수 있으며, 본 서비스는 그 결과에 대한 법적 책임을 지지 않습니다.</p>

      <h2>3. 금지 행위</h2>
      <ul>
        <li>타인의 명예를 훼손하거나 권리를 침해하는 입력</li>
        <li>자동화된 대량 호출 (rate limit 회피)</li>
      </ul>

      <h2>4. 문의</h2>
      <p>[담당자 이메일]</p>
    </article>
  );
}
