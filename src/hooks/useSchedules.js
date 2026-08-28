import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'

const SELECT_WITH_CITY = '*, city:cities(id, name, name_en, country)'

export function useSchedules() {
  const [schedules, setSchedules] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchSchedules = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('schedules')
      .select(SELECT_WITH_CITY)
      .order('schedule_date', { ascending: true })
      .order('start_time', { ascending: true, nullsFirst: true })

    if (error) {
      setError(error)
    } else {
      setSchedules(data ?? [])
      setError(null)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchSchedules()
  }, [fetchSchedules])

  const addSchedule = useCallback(
    async (payload) => {
      const { error } = await supabase.from('schedules').insert(payload)
      if (error) throw error
      await fetchSchedules()
    },
    [fetchSchedules]
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
