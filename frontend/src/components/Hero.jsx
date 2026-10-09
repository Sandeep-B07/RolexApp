import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative h-[85vh] min-h-[520px] flex items-center overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=1800&q=80"
        alt="Luxury watch close-up"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-rolex-ink via-rolex-ink/80 to-rolex-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-rolex-ink via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <p className="text-rolex-gold text-[11px] uppercase tracking-widest2 mb-6">Est. 1905 — Geneva</p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] max-w-3xl">
          A Crown for<br />Every Wrist
        </h1>
        <p className="mt-6 max-w-xl text-white/70 leading-relaxed">
          Explore the legendary collections — Submariner, Daytona, Datejust and more.
          Timepieces engineered for the depths, the racetrack and everything in between.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link to="/watches" className="btn-gold no-underline inline-block">Discover Watches</Link>
          <Link to="/watches?collection=Submariner" className="btn-outline no-underline inline-block">Submariner Collection</Link>
        </div>
      </div>
    </section>
  )
}
