import PartnerForm from './PartnerForm';

export default function PartnerApplyPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-16">
      <div className="mb-10">
        <span className="inline-block mb-3 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
          내부 검토 후 등록 승인
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">3PL 파트너 등록</h1>
        <p className="text-gray-500">창고 정보와 단가를 입력하면 검토 후 매칭 풀에 등록해드립니다.</p>
      </div>
      <PartnerForm />
    </div>
  );
}
