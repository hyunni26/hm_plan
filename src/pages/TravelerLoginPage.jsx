import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlaneTakeoff } from 'lucide-react'
import { useTrip } from '../context/TripContext'
import { findTravelerByName } from '../hooks/useTravelers'

export default function TravelerLoginPage() {
  const navigate = useNavigate()
  const { selectTraveler } = useTrip()
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return

    setChecking(true)
    setError('')
    try {
      const traveler = await findTravelerByName(name)
      if (!traveler) {
        setError('등록되지 않은 이름이에요. 확인 후 다시 입력해주세요.')
        return
      }
      selectTraveler(traveler)
      navigate('/trips')
    } catch (err) {
      setError(`확인 중 오류가 발생했어요: ${err.message}`)
    } finally {
      setChecking(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="mb-8 flex flex-col items-center gap-3">
        <div className="rounded-full bg-navy-800 p-4">
          <PlaneTakeoff size={28} className="text-gold-light" />
        </div>
        <div className="text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-gold-light">Travel Diary</p>
          <h1 className="mt-1 text-xl font-bold text-white">이름을 입력해주세요</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-3">
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
          className="w-full rounded-lg border border-navy-700 bg-navy-800/60 px-4 py-3 text-center text-sm text-white placeholder:text-navy-500 focus:border-gold focus:outline-none"
        />

        {error && <p className="text-center text-xs text-italy-light">{error}</p>}

        <button
          type="submit"
          disabled={checking}
          className="w-full rounded-lg bg-gold py-3 text-sm font-semibold text-navy-950 disabled:opacity-60"
        >
          {checking ? '확인 중...' : '들어가기'}
        </button>
      </form>
    </div>
  )
}
