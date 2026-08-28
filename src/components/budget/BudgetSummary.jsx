import Card from '../common/Card'

function formatKrw(n) {
  return `${Math.round(n).toLocaleString('ko-KR')}원`
}

export default function BudgetSummary({ totals }) {
  const categoryEntries = Object.entries(totals.byCategory).sort((a, b) => b[1] - a[1])
  const payerEntries = Object.entries(totals.byPayer)

  return (
    <div className="space-y-3">
      <Card className="bg-gradient-to-br from-navy-800 to-navy-900">
        <p className="text-xs text-navy-400">총 누적 지출</p>
        <p className="mt-1 text-2xl font-bold text-gold-light">{formatKrw(totals.totalKrw)}</p>
        <p className="mt-0.5 text-xs text-navy-500">
          €{totals.totalEur.toLocaleString('ko-KR', { minimumFractionDigits: 2 })}
        </p>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card>
          <p className="mb-2 text-xs font-medium text-navy-400">카테고리별</p>
          <ul className="space-y-1.5">
            {categoryEntries.length === 0 ? (
              <li className="text-xs text-navy-600">내역 없음</li>
            ) : (
              categoryEntries.map(([cat, amount]) => (
                <li key={cat} className="flex justify-between text-xs">
                  <span className="text-navy-300">{cat}</span>
                  <span className="text-navy-200 tabular-nums">{formatKrw(amount)}</span>
                </li>
              ))
            )}
          </ul>
        </Card>

        <Card>
          <p className="mb-2 text-xs font-medium text-navy-400">결제자별</p>
          <ul className="space-y-1.5">
            {payerEntries.length === 0 ? (
              <li className="text-xs text-navy-600">내역 없음</li>
            ) : (
              payerEntries.map(([payer, amount]) => (
                <li key={payer} className="flex justify-between text-xs">
                  <span className="text-navy-300">{payer}</span>
                  <span className="text-navy-200 tabular-nums">{formatKrw(amount)}</span>
                </li>
              ))
            )}
          </ul>
        </Card>
      </div>
    </div>
  )
}
