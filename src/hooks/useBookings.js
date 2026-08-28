import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'

const SELECT_WITH_CITY = '*, city:cities(id, name, name_en, country)'

export function useBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchBookings = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('bookings')
      .select(SELECT_WITH_CITY)
      .order('booking_date', { ascending: true, nullsFirst: false })
      .order('booking_time', { ascending: true, nullsFirst: true })

    if (error) {
      setError(error)
    } else {
      setBookings(data ?? [])
      setError(null)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  const addBooking = useCallback(
    async (payload) => {
      const { error } = await supabase.from('bookings').insert(payload)
      if (error) throw error
      await fetchBookings()
    },
    [fetchBookings]
  )

  const updateBooking = useCallback(
    async (id, payload) => {
      const { error } = await supabase.from('bookings').update(payload).eq('id', id)
      if (error) throw error
      await fetchBookings()
    },
    [fetchBookings]
  )

  const deleteBooking = useCallback(
    async (id) => {
      const { error } = await supabase.from('bookings').delete().eq('id', id)
      if (error) throw error
      await fetchBookings()
    },
    [fetchBookings]
  )

  return { bookings, loading, error, addBooking, updateBooking, deleteBooking, refetch: fetchBookings }
}
