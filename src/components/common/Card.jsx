export default function Card({ children, className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl2 border border-navy-800/60 bg-navy-900/80 p-4 shadow-card
                  ${onClick ? 'active:scale-[0.98] transition-transform cursor-pointer' : ''}
                  ${className}`}
    >
      {children}
    </div>
  )
}
