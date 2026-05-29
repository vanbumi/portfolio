'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function EditProjectPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [form, setForm] = useState({ title: '', desc: '', tags: '', liveUrl: '', githubUrl: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch(`/api/projects/${id}`).then(r => r.json()).then((p) => {
      setForm({
        title: p.title,
        desc: p.desc,
        tags: (p.tags as string[]).join(', '),
        liveUrl: p.live || '',
        githubUrl: p.github || '',
      })
      setLoading(false)
    })
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean)
    await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: form.title,
        desc: form.desc,
        tags,
        liveUrl: form.liveUrl || null,
        githubUrl: form.githubUrl || null,
      }),
    })

    router.push('/dashboard/projects')
    router.refresh()
  }

  const field: React.CSSProperties = {
    width: '100%', padding: '10px 14px', borderRadius: '8px',
    border: '1.5px solid #e5e0d8', fontSize: '14px', fontFamily: 'inherit',
    outline: 'none', boxSizing: 'border-box', color: '#0f1c2e',
    background: '#fff',
  }

  if (loading) return <p style={{ color: '#6b7280' }}>Loading...</p>

  return (
    <div style={{ maxWidth: '640px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0f1c2e', marginBottom: '24px', letterSpacing: '-0.02em' }}>
        Edit Project
      </h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <input style={field} placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
        <textarea style={{ ...field, height: '100px', resize: 'vertical' }} placeholder="Description" value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} required />
        <input style={field} placeholder="Tags (comma-separated)" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
        <input style={field} placeholder="Live Demo URL (optional)" value={form.liveUrl} onChange={e => setForm({ ...form, liveUrl: e.target.value })} />
        <input style={field} placeholder="GitHub URL (optional)" value={form.githubUrl} onChange={e => setForm({ ...form, githubUrl: e.target.value })} />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" disabled={saving} style={{
            padding: '12px 24px', borderRadius: '8px', border: 'none',
            background: saving ? '#ab916e' : '#c4a882', color: '#0f1c2e',
            fontSize: '14px', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit',
          }}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" onClick={() => router.push('/dashboard/projects')} style={{
            padding: '12px 24px', borderRadius: '8px', border: '1.5px solid #e5e0d8',
            background: 'transparent', color: '#6b7280', fontSize: '14px', fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
          }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
