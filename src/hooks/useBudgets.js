import { useEffect, useState, useCallback, useMemo } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useBudgets(tripId) {
  const [budgets, setBudgets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchBudgets = useCallback(async () => {
    if (!tripId) {
      setBudgets([])
      setLoading(false)
      return
    }
    setLoading(true)
    const { data, error } = await supabase
      .from('budgets')
      .select('*')
      .eq('trip_id', tripId)
      .order('expense_date', { ascending: false })
      .order('created_at', { ascending: false })

    if (error) {
      setError(error)
    } else {
      setBudgets(data ?? [])
      setError(null)
    }
    setLoading(false)
  }, [tripId])

  useEffect(() => {
    fetchBudgets()
  }, [fetchBudgets])

  const addBudget = useCallback(
    async (payload) => {
      const { error } = await supabase.from('budgets').insert({ ...payload, trip_id: tripId })
      if (error) throw error
      await fetchBudgets()
    },
    [tripId, fetchBudgets]
  )

  const deleteBudget = useCallback(
    async (id) => {
      const { error } = await supabase.from('budgets').delete().eq('id', id)
      if (error) throw error
      await fetchBudgets()
    },
    [fetchBudgets]
  )

  const totals = useMemo(() => {
    const totalEur = budgets.reduce((sum, b) => sum + Number(b.amount_eur ?? 0), 0)
    const totalKrw = budgets.reduce((sum, b) => sum + Number(b.amount_krw ?? 0), 0)

    const byCategory = {}
    const byPayer = {}
    for (const b of budgets) {
      byCategory[b.category] = (byCategory[b.category] ?? 0) + Number(b.amount_krw ?? 0)
      byPayer[b.payer] = (byPayer[b.payer] ?? 0) + Number(b.amount_krw ?? 0)
    }

    return { totalEur, totalKrw, byCategory, byPayer }
  }, [budgets])

  return { budgets, loading, error, addBudget, deleteBudget, totals, refetch: fetchBudgets }
}
