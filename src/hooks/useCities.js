import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useCities() {
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCities = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('cities')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) {
      setError(error)
    } else {
      setCities(data ?? [])
      setError(null)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchCities()
  }, [fetchCities])

  return { cities, loading, error, refetch: fetchCities }
}
