import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import api from '../api'
import WatchForm from '../components/WatchForm'
import { formatPrice } from '../components/WatchCard'

export default function Admin() {
  const [watches, setWatches] = useState([])
  const [editing, setEditing] = useState(null)   // 'new' | watch object | null
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const [params, setParams] = useSearchParams()

  const load = async () => {
    try {
      const { data } = await api.get('/watches', { params: { sort: 'newest' } })
      setWatches(data)
    } catch {
      setError('Could not reach the backend.')
    }
  }

  useEffect(() => {
    load()
  }, [])

  // Support /admin?edit=<id> and /admin?edit=new deep links
  useEffect(() => {
    const edit = params.get('edit')
    if (edit === 'new') {
      setEditing('new')
    } else if (edit) {
      api.get(`/watches/${edit}`).then((r) => setEditing(r.data)).catch(() => {})
    }
  }, [params])

  const startEdit = (watch) => {
    setEditing(watch)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSaved = async (payload) => {
    setSaving(true)
    try {
      if (editing === 'new') {
        await api.post('/watches', payload)
        setNotice(`Created “${payload.name}”.`)
      } else {
        await api.put(`/watches/${editing.id}`, payload)
        setNotice(`Updated “${payload.name}”.`)
      }
      setEditing(null)
      setParams({}, { replace: true })
      await load()
      setTimeout(() => setNotice(''), 5000)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (watch) => {
    if (!window.confirm(`Delete “${watch.name}” permanently?`)) return
    try {
      await api.delete(`/watches/${watch.id}`)
      setNotice(`Deleted “${watch.name}”.`)
      await load()
      setTimeout(() => setNotice(''), 5000)
    } catch (err) {
      setError(err?.response?.data?.error || 'Delete failed.')
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-rolex-gold text-[11px] uppercase tracking-widest2 mb-2">Dashboard</p>
          <h1 className="font-serif text-4xl md:text-5xl">Watch Management</h1>
          <p className="mt-2 text-white/50 text-sm">Create, edit and delete timepieces in the catalogue.</p>
        </div>
        <Link
          to="/admin?edit=new"
          className="btn-gold no-underline inline-block"
          onClick={() => setEditing('new')}
        >
          + New Watch
        </Link>
      </div>

      {notice && (
        <p className="mb-6 text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded-sm px-4 py-2.5">{notice}</p>
      )}
      {error && (
        <p className="mb-6 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-sm px-4 py-2.5">{error}</p>
      )}

      {/* Create / Edit form */}
      {editing && (
        <div className="bg-rolex-charcoal border border-rolex-gold/30 rounded-sm p-6 md:p-8 mb-12">
          <h2 className="font-serif text-2xl mb-6">
            {editing === 'new' ? 'Create a New Watch' : `Edit — ${editing.name}`}
          </h2>
          <WatchForm
            key={editing === 'new' ? 'new' : editing.id}
            initial={editing === 'new' ? null : editing}
            onSaved={handleSaved}
            onCancel={() => { setEditing(null); setParams({}, { replace: true }) }}
            saving={saving}
          />
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto border border-white/5 rounded-sm">
        <table className="w-full text-sm text-left min-w-[820px]">
          <thead>
            <tr className="bg-white/5 text-[11px] uppercase tracking-widest text-white/50">
              <th className="px-4 py-3">Watch</th>
              <th className="px-4 py-3">Collection</th>
              <th className="px-4 py-3">Reference</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {watches.map((w) => (
              <tr key={w.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={w.imageUrl} alt="" className="w-10 h-12 object-cover rounded-sm" />
                    <span className="font-medium">{w.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-white/70">{w.collection}</td>
                <td className="px-4 py-3 text-white/70">{w.referenceNumber}</td>
                <td className="px-4 py-3 text-rolex-gold">{formatPrice(w.price)}</td>
                <td className="px-4 py-3">{w.stock}</td>
                <td className="px-4 py-3">{w.featured ? '★' : '—'}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => startEdit(w)} className="text-[11px] uppercase tracking-widest text-rolex-gold hover:text-rolex-lightGold">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(w)} className="text-[11px] uppercase tracking-widest text-red-400 hover:text-red-300">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {watches.length === 0 && !error && (
          <p className="text-center py-10 text-white/40 text-sm">No watches yet — create your first one above.</p>
        )}
      </div>

      <p className="mt-6 text-xs text-white/30">
        Tip: share the store at <Link to="/watches" className="text-rolex-gold no-underline">/watches</Link> — every change appears instantly.
      </p>
    </div>
  )
}
