import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }) =>
  `text-[11px] uppercase tracking-widest2 transition-colors duration-300 hover:text-rolex-gold ${
    isActive ? 'text-rolex-gold' : 'text-white/70'
  }`

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-rolex-ink/95 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 no-underline">
          <span className="w-2.5 h-2.5 rounded-full bg-rolex-gold" />
          <span className="font-serif text-xl tracking-[0.25em] text-white">ROLEX</span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-10">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/watches" className={linkClass}>Watches</NavLink>
          <NavLink to="/watches?collection=Submariner" className={linkClass}>Collections</NavLink>
          <NavLink to="/admin" className={({ isActive }) =>
            `text-[11px] uppercase tracking-widest2 px-4 py-2 border transition-colors duration-300 no-underline ${
              isActive
                ? 'border-rolex-gold text-rolex-gold'
                : 'border-white/25 text-white/70 hover:border-rolex-gold hover:text-rolex-gold'
            }`
          }>
            Admin
          </NavLink>
        </nav>
      </div>

      <nav className="md:hidden flex justify-center gap-8 pb-3">
        <NavLink to="/" end className={linkClass}>Home</NavLink>
        <NavLink to="/watches" className={linkClass}>Watches</NavLink>
        <NavLink to="/admin" className={linkClass}>Admin</NavLink>
      </nav>
    </header>
  )
}
