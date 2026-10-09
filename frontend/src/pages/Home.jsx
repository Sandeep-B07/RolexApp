import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'
import Hero from '../components/Hero'
import WatchCard from '../components/WatchCard'

function SectionHeading({ eyebrow, title, sub }) {
  return (
    <div className="max-w-2xl">
      <p className="text-rolex-gold text-[11px] uppercase tracking-widest2 mb-3">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {sub && <p className="mt-4 text-white/60 leading-relaxed">{sub}</p>}
    </div>
  )
}

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [collections, setCollections] = useState([])
  const [all, setAll] = useState([])

  useEffect(() => {
    api.get('/watches/featured').then((r) => setFeatured(r.data)).catch(() => {})
    api.get('/watches/collections').then((r) => setCollections(r.data.slice(0, 4))).catch(() => {})
    api.get('/watches').then((r) => setAll(r.data)).catch(() => {})
  }, [])

  return (
    <>
      <Hero />

      {/* Featured watches */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-12">
          <SectionHeading
            eyebrow="Curated Selection"
            title="Featured Timepieces"
            sub="Hand-picked icons of the house — each one certified, each one eternal."
          />
          <Link to="/watches" className="btn-outline hidden md:inline-block no-underline shrink-0">View All</Link>
        </div>

        {featured.length === 0 ? (
          <p className="text-white/40 text-sm">Loading watches…</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((w) => <WatchCard key={w.id} watch={w} />)}
          </div>
        )}
      </section>

      {/* Collections */}
      <section className="bg-rolex-charcoal border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <SectionHeading
            eyebrow="The Collections"
            title="Legends, Born in Geneva"
            sub="From ocean depths to racetracks — every collection has a story forged in performance."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((name) => {
              const first = all.find((w) => w.collection === name)
              return (
                <Link
                  key={name}
                  to={`/watches?collection=${encodeURIComponent(name)}`}
                  className="group relative h-80 overflow-hidden rounded-sm border border-white/10 no-underline text-white"
                >
                  {first && (
                    <img
                      src={first.imageUrl}
                      alt={name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-rolex-ink via-rolex-ink/40 to-transparent" />
                  <div className="absolute bottom-0 p-6">
                    <p className="text-[10px] uppercase tracking-widest2 text-rolex-gold">Collection</p>
                    <h3 className="mt-1 font-serif text-2xl">{name}</h3>
                    <p className="mt-2 text-[11px] uppercase tracking-widest text-white/60 group-hover:text-rolex-gold transition-colors">
                      Explore →
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Heritage strip */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          ['1905', 'Heritage', 'Over a century of watchmaking excellence from the heart of Geneva.'],
          ['300m', 'Depth Rated', 'Submariner cases tested to withstand the crushing deep ocean.'],
          ['70h', 'Power Reserve', 'Modern calibres keep perfect time for days without winding.']
        ].map(([num, title, text]) => (
          <div key={title} className="border-l border-rolex-gold/40 pl-6">
            <p className="font-serif text-5xl text-rolex-gold">{num}</p>
            <h3 className="mt-3 text-[11px] uppercase tracking-widest2">{title}</h3>
            <p className="mt-2 text-sm text-white/60 leading-relaxed">{text}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="relative h-[420px] flex items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1800&q=80"
          alt="Classic watch"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-rolex-ink/75" />
        <div className="relative max-w-7xl mx-auto px-6 text-center w-full">
          <h2 className="font-serif text-4xl md:text-6xl">Find Your Timepiece</h2>
          <p className="mt-4 text-white/70 max-w-xl mx-auto">
            Every watch tells a story. Browse the full catalogue and discover the one made for you.
          </p>
          <Link to="/watches" className="btn-gold mt-8 inline-block no-underline">Browse the Collection</Link>
        </div>
      </section>
    </>
  )
}
