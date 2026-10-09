import { useEffect, useState } from 'react'
import api from '../api'

const EMPTY_FORM = {
  name: '',
  referenceNumber: '',
  collection: '',
  category: 'Unisex',
  caseMaterial: '',
  caseSize: '',
  dialColor: '',
  bracelet: '',
  movement: '',
  powerReserve: '',
  waterResistance: '',
  price: '',
  stock: 0,
  imageUrl: '',
  description: '',
  featured: false
}

export default function WatchForm({ initial, onSaved, onCancel, saving }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initial && initial.id) {
      const { id, ...rest } = initial
      setForm({
        ...rest,
        price: String(initial.price ?? ''),
        stock: initial.stock ?? 0
      })
    } else {
      setForm(EMPTY_FORM)
    }
    setErrors({})
  }, [initial])

  const set = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [field]: value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock) || 0
    }
    try {
      await onSaved(payload)
    } catch (err) {
      const data = err?.response?.data
      if (data && typeof data === 'object' && !data.error) {
        setErrors(data)
      } else {
        setErrors({ general: data?.error || 'Something went wrong. Please try again.' })
      }
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      {errors.general && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-sm px-4 py-2.5">{errors.general}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="label-dark">Watch Name *</label>
          <input className="input-dark" value={form.name} onChange={set('name')} placeholder="Submariner Date" required />
          {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="label-dark">Reference Number *</label>
          <input className="input-dark" value={form.referenceNumber} onChange={set('referenceNumber')} placeholder="126610LN" required />
          {errors.referenceNumber && <p className="text-xs text-red-400 mt-1">{errors.referenceNumber}</p>}
        </div>
        <div>
          <label className="label-dark">Collection *</label>
          <input className="input-dark" value={form.collection} onChange={set('collection')} placeholder="Submariner" required />
          {errors.collection && <p className="text-xs text-red-400 mt-1">{errors.collection}</p>}
        </div>
        <div>
          <label className="label-dark">Category *</label>
          <select className="input-dark" value={form.category} onChange={set('category')}>
            <option>Unisex</option>
            <option>Men</option>
            <option>Women</option>
          </select>
        </div>
        <div>
          <label className="label-dark">Case Material</label>
          <input className="input-dark" value={form.caseMaterial} onChange={set('caseMaterial')} placeholder="Oystersteel" />
        </div>
        <div>
          <label className="label-dark">Case Size</label>
          <input className="input-dark" value={form.caseSize} onChange={set('caseSize')} placeholder="41mm" />
        </div>
        <div>
          <label className="label-dark">Dial Color</label>
          <input className="input-dark" value={form.dialColor} onChange={set('dialColor')} placeholder="Black" />
        </div>
        <div>
          <label className="label-dark">Bracelet</label>
          <input className="input-dark" value={form.bracelet} onChange={set('bracelet')} placeholder="Oyster bracelet" />
        </div>
        <div>
          <label className="label-dark">Movement</label>
          <input className="input-dark" value={form.movement} onChange={set('movement')} placeholder="Calibre 3235" />
        </div>
        <div>
          <label className="label-dark">Power Reserve</label>
          <input className="input-dark" value={form.powerReserve} onChange={set('powerReserve')} placeholder="70 hours" />
        </div>
        <div>
          <label className="label-dark">Water Resistance</label>
          <input className="input-dark" value={form.waterResistance} onChange={set('waterResistance')} placeholder="300 metres" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label-dark">Price (USD) *</label>
            <input className="input-dark" type="number" min="1" step="0.01" value={form.price} onChange={set('price')} placeholder="10250" required />
            {errors.price && <p className="text-xs text-red-400 mt-1">{errors.price}</p>}
          </div>
          <div>
            <label className="label-dark">Stock</label>
            <input className="input-dark" type="number" min="0" value={form.stock} onChange={set('stock')} />
          </div>
        </div>
      </div>

      <div>
        <label className="label-dark">Image URL</label>
        <input className="input-dark" value={form.imageUrl} onChange={set('imageUrl')} placeholder="https://..." />
      </div>

      <div>
        <label className="label-dark">Description</label>
        <textarea className="input-dark" rows="4" value={form.description} onChange={set('description')} placeholder="The archetypal diver's watch..." />
      </div>

      <label className="flex items-center gap-3 cursor-pointer select-none">
        <input type="checkbox" checked={form.featured} onChange={set('featured')} className="w-4 h-4 accent-[#c9a227]" />
        <span className="text-sm text-white/70">Feature on homepage</span>
      </label>

      <div className="flex flex-wrap gap-4 pt-2">
        <button type="submit" disabled={saving} className="btn-gold disabled:opacity-50">
          {saving ? 'Saving…' : initial?.id ? 'Update Watch' : 'Create Watch'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-outline">Cancel</button>
        )}
      </div>
    </form>
  )
}
