import { Trash2 } from 'lucide-react'
import { formatKoreanDate } from '../../lib/dateUtils'

const PAYER_COLOR = {
  본인: 'text-navy-300',
  배우자: 'text-gold-light',
  공동: 'text-navy-400'
}

export default function BudgetListItem({ budget, onDelete }) {
  return (
    <div className="flex items-center gap-3 border-b border-navy-800/60 py-3">
      <div className="min-w-0 flex-1">
        <div className="mb-0.5 flex items-center gap-1.5">
          <span className="text-[11px] text-navy-500">{formatKoreanDate(budget.expense_date)}</span>
          <span className="text-[11px] text-navy-600">·</span>
          <span className="text-[11px] text-navy-500">{budget.category}</span>
          <span className={`text-[11px] ${PAYER_COLOR[budget.payer] ?? 'text-navy-400'}`}>
            {budget.payer}
          </span>
        </div>
        <p className="truncate text-sm text-white">{budget.description || budget.category}</p>
      </div>

      <div className="shrink-0 text-right">
        <p className="text-sm font-semibold tabular-nums text-white">
          {Math.round(budget.amount_krw).toLocaleString('ko-KR')}원
        </p>
        <p className="text-[11px] text-navy-500">€{Number(budget.amount_eur).toFixed(2)}</p>
      </div>

      <button
        onClick={() => onDelete(budget.id)}
        className="shrink-0 rounded-full p-1.5 text-navy-600 active:bg-navy-800"
        aria-label="삭제"
      >
        <Trash2 size={14} />
      </button>
    </div>
  )
}
