import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

export const metadata: Metadata = {
  title: 'ColdMatch — 냉동·냉장 3PL 매칭 플랫폼',
  description: '냉동·냉장 물류 파트너를 즉시 매칭하고 비용을 견적받으세요.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${geist.variable} font-sans antialiased bg-white text-gray-900`}>
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100 px-4 sm:px-6 py-3 flex items-center justify-between">
          <a href="/" className="text-lg font-bold tracking-tight text-blue-600">
            ColdMatch
          </a>
          <nav className="flex items-center gap-2 sm:gap-6">
            <a href="/estimate"
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50">
              견적 받기
            </a>
            <a href="/partner/apply"
              className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              파트너 등록
            </a>
          </nav>
        </header>
        <main className="min-h-[calc(100vh-57px-73px)]">{children}</main>
        <footer className="border-t border-gray-100 px-6 py-8 text-center text-sm text-gray-400">
          © 2026 ColdMatch. 냉동·냉장 3PL 매칭 플랫폼
        </footer>
      </body>
    </html>
  );
}
