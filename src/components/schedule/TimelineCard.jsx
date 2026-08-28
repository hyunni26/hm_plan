import { MapPin, ExternalLink } from 'lucide-react'
import Card from '../common/Card'
import CityBadge from '../common/CityBadge'
import { formatTimeRange } from '../../lib/dateUtils'

const CATEGORY_DOT = {
  관광: 'bg-gold',
  식사: 'bg-italy',
  이동: 'bg-navy-400',
  숙소: 'bg-portugal',
  쇼핑: 'bg-navy-300',
  기타: 'bg-navy-600'
}

export default function TimelineCard({ schedule, onClick }) {
  return (
    <Card onClick={onClick} className="flex gap-3">
      <div className="flex w-14 shrink-0 flex-col items-start pt-0.5">
        <span className={`mb-1.5 h-2 w-2 rounded-full ${CATEGORY_DOT[schedule.category] ?? 'bg-navy-600'}`} />
        <span className="text-xs tabular-nums text-gold-light">
          {formatTimeRange(schedule.start_time, schedule.end_time)}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-1.5">
          {schedule.city && <CityBadge name={schedule.city.name} country={schedule.city.country} />}
          <span className="text-[11px] text-navy-500">{schedule.category}</span>
        </div>
        <p className="truncate text-sm font-medium text-white">{schedule.title}</p>
        {schedule.place_name && (
          <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-navy-400">
            <MapPin size={11} />
            {schedule.place_name}
          </p>
        )}
        {schedule.memo && <p className="mt-1 line-clamp-2 text-xs text-navy-500">{schedule.memo}</p>}
      </div>

      {schedule.map_url && (
        <a
          href={schedule.map_url}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex shrink-0 items-center self-center rounded-full bg-navy-800/80 p-2 text-navy-300 active:bg-navy-700"
          aria-label="구글맵에서 열기"
        >
          <ExternalLink size={14} />
        </a>
      )}
    </Card>
  )
}
