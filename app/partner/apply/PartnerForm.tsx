'use client';

import { useState } from 'react';

const REGIONS = ['서울·경기', '인천', '부산·경남', '대구·경북', '광주·전라', '대전·충청', '강원', '제주'];
const TEMP_ZONES = [
  { value: 'frozen',  label: '냉동', desc: '-18°C 이하' },
  { value: 'chilled', label: '냉장', desc: '0~10°C' },
  { value: 'ambient', label: '상온', desc: '15~25°C' },
];

interface FormState {
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  region: string;
  tempZones: string[];
  totalCapacity: string;
  availableCapacity: string;
  ratePerPallet: string;
  notes: string;
}

interface Errors {
  companyName?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  region?: string;
  tempZones?: string;
  totalCapacity?: string;
  availableCapacity?: string;
  ratePerPallet?: string;
}

const INITIAL: FormState = {
  companyName: '', contactName: '', contactEmail: '', contactPhone: '',
  region: '', tempZones: [], totalCapacity: '', availableCapacity: '',
  ratePerPallet: '', notes: '',
};

export default function PartnerForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  function toggleTempZone(value: string) {
    setForm((prev) => ({
      ...prev,
      tempZones: prev.tempZones.includes(value)
        ? prev.tempZones.filter((z) => z !== value)
        : [...prev.tempZones, value],
    }));
  }

  function validate(): boolean {
    const e: Errors = {};
    if (!form.companyName.trim())    e.companyName = '회사명을 입력해주세요.';
    if (!form.contactName.trim())    e.contactName = '담당자명을 입력해주세요.';
    if (!form.contactEmail.includes('@')) e.contactEmail = '올바른 이메일을 입력해주세요.';
    if (!form.contactPhone.trim())   e.contactPhone = '연락처를 입력해주세요.';
    if (!form.region)                e.region = '지역을 선택해주세요.';
    if (form.tempZones.length === 0) e.tempZones = '온도 조건을 하나 이상 선택해주세요.';
    if (Number(form.totalCapacity) < 1)     e.totalCapacity = '총 용량을 입력해주세요.';
    if (Number(form.availableCapacity) < 0) e.availableCapacity = '가용 용량을 입력해주세요.';
    if (Number(form.ratePerPallet) < 1)     e.ratePerPallet = '단가를 입력해주세요.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          totalCapacity: Number(form.totalCapacity),
          availableCapacity: Number(form.availableCapacity),
          ratePerPallet: Number(form.ratePerPallet),
        }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-green-50 border border-green-200 p-10 text-center flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-2xl">✓</div>
        <h2 className="text-xl font-bold text-green-800">등록 신청이 완료되었습니다</h2>
        <p className="text-green-700 text-sm">
          입력하신 정보를 검토 후 영업일 2일 내 이메일로 연락드리겠습니다.
        </p>
        <button
          onClick={() => { setForm(INITIAL); setStatus('idle'); }}
          className="mt-2 px-6 py-2 border border-green-300 text-green-700 rounded-xl text-sm hover:bg-green-100 transition-colors"
        >
          다시 입력하기
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7">

      {/* 회사 정보 */}
      <fieldset className="flex flex-col gap-4">
        <legend className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">회사 정보</legend>

        <Field label="회사명" error={errors.companyName}>
          <input type="text" placeholder="예: 한냉물류 주식회사"
            value={form.companyName}
            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
            className={input(errors.companyName)} />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="담당자명" error={errors.contactName}>
            <input type="text" placeholder="홍길동"
              value={form.contactName}
              onChange={(e) => setForm({ ...form, contactName: e.target.value })}
              className={input(errors.contactName)} />
          </Field>
          <Field label="연락처" error={errors.contactPhone}>
            <input type="tel" placeholder="010-0000-0000"
              value={form.contactPhone}
              onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
              className={input(errors.contactPhone)} />
          </Field>
        </div>

        <Field label="이메일" error={errors.contactEmail}>
          <input type="email" placeholder="contact@company.com"
            value={form.contactEmail}
            onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
            className={input(errors.contactEmail)} />
        </Field>
      </fieldset>

      {/* 창고 정보 */}
      <fieldset className="flex flex-col gap-4">
        <legend className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">창고 정보</legend>

        <Field label="창고 소재 지역" error={errors.region}>
          <select value={form.region}
            onChange={(e) => setForm({ ...form, region: e.target.value })}
            className={input(errors.region) + ' bg-white'}>
            <option value="">지역 선택</option>
            {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </Field>

        <Field label="보관 가능 온도 조건 (복수 선택)" error={errors.tempZones}>
          <div className="grid grid-cols-3 gap-2">
            {TEMP_ZONES.map((z) => {
              const active = form.tempZones.includes(z.value);
              return (
                <button type="button" key={z.value}
                  onClick={() => toggleTempZone(z.value)}
                  className={`flex flex-col items-center gap-0.5 p-3 rounded-xl border-2 transition-all text-sm ${
                    active ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                  <span className="font-semibold text-gray-900">{z.label}</span>
                  <span className="text-xs text-gray-400">{z.desc}</span>
                </button>
              );
            })}
          </div>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="총 보관 용량 (팔레트)" error={errors.totalCapacity}>
            <div className="relative">
              <input type="number" min="1" placeholder="500"
                value={form.totalCapacity}
                onChange={(e) => setForm({ ...form, totalCapacity: e.target.value })}
                className={input(errors.totalCapacity) + ' pr-14'} />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">팔레트</span>
            </div>
          </Field>
          <Field label="현재 가용 용량 (팔레트)" error={errors.availableCapacity}>
            <div className="relative">
              <input type="number" min="0" placeholder="200"
                value={form.availableCapacity}
                onChange={(e) => setForm({ ...form, availableCapacity: e.target.value })}
                className={input(errors.availableCapacity) + ' pr-14'} />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">팔레트</span>
            </div>
          </Field>
        </div>

        <Field label="팔레트당 월 단가 (원)" error={errors.ratePerPallet}>
          <div className="relative">
            <input type="number" min="1" placeholder="80000"
              value={form.ratePerPallet}
              onChange={(e) => setForm({ ...form, ratePerPallet: e.target.value })}
              className={input(errors.ratePerPallet) + ' pr-6'} />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">원</span>
          </div>
        </Field>
      </fieldset>

      {/* 추가 메모 */}
      <Field label="추가 메모 (선택)">
        <textarea rows={3} placeholder="특이사항, 전문 취급 품목 등을 입력해주세요."
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 transition-colors resize-none text-sm" />
      </Field>

      {status === 'error' && (
        <p className="text-sm text-red-500 text-center">제출 중 오류가 발생했습니다. 다시 시도해주세요.</p>
      )}

      <button type="submit" disabled={status === 'loading'}
        className="w-full py-4 bg-blue-600 text-white font-semibold rounded-xl text-lg hover:bg-blue-700 disabled:opacity-60 transition-colors">
        {status === 'loading' ? '제출 중...' : '파트너 등록 신청하기'}
      </button>
    </form>
  );
}

/* helpers */
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function input(error?: string) {
  return `w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors text-sm ${
    error ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-600'
  }`;
}
