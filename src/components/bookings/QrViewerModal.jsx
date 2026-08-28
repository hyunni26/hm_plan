import Modal from '../common/Modal'

export default function QrViewerModal({ booking, onClose }) {
  return (
    <Modal open={!!booking} onClose={onClose} title={booking?.title ?? 'QR 코드'}>
      {booking?.qr_code_url && (
        <div className="flex justify-center rounded-xl bg-white p-4">
          <img src={booking.qr_code_url} alt="QR 코드" className="h-64 w-64 object-contain" />
        </div>
      )}
      {booking?.confirmation_number && (
        <p className="mt-3 text-center text-sm text-navy-300">
          확인번호 {booking.confirmation_number}
        </p>
      )}
    </Modal>
  )
}
