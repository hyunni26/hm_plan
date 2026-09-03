import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'

const SELECT_WITH_CITY = '*, city:cities(id, name, name_en, country)'

export function useSchedules(tripId) {
  const [schedules, setSchedules] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchSchedules = useCallback(async () => {
    if (!tripId) {
      setSchedules([])
      setLoading(false)
      return
    }
    setLoading(true)
    const { data, error } = await supabase
      .from('schedules')
      .select(SELECT_WITH_CITY)
      .eq('trip_id', tripId)
      .order('schedule_date', { ascending: true })
      .order('start_time', { ascending: true, nullsFirst: true })

    if (error) {
      setError(error)
    } else {
      setSchedules(data ?? [])
      setError(null)
    }
    setLoading(false)
  }, [tripId])

  useEffect(() => {
    fetchSchedules()
  }, [fetchSchedules])

  const addSchedule = useCallback(
    async (payload) => {
      const { error } = await supabase.from('schedules').insert({ ...payload, trip_id: tripId })
      if (error) throw error
      await fetchSchedules()
    },
    [tripId, fetchSchedules]
  )

  const updateSchedule = useCallback(
    async (id, payload) => {
      const { error } = await supabase.from('schedules').update(payload).eq('id', id)
      if (error) throw error
      await fetchSchedules()
    },
    [fetchSchedules]
  )

  const deleteSchedule = useCallback(
    async (id) => {
      const { error } = await supabase.from('schedules').delete().eq('id', id)
      if (error) throw error
      await fetchSchedules()
    },
    [fetchSchedules]
  )

  return { schedules, loading, error, addSchedule, updateSchedule, deleteSchedule, refetch: fetchSchedules }
}
