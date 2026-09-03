import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useCities(tripId) {
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCities = useCallback(async () => {
    if (!tripId) {
      setCities([])
      setLoading(false)
      return
    }
    setLoading(true)
    const { data, error } = await supabase
      .from('cities')
      .select('*')
      .eq('trip_id', tripId)
      .order('sort_order', { ascending: true })

    if (error) {
      setError(error)
    } else {
      setCities(data ?? [])
      setError(null)
    }
    setLoading(false)
  }, [tripId])

  useEffect(() => {
    fetchCities()
  }, [fetchCities])

  const addCity = useCallback(
    async (payload) => {
      const { error } = await supabase.from('cities').insert({ ...payload, trip_id: tripId })
      if (error) throw error
      await fetchCities()
    },
    [tripId, fetchCities]
  )

  const updateCity = useCallback(
    async (id, payload) => {
      const { error } = await supabase.from('cities').update(payload).eq('id', id)
      if (error) throw error
      await fetchCities()
    },
    [fetchCities]
  )

  const deleteCity = useCallback(
    async (id) => {
      const { error } = await supabase.from('cities').delete().eq('id', id)
      if (error) throw error
      await fetchCities()
    },
    [fetchCities]
  )

  return { cities, loading, error, addCity, updateCity, deleteCity, refetch: fetchCities }
}
