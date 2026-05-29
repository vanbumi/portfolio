'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Project {
  id: number
  title: string
  desc: string
  tags: string[]
  live: string | null
  github: string | null
  sortOrder: number
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])

  const load = () => {
    fetch('/api/projects').then(r => r.json()).then(setProjects)
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this project?')) return
    await fetch(`/api/projects/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0f1c2e', letterSpacing: '-0.02em' }}>Projects</h1>
          <p style={{ fontSize: '13px', color: '#6b7280' }}>{projects.length} projects</p>
        </div>
        <Link href="/dashboard/projects/new" style={{
          background: '#c4a882', color: '#0f1c2e', padding: '10px 20px', borderRadius: '8px',
          fontSize: '13px', fontWeight: 700, textDecoration: 'none',
        }}>
          + New Project
        </Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {projects.map((p) => (
          <div key={p.id} style={{
            background: '#fff', borderRadius: '10px', padding: '16px 20px',
            border: '1px solid #e5e0d8', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap',
          }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f1c2e' }}>{p.title}</div>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '4px' }}>
                {p.tags.slice(0, 4).map((t: string) => (
                  <span key={t} style={{
                    fontSize: '10px', color: '#6b7280', background: '#f5f0e8',
                    padding: '2px 8px', borderRadius: '100px',
                  }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <Link href={`/dashboard/projects/${p.id}`} style={{
                padding: '6px 14px', borderRadius: '6px', border: '1px solid #e5e0d8',
                fontSize: '12px', fontWeight: 600, color: '#0f1c2e', textDecoration: 'none',
              }}>
                Edit
              </Link>
              <button onClick={() => handleDelete(p.id)} style={{
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
