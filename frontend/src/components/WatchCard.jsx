import { Link } from 'react-router-dom'

export const formatPrice = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value)

export default function WatchCard({ watch }) {
  return (
    <Link
      to={`/watches/${watch.id}`}
      className="group block bg-rolex-charcoal border border-white/5 overflow-hidden no-underline text-white transition-all duration-300 hover:border-rolex-gold/50 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-black/40">
        <img
          src={watch.imageUrl}
          alt={watch.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {watch.featured && (
          <span className="absolute top-3 left-3 bg-rolex-gold text-rolex-ink text-[10px] uppercase tracking-widest px-3 py-1 font-semibold">
            Featured
          </span>
        )}
        {watch.stock === 0 && (
          <span className="absolute top-3 right-3 bg-black/70 text-white/90 text-[10px] uppercase tracking-widest px-3 py-1">
            Sold Out
          </span>
        )}
      </div>

      <div className="p-5">
        <p className="text-[10px] uppercase tracking-widest2 text-rolex-gold">{watch.collection}</p>
        <h3 className="mt-1.5 font-serif text-xl leading-snug">{watch.name}</h3>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-rolex-gold font-medium">{formatPrice(watch.price)}</span>
          <span className="text-[10px] uppercase tracking-widest text-white/40">{watch.caseSize}</span>
        </div>
      </div>
    </Link>
  )
}
