'use client'

import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'

const ParticleCanvas = dynamic(() => import('@/components/ParticleCanvas'), { ssr: false })

const Divider = () => (
  <div style={{ width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(196,168,130,0.3), transparent)' }} />
)

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <div style={{ position: 'relative' }}>
          <ParticleCanvas />
          <Hero />
        </div>
        <Divider />
        <About />
        <Divider />
        <Projects />
        <Divider />
        <Testimonials />
        <Divider />
        <Contact />
      </main>
      <footer style={{
        background: 'var(--navy)', borderTop: '1px solid rgba(245,240,232,0.08)',
        padding: '28px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <p style={{ fontSize: '13px', color: 'rgba(245,240,232,0.35)' }}>
          © 2025 S. Widyo Bumi. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '24px' }}>
          {[
            { label: 'LinkedIn', href: 'https://linkedin.com/in/widyobumi' },
            { label: 'GitHub', href: 'https://github.com/vanbumi' },
            { label: 'Email', href: 'mailto:jsp.dio@gmail.com' },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
              style={{ fontSize: '13px', color: 'rgba(245,240,232,0.35)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.35)')}
            >
              {s.label}
            </a>
          ))}
        </div>
      </footer>
    </>
  )
}