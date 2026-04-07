'use client'

import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'

const ParticleCanvas = dynamic(() => import('@/components/ParticleCanvas'), { ssr: false })

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <div style={{ position: 'relative' }}>
          <ParticleCanvas />
          <Hero />
        </div>
        <About />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <footer style={{
        background: 'var(--navy)', borderTop: '1px solid rgba(245,240,232,0.08)',
        padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <p style={{ fontSize: '13px', color: 'rgba(245,240,232,0.4)', fontWeight: 400 }}>
          © 2025 YourName. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['LinkedIn', 'GitHub', 'Twitter'].map(s => (
            <a key={s} href="#" style={{ fontSize: '13px', color: 'rgba(245,240,232,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.4)')}
            >
              {s}
            </a>
          ))}
        </div>
      </footer>
    </>
  )
}