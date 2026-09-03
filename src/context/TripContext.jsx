import { createContext, useContext, useState, useCallback } from 'react'

const STORAGE_KEY = 'honeymoon_pwa_session_v1'

function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveSession(session) {
  try {
    if (session) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    // localStorage 사용 불가 환경이면 세션 유지 없이 동작 (매번 이름 입력)
  }
}

const TripContext = createContext(null)

export function TripProvider({ children }) {
  const [session, setSession] = useState(() => loadSession())

  // 이름 입력 후 travelers 테이블에서 매칭된 사용자로 로그인
  const selectTraveler = useCallback((traveler) => {
    const next = { travelerId: traveler.id, travelerName: traveler.name, tripId: null, tripName: null }
    setSession(next)
    saveSession(next)
  }, [])

  // 여행 목록에서 하나를 선택
  const selectTrip = useCallback((trip) => {
    setSession((prev) => {
      if (!prev) return prev
      const next = { ...prev, tripId: trip.id, tripName: trip.name }
      saveSession(next)
      return next
    })
  }, [])

  // 여행만 바꾸고 싶을 때 (사용자는 유지)
  const clearTrip = useCallback(() => {
    setSession((prev) => {
      if (!prev) return prev
      const next = { ...prev, tripId: null, tripName: null }
      saveSession(next)
      return next
    })
  }, [])

  // 완전 로그아웃
  const clearSession = useCallback(() => {
    setSession(null)
    saveSession(null)
  }, [])

  const value = {
    travelerId: session?.travelerId ?? null,
    travelerName: session?.travelerName ?? null,
    tripId: session?.tripId ?? null,
    tripName: session?.tripName ?? null,
    selectTraveler,
    selectTrip,
    clearTrip,
    clearSession
  }

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>
}

export function useTrip() {
  const ctx = useContext(TripContext)
  if (!ctx) throw new Error('useTrip은 TripProvider 안에서만 사용할 수 있습니다')
  return ctx
}
