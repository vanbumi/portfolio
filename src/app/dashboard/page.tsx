'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Stats {
  projects: number
  testimonials: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ projects: 0, testimonials: 0 })

  useEffect(() => {
    Promise.all([
      fetch('/api/projects').then(r => r.json()),
      fetch('/api/testimonials').then(r => r.json()),
    ]).then(([projects, testimonials]) => {
      setStats({ projects: projects.length, testimonials: testimonials.length })
    })
  }, [])

  const cards = [
    { label: 'Projects', value: stats.projects, href: '/dashboard/projects', color: '#c4a882' },
    { label: 'Testimonials', value: stats.testimonials, href: '/dashboard/testimonials', color: '#4ade80' },
  ]

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0f1c2e', marginBottom: '8px', letterSpacing: '-0.02em' }}>
        Overview
      </h1>
      <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '32px' }}>
        Quick stats for your portfolio content
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
        {cards.map((c) => (
          <Link key={c.label} href={c.href} style={{
            background: '#fff', borderRadius: '12px', padding: '24px',
            border: '1px solid #e5e0d8', textDecoration: 'none',
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(15,28,46,0.1)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
          >
            <div style={{ fontSize: '36px', fontWeight: 700, color: c.color, letterSpacing: '-0.02em' }}>
              {c.value}
            </div>
            <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '6px' }}>
              {c.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
