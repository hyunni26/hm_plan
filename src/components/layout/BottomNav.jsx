import { NavLink } from 'react-router-dom'
import { Home, CalendarDays, Ticket, Wallet } from 'lucide-react'

const TABS = [
  { to: '/', label: '홈', icon: Home, end: true },
  { to: '/schedule', label: '일정', icon: CalendarDays },
  { to: '/bookings', label: '예약', icon: Ticket },
  { to: '/budget', label: '가계부', icon: Wallet }
]

export default function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 mx-auto flex w-full max-w-[480px]
                 justify-around border-t border-navy-800/60 bg-navy-900/95
                 pb-[calc(env(safe-area-inset-bottom)+0.35rem)] pt-2 backdrop-blur-md"
    >
      {TABS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 rounded-xl px-4 py-1.5 text-[11px] font-medium transition-colors ${
              isActive ? 'text-gold-light' : 'text-navy-400'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon
                size={22}
                strokeWidth={isActive ? 2.4 : 1.8}
                className={isActive ? 'text-gold-light' : 'text-navy-400'}
              />
              <span>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
