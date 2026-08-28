import { useState, useEffect } from 'react'
import { Trash2 } from 'lucide-react'
import Modal from '../common/Modal'

const CATEGORIES = ['관광', '식사', '이동', '숙소', '쇼핑', '기타']

const EMPTY_FORM = {
  city_id: '',
  schedule_date: '',
  start_time: '',
  end_time: '',
  title: '',
  place_name: '',
  memo: '',
  map_url: '',
  category: '기타'
}

export default function ScheduleFormModal({ open, onClose, cities, editingSchedule, onSave, onDelete }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (editingSchedule) {
      setForm({
        city_id: editingSchedule.city_id ?? '',
        schedule_date: editingSchedule.schedule_date ?? '',
        start_time: editingSchedule.start_time?.slice(0, 5) ?? '',
        end_time: editingSchedule.end_time?.slice(0, 5) ?? '',
        title: editingSchedule.title ?? '',
        place_name: editingSchedule.place_name ?? '',
        memo: editingSchedule.memo ?? '',
        map_url: editingSchedule.map_url ?? '',
        category: editingSchedule.category ?? '기타'
      })
    } else {
      setForm(EMPTY_FORM)
    }
  }, [editingSchedule, open])

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.schedule_date) return

    setSaving(true)
    try {
      await onSave({
        ...form,
        city_id: form.city_id || null,
        start_time: form.start_time || null,
        end_time: form.end_time || null
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
    <Modal open={open} onClose={onClose} title={editingSchedule ? '일정 수정' : '일정 추가'}>
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div>
          <label className={labelClass}>날짜 *</label>
          <input
            type="date"
            required
            value={form.schedule_date}
            onChange={handleChange('schedule_date')}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>시작 시간</label>
            <input type="time" value={form.start_time} onChange={handleChange('start_time')} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>종료 시간</label>
            <input type="time" value={form.end_time} onChange={handleChange('end_time')} className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>카테고리</label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setForm((f) => ({ ...f, category: cat }))}
                className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                  form.category === cat ? 'bg-gold text-navy-950' : 'bg-navy-800/60 text-navy-300'
                }`}
              >
                {cat}
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
            placeholder="예: 벨렘탑 방문"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>장소</label>
          <input value={form.place_name} onChange={handleChange('place_name')} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>구글맵 링크</label>
          <input
            value={form.map_url}
            onChange={handleChange('map_url')}
            placeholder="https://maps.google.com/..."
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>메모</label>
          <textarea
            value={form.memo}
            onChange={handleChange('memo')}
            rows={3}
            className={inputClass}
          />
        </div>

        <div className="flex gap-2 pt-2">
          {editingSchedule && (
            <button
              type="button"
              onClick={async () => {
                if (confirm('이 일정을 삭제할까요?')) {
                  await onDelete(editingSchedule.id)
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
