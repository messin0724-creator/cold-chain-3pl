export default function ResultLoading() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 flex flex-col gap-10 animate-pulse">
      {/* 헤더 스켈레톤 */}
      <div className="flex flex-col gap-2">
        <div className="h-4 w-48 bg-gray-200 rounded" />
        <div className="h-8 w-36 bg-gray-200 rounded" />
      </div>

      {/* 비용 배너 스켈레톤 */}
      <div className="rounded-2xl bg-blue-100 p-8 flex flex-col gap-3">
        <div className="h-4 w-28 bg-blue-200 rounded" />
        <div className="h-10 w-56 bg-blue-200 rounded" />
        <div className="h-3 w-64 bg-blue-200 rounded" />
      </div>

      {/* 가정 조건 스켈레톤 */}
      <div className="flex flex-col gap-3">
        <div className="h-4 w-32 bg-gray-200 rounded" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-4 w-full bg-gray-100 rounded" />
        ))}
      </div>

      {/* 파트너 카드 스켈레톤 */}
      <div className="flex flex-col gap-4">
        <div className="h-4 w-40 bg-gray-200 rounded" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-100 p-5 flex flex-col gap-3">
            <div className="flex justify-between">
              <div className="h-5 w-40 bg-gray-200 rounded" />
              <div className="h-5 w-20 bg-gray-200 rounded" />
            </div>
            <div className="flex gap-2">
              <div className="h-5 w-16 bg-gray-100 rounded-full" />
              <div className="h-5 w-20 bg-gray-100 rounded-full" />
            </div>
            <div className="h-3 w-full bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
