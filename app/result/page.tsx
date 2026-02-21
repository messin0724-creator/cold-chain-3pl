import Link from 'next/link';
import { calcEstimate } from '@/lib/estimate-engine';
import { getTopPartners } from '@/lib/matching-engine';
import type { TempZone } from '@/lib/estimate-engine';

const TEMP_LABEL: Record<TempZone, string> = {
  frozen: '냉동 (-18°C 이하)',
  chilled: '냉장 (0~10°C)',
  ambient: '상온 (15~25°C)',
};

function formatKRW(n: number) {
  if (n >= 100_000_000) return `${(n / 100_000_000).toFixed(1)}억원`;
  if (n >= 10_000) return `${(n / 10_000).toFixed(0)}만원`;
  return `${n.toLocaleString()}원`;
}

interface PageProps {
  searchParams: Promise<{ tempZone?: string; pallets?: string; region?: string; startDate?: string }>;
}

export default async function ResultPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const tempZone = (params.tempZone ?? 'chilled') as TempZone;
  const pallets = Math.max(1, Number(params.pallets ?? 1));
  const region = params.region ?? '서울·경기';
  const startDate = params.startDate ?? '';

  const estimate = calcEstimate(tempZone, pallets, region);
  const partners = getTopPartners(tempZone, pallets, region);

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 flex flex-col gap-10">

      {/* 헤더 */}
      <div>
        <p className="text-sm text-gray-500 mb-1">
          {TEMP_LABEL[tempZone]} · {region} · {pallets}팔레트
          {startDate && ` · ${startDate} 시작`}
        </p>
        <h1 className="text-3xl font-bold text-gray-900">견적 결과</h1>
      </div>

      {/* 월 예상 비용 */}
      <section className="rounded-2xl bg-blue-600 text-white p-6 sm:p-8">
        <p className="text-blue-200 text-sm mb-3">월 예상 보관비용</p>
        <div className="flex flex-wrap items-end gap-x-3 gap-y-1 mb-1">
          <span className="text-3xl sm:text-4xl font-bold">{formatKRW(estimate.minCost)}</span>
          <span className="text-blue-200 text-lg sm:text-xl">~ {formatKRW(estimate.maxCost)}</span>
        </div>
        <p className="text-blue-200 text-xs mt-3">* 입출고 수수료·부가세 별도. 실제 계약 조건에 따라 변동될 수 있습니다.</p>
      </section>

      {/* 가정 조건 */}
      <section>
        <h2 className="text-base font-semibold text-gray-700 mb-3">견적 산출 근거</h2>
        <ul className="flex flex-col gap-2">
          {estimate.assumptions.map((a, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="mt-0.5 text-blue-500">✓</span>
              {a}
            </li>
          ))}
        </ul>
      </section>

      {/* Top 3 파트너 */}
      <section>
        <h2 className="text-base font-semibold text-gray-700 mb-4">
          추천 3PL 파트너 {partners.length > 0 ? `Top ${partners.length}` : ''}
        </h2>
        {partners.length === 0 ? (
          <div className="rounded-xl border border-gray-200 p-8 text-center text-gray-400">
            조건에 맞는 파트너가 없습니다. 조건을 변경해 다시 시도해주세요.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {partners.map((p, idx) => (
              <div key={p.id} className="rounded-xl border border-gray-200 p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-gray-900">{p.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-blue-600 shrink-0">
                    {formatKRW(p.ratePerPallet)}<span className="text-xs text-gray-400">/팔레트·월</span>
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {p.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs">{tag}</span>
                  ))}
                  {p.certifications.map((cert) => (
                    <span key={cert} className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">{cert}</span>
                  ))}
                </div>

                <div className="flex flex-col gap-1">
                  {p.matchReasons.map((r, i) => (
                    <p key={i} className="text-xs text-gray-500 flex items-center gap-1">
                      <span className="text-green-500">✓</span> {r}
                    </p>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400 pt-1 border-t border-gray-100">
                  <span>가용 {p.available.toLocaleString()} / 총 {p.capacity.toLocaleString()} 팔레트</span>
                  <span>{p.region}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 하단 액션 */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/estimate"
          className="flex-1 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl text-center hover:border-gray-300 transition-colors text-sm"
        >
          ← 조건 수정
        </Link>
        <Link
          href="/partner/apply"
          className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-xl text-center hover:bg-blue-700 transition-colors text-sm"
        >
          파트너로 등록하기
        </Link>
      </div>

    </div>
  );
}
