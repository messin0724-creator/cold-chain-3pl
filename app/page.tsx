import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-130px)] px-6">
      <div className="w-full max-w-2xl text-center flex flex-col items-center gap-6">

        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-200 text-gray-500 text-xs font-medium tracking-wide">
          냉동·냉장 3PL 매칭 플랫폼
        </span>

        {/* Headline */}
        <h1 className="text-4xl sm:text-[56px] font-bold leading-[1.15] tracking-tight text-gray-950">
          냉동·냉장 창고,<br />지금 바로 연결하세요
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg text-gray-400 max-w-md leading-relaxed">
          보관 조건 입력 한 번으로<br className="hidden sm:block" />
          월 예상 비용과 검증된 파트너를 즉시 확인합니다.
        </p>

        {/* CTA */}
        <Link
          href="/estimate"
          className="mt-2 inline-block px-8 py-3.5 bg-gray-950 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors"
        >
          견적 바로 받기
        </Link>

        {/* Social proof hint */}
        <p className="text-xs text-gray-300">가입 불필요 · 무료 · 30초</p>

      </div>
    </div>
  );
}
