import { Plane, TrainFront, Building2, Ticket, QrCode, FileText } from 'lucide-react'
import Card from '../common/Card'
import CityBadge from '../common/CityBadge'
import { formatKoreanDate, formatTimeRange } from '../../lib/dateUtils'

const TYPE_META = {
  flight: { label: '항공', icon: Plane },
  train: { label: '기차', icon: TrainFront },
  accommodation: { label: '숙소', icon: Building2 },
  museum: { label: '티켓', icon: Ticket },
  other: { label: '기타', icon: Ticket }
}

export default function BookingCard({ booking, onClick, onOpenQr }) {
  const meta = TYPE_META[booking.booking_type] ?? TYPE_META.other
  const Icon = meta.icon

  return (
    <Card onClick={onClick}>
      <div className="mb-2 flex items-center gap-2">
        <div className="rounded-full bg-navy-800 p-1.5">
          <Icon size={14} className="text-gold-light" />
        </div>
        <span className="text-[11px] font-medium text-navy-400">{meta.label}</span>
        {booking.city && <CityBadge name={booking.city.name} country={booking.city.country} />}
        {booking.booking_date && (
          <span className="ml-auto text-[11px] text-navy-500">
            {formatKoreanDate(booking.booking_date)} {formatTimeRange(booking.booking_time)}
          </span>
        )}
      </div>

      <p className="text-sm font-medium text-white">{booking.title}</p>
      {booking.provider && <p className="mt-0.5 text-xs text-navy-400">{booking.provider}</p>}
      {booking.confirmation_number && (
        <p className="mt-1 text-xs text-navy-500">확인번호 {booking.confirmation_number}</p>
      )}

      {(booking.qr_code_url || booking.voucher_url) && (
        <div className="mt-3 flex gap-2">
          {booking.qr_code_url && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onOpenQr(booking)
              }}
              className="flex items-center gap-1.5 rounded-lg bg-navy-800/60 px-2.5 py-1.5 text-xs text-navy-200 active:bg-navy-800"
            >
              <QrCode size={13} />
              QR 코드
            </button>
          )}
          {booking.voucher_url && (
            <a
              href={booking.voucher_url}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 rounded-lg bg-navy-800/60 px-2.5 py-1.5 text-xs text-navy-200 active:bg-navy-800"
            >
              <FileText size={13} />
              바우처
            </a>
          )}
        </div>
      )}
    </Card>
  )
}
