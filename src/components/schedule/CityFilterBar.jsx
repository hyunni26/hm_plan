export default function CityFilterBar({ cities, activeCityId, onChange }) {
  return (
    <div className="scrollbar-none flex gap-2 overflow-x-auto px-4 pb-1">
      <button
        onClick={() => onChange(null)}
        className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
          activeCityId === null
            ? 'bg-gold text-navy-950'
            : 'bg-navy-800/60 text-navy-300'
        }`}
      >
        전체
      </button>
      {cities.map((city) => (
        <button
          key={city.id}
          onClick={() => onChange(city.id)}
          className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
            activeCityId === city.id
              ? 'bg-gold text-navy-950'
              : 'bg-navy-800/60 text-navy-300'
          }`}
        >
          {city.name}
        </button>
      ))}
    </div>
  )
}
