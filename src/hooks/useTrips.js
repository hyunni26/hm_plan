import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useTrips(travelerId) {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTrips = useCallback(async () => {
    if (!travelerId) {
      setTrips([])
      setLoading(false)
      return
    }
    setLoading(true)
    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .eq('traveler_id', travelerId)
      .order('created_at', { ascending: false })

    if (error) {
      setError(error)
    } else {
      setTrips(data ?? [])
      setError(null)
    }
    setLoading(false)
  }, [travelerId])

  useEffect(() => {
    fetchTrips()
  }, [fetchTrips])

  const addTrip = useCallback(
    async (payload) => {
      const { data, error } = await supabase
        .from('trips')
        .insert({ ...payload, traveler_id: travelerId })
        .select()
        .single()
      if (error) throw error
      await fetchTrips()
      return data
    },
    [travelerId, fetchTrips]
  )

  const deleteTrip = useCallback(
    async (id) => {
      const { error } = await supabase.from('trips').delete().eq('id', id)
      if (error) throw error
      await fetchTrips()
    },
    [fetchTrips]
  )

  return { trips, loading, error, addTrip, deleteTrip, refetch: fetchTrips }
}
