'use client';

/**
 * AI 사용 고지 배너 — 사용자 입력이 외부 AI에 전송됨을 명시.
 * playground-hub 가이드에 따라 AI 서비스는 사용자 화면에 고지가 필요(고위험 카테고리는 필수).
 * 자세한 정책은 templates/ai-service/ai-notice.md.
 */
export default function AiNoticeBanner() {
  return (
    <div
      role="note"
      className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900"
    >
      <div className="flex items-start gap-2">
        <span aria-hidden>⚠️</span>
        <div>
          <p className="font-medium">AI 사용 안내</p>
          <p className="mt-0.5 text-amber-800">
            입력하신 내용은 외부 AI 서비스(OpenAI/Google)로 전송되어 응답 생성에 사용됩니다.
            <span className="hidden sm:inline"> 민감한 개인정보는 입력하지 마세요.</span>
          </p>
          <p className="mt-0.5 text-xs text-amber-700">
            AI 응답은 부정확할 수 있으니 그대로 신뢰하지 마세요.
          </p>
        </div>
      </div>
    </div>
  );
}
