import { CalendarCheck } from 'lucide-react'
import Card from '../common/Card'
import { formatTimeRange, todayISO } from '../../lib/dateUtils'

export default function TodayBriefCard({ schedules }) {
  const today = todayISO()
  const todaySchedules = schedules.filter((s) => s.schedule_date === today)

  return (
    <Card>
      <div className="mb-3 flex items-center gap-2">
        <CalendarCheck size={16} className="text-navy-400" />
        <p className="text-sm font-medium text-white">오늘의 일정</p>
        <span className="ml-auto text-[11px] text-navy-500">{todaySchedules.length}건</span>
      </div>

      {todaySchedules.length === 0 ? (
        <p className="text-sm text-navy-500">오늘 등록된 일정이 없어요</p>
      ) : (
        <ul className="space-y-2.5">
          {todaySchedules.map((s) => (
            <li key={s.id} className="flex gap-3">
              <span className="w-16 shrink-0 text-xs tabular-nums text-gold-light">
                {formatTimeRange(s.start_time, s.end_time)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm text-white">{s.title}</p>
                {s.place_name && (
                  <p className="truncate text-xs text-navy-500">{s.place_name}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
