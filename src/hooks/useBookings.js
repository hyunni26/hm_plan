import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'

const SELECT_WITH_CITY = '*, city:cities(id, name, name_en, country)'

export function useBookings(tripId) {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchBookings = useCallback(async () => {
    if (!tripId) {
      setBookings([])
      setLoading(false)
      return
    }
    setLoading(true)
    const { data, error } = await supabase
      .from('bookings')
      .select(SELECT_WITH_CITY)
      .eq('trip_id', tripId)
      .order('booking_date', { ascending: true, nullsFirst: false })
      .order('booking_time', { ascending: true, nullsFirst: true })

    if (error) {
      setError(error)
    } else {
      setBookings(data ?? [])
      setError(null)
    }
    setLoading(false)
  }, [tripId])

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  const addBooking = useCallback(
    async (payload) => {
      const { error } = await supabase.from('bookings').insert({ ...payload, trip_id: tripId })
      if (error) throw error
      await fetchBookings()
    },
    [tripId, fetchBookings]
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
