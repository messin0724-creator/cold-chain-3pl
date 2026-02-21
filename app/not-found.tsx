import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center gap-6">
      <p className="text-6xl font-bold text-gray-100">404</p>
      <h1 className="text-xl font-bold text-gray-800">페이지를 찾을 수 없습니다</h1>
      <p className="text-gray-500 text-sm">주소를 확인하거나 홈으로 돌아가세요.</p>
      <Link href="/"
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm">
        홈으로
      </Link>
    </div>
  );
}
