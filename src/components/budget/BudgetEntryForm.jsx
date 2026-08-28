import { useState, useMemo } from 'react'
import Modal from '../common/Modal'
import { useExchangeRate } from '../../hooks/useExchangeRate'
import { todayISO } from '../../lib/dateUtils'

const CATEGORIES = ['교통', '숙박', '식비', '관광/입장료', '쇼핑', '기타']
const PAYERS = ['본인', '배우자', '공동']

export default function BudgetEntryForm({ open, onClose, onSave }) {
  const { rate, loading: rateLoading, isFallback, setRate } = useExchangeRate()
  const [form, setForm] = useState({
    expense_date: todayISO(),
    category: '기타',
    payer: '공동',
    description: '',
    amount_eur: ''
  })
  const [saving, setSaving] = useState(false)

  const amountKrw = useMemo(() => {
    const eur = parseFloat(form.amount_eur)
    if (!eur || Number.isNaN(eur)) return 0
    return eur * rate
  }, [form.amount_eur, rate])

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const eur = parseFloat(form.amount_eur)
    if (!eur || eur <= 0) return

    setSaving(true)
    try {
      await onSave({
        expense_date: form.expense_date,
        category: form.category,
        payer: form.payer,
        description: form.description || null,
        amount_eur: eur,
        exchange_rate: rate,
        amount_krw: Math.round(eur * rate)
      })
      setForm({ expense_date: todayISO(), category: '기타', payer: '공동', description: '', amount_eur: '' })
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
    <Modal open={open} onClose={onClose} title="지출 추가">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>날짜</label>
          <input type="date" value={form.expense_date} onChange={handleChange('expense_date')} className={inputClass} />
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
          <label className={labelClass}>결제자</label>
          <div className="flex gap-2">
            {PAYERS.map((p) => (
              <button
                type="button"
                key={p}
                onClick={() => setForm((f) => ({ ...f, payer: p }))}
                className={`flex-1 rounded-lg py-2 text-xs font-medium ${
                  form.payer === p ? 'bg-gold text-navy-950' : 'bg-navy-800/60 text-navy-300'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>내용</label>
          <input
            value={form.description}
            onChange={handleChange('description')}
            placeholder="예: 파스타 저녁 식사"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>금액 (EUR) *</label>
          <input
            type="number"
            inputMode="decimal"
            step="0.01"
            required
            value={form.amount_eur}
            onChange={handleChange('amount_eur')}
            placeholder="0.00"
            className={inputClass}
          />
        </div>

        <div className="rounded-lg bg-navy-800/40 px-3 py-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-navy-400">환산 원화</span>
            <span className="text-sm font-semibold text-gold-light tabular-nums">
              {amountKrw > 0 ? `${Math.round(amountKrw).toLocaleString('ko-KR')}원` : '-'}
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-[11px] text-navy-500">
              적용 환율 {rateLoading ? '조회 중...' : `€1 = ${rate.toLocaleString('ko-KR')}원`}
              {isFallback && !rateLoading && ' (참고값)'}
            </span>
            <button
              type="button"
              onClick={() => {
                const manual = prompt('환율을 직접 입력하세요 (€1당 원화)', rate)
                const parsed = parseFloat(manual)
                if (parsed > 0) setRate(parsed)
              }}
              className="text-[11px] text-navy-400 underline"
            >
              직접 수정
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-lg bg-gold py-3 text-sm font-semibold text-navy-950 disabled:opacity-60"
        >
          {saving ? '저장 중...' : '저장'}
        </button>
      </form>
    </Modal>
  )
}
