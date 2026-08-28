const COUNTRY_STYLE = {
  portugal: 'bg-portugal/15 text-portugal-light border-portugal/30',
  italy: 'bg-italy/15 text-italy-light border-italy/30'
}

export default function CityBadge({ name, country, size = 'sm' }) {
  const style = COUNTRY_STYLE[country] ?? 'bg-navy-700/40 text-navy-300 border-navy-600/40'
  const sizeClass = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1'

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${style} ${sizeClass}`}>
      {name}
    </span>
  )
}
