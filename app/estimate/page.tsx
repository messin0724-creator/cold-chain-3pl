import EstimateForm from './EstimateForm';

export default function EstimatePage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-16">
      <div className="mb-10">
        <span className="inline-block mb-3 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
          무료 · 가입 불필요
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">보관 조건 입력</h1>
        <p className="text-gray-500">조건을 입력하면 월 예상 비용과 파트너를 즉시 안내해드립니다.</p>
      </div>
      <EstimateForm />
    </div>
  );
}
