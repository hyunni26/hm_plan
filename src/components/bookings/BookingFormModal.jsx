import { useState, useEffect } from 'react'
import { Trash2 } from 'lucide-react'
import Modal from '../common/Modal'

const TYPES = [
  { value: 'flight', label: '항공' },
  { value: 'train', label: '기차' },
  { value: 'accommodation', label: '숙소' },
  { value: 'museum', label: '박물관/티켓' },
  { value: 'other', label: '기타' }
]

const EMPTY_FORM = {
  booking_type: 'flight',
  title: '',
  provider: '',
  city_id: '',
  booking_date: '',
  booking_time: '',
  confirmation_number: '',
  qr_code_url: '',
  voucher_url: '',
  memo: ''
}

export default function BookingFormModal({ open, onClose, cities, editingBooking, onSave, onDelete }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (editingBooking) {
      setForm({
        booking_type: editingBooking.booking_type ?? 'flight',
        title: editingBooking.title ?? '',
        provider: editingBooking.provider ?? '',
        city_id: editingBooking.city_id ?? '',
        booking_date: editingBooking.booking_date ?? '',
        booking_time: editingBooking.booking_time?.slice(0, 5) ?? '',
        confirmation_number: editingBooking.confirmation_number ?? '',
        qr_code_url: editingBooking.qr_code_url ?? '',
        voucher_url: editingBooking.voucher_url ?? '',
        memo: editingBooking.memo ?? ''
      })
    } else {
      setForm(EMPTY_FORM)
    }
  }, [editingBooking, open])

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title) return

    setSaving(true)
    try {
      await onSave({
        ...form,
        city_id: form.city_id || null,
        booking_date: form.booking_date || null,
        booking_time: form.booking_time || null
      })
      onClose()
    } catch (err) {
      alert(`저장 실패: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  const inputClass =
    'w-full rounded-lg border border-navy-700 bg-navy-800/60 px-3 py-2.5 text-sm text-white placeholder:text-navy-500 focus:border-gold focus:outline-none'
  const labelClass = 'mb-1.5 block text-xs font-medium text-navy-400'

  return (
    <Modal open={open} onClose={onClose} title={editingBooking ? '예약 수정' : '예약 추가'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>종류</label>
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <button
                type="button"
                key={t.value}
                onClick={() => setForm((f) => ({ ...f, booking_type: t.value }))}
                className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                  form.booking_type === t.value ? 'bg-gold text-navy-950' : 'bg-navy-800/60 text-navy-300'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>제목 *</label>
          <input
            required
            value={form.title}
            onChange={handleChange('title')}
            placeholder="예: 인천 → 리스본"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>제공사 (항공사/철도사/숙소명)</label>
          <input value={form.provider} onChange={handleChange('provider')} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>도시</label>
          <select value={form.city_id} onChange={handleChange('city_id')} className={inputClass}>
            <option value="">선택 안 함</option>
            {cities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>날짜</label>
            <input type="date" value={form.booking_date} onChange={handleChange('booking_date')} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>시간</label>
            <input type="time" value={form.booking_time} onChange={handleChange('booking_time')} className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>확인번호 / PNR</label>
          <input value={form.confirmation_number} onChange={handleChange('confirmation_number')} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>QR 코드 이미지 URL</label>
          <input
            value={form.qr_code_url}
            onChange={handleChange('qr_code_url')}
            placeholder="Supabase Storage 업로드 후 URL 붙여넣기"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>바우처 PDF URL</label>
          <input
            value={form.voucher_url}
            onChange={handleChange('voucher_url')}
            placeholder="Supabase Storage 업로드 후 URL 붙여넣기"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>메모</label>
          <textarea value={form.memo} onChange={handleChange('memo')} rows={3} className={inputClass} />
        </div>

        <div className="flex gap-2 pt-2">
          {editingBooking && (
            <button
              type="button"
              onClick={async () => {
                if (confirm('이 예약을 삭제할까요?')) {
                  await onDelete(editingBooking.id)
                  onClose()
                }
              }}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-italy/40 px-4 py-3 text-sm font-medium text-italy-light"
            >
              <Trash2 size={15} />
              삭제
            </button>
          )}
          <button
            type="submit"
            disabled={saving}
            className="flex-1 rounded-lg bg-gold py-3 text-sm font-semibold text-navy-950 disabled:opacity-60"
          >
            {saving ? '저장 중...' : '저장'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
