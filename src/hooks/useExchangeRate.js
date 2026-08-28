import { useEffect, useState } from 'react'

const FALLBACK_RATE = 1500 // API 실패 시 대략치 (사용자가 직접 수정 가능하도록 UI에서 노출)

export function useExchangeRate() {
  const [rate, setRate] = useState(FALLBACK_RATE)
  const [loading, setLoading] = useState(true)
  const [isFallback, setIsFallback] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadRate() {
      // 메모리 캐시 (세션 내 재요청 방지) - localStorage 미사용, 컴포넌트 상태로만 캐시
      try {
        const res = await fetch('https://api.frankfurter.app/latest?from=EUR&to=KRW')
        if (!res.ok) throw new Error('환율 조회 실패')
        const data = await res.json()
        const krwRate = data?.rates?.KRW
        if (!cancelled && krwRate) {
          setRate(krwRate)
          setIsFallback(false)
        }
      } catch (err) {
        // 네트워크 실패 시 폴백 환율 유지, UI에서 수동 입력 가능하게 안내
        console.warn('[useExchangeRate] 환율 API 실패, 폴백값 사용:', err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadRate()
    return () => {
      cancelled = true
    }
  }, [])

  return { rate, loading, isFallback, setRate }
}
