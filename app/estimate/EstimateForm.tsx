'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const REGIONS = ['서울·경기', '인천', '부산·경남', '대구·경북', '광주·전라', '대전·충청', '강원', '제주'];
const TEMP_ZONES = [
  { value: 'frozen', label: '냉동', desc: '-18°C 이하' },
  { value: 'chilled', label: '냉장', desc: '0 ~ 10°C' },
  { value: 'ambient', label: '상온', desc: '15 ~ 25°C' },
];

interface FormState {
  tempZone: string;
  pallets: string;
  region: string;
  startDate: string;
}

interface Errors {
  tempZone?: string;
  pallets?: string;
  region?: string;
  startDate?: string;
}

export default function EstimateForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({ tempZone: '', pallets: '', region: '', startDate: '' });
  const [errors, setErrors] = useState<Errors>({});

  function validate(): boolean {
    const e: Errors = {};
    if (!form.tempZone) e.tempZone = '온도 조건을 선택해주세요.';
    if (!form.pallets || Number(form.pallets) < 1) e.pallets = '팔레트 수를 1개 이상 입력해주세요.';
    if (!form.region) e.region = '지역을 선택해주세요.';
    if (!form.startDate) e.startDate = '시작일을 선택해주세요.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const params = new URLSearchParams({
      tempZone: form.tempZone,
      pallets: form.pallets,
      region: form.region,
      startDate: form.startDate,
    });
    router.push(`/result?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* 온도 조건 */}
      <fieldset>
        <legend className="text-sm font-semibold text-gray-700 mb-3">
          온도 조건 <span className="text-red-500">*</span>
        </legend>
        <div className="grid grid-cols-3 gap-3">
          {TEMP_ZONES.map((zone) => (
            <label
              key={zone.value}
              className={`flex flex-col items-center gap-1 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                form.tempZone === zone.value
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="tempZone"
                value={zone.value}
                checked={form.tempZone === zone.value}
                onChange={(e) => setForm({ ...form, tempZone: e.target.value })}
                className="sr-only"
              />
              <span className="font-semibold text-gray-900">{zone.label}</span>
              <span className="text-xs text-gray-500">{zone.desc}</span>
            </label>
          ))}
        </div>
        {errors.tempZone && <p className="mt-2 text-sm text-red-500">{errors.tempZone}</p>}
      </fieldset>

      {/* 팔레트 수 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          월 평균 보관 팔레트 수 <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="number"
            min="1"
            max="10000"
            placeholder="예: 50"
            value={form.pallets}
            onChange={(e) => setForm({ ...form, pallets: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 transition-colors pr-16"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">팔레트</span>
        </div>
        {errors.pallets && <p className="mt-2 text-sm text-red-500">{errors.pallets}</p>}
      </div>

      {/* 지역 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          보관 희망 지역 <span className="text-red-500">*</span>
        </label>
        <select
          value={form.region}
          onChange={(e) => setForm({ ...form, region: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 transition-colors bg-white appearance-none"
        >
          <option value="">지역 선택</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        {errors.region && <p className="mt-2 text-sm text-red-500">{errors.region}</p>}
      </div>

      {/* 시작일 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          보관 시작 희망일 <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          value={form.startDate}
          min={new Date().toISOString().split('T')[0]}
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 transition-colors"
        />
        {errors.startDate && <p className="mt-2 text-sm text-red-500">{errors.startDate}</p>}
      </div>

      <button
        type="submit"
        className="w-full py-4 bg-blue-600 text-white font-semibold rounded-xl text-lg hover:bg-blue-700 transition-colors mt-2"
      >
        견적 확인하기 →
      </button>
    </form>
  );
}
