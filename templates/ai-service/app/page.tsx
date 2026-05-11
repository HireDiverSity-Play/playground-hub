'use client';

import { useState, useRef } from 'react';
import AiNoticeBanner from '@/components/AiNoticeBanner';

/**
 * AI 입력 폼 + 스트리밍 결과 표시.
 *
 * 사용 패턴:
 *   1. 사용자가 prompt 입력 → "생성" 버튼 클릭
 *   2. POST /api/generate → text/plain 스트림 응답
 *   3. ReadableStream을 chunk 단위로 읽어 라이브 표시
 *   4. AbortController로 "중단" 버튼 지원 — 클라이언트 abort 시 서버도 외부 API abort
 *
 * 이 폼은 단순 한 페이지 흐름. 실제 서비스에서는 입력 폼/결과 화면을 분리하거나 챗 UI로 확장.
 */
export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;
    setResult('');
    setError(null);
    setLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
        signal: controller.signal,
      });
      if (!res.ok) {
        // 400/429/500 — JSON 에러 메시지.
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      if (!res.body) throw new Error('응답 본문이 비어 있습니다.');
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { value, done } = await reader.read();
        if (done) {
          // 한글 등 멀티바이트 문자가 청크 경계에서 잘렸을 때 internal 버퍼에 남은 잔여를 flush.
          // stream:false (default)로 빈 입력에 대해 호출하면 버퍼 비움.
          const tail = decoder.decode();
          if (tail) setResult((prev) => prev + tail);
          break;
        }
        setResult((prev) => prev + decoder.decode(value, { stream: true }));
      }
    } catch (err) {
      if ((err as Error)?.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : '알 수 없는 오류');
    } finally {
      setLoading(false);
    }
  };

  const onStop = () => {
    abortRef.current?.abort();
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">[서비스명]</h1>
        <p className="text-slate-600">[한 줄 설명 — 어떤 입력을 받아 어떤 결과를 주는 서비스인지]</p>
      </header>

      <AiNoticeBanner />

      <form onSubmit={onSubmit} className="space-y-3">
        <label htmlFor="prompt" className="block text-sm font-medium text-slate-700">
          무엇을 도와드릴까요?
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="예: 친구한테 보낼 생일 축하 메시지를 만들어줘"
          rows={4}
          maxLength={4000}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
        />
        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={!prompt.trim() || loading}
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? '생성 중...' : '생성하기'}
          </button>
          {loading && (
            <button
              type="button"
              onClick={onStop}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              중단
            </button>
          )}
          <span className="ml-auto text-xs text-slate-400">{prompt.length}/4000</span>
        </div>
      </form>

      {error && (
        <div role="alert" className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </div>
      )}

      {result && (
        <section aria-live="polite" className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          <h2 className="mb-2 text-sm font-medium text-slate-500">결과</h2>
          {/* whitespace-pre-wrap으로 줄바꿈 보존. */}
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-900">{result}</div>
        </section>
      )}
    </div>
  );
}
