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
      justifyContent: 'center', padding: 'clamp(100px, 12vw, 120px) clamp(20px, 5vw, 48px) 60px',
      background: 'var(--cream)',
    }}>
      {/* Photo + Text wrapper */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
      }}
        className="hero-inner"
      >
        {/* Profile photo — mobile: center top */}
        <div style={{ display: 'flex', justifyContent: 'center' }} className="hero-photo">
          <div style={{
            width: '140px', height: '175px',
            borderRadius: '16px', overflow: 'hidden',
            border: '3px solid var(--border)',
          }}>
            <Image
              src="/profile.jpg"
              alt="S. Widyo Bumi"
              width={220}
              height={280}
              priority
              style={{ objectFit: 'cover', objectPosition: 'top', width: '100%', height: '100%' }}
            />
          </div>
        </div>

        {/* Text content */}
        <div>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'var(--navy)', color: 'var(--cream)',
            padding: '6px 14px', borderRadius: '100px',
            fontSize: '12px', fontWeight: 500,
            marginBottom: '24px', width: 'fit-content',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
            Available for Projects
          </div>

          <h1 style={{
            fontSize: 'clamp(32px, 6vw, 80px)', fontWeight: 700,
            lineHeight: 1.1, letterSpacing: '-0.03em',
            color: 'var(--navy)', marginBottom: '16px',
          }}>
            Building digital products that{' '}
            <span style={{ color: 'var(--accent)' }}>matter.</span>
          </h1>

          <p style={{
            fontSize: 'clamp(14px, 2vw, 16px)', fontWeight: 300,
            color: 'var(--muted)', lineHeight: 1.75,
            maxWidth: '560px', marginBottom: '28px',
          }}>
            S. Widyo Bumi — Full-Stack Developer & Automation Specialist.
            Building scalable web apps and efficient automation tools using
            Next.js, Python, and TypeScript.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' }}>
            <a href="#projects" style={{
              background: 'var(--navy)', color: 'var(--white)',
              padding: '12px 24px', borderRadius: '8px',
              fontWeight: 600, fontSize: '14px', textDecoration: 'none',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--navy-light)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--navy)')}
            >
              View Projects
            </a>
            <a href="mailto:jsp.dio@gmail.com" style={{
              color: 'var(--navy)', padding: '12px 24px', borderRadius: '8px',
              fontWeight: 600, fontSize: '14px', textDecoration: 'none',
              border: '1.5px solid var(--border)',
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--navy)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              Let&apos;s Talk
            </a>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
            {skills.map(s => (
              <span key={s} style={{
                fontSize: '12px', fontWeight: 500, color: 'var(--navy-mid)',
                background: 'var(--cream-dark)', padding: '5px 12px',
                borderRadius: '100px', border: '1px solid var(--border)',
              }}>
                {s}
              </span>
            ))}
          </div>

          <div style={{
            display: 'flex', gap: '32px', flexWrap: 'wrap',
            paddingTop: '28px', borderTop: '1px solid var(--border)',
          }}>
            {[['7+', 'Projects'], ['5+', 'Years Exp.'], ['100%', 'Satisfaction']].map(([n, l]) => (
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
          .hero-inner {
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-between !important;
          }
          .hero-photo {
            order: 2;
            flex-shrink: 0;
          }
          .hero-photo > div {
            width: 220px !important;
            height: 280px !important;
          }
          .hero-inner > div:last-child {
            order: 1;
            flex: 1;
          }
        }
      `}</style>
    </section>
  )
}