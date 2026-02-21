import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero */}
      <section className="w-full max-w-4xl px-6 py-24 text-center">
        <span className="inline-block mb-4 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
          냉동·냉장 3PL 즉시 매칭
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-gray-900 mb-6">
          냉동·냉장 물류 파트너,<br />
          <span className="text-blue-600">30초 안에</span> 찾아드립니다
        </h1>
        <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto">
          보관 조건을 입력하면 월 예상 비용과 검증된 3PL 파트너를 즉시 추천해드립니다.
          복잡한 견적 문의 없이 바로 시작하세요.
        </p>
        <Link
          href="/estimate"
          className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl text-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          무료 견적 받기 →
        </Link>
      </section>

      {/* How it works */}
      <section className="w-full bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12 text-gray-800">
            이렇게 작동합니다
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.step} className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="font-semibold text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA bottom */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">지금 바로 견적을 확인하세요</h2>
        <p className="text-gray-500 mb-8">가입 없이 무료로 이용 가능합니다.</p>
        <Link
          href="/estimate"
          className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
        >
          견적 시작하기
        </Link>
      </section>
    </div>
  );
}

const steps = [
  {
    step: '1',
    title: '조건 입력',
    desc: '온도 조건, 물량, 지역, 시작일을 입력합니다.',
  },
  {
    step: '2',
    title: '즉시 견적',
    desc: '월 예상 비용 범위와 가정 조건을 바로 확인합니다.',
  },
  {
    step: '3',
    title: '파트너 추천',
    desc: '조건에 맞는 검증된 3PL 파트너 Top 3를 추천받습니다.',
  },
];
