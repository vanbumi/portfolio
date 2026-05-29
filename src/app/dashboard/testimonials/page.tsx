'use client'

import { useEffect, useState } from 'react'

interface Testimonial {
  id: number
  text: string
  name: string
  role: string
  initial: string
  sortOrder: number
}

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState({ text: '', name: '', role: '', initial: '', sortOrder: '0' })

  const load = () => {
    fetch('/api/testimonials').then(r => r.json()).then(setItems)
  }

  useEffect(() => { load() }, [])

  const resetForm = () => {
    setForm({ text: '', name: '', role: '', initial: '', sortOrder: '0' })
    setEditingId(null)
  }

  const handleEdit = (t: Testimonial) => {
    setEditingId(t.id)
    setForm({ text: t.text, name: t.name, role: t.role, initial: t.initial, sortOrder: String(t.sortOrder) })
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      await fetch(`/api/testimonials/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, sortOrder: parseInt(form.sortOrder) || 0 }),
      })
    } else {
      await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, sortOrder: parseInt(form.sortOrder) || 0 }),
      })
    }
    resetForm()
    load()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this testimonial?')) return
    await fetch(`/api/testimonials/${id}`, { method: 'DELETE' })
    load()
  }

  const field: React.CSSProperties = {
    padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #e5e0d8',
    fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
    color: '#0f1c2e', background: '#fff',
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0f1c2e', letterSpacing: '-0.02em' }}>Testimonials</h1>
          <p style={{ fontSize: '13px', color: '#6b7280' }}>{items.length} testimonials</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} style={{
        background: '#fff', borderRadius: '12px', padding: '20px',
        border: '1px solid #e5e0d8', marginBottom: '20px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px',
      }}>
        <input style={{ ...field, gridColumn: '1 / -1' }} placeholder="Testimonial text" value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} required />
        <input style={field} placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input style={field} placeholder="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} required />
        <input style={field} placeholder="Initial (1 char)" value={form.initial} onChange={e => setForm({ ...form, initial: e.target.value })} maxLength={1} required />
        <input style={field} type="number" placeholder="Sort Order" value={form.sortOrder} onChange={e => setForm({ ...form, sortOrder: e.target.value })} />

        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '8px' }}>
          <button type="submit" style={{
            padding: '10px 20px', borderRadius: '8px', border: 'none',
            background: '#c4a882', color: '#0f1c2e', fontSize: '13px', fontWeight: 700,
            cursor: 'pointer', fontFamily: 'inherit',
          }}>
            {editingId ? 'Update' : 'Add'} Testimonial
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} style={{
              padding: '10px 20px', borderRadius: '8px', border: '1.5px solid #e5e0d8',
              background: 'transparent', color: '#6b7280', fontSize: '13px', fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit',
            }}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {items.map((t) => (
          <div key={t.id} style={{
            background: '#fff', borderRadius: '10px', padding: '16px 20px',
            border: '1px solid #e5e0d8', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap',
          }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <div style={{ fontSize: '13px', color: '#0f1c2e', lineHeight: 1.5 }}>&ldquo;{t.text.slice(0, 100)}{t.text.length > 100 ? '...' : ''}&rdquo;</div>
              <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                {t.name} — {t.role}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <button onClick={() => handleEdit(t)} style={{
                padding: '6px 14px', borderRadius: '6px', border: '1px solid #e5e0d8',
                fontSize: '12px', fontWeight: 600, color: '#0f1c2e', background: 'transparent',
                cursor: 'pointer', fontFamily: 'inherit',
              }}>
                Edit
              </button>
              <button onClick={() => handleDelete(t.id)} style={{
                padding: '6px 14px', borderRadius: '6px', border: '1px solid #fca5a5',
                fontSize: '12px', fontWeight: 600, color: '#dc2626', background: 'transparent',
                cursor: 'pointer', fontFamily: 'inherit',
              }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
