import { useState } from 'react'
import { Siren, FileText } from 'lucide-react'
import Modal from '../common/Modal'

// 실제 대사관/보험사 번호는 출국 전 직접 채워 넣어야 하는 자리표시자입니다.
const EMERGENCY_CONTACTS = [
  { label: '유럽 공통 긴급전화 (경찰·구급·소방)', value: '112' },
  { label: '주포르투갈 대한민국 대사관', value: '직접 입력 필요' },
  { label: '주이탈리아 대한민국 대사관', value: '직접 입력 필요' },
  { label: '여행자보험 사고접수', value: '직접 입력 필요' },
  { label: '카드분실 신고 (해외이용)', value: '직접 입력 필요' }
]

export default function HotLinksRow({ bookings }) {
  const [showEmergency, setShowEmergency] = useState(false)
  const [showVouchers, setShowVouchers] = useState(false)

  const voucherItems = bookings.filter((b) => b.voucher_url)

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setShowEmergency(true)}
          className="flex items-center justify-center gap-2 rounded-xl2 border border-italy/30
                     bg-italy/10 py-3 text-sm font-medium text-italy-light active:scale-[0.98]"
        >
          <Siren size={16} />
          긴급 연락처
        </button>
        <button
          onClick={() => setShowVouchers(true)}
          className="flex items-center justify-center gap-2 rounded-xl2 border border-navy-700
                     bg-navy-800/60 py-3 text-sm font-medium text-navy-200 active:scale-[0.98]"
        >
          <FileText size={16} />
          바우처 모아보기
        </button>
      </div>

      <Modal open={showEmergency} onClose={() => setShowEmergency(false)} title="긴급 연락처">
        <ul className="space-y-3">
          {EMERGENCY_CONTACTS.map((c) => (
            <li key={c.label} className="flex items-center justify-between border-b border-navy-800/60 pb-2.5">
              <span className="text-sm text-navy-300">{c.label}</span>
              <span className="text-sm font-semibold text-white">{c.value}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-navy-500">
          대사관/보험사 번호는 출국 전 직접 확인 후 입력해두세요.
        </p>
      </Modal>

      <Modal open={showVouchers} onClose={() => setShowVouchers(false)} title="바우처 모아보기">
        {voucherItems.length === 0 ? (
          <p className="text-sm text-navy-500">등록된 바우처가 없어요</p>
        ) : (
          <ul className="space-y-2">
            {voucherItems.map((b) => (
              <li key={b.id}>
                <a
                  href={b.voucher_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-lg bg-navy-800/60 px-3 py-2.5 text-sm text-navy-200 active:bg-navy-800"
                >
                  <span>{b.title}</span>
                  <span className="text-xs text-gold-light">열기</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </Modal>
    </>
  )
}
