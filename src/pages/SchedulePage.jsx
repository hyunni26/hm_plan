import { useMemo, useState } from 'react'
import { Plus, CalendarPlus } from 'lucide-react'
import { useSchedules } from '../hooks/useSchedules'
import { useCities } from '../hooks/useCities'
import CityFilterBar from '../components/schedule/CityFilterBar'
import TimelineCard from '../components/schedule/TimelineCard'
import ScheduleFormModal from '../components/schedule/ScheduleFormModal'
import TemplateBrowserModal from '../components/schedule/TemplateBrowserModal'
import { formatKoreanDate } from '../lib/dateUtils'

export default function SchedulePage() {
  const { schedules, loading, addSchedule, updateSchedule, deleteSchedule } = useSchedules()
  const { cities } = useCities()
  const [activeCityId, setActiveCityId] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingSchedule, setEditingSchedule] = useState(null)
  const [templateItem, setTemplateItem] = useState(null)
  const [templateModalOpen, setTemplateModalOpen] = useState(false)

  const filtered = useMemo(
    () => (activeCityId ? schedules.filter((s) => s.city_id === activeCityId) : schedules),
    [schedules, activeCityId]
  )

  const grouped = useMemo(() => {
    const map = new Map()
    for (const s of filtered) {
      if (!map.has(s.schedule_date)) map.set(s.schedule_date, [])
      map.get(s.schedule_date).push(s)
    }
    return [...map.entries()]
  }, [filtered])

  const openAddModal = () => {
    setEditingSchedule(null)
    setTemplateItem(null)
    setModalOpen(true)
  }

  const openEditModal = (schedule) => {
    setEditingSchedule(schedule)
    setTemplateItem(null)
    setModalOpen(true)
  }

  // 템플릿 브라우저에서 항목을 고르면, 그 값으로 미리 채운 일정 폼을 연다 (시간은 여기서 수정 가능)
  const handlePickTemplate = (item) => {
    setTemplateModalOpen(false)
    setEditingSchedule(null)
    setTemplateItem(item)
    setModalOpen(true)
  }

  const handleSave = async (payload) => {
    if (editingSchedule) {
      await updateSchedule(editingSchedule.id, payload)
    } else {
      await addSchedule(payload)
    }
  }

  return (
    <div className="relative pb-4">
      <div className="sticky top-0 z-20 bg-navy-950/95 pb-3 pt-5 backdrop-blur-md">
        <div className="mb-3 flex items-center justify-between px-4">
          <h1 className="text-xl font-bold text-white">일정</h1>
          <button
            onClick={() => setTemplateModalOpen(true)}
            className="flex items-center gap-1.5 rounded-full bg-navy-800/60 px-3 py-1.5 text-xs font-medium text-gold-light active:bg-navy-800"
          >
            <CalendarPlus size={14} />
            계획에서 불러오기
          </button>
        </div>
        <CityFilterBar cities={cities} activeCityId={activeCityId} onChange={setActiveCityId} />
      </div>

      <div className="space-y-5 px-4 pt-3">
        {loading ? (
          <p className="pt-10 text-center text-sm text-navy-500">불러오는 중...</p>
        ) : grouped.length === 0 ? (
          <p className="pt-10 text-center text-sm text-navy-500">등록된 일정이 없어요</p>
        ) : (
          grouped.map(([date, items]) => (
            <div key={date}>
              <p className="mb-2 text-sm font-semibold text-navy-300">{formatKoreanDate(date)}</p>
              <div className="space-y-2.5">
                {items.map((s) => (
                  <TimelineCard key={s.id} schedule={s} onClick={() => openEditModal(s)} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* BottomNav와 동일한 방식으로 max-w-[480px] 컨테이너 기준 우측 정렬 */}
      <div className="pointer-events-none fixed inset-x-0 bottom-24 z-30 mx-auto flex w-full max-w-[480px] justify-end px-4">
        <button
          onClick={openAddModal}
          className="pointer-events-auto rounded-full bg-gold p-4 text-navy-950 shadow-lg active:scale-95"
          aria-label="일정 직접 추가"
        >
          <Plus size={22} strokeWidth={2.4} />
        </button>
      </div>

      <ScheduleFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        cities={cities}
        editingSchedule={editingSchedule}
        template={templateItem}
        onSave={handleSave}
        onDelete={deleteSchedule}
      />

      <TemplateBrowserModal
        open={templateModalOpen}
        onClose={() => setTemplateModalOpen(false)}
        onPick={handlePickTemplate}
      />
    </div>
  )
}
