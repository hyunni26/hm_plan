import { useSchedules } from '../hooks/useSchedules'
import { useBookings } from '../hooks/useBookings'
import ClockCard from '../components/home/ClockCard'
import CountdownCard from '../components/home/CountdownCard'
import TodayBriefCard from '../components/home/TodayBriefCard'
import HotLinksRow from '../components/home/HotLinksRow'
import { todayISO } from '../lib/dateUtils'

export default function HomePage() {
  const { schedules, loading: schedulesLoading } = useSchedules()
  const { bookings, loading: bookingsLoading } = useBookings()

  const today = todayISO()
  const todaySchedule = schedules.find((s) => s.schedule_date === today && s.city)
  const currentCity = todaySchedule?.city ?? null

  if (schedulesLoading || bookingsLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-sm text-navy-500">
        불러오는 중...
      </div>
    )
  }

  return (
    <div className="space-y-4 px-4 pt-5">
      <div>
        <p className="text-xs text-navy-500">신혼여행</p>
        <h1 className="text-xl font-bold text-white">포르투갈 &amp; 이탈리아</h1>
      </div>

      <ClockCard currentCity={currentCity} />
      <CountdownCard bookings={bookings} />
      <TodayBriefCard schedules={schedules} />
      <HotLinksRow bookings={bookings} />
    </div>
  )
}
