import { Routes, Route, Navigate } from 'react-router-dom'
import { TripProvider, useTrip } from './context/TripContext'
import MainLayout from './components/layout/MainLayout'
import TravelerLoginPage from './pages/TravelerLoginPage'
import TripSelectPage from './pages/TripSelectPage'
import HomePage from './pages/HomePage'
import SchedulePage from './pages/SchedulePage'
import BookingsPage from './pages/BookingsPage'
import BudgetPage from './pages/BudgetPage'

// 이름 입력(로그인)까지만 되어 있으면 통과, 아니면 로그인 화면으로
function RequireTraveler({ children }) {
  const { travelerId } = useTrip()
  if (!travelerId) return <Navigate to="/login" replace />
  return children
}

// 사용자 + 여행 선택까지 모두 되어 있어야 통과
function RequireTrip({ children }) {
  const { travelerId, tripId } = useTrip()
  if (!travelerId) return <Navigate to="/login" replace />
  if (!tripId) return <Navigate to="/trips" replace />
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<TravelerLoginPage />} />
      <Route
        path="/trips"
        element={
          <RequireTraveler>
            <TripSelectPage />
          </RequireTraveler>
        }
      />
      <Route
        element={
          <RequireTrip>
            <MainLayout />
          </RequireTrip>
        }
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/budget" element={<BudgetPage />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <TripProvider>
      {/* 모바일 전용: 가운데 정렬 + 최대 너비 제한 (데스크톱에서 열어도 폰 프레임처럼 보이도록) */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-navy-950">
        <AppRoutes />
      </div>
    </TripProvider>
  )
}
