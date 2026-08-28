import { X } from 'lucide-react'
import { useEffect } from 'react'

export default function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 mx-auto flex max-w-[480px] items-end justify-center">
      {/* 배경 딤 */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 바텀시트 */}
      <div
        className="relative z-10 max-h-[88vh] w-full overflow-y-auto rounded-t-[1.5rem]
                   border-t border-navy-700 bg-navy-900 pb-[calc(env(safe-area-inset-bottom)+1.25rem)]
                   shadow-2xl animate-[slideUp_0.25s_ease-out]"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-navy-800/60 bg-navy-900/95 px-5 py-4 backdrop-blur-md">
          <h2 className="text-base font-semibold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-navy-400 active:bg-navy-800"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
