import { useState, useMemo } from 'react'
import { CalendarPlus } from 'lucide-react'
import Modal from '../common/Modal'
import { ITINERARY_TEMPLATE, ITINERARY_DATES } from '../../data/itineraryTemplate'
import { formatKoreanDate } from '../../lib/dateUtils'

export default function TemplateBrowserModal({ open, onClose, onPick }) {
  const [activeDate, setActiveDate] = useState(ITINERARY_DATES[0])

  const items = useMemo(
    () => ITINERARY_TEMPLATE.filter((i) => i.date === activeDate),
    [activeDate]
  )

  return (
    <Modal open={open} onClose={onClose} title="계획에서 불러오기">
      {/* 날짜 가로 탭 */}
      <div className="scrollbar-none -mx-5 mb-4 flex gap-2 overflow-x-auto px-5 pb-1">
        {ITINERARY_DATES.map((date) => (
          <button
            key={date}
            onClick={() => setActiveDate(date)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium ${
              activeDate === date ? 'bg-gold text-navy-950' : 'bg-navy-800/60 text-navy-300'
            }`}
          >
            {formatKoreanDate(date)}
          </button>
        ))}
      </div>

      {/* 해당 날짜 계획 목록 */}
      <ul className="space-y-2">
        {items.length === 0 ? (
          <li className="py-8 text-center text-sm text-navy-500">이 날짜엔 등록된 계획이 없어요</li>
        ) : (
          items.map((item, idx) => (
            <li key={`${item.date}-${idx}`}>
              <button
                onClick={() => onPick(item)}
                className="flex w-full items-center gap-3 rounded-lg bg-navy-800/50 px-3 py-2.5 text-left active:bg-navy-800"
              >
                <span className="w-12 shrink-0 text-xs tabular-nums text-gold-light">{item.time}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-white">{item.title}</p>
                  {item.place && <p className="truncate text-xs text-navy-500">{item.place}</p>}
                </div>
                <CalendarPlus size={16} className="shrink-0 text-navy-400" />
              </button>
            </li>
          ))
        )}
      </ul>

      <p className="mt-4 text-center text-xs text-navy-500">
        항목을 탭하면 시간을 원하는 대로 바꿔서 내 일정에 추가할 수 있어요
      </p>
    </Modal>
  )
}
