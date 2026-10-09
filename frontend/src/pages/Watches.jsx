import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../api'
import WatchCard from '../components/WatchCard'

function FilterSelect({ value, onChange, options, label }) {
  return (
    <div>
      <label className="label-dark">{label}</label>
      <select className="input-dark" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">All</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  )
}

export default function Watches() {
  const [params, setParams] = useSearchParams()
  const [watches, setWatches] = useState([])
  const [collections, setCollections] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Filter state (initialised from URL query params so links work)
  const search = params.get('search') || ''
  const collection = params.get('collection') || ''
  const category = params.get('category') || ''
  const sort = params.get('sort') || ''
  const minPrice = params.get('minPrice') || ''
  const maxPrice = params.get('maxPrice') || ''

  const updateParam = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  useEffect(() => {
    api.get('/watches/collections').then((r) => setCollections(r.data)).catch(() => {})
    api.get('/watches/categories').then((r) => setCategories(r.data)).catch(() => {})
  }, [])

  useEffect(() => {
    setLoading(true)
    const query = {
      search, collection, category, sort,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined
    }
    const t = setTimeout(() => {
      api.get('/watches', { params: query })
        .then((r) => { setWatches(r.data); setError('') })
        .catch(() => setError('Could not load watches. Is the backend running?'))
        .finally(() => setLoading(false))
    }, 250)
    return () => clearTimeout(t)
  }, [search, collection, category, sort, minPrice, maxPrice])

  const resultText = useMemo(
    () => `${watches.length} timepiece${watches.length === 1 ? '' : 's'}`,
    [watches.length]
  )

  return (
    <div className="max-w-7xl mx-auto px-6 py-14">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-rolex-gold text-[11px] uppercase tracking-widest2 mb-3">The Catalogue</p>
        <h1 className="font-serif text-5xl md:text-6xl">All Watches</h1>
        <p className="mt-4 text-white/60 max-w-xl mx-auto">
          Every timepiece in the collection — from the deep-sea Submariner to the racetrack Daytona.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-rolex-charcoal border border-white/5 rounded-sm p-5 mb-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="col-span-2">
          <label className="label-dark">Search</label>
          <input
            className="input-dark"
            placeholder="Name, reference, dial…"
            value={search}
            onChange={(e) => updateParam('search', e.target.value)}
          />
        </div>
        <FilterSelect label="Collection" value={collection} onChange={(v) => updateParam('collection', v)} options={collections} />
        <FilterSelect label="Category" value={category} onChange={(v) => updateParam('category', v)} options={categories} />
        <div>
          <label className="label-dark">Sort</label>
          <select className="input-dark" value={sort} onChange={(e) => updateParam('sort', e.target.value)}>
            <option value="">Collection A–Z</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name">Name A–Z</option>
            <option value="newest">Newest</option>
          </select>
        </div>
        <div>
          <label className="label-dark">Max Price</label>
          <input
            className="input-dark"
            type="number"
            min="0"
            placeholder="$"
            value={maxPrice}
            onChange={(e) => updateParam('maxPrice', e.target.value)}
          />
        </div>
      </div>

      {/* Result count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-[11px] uppercase tracking-widest2 text-white/50">{resultText}</p>
        {(collection || category || search || minPrice || maxPrice) && (
          <button
            onClick={() => setParams({}, { replace: true })}
            className="text-[11px] uppercase tracking-widest2 text-rolex-gold hover:text-rolex-lightGold"
          >
            Clear filters ✕
          </button>
        )}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-rolex-charcoal border border-white/5 rounded-sm animate-pulse">
              <div className="aspect-[4/5] bg-white/5" />
              <div className="p-5 space-y-3">
                <div className="h-3 bg-white/5 w-1/3" />
                <div className="h-4 bg-white/5 w-2/3" />
                <div className="h-4 bg-white/5 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-white/60">{error}</p>
          <button onClick={() => window.location.reload()} className="btn-outline mt-6">Retry</button>
        </div>
      ) : watches.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-serif text-3xl text-white/70">No timepieces found</p>
          <p className="mt-3 text-white/50 text-sm">Try adjusting your filters or search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {watches.map((w) => <WatchCard key={w.id} watch={w} />)}
        </div>
      )}
    </div>
  )
}
