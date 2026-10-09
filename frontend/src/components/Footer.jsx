import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-rolex-charcoal border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rolex-gold" />
            <span className="font-serif text-lg tracking-[0.25em]">ROLEX</span>
          </div>
          <p className="mt-4 text-sm text-white/50 leading-relaxed">
            A demo luxury watch boutique crafted in the spirit of the crown — precision, elegance and timeless design.
          </p>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-widest2 text-rolex-gold mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link className="hover:text-rolex-gold no-underline" to="/watches">All Watches</Link></li>
            <li><Link className="hover:text-rolex-gold no-underline" to="/watches?category=Men">Men</Link></li>
            <li><Link className="hover:text-rolex-gold no-underline" to="/watches?category=Women">Women</Link></li>
            <li><Link className="hover:text-rolex-gold no-underline" to="/watches?category=Unisex">Unisex</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-widest2 text-rolex-gold mb-4">Collections</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link className="hover:text-rolex-gold no-underline" to="/watches?collection=Submariner">Submariner</Link></li>
            <li><Link className="hover:text-rolex-gold no-underline" to="/watches?collection=Daytona">Daytona</Link></li>
            <li><Link className="hover:text-rolex-gold no-underline" to="/watches?collection=Datejust">Datejust</Link></li>
            <li><Link className="hover:text-rolex-gold no-underline" to="/watches?collection=GMT-Master II">GMT-Master II</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-widest2 text-rolex-gold mb-4">Manage</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link className="hover:text-rolex-gold no-underline" to="/admin">Admin Dashboard</Link></li>
            <li><Link className="hover:text-rolex-gold no-underline" to="/admin?edit=new">Add New Watch</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-[11px] tracking-widest2 uppercase text-white/30">
        © 2026 Rolex-App Demo — Built with Java, React & Tailwind CSS
      </div>
    </footer>
  )
}
