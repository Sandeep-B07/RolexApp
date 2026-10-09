import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../api'
import { formatPrice } from '../components/WatchCard'

function Spec({ label, value }) {
  if (!value) return null
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5">
      <span className="text-[11px] uppercase tracking-widest text-white/45">{label}</span>
      <span className="text-sm text-white/90">{value}</span>
    </div>
  )
}

export default function WatchDetail() {
  const { id } = useParams()
  const [watch, setWatch] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    api.get(`/watches/${id}`)
      .then((r) => { setWatch(r.data); setError('') })
      .catch((err) => setError(err?.response?.data?.error || 'Watch not found.'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 animate-pulse">
        <div className="aspect-[4/5] bg-white/5 rounded-sm" />
        <div className="space-y-4">
          <div className="h-4 bg-white/5 w-1/4" />
          <div className="h-9 bg-white/5 w-3/4" />
          <div className="h-5 bg-white/5 w-1/3" />
          <div className="h-24 bg-white/5 w-full" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-6">
        <p className="font-serif text-4xl text-white/80">{error}</p>
        <Link to="/watches" className="btn-outline mt-8 no-underline inline-block">Back to Watches</Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="text-[11px] uppercase tracking-widest text-white/40 mb-8">
        <Link to="/" className="hover:text-rolex-gold no-underline">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/watches" className="hover:text-rolex-gold no-underline">Watches</Link>
        <span className="mx-2">/</span>
        <span className="text-rolex-gold">{watch.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="relative bg-rolex-charcoal border border-white/5 rounded-sm overflow-hidden aspect-[4/5]">
          <img src={watch.imageUrl} alt={watch.name} className="w-full h-full object-cover" />
          {watch.featured && (
            <span className="absolute top-4 left-4 bg-rolex-gold text-rolex-ink text-[10px] uppercase tracking-widest px-3 py-1 font-semibold">
              Featured
            </span>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-rolex-gold text-[11px] uppercase tracking-widest2">{watch.collection}</p>
          <h1 className="mt-2 font-serif text-4xl md:text-5xl">{watch.name}</h1>
          <p className="mt-4 text-rolex-gold font-serif text-3xl">{formatPrice(watch.price)}</p>

          <p className="mt-2 text-[11px] uppercase tracking-widest text-white/45">
            Reference № {watch.referenceNumber} · {watch.category}
          </p>

          <p className="mt-6 text-white/70 leading-relaxed">{watch.description}</p>

          <div className="mt-8 flex items-center gap-4">
            <span className={`text-[11px] uppercase tracking-widest px-3 py-1 border ${
              watch.stock > 0 ? 'border-rolex-green/60 text-rolex-green' : 'border-red-500/60 text-red-400'
            }`}>
              {watch.stock > 0 ? `In Stock — ${watch.stock} available` : 'Out of Stock'}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="btn-gold" disabled={watch.stock === 0}>
              {watch.stock > 0 ? 'Enquire Now' : 'Sold Out'}
            </button>
            <Link to={`/admin?edit=${watch.id}`} className="btn-outline no-underline inline-block">
              Edit in Admin
            </Link>
          </div>

          {/* Specs */}
          <div className="mt-12">
            <h2 className="text-[11px] uppercase tracking-widest2 text-rolex-gold mb-2">Technical Specifications</h2>
            <Spec label="Reference" value={watch.referenceNumber} />
            <Spec label="Collection" value={watch.collection} />
            <Spec label="Case" value={`${watch.caseSize} ${watch.caseMaterial}`.trim()} />
            <Spec label="Dial" value={watch.dialColor} />
            <Spec label="Bracelet" value={watch.bracelet} />
            <Spec label="Movement" value={watch.movement} />
            <Spec label="Power Reserve" value={watch.powerReserve} />
            <Spec label="Water Resistance" value={watch.waterResistance} />
          </div>
        </div>
      </div>
    </div>
  )
}
