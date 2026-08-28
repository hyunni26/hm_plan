export function todayISO() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function formatKoreanDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(`${dateStr}T00:00:00`)
  const weekday = ['일', '월', '화', '수', '목', '금', '토'][d.getDay()]
  return `${d.getMonth() + 1}월 ${d.getDate()}일 (${weekday})`
}

export function formatTimeRange(start, end) {
  if (!start) return '시간 미정'
  const fmt = (t) => t?.slice(0, 5) ?? ''
  return end ? `${fmt(start)} - ${fmt(end)}` : fmt(start)
}

// city.timezone 기준 실시간 시계용 포맷
export function formatClock(date, timeZone) {
  return new Intl.DateTimeFormat('ko-KR', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date)
}

// 남은 시간을 D-day / HH:MM:SS 형태로 변환
export function getCountdownParts(targetDate) {
  const diffMs = targetDate.getTime() - Date.now()
  if (diffMs <= 0) return null

  const totalSeconds = Math.floor(diffMs / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds }
}
