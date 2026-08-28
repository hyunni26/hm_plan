import { useEffect, useState } from 'react'
import { Plane, TrainFront } from 'lucide-react'
import Card from '../common/Card'
import { getCountdownParts } from '../../lib/dateUtils'

const TYPE_ICON = { flight: Plane, train: TrainFront }

export default function CountdownCard({ bookings }) {
  const [, forceTick] = useState(0)

  // 항공/기차 예약 중 아직 오지 않은 가장 가까운 일정 찾기
  const nextTrip = bookings
    .filter((b) => (b.booking_type === 'flight' || b.booking_type === 'train') && b.booking_date)
    .map((b) => {
      const dt = new Date(`${b.booking_date}T${b.booking_time ?? '00:00'}:00`)
      return { ...b, dt }
    })
    .filter((b) => b.dt.getTime() > Date.now())
    .sort((a, b) => a.dt - b.dt)[0]

  useEffect(() => {
    const timer = setInterval(() => forceTick((n) => n + 1), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!nextTrip) {
    return (
      <Card>
        <p className="text-sm text-navy-400">예정된 이동 일정이 없어요</p>
      </Card>
    )
  }

  const parts = getCountdownParts(nextTrip.dt)
  const Icon = TYPE_ICON[nextTrip.booking_type] ?? Plane

  return (
    <Card className="bg-gradient-to-br from-navy-800 to-navy-900">
      <div className="mb-2 flex items-center gap-2">
        <div className="rounded-full bg-gold/15 p-1.5">
          <Icon size={16} className="text-gold-light" />
        </div>
        <p className="text-sm font-medium text-white">{nextTrip.title}</p>
      </div>

      {parts ? (
        <div className="flex items-baseline gap-3 tabular-nums">
          {parts.days > 0 && (
            <span className="text-2xl font-bold text-gold-light">D-{parts.days}</span>
          )}
          <span className="text-xl font-semibold text-white">
            {String(parts.hours).padStart(2, '0')}:{String(parts.minutes).padStart(2, '0')}:
            {String(parts.seconds).padStart(2, '0')}
          </span>
        </div>
      ) : (
        <p className="text-sm text-navy-400">곧 출발이에요!</p>
      )}
    </Card>
  )
}
