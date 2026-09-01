import { useState, useMemo } from 'react'
import { CalendarPlus } from 'lucide-react'
import Modal from '../common/Modal'
import { ITINERARY_TEMPLATE, ITINERARY_CITIES } from '../../data/itineraryTemplate'
import { formatKoreanDate } from '../../lib/dateUtils'

// 도시별로 관광지/할일 목록을 보여주고, 고르면 날짜·시간은 비운 채로
// 나머지 정보(제목/장소/메모/카테고리/도시)만 미리 채워서 넘긴다.
// 날짜·시간은 폼에서 직접 지정하도록 한다.
export default function TemplateBrowserModal({ open, onClose, onPick }) {
  const [activeCity, setActiveCity] = useState(ITINERARY_CITIES[0])

  const items = useMemo(
    () => ITINERARY_TEMPLATE.filter((i) => i.city === activeCity),
    [activeCity]
  )

  const handlePick = (item) => {
    // 날짜/시간은 사용자가 직접 지정하도록 비워서 전달 (나머지 정보만 재사용)
    onPick({ ...item, date: '', time: '' })
  }

  return (
    <Modal open={open} onClose={onClose} title="여행지에서 불러오기">
      {/* 도시 가로 탭 */}
      <div className="scrollbar-none -mx-5 mb-4 flex gap-2 overflow-x-auto px-5 pb-1">
        {ITINERARY_CITIES.map((city) => (
          <button
            key={city}
            onClick={() => setActiveCity(city)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium ${
              activeCity === city ? 'bg-gold text-navy-950' : 'bg-navy-800/60 text-navy-300'
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* 해당 도시 관광지/할일 목록 (날짜 무관, 참고용 날짜만 작게 표시) */}
      <ul className="space-y-2">
        {items.length === 0 ? (
          <li className="py-8 text-center text-sm text-navy-500">등록된 항목이 없어요</li>
        ) : (
          items.map((item, idx) => (
            <li key={`${item.city}-${idx}`}>
              <button
                onClick={() => handlePick(item)}
                className="flex w-full items-center gap-3 rounded-lg bg-navy-800/50 px-3 py-2.5 text-left active:bg-navy-800"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-white">{item.title}</p>
                  {item.place && <p className="truncate text-xs text-navy-500">{item.place}</p>}
                </div>
                <span className="shrink-0 text-[11px] text-navy-500">
                  {formatKoreanDate(item.date)} 참고
                </span>
                <CalendarPlus size={16} className="shrink-0 text-navy-400" />
              </button>
            </li>
          ))
        )}
      </ul>

      <p className="mt-4 text-center text-xs text-navy-500">
        항목을 탭하면 날짜와 시간을 직접 지정해서 내 일정에 추가할 수 있어요
      </p>
    </Modal>
  )
}
