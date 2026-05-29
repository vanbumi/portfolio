'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewProjectPage() {
  const router = useRouter()
  const [form, setForm] = useState({ title: '', desc: '', tags: '', liveUrl: '', githubUrl: '' })
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean)
    await fetch('/api/projects', {
      method: 'POST',
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

  return (
    <div style={{ maxWidth: '640px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0f1c2e', marginBottom: '24px', letterSpacing: '-0.02em' }}>
        New Project
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
            {saving ? 'Saving...' : 'Create Project'}
          </button>
          <button type="button" onClick={() => router.back()} style={{
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
