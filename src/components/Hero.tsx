'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { projects as staticProjects } from '@/data/projects'

const staticSkills = [
  'Next.js & TypeScript', 'Python Automation', 'Blockchain & DeFi',
  'Data Analytics', 'Forex & Crypto Trading'
]

const staticHero = {
  name: 'S. Widyo Bumi',
  tagline: 'Full-Stack Developer & Automation Specialist.',
  description: 'Building scalable web apps and efficient automation tools using Next.js, Python, and TypeScript.',
  badge: 'Available for Projects',
  cta_primary: 'View Projects',
  cta_secondary: "Let's Talk",
  photo_url: '/profile.jpg',
  heading: 'Building digital products that <span style="color: var(--accent)">matter.</span>',
}

export default function Hero() {
  const [skills, setSkills] = useState<string[]>(staticSkills)
  const [projectCount, setProjectCount] = useState(staticProjects.length)
  const [hero, setHero] = useState(staticHero)

  useEffect(() => {
    let ignore = false
    Promise.all([
      fetch('/api/site-content?section=hero').then(r => r.json()).catch(() => ({})),
      fetch('/api/projects').then(r => r.json()).catch(() => []),
    ]).then(([heroData, apiProjects]) => {
      if (ignore) return

      // Parse hero content from API
      const h = { ...staticHero }
      if (typeof heroData.name === 'string') h.name = heroData.name
      if (typeof heroData.tagline === 'string') h.tagline = heroData.tagline
      if (typeof heroData.description === 'string') h.description = heroData.description
      if (typeof heroData.badge === 'string') h.badge = heroData.badge
      if (typeof heroData.cta_primary === 'string') h.cta_primary = heroData.cta_primary
      if (typeof heroData.cta_secondary === 'string') h.cta_secondary = heroData.cta_secondary
      if (typeof heroData.photo_url === 'string') h.photo_url = heroData.photo_url
      if (typeof heroData.heading === 'string' && heroData.heading.length > 0) h.heading = heroData.heading
      setHero(h)

      // Parse skills
      if (heroData.skills) {
        try {
          const raw = JSON.parse(heroData.skills)
          if (Array.isArray(raw)) {
            const parsed: string[] = raw.map((s: unknown) => {
              if (typeof s === 'string') return s
              if (s && typeof s === 'object') {
                const obj = s as Record<string, unknown>
                return String(obj.name ?? obj.tag ?? '')
              }
              return ''
            })
            setSkills(parsed)
          }
        } catch { /* keep static */ }
      }

      if (Array.isArray(apiProjects) && apiProjects.length > 0) {
        setProjectCount(apiProjects.length)
      }
    })
    return () => { ignore = true }
  }, [])

  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', padding: 'clamp(100px, 12vw, 120px) clamp(20px, 5vw, 48px) 60px',
      background: 'var(--cream)',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }} className="hero-inner">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }} className="hero-photo">
          <div style={{
            width: '160px', height: '160px', borderRadius: '50%', overflow: 'hidden',
            border: '4px solid var(--white)', boxShadow: '0 0 0 3px var(--accent), 0 20px 60px rgba(15,28,46,0.15)',
            flexShrink: 0,
          }}>
            <Image src={hero.photo_url} alt={hero.name} width={320} height={320} priority
              style={{ objectFit: 'cover', objectPosition: 'top center', width: '100%', height: '100%' }} />
          </div>
        </div>

        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'var(--navy)', color: 'var(--cream)',
            padding: '6px 14px', borderRadius: '100px', fontSize: '12px', fontWeight: 500,
            marginBottom: '24px', width: 'fit-content',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
            {hero.badge}
          </div>

          <h1
            style={{ fontSize: 'clamp(32px, 6vw, 80px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--navy)', marginBottom: '16px' }}
            dangerouslySetInnerHTML={{ __html: hero.heading }}
          />

          <p style={{ fontSize: 'clamp(14px, 2vw, 16px)', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.75, maxWidth: '560px', marginBottom: '28px' }}>
            {hero.name} — {hero.tagline}. {hero.description}
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' }}>
            <a href="#projects" style={{ background: 'var(--navy)', color: 'var(--white)', padding: '12px 24px', borderRadius: '8px', fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--navy-light)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--navy)')}>
              {hero.cta_primary}
            </a>
            <a href="mailto:jsp.dio@gmail.com" style={{ color: 'var(--navy)', padding: '12px 24px', borderRadius: '8px', fontWeight: 600, fontSize: '14px', textDecoration: 'none', border: '1.5px solid var(--border)' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--navy)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
              {hero.cta_secondary}
            </a>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
            {skills.map(s => (
              <span key={s} style={{ fontSize: '12px', fontWeight: 500, color: 'var(--navy-mid)', background: 'var(--cream-dark)', padding: '5px 12px', borderRadius: '100px', border: '1px solid var(--border)' }}>
                {s}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', paddingTop: '28px', borderTop: '1px solid var(--border)' }}>
            {[[`${projectCount}+`, 'Projects'], ['5+', 'Years Exp.'], ['100%', 'Satisfaction']].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: '26px', fontWeight: 700, color: 'var(--navy)', letterSpacing: '-0.02em' }}>{n}</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .hero-inner { flex-direction: row !important; align-items: flex-start !important; justify-content: space-between !important; gap: 60px !important; }
          .hero-photo { order: 2; flex-shrink: 0; padding-top: 8px; }
          .hero-photo > div { width: 220px !important; height: 220px !important; }
          .hero-inner > div:last-child { order: 1; flex: 1; }
        }
      `}</style>
    </section>
  )
}
