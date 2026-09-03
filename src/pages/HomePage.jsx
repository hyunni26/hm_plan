import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Settings2 } from 'lucide-react'
import { useTrip } from '../context/TripContext'
import { useSchedules } from '../hooks/useSchedules'
import { useBookings } from '../hooks/useBookings'
import { useCities } from '../hooks/useCities'
import ClockCard from '../components/home/ClockCard'
import CountdownCard from '../components/home/CountdownCard'
import TodayBriefCard from '../components/home/TodayBriefCard'
import HotLinksRow from '../components/home/HotLinksRow'
import CityManagerModal from '../components/common/CityManagerModal'
import { todayISO } from '../lib/dateUtils'
import { buildCountryLabel } from '../lib/countryNames'

export default function HomePage() {
  const navigate = useNavigate()
  const { tripId, tripName } = useTrip()
  const { schedules, loading: schedulesLoading } = useSchedules(tripId)
  const { bookings, loading: bookingsLoading } = useBookings(tripId)
  const { cities, addCity, deleteCity } = useCities(tripId)
  const [cityManagerOpen, setCityManagerOpen] = useState(false)

  const today = todayISO()
  const todaySchedule = schedules.find((s) => s.schedule_date === today && s.city)
  const currentCity = todaySchedule?.city ?? null
  const countryLabel = buildCountryLabel(cities)

  if (schedulesLoading || bookingsLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-sm text-navy-500">
        불러오는 중...
      </div>
    )
  }

  return (
    <div className="space-y-4 px-4 pt-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-gold-light">
            Travel Diary
          </p>
          <button onClick={() => navigate('/trips')} className="block text-left">
            <h1 className="text-xl font-bold text-white">{countryLabel || tripName}</h1>
          </button>
        </div>
        <button
          onClick={() => setCityManagerOpen(true)}
          className="rounded-full p-2 text-navy-500 active:bg-navy-800"
          aria-label="도시 관리"
        >
          <Settings2 size={18} />
        </button>
      </div>

      <ClockCard currentCity={currentCity} />
      <CountdownCard bookings={bookings} />
      <TodayBriefCard schedules={schedules} />
      <HotLinksRow bookings={bookings} />

      <CityManagerModal
        open={cityManagerOpen}
        onClose={() => setCityManagerOpen(false)}
        cities={cities}
        onAdd={addCity}
        onDelete={deleteCity}
      />
    </div>
  )
}
