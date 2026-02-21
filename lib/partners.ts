export type TempZone = 'frozen' | 'chilled' | 'ambient';

export interface Partner {
  id: string;
  name: string;
  region: string;
  tempZones: TempZone[];
  capacity: number;       // 최대 팔레트 수
  available: number;      // 현재 가용 팔레트 수
  ratePerPallet: number;  // 팔레트당 월 단가 (원)
  tags: string[];
  certifications: string[];
}

export const PARTNERS: Partner[] = [
  {
    id: 'p1',
    name: '한냉물류 경기센터',
    region: '서울·경기',
    tempZones: ['frozen', 'chilled'],
    capacity: 500,
    available: 180,
    ratePerPallet: 95_000,
    tags: ['HACCP 인증', '24시간 모니터링', '당일 입고'],
    certifications: ['HACCP', 'ISO 22000'],
  },
  {
    id: 'p2',
    name: '인천항 콜드체인',
    region: '인천',
    tempZones: ['frozen', 'chilled', 'ambient'],
    capacity: 800,
    available: 320,
    ratePerPallet: 88_000,
    tags: ['수출입 특화', '항구 인접', '복합 온도'],
    certifications: ['HACCP', 'AEO'],
  },
  {
    id: 'p3',
    name: '부산냉장물류',
    region: '부산·경남',
    tempZones: ['frozen', 'chilled'],
    capacity: 600,
    available: 210,
    ratePerPallet: 78_000,
    tags: ['남부 물류 허브', '수산물 특화', '저온 배송 연계'],
    certifications: ['HACCP'],
  },
  {
    id: 'p4',
    name: '수도권 프레시로지스',
    region: '서울·경기',
    tempZones: ['chilled', 'ambient'],
    capacity: 300,
    available: 90,
    ratePerPallet: 72_000,
    tags: ['신선식품 특화', '소량 다빈도', '새벽 배송 연계'],
    certifications: ['HACCP', 'GAP'],
  },
  {
    id: 'p5',
    name: '대전 중부냉동창고',
    region: '대전·충청',
    tempZones: ['frozen', 'chilled', 'ambient'],
    capacity: 400,
    available: 250,
    ratePerPallet: 65_000,
    tags: ['전국 중간 거점', '대용량 보관', '장기 계약 우대'],
    certifications: ['HACCP'],
  },
  {
    id: 'p6',
    name: '광주 서남부 냉장',
    region: '광주·전라',
    tempZones: ['frozen', 'chilled'],
    capacity: 350,
    available: 140,
    ratePerPallet: 62_000,
    tags: ['농산물 특화', '산지 직송 연계', '친환경 인증'],
    certifications: ['HACCP', 'GAP', 'Organic'],
  },
  {
    id: 'p7',
    name: '제주 콜드허브',
    region: '제주',
    tempZones: ['chilled', 'ambient'],
    capacity: 150,
    available: 60,
    ratePerPallet: 85_000,
    tags: ['제주 특산물', '항공·선박 연계', '소규모 특화'],
    certifications: ['HACCP'],
  },
];
