import { Routes, Route } from 'react-router-dom'
import BottomNav from './components/layout/BottomNav'
import HomePage from './pages/HomePage'
import SchedulePage from './pages/SchedulePage'
import BookingsPage from './pages/BookingsPage'
import BudgetPage from './pages/BudgetPage'

export default function App() {
  return (
    // 모바일 전용: 가운데 정렬 + 최대 너비 제한 (데스크톱에서 열어도 폰 프레임처럼 보이도록)
    <div className="relative mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-navy-950">
      <main className="flex-1 pb-24 pt-[env(safe-area-inset-top)]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/budget" element={<BudgetPage />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  )
}
