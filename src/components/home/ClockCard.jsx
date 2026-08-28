import { useEffect, useState } from 'react'
import { Clock3 } from 'lucide-react'
import Card from '../common/Card'
import { formatClock } from '../../lib/dateUtils'

// 오늘 일정이 있는 도시를 "현재 위치"로 간주. 없으면 여행 전/후 안내 문구 표시.
export default function ClockCard({ currentCity }) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const koreaTime = formatClock(now, 'Asia/Seoul')
  const localTime = currentCity ? formatClock(now, currentCity.timezone) : null

  return (
    <Card className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Clock3 size={16} className="text-navy-400" />
        <div>
          <p className="text-[11px] text-navy-400">한국</p>
          <p className="text-lg font-semibold tabular-nums text-white">{koreaTime}</p>
        </div>
      </div>

      <div className="h-8 w-px bg-navy-800" />

      <div className="text-right">
        <p className="text-[11px] text-navy-400">
          {currentCity ? currentCity.name : '여행 전'}
        </p>
        <p className="text-lg font-semibold tabular-nums text-gold-light">
          {localTime ?? '--:--'}
        </p>
      </div>
    </Card>
  )
}
