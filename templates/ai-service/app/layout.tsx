import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import './globals.css';

// 서비스명/설명을 실제 값으로 교체. OG 이미지(/og-image.png)는 public/에 추가.
export const metadata: Metadata = {
  title: '[서비스명]',
  description: '[한 줄 설명]',
  openGraph: {
    title: '[서비스명]',
    description: '[한 줄 설명]',
    type: 'website',
    locale: 'ko_KR',
    // images: ['/og-image.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
          <div className="space-x-4">
            <Link href="/privacy" className="hover:text-slate-700">개인정보 처리방침</Link>
            <Link href="/terms" className="hover:text-slate-700">이용약관</Link>
            <Link href="/ai-notice" className="hover:text-slate-700">AI 사용 고지</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
