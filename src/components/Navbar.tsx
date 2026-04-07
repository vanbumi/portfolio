'use client'

import { useEffect, useState } from 'react'

const links = ['About', 'Projects', 'Reviews', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(245,240,232,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'all 0.4s ease',
      padding: '18px 48px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <div style={{ fontWeight: 700, fontSize: '18px', letterSpacing: '-0.02em', color: 'var(--navy)' }}>
        SB<span style={{ color: 'var(--accent)' }}>.</span>
      </div>

      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`}
            style={{ fontSize: '14px', fontWeight: 500, color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--navy)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            {l}
          </a>
        ))}
        <a href="mailto:jsp.dio@gmail.com" style={{
          fontSize: '14px', fontWeight: 600, color: 'var(--white)',
          background: 'var(--navy)', padding: '10px 22px',
          borderRadius: '6px', textDecoration: 'none', transition: 'background 0.2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--navy-light)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--navy)')}
        >
          Hire Me
        </a>
      </div>
    </nav>
  )
}