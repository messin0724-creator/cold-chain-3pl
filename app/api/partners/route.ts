import { Resend } from 'resend';
import { NextResponse } from 'next/server';

interface PartnerBody {
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  region: string;
  tempZones: string[];
  totalCapacity: number;
  availableCapacity: number;
  ratePerPallet: number;
  notes?: string;
}

const TEMP_LABEL: Record<string, string> = {
  frozen: '냉동 (-18°C 이하)',
  chilled: '냉장 (0~10°C)',
  ambient: '상온 (15~25°C)',
};

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = (await req.json()) as PartnerBody;

  const html = `
    <h2>새 파트너 등록 신청</h2>
    <table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:600px">
      <tr><td><b>회사명</b></td><td>${body.companyName}</td></tr>
      <tr><td><b>담당자</b></td><td>${body.contactName}</td></tr>
      <tr><td><b>이메일</b></td><td>${body.contactEmail}</td></tr>
      <tr><td><b>연락처</b></td><td>${body.contactPhone}</td></tr>
      <tr><td><b>지역</b></td><td>${body.region}</td></tr>
      <tr><td><b>온도 조건</b></td><td>${body.tempZones.map((z) => TEMP_LABEL[z] ?? z).join(', ')}</td></tr>
      <tr><td><b>총 용량</b></td><td>${body.totalCapacity.toLocaleString()} 팔레트</td></tr>
      <tr><td><b>가용 용량</b></td><td>${body.availableCapacity.toLocaleString()} 팔레트</td></tr>
      <tr><td><b>팔레트 단가</b></td><td>${body.ratePerPallet.toLocaleString()}원/월</td></tr>
      ${body.notes ? `<tr><td><b>메모</b></td><td>${body.notes}</td></tr>` : ''}
      <tr><td><b>신청 시각</b></td><td>${new Date().toLocaleString('ko-KR')}</td></tr>
    </table>
  `;

  const { error } = await resend.emails.send({
    from: 'ColdMatch <onboarding@resend.dev>',
    to: process.env.TO_EMAIL ?? '',
    subject: `[ColdMatch] 파트너 등록 신청 — ${body.companyName}`,
    html,
  });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
