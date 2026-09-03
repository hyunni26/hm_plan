import { useState, useMemo, useEffect } from 'react'
import { CalendarPlus, MapPin, Ticket } from 'lucide-react'
import Modal from '../common/Modal'
import { PLACE_LIBRARY, LIBRARY_COUNTRIES } from '../../data/placeLibrary'
import { buildGoogleMapsSearchUrl } from '../../lib/mapsUtil'

// 나라 -> 도시 -> 장소 순서로 좁혀가며 보여주는 여행지 라이브러리.
// 날짜와 무관하게 순수 장소 정보(설명/특이사항/입장료)만 보여주고,
// 고르면 나머지 정보(제목/장소/카테고리)를 채운 채로 일정 폼을 연다.
// 날짜·시간은 폼에서 사용자가 직접 지정한다.
export default function TemplateBrowserModal({ open, onClose, onPick }) {
  const [activeCountry, setActiveCountry] = useState(LIBRARY_COUNTRIES[0])
  const cityNames = useMemo(
    () => Object.keys(PLACE_LIBRARY[activeCountry] ?? {}),
    [activeCountry]
  )
  const [activeCity, setActiveCity] = useState(cityNames[0])

  // 나라를 바꾸면 그 나라의 첫 도시로 자동 이동
  useEffect(() => {
    setActiveCity(Object.keys(PLACE_LIBRARY[activeCountry] ?? {})[0])
  }, [activeCountry])

  const items = PLACE_LIBRARY[activeCountry]?.[activeCity] ?? []

  const handlePick = (item) => {
    // 날짜/시간은 사용자가 직접 지정하도록 비워서 전달, 도시는 도시 탭 이름을 그대로 사용
    onPick({
      city: activeCity,
      title: item.title,
      place: item.place ?? item.title,
      memo: [item.info, item.note, item.fee ? `입장료: ${item.fee}` : null].filter(Boolean).join(' · '),
      category: item.category ?? '관광',
      map_url: buildGoogleMapsSearchUrl(item.place ?? item.title)
    })
  }

  return (
    <Modal open={open} onClose={onClose} title="여행지에서 불러오기">
      {/* 나라 탭 */}
      <div className="scrollbar-none -mx-5 mb-3 flex gap-2 overflow-x-auto px-5 pb-1">
        {LIBRARY_COUNTRIES.map((country) => (
          <button
            key={country}
            onClick={() => setActiveCountry(country)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium ${
              activeCountry === country ? 'bg-gold text-navy-950' : 'bg-navy-800/60 text-navy-300'
            }`}
          >
            {country}
          </button>
        ))}
      </div>

      {/* 도시 탭 (선택된 나라 기준) */}
      <div className="scrollbar-none -mx-5 mb-4 flex gap-2 overflow-x-auto px-5 pb-1">
        {cityNames.map((city) => (
          <button
            key={city}
            onClick={() => setActiveCity(city)}
            className={`shrink-0 rounded-full border px-3 py-1 text-[11px] font-medium ${
              activeCity === city
                ? 'border-gold-light text-gold-light'
                : 'border-navy-700 text-navy-400'
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* 장소 목록 */}
      <ul className="space-y-2.5">
        {items.length === 0 ? (
          <li className="py-8 text-center text-sm text-navy-500">등록된 장소가 없어요</li>
        ) : (
          items.map((item, idx) => (
            <li key={`${activeCity}-${idx}`}>
              <button
                onClick={() => handlePick(item)}
                className="w-full rounded-lg bg-navy-800/50 p-3 text-left active:bg-navy-800"
              >
                <div className="mb-1 flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={13} className="shrink-0 text-gold-light" />
                    <p className="text-sm font-medium text-white">{item.title}</p>
                  </div>
                  <CalendarPlus size={15} className="shrink-0 text-navy-500" />
                </div>
                <p className="text-xs text-navy-400">{item.info}</p>
                {item.note && <p className="mt-1 text-[11px] text-navy-500">{item.note}</p>}
                {item.fee && (
                  <p className="mt-1.5 flex items-center gap-1 text-[11px] text-gold-light">
                    <Ticket size={11} />
                    {item.fee}
                  </p>
                )}
              </button>
            </li>
          ))
        )}
      </ul>

      <p className="mt-4 text-center text-xs text-navy-500">
        장소를 탭하면 날짜와 시간을 직접 지정해서 내 일정에 추가할 수 있어요
      </p>
    </Modal>
  )
}
