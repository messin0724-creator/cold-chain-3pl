export type TempZone = 'frozen' | 'chilled' | 'ambient';

export interface EstimateResult {
  minCost: number;
  maxCost: number;
  assumptions: string[];
}

// 온도대별 팔레트당 월 단가 범위 (원)
const BASE_RATE: Record<TempZone, { min: number; max: number }> = {
  frozen:  { min: 80_000, max: 120_000 },
  chilled: { min: 50_000, max:  80_000 },
  ambient: { min: 20_000, max:  40_000 },
};

// 지역별 단가 계수
const REGION_MULTIPLIER: Record<string, number> = {
  '서울·경기': 1.25,
  '인천':      1.15,
  '부산·경남': 1.00,
  '대구·경북': 0.95,
  '광주·전라': 0.90,
  '대전·충청': 0.92,
  '강원':      0.88,
  '제주':      1.10,
};

export function calcEstimate(
  tempZone: TempZone,
  pallets: number,
  region: string,
): EstimateResult {
  const base = BASE_RATE[tempZone];
  const multiplier = REGION_MULTIPLIER[region] ?? 1.0;

  // 100팔레트 초과 시 5% 볼륨 할인
  const volumeDiscount = pallets > 100 ? 0.95 : 1.0;

  const minCost = Math.round(base.min * pallets * multiplier * volumeDiscount / 10_000) * 10_000;
  const maxCost = Math.round(base.max * pallets * multiplier * volumeDiscount / 10_000) * 10_000;

  const tempLabel: Record<TempZone, string> = {
    frozen:  '냉동(-18°C 이하)',
    chilled: '냉장(0~10°C)',
    ambient: '상온(15~25°C)',
  };

  const assumptions: string[] = [
    `온도 조건: ${tempLabel[tempZone]} 기준 단가 적용`,
    `보관 수량: 월 평균 ${pallets}팔레트 기준`,
    `지역 계수: ${region} (×${multiplier.toFixed(2)})`,
    pallets > 100 ? '100팔레트 초과 볼륨 할인 5% 적용' : '볼륨 할인 미적용 (100팔레트 이하)',
    '입출고 수수료, 부가세 별도',
    '실제 견적은 창고 가동률·계약 조건에 따라 달라질 수 있습니다',
  ];

  return { minCost, maxCost, assumptions };
}
