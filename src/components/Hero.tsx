'use client'

import Image from 'next/image'

const skills = [
  'Next.js & TypeScript', 'Python Automation', 'Blockchain & DeFi',
  'Data Analytics', 'Forex & Crypto Trading'
]

export default function Hero() {
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', padding: '120px 48px 80px',
      background: 'var(--cream)',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '60px', alignItems: 'center' }}>
        <div>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'var(--navy)', color: 'var(--cream)',
            padding: '6px 14px', borderRadius: '100px',
            fontSize: '12px', fontWeight: 500,
            marginBottom: '32px', width: 'fit-content',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
            Available for Projects
          </div>

          {/* Heading */}
          <h1 style={{
            fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 700,
            lineHeight: 1.05, letterSpacing: '-0.03em',
            color: 'var(--navy)', marginBottom: '20px',
          }}>
            Building digital<br />products that{' '}
            <span style={{ color: 'var(--accent)' }}>matter.</span>
          </h1>

          {/* Bio */}
          <p style={{
            fontSize: '16px', fontWeight: 300, color: 'var(--muted)',
            lineHeight: 1.75, maxWidth: '560px', marginBottom: '36px',
          }}>
            S. Widyo Bumi — Full-Stack Developer & Automation Specialist.
            Building scalable web apps and efficient automation tools using
            Next.js, Python, and TypeScript.
          </p>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '48px' }}>
            <a href="#projects" style={{
              background: 'var(--navy)', color: 'var(--white)',
              padding: '13px 30px', borderRadius: '8px',
              fontWeight: 600, fontSize: '14px', textDecoration: 'none',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--navy-light)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--navy)')}
            >
              View Projects
            </a>
            <a href="mailto:jsp.dio@gmail.com" style={{
              color: 'var(--navy)', padding: '13px 30px', borderRadius: '8px',
              fontWeight: 600, fontSize: '14px', textDecoration: 'none',
              border: '1.5px solid var(--border)',
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--navy)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              Let&apos;s Talk
            </a>
          </div>

          {/* Skills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '48px' }}>
            {skills.map(s => (
              <span key={s} style={{
                fontSize: '12px', fontWeight: 500, color: 'var(--navy-mid)',
                background: 'var(--cream-dark)', padding: '5px 14px',
                borderRadius: '100px', border: '1px solid var(--border)',
              }}>
                {s}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex', gap: '40px',
            paddingTop: '36px', borderTop: '1px solid var(--border)',
          }}>
            {[['7+', 'Projects'], ['5+', 'Years Exp.'], ['100%', 'Satisfaction']].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--navy)', letterSpacing: '-0.02em' }}>{n}</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Photo */}
        <div style={{ flexShrink: 0 }}>
          <div style={{
            width: '220px', height: '280px',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '3px solid var(--border)',
            boxShadow: '0 20px 60px rgba(15,28,46,0.12)',
          }}>
            <Image
              src="/profile.jpg"
              alt="S. Widyo Bumi"
              width={220}
              height={280}
              style={{ objectFit: 'cover', objectPosition: 'top', width: '100%', height: '100%' }}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}