import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'

export default function MainLayout() {
  return (
    <>
      <main className="flex-1 pb-24 pt-[env(safe-area-inset-top)]">
        <Outlet />
      </main>
      <BottomNav />
    </>
  )
}
