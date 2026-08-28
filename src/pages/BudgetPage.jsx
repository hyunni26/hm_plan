import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useBudgets } from '../hooks/useBudgets'
import BudgetSummary from '../components/budget/BudgetSummary'
import BudgetEntryForm from '../components/budget/BudgetEntryForm'
import BudgetListItem from '../components/budget/BudgetListItem'

export default function BudgetPage() {
  const { budgets, loading, addBudget, deleteBudget, totals } = useBudgets()
  const [formOpen, setFormOpen] = useState(false)

  return (
    <div className="relative space-y-4 px-4 pb-4 pt-5">
      <h1 className="text-xl font-bold text-white">가계부</h1>

      <BudgetSummary totals={totals} />

      <div>
        <p className="mb-1 px-1 text-xs font-medium text-navy-400">전체 내역</p>
        {loading ? (
          <p className="pt-10 text-center text-sm text-navy-500">불러오는 중...</p>
        ) : budgets.length === 0 ? (
          <p className="pt-10 text-center text-sm text-navy-500">등록된 지출이 없어요</p>
        ) : (
          <div className="rounded-xl2 border border-navy-800/60 bg-navy-900/60 px-3">
            {budgets.map((b) => (
              <BudgetListItem key={b.id} budget={b} onDelete={deleteBudget} />
            ))}
          </div>
        )}
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-24 z-30 mx-auto flex w-full max-w-[480px] justify-end px-4">
        <button
          onClick={() => setFormOpen(true)}
          className="pointer-events-auto rounded-full bg-gold p-4 text-navy-950 shadow-lg active:scale-95"
          aria-label="지출 추가"
        >
          <Plus size={22} strokeWidth={2.4} />
        </button>
      </div>

      <BudgetEntryForm open={formOpen} onClose={() => setFormOpen(false)} onSave={addBudget} />
    </div>
  )
}
