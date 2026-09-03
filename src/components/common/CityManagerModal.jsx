import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import Modal from '../common/Modal'
import CityBadge from '../common/CityBadge'

const TIMEZONE_PRESETS = [
  { label: '한국', value: 'Asia/Seoul' },
  { label: '서유럽', value: 'Europe/Lisbon' },
  { label: '중유럽', value: 'Europe/Rome' },
  { label: '동남아', value: 'Asia/Bangkok' },
  { label: '일본', value: 'Asia/Tokyo' },
  { label: '미국 동부', value: 'America/New_York' }
]

const EMPTY_FORM = { name: '', name_en: '', country: '', timezone: 'Asia/Seoul' }

export default function CityManagerModal({ open, onClose, cities, onAdd, onDelete }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.country.trim()) return

    setSaving(true)
    try {
      await onAdd({ ...form, sort_order: cities.length })
      setForm(EMPTY_FORM)
    } catch (err) {
      alert(`추가 실패: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  const inputClass =
    'w-full rounded-lg border border-navy-700 bg-navy-800/60 px-3 py-2.5 text-sm text-white placeholder:text-navy-500 focus:border-gold focus:outline-none'
  const labelClass = 'mb-1.5 block text-xs font-medium text-navy-400'

  return (
    <Modal open={open} onClose={onClose} title="방문 도시 관리">
      <div className="mb-5 space-y-2">
        {cities.length === 0 ? (
          <p className="text-sm text-navy-500">아직 등록된 도시가 없어요. 아래에서 추가해주세요.</p>
        ) : (
          cities.map((city) => (
            <div
              key={city.id}
              className="flex items-center justify-between rounded-lg bg-navy-800/50 px-3 py-2.5"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm text-white">{city.name}</span>
                <CityBadge name={city.country} country={city.country} />
              </div>
              <button
                onClick={() => onDelete(city.id)}
                className="rounded-full p-1.5 text-navy-500 active:bg-navy-800"
                aria-label="삭제"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 border-t border-navy-800/60 pt-4">
        <p className="text-xs font-medium text-navy-400">새 도시 추가</p>

        <div>
          <label className={labelClass}>도시 이름 (한글)</label>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="예: 다낭"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>영문 이름</label>
          <input
            value={form.name_en}
            onChange={(e) => setForm((f) => ({ ...f, name_en: e.target.value }))}
            placeholder="예: Da Nang"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>나라</label>
          <input
            value={form.country}
            onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
            placeholder="예: 베트남"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>시간대</label>
          <div className="flex flex-wrap gap-2">
            {TIMEZONE_PRESETS.map((tz) => (
              <button
                type="button"
                key={tz.value}
                onClick={() => setForm((f) => ({ ...f, timezone: tz.value }))}
                className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                  form.timezone === tz.value ? 'bg-gold text-navy-950' : 'bg-navy-800/60 text-navy-300'
                }`}
              >
                {tz.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-gold py-3 text-sm font-semibold text-navy-950 disabled:opacity-60"
        >
          <Plus size={16} />
          {saving ? '추가 중...' : '도시 추가'}
        </button>
      </form>
    </Modal>
  )
}
