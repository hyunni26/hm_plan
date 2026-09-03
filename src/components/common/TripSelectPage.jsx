import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, MapPin, LogOut } from 'lucide-react'
import { useTrip } from '../context/TripContext'
import { useTrips } from '../hooks/useTrips'
import { formatKoreanDate } from '../lib/dateUtils'

export default function TripSelectPage() {
  const navigate = useNavigate()
  const { travelerId, travelerName, selectTrip, clearSession } = useTrip()
  const { trips, loading, addTrip } = useTrips(travelerId)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState({ name: '', start_date: '', end_date: '' })
  const [saving, setSaving] = useState(false)

  const handlePick = (trip) => {
    selectTrip(trip)
    navigate('/')
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    setSaving(true)
    try {
      const trip = await addTrip({
        name: form.name,
        start_date: form.start_date || null,
        end_date: form.end_date || null
      })
      selectTrip(trip)
      navigate('/')
    } catch (err) {
      alert(`여행 생성 실패: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  const inputClass =
    'w-full rounded-lg border border-navy-700 bg-navy-800/60 px-3 py-2.5 text-sm text-white placeholder:text-navy-500 focus:border-gold focus:outline-none'

  return (
    <div className="min-h-screen px-5 pb-10 pt-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-gold-light">Travel Diary</p>
          <h1 className="mt-1 text-xl font-bold text-white">{travelerName}님의 여행</h1>
        </div>
        <button
          onClick={clearSession}
          className="rounded-full p-2 text-navy-500 active:bg-navy-800"
          aria-label="로그아웃"
        >
          <LogOut size={18} />
        </button>
      </div>

      {loading ? (
        <p className="pt-10 text-center text-sm text-navy-500">불러오는 중...</p>
      ) : (
        <div className="space-y-2.5">
          {trips.map((trip) => (
            <button
              key={trip.id}
              onClick={() => handlePick(trip)}
              className="flex w-full items-center gap-3 rounded-xl2 border border-navy-800/60 bg-navy-900/80 p-4 text-left shadow-card active:scale-[0.98]"
            >
              <div className="rounded-full bg-navy-800 p-2">
                <MapPin size={16} className="text-gold-light" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">{trip.name}</p>
                {trip.start_date && (
                  <p className="text-xs text-navy-500">
                    {formatKoreanDate(trip.start_date)}
                    {trip.end_date && ` ~ ${formatKoreanDate(trip.end_date)}`}
                  </p>
                )}
              </div>
            </button>
          ))}

          {trips.length === 0 && !creating && (
            <p className="pt-4 text-center text-sm text-navy-500">아직 만든 여행이 없어요</p>
          )}
        </div>
      )}

      {creating ? (
        <form onSubmit={handleCreate} className="mt-5 space-y-3 rounded-xl2 border border-navy-800/60 bg-navy-900/60 p-4">
          <input
            autoFocus
            placeholder="여행 이름 (예: 다낭 가족여행)"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className={inputClass}
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              value={form.start_date}
              onChange={(e) => setForm((f) => ({ ...f, start_date: e.target.value }))}
              className={inputClass}
            />
            <input
              type="date"
              value={form.end_date}
              onChange={(e) => setForm((f) => ({ ...f, end_date: e.target.value }))}
              className={inputClass}
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setCreating(false)}
              className="flex-1 rounded-lg bg-navy-800/60 py-2.5 text-sm text-navy-300"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-lg bg-gold py-2.5 text-sm font-semibold text-navy-950 disabled:opacity-60"
            >
              {saving ? '만드는 중...' : '만들기'}
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setCreating(true)}
          className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-xl2 border border-dashed border-navy-700 py-3.5 text-sm font-medium text-navy-300 active:bg-navy-800/40"
        >
          <Plus size={16} />
          새 여행 만들기
        </button>
      )}
    </div>
  )
}
