import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Watches from './pages/Watches'
import WatchDetail from './pages/WatchDetail'
import Admin from './pages/Admin'

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <p className="font-serif text-7xl text-rolex-gold">404</p>
      <p className="mt-4 text-white/60 tracking-widest uppercase text-xs">This page has left the vault</p>
      <a href="/" className="btn-outline mt-8 inline-block no-underline">Back to home</a>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-rolex-ink text-white flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watches" element={<Watches />} />
          <Route path="/watches/:id" element={<WatchDetail />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
