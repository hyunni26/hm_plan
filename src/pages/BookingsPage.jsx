import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { useTrip } from '../context/TripContext'
import { useBookings } from '../hooks/useBookings'
import { useCities } from '../hooks/useCities'
import BookingCard from '../components/bookings/BookingCard'
import BookingFormModal from '../components/bookings/BookingFormModal'
import QrViewerModal from '../components/bookings/QrViewerModal'

const FILTERS = [
  { value: null, label: '전체' },
  { value: 'flight', label: '항공' },
  { value: 'train', label: '기차' },
  { value: 'accommodation', label: '숙소' },
  { value: 'museum', label: '티켓' }
]

export default function BookingsPage() {
  const { tripId } = useTrip()
  const { bookings, loading, addBooking, updateBooking, deleteBooking } = useBookings(tripId)
  const { cities } = useCities(tripId)
  const [activeType, setActiveType] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingBooking, setEditingBooking] = useState(null)
  const [qrBooking, setQrBooking] = useState(null)

  const filtered = useMemo(
    () => (activeType ? bookings.filter((b) => b.booking_type === activeType) : bookings),
    [bookings, activeType]
  )

  const openAddModal = () => {
    setEditingBooking(null)
    setModalOpen(true)
  }

  const openEditModal = (booking) => {
    setEditingBooking(booking)
    setModalOpen(true)
  }

  const handleSave = async (payload) => {
    if (editingBooking) {
      await updateBooking(editingBooking.id, payload)
    } else {
      await addBooking(payload)
    }
  }

  return (
    <div className="relative pb-4">
      <div className="sticky top-0 z-20 bg-navy-950/95 pb-3 pt-5 backdrop-blur-md">
        <h1 className="mb-3 px-4 text-xl font-bold text-white">예약</h1>
        <div className="scrollbar-none flex gap-2 overflow-x-auto px-4">
          {FILTERS.map((f) => (
            <button
              key={f.label}
              onClick={() => setActiveType(f.value)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium ${
                activeType === f.value ? 'bg-gold text-navy-950' : 'bg-navy-800/60 text-navy-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2.5 px-4 pt-3">
        {loading ? (
          <p className="pt-10 text-center text-sm text-navy-500">불러오는 중...</p>
        ) : filtered.length === 0 ? (
          <p className="pt-10 text-center text-sm text-navy-500">등록된 예약이 없어요</p>
        ) : (
          filtered.map((b) => (
            <BookingCard key={b.id} booking={b} onClick={() => openEditModal(b)} onOpenQr={setQrBooking} />
          ))
        )}
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-24 z-30 mx-auto flex w-full max-w-[480px] justify-end px-4">
        <button
          onClick={openAddModal}
          className="pointer-events-auto rounded-full bg-gold p-4 text-navy-950 shadow-lg active:scale-95"
          aria-label="예약 추가"
        >
          <Plus size={22} strokeWidth={2.4} />
        </button>
      </div>

      <BookingFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        cities={cities}
        editingBooking={editingBooking}
        onSave={handleSave}
        onDelete={deleteBooking}
      />
      <QrViewerModal booking={qrBooking} onClose={() => setQrBooking(null)} />
    </div>
  )
}
