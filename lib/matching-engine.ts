import { PARTNERS } from './partners';
import type { Partner, TempZone } from './partners';

export interface MatchedPartner extends Partner {
  score: number;
  matchReasons: string[];
}

export function getTopPartners(
  tempZone: TempZone,
  pallets: number,
  region: string,
  topN = 3,
): MatchedPartner[] {
  const scored = PARTNERS.map((p) => {
    let score = 0;
    const reasons: string[] = [];

    // 온도 조건 매칭 (필수)
    if (!p.tempZones.includes(tempZone)) return null;

    // 가용 용량 충족 여부
    if (p.available < pallets) return null;

    // 지역 완전 일치
    if (p.region === region) {
      score += 50;
      reasons.push('요청 지역과 일치');
    } else {
      score += 10;
      reasons.push('인접 지역 대체 가능');
    }

    // 온도 조건 커버리지
    if (p.tempZones.includes(tempZone)) {
      score += 30;
      reasons.push(`${tempZone === 'frozen' ? '냉동' : tempZone === 'chilled' ? '냉장' : '상온'} 전용 시설 보유`);
    }

    // 가용 여유 (여유가 많을수록 유리)
    const availRatio = p.available / p.capacity;
    if (availRatio > 0.5) {
      score += 15;
      reasons.push('가용 공간 충분');
    } else if (availRatio > 0.2) {
      score += 8;
      reasons.push('가용 공간 보통');
    }

    // 인증 보너스
    if (p.certifications.includes('ISO 22000')) { score += 5; reasons.push('ISO 22000 인증'); }
    if (p.certifications.includes('AEO'))        { score += 5; reasons.push('AEO 인증 (수출입 우대)'); }

    return { ...p, score, matchReasons: reasons.slice(0, 3) };
  });

  return scored
    .filter((p): p is MatchedPartner => p !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
}
