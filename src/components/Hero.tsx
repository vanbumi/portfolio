'use client'

const skills = ['Web Development', 'AI & Machine Learning', 'Blockchain & DeFi', 'Data Analytics', 'Crypto Trading']

export default function Hero() {
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', padding: '120px 48px 80px',
      background: 'var(--cream)',
    }}>
      {/* Badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        background: 'var(--navy)', color: 'var(--cream)',
        padding: '6px 14px', borderRadius: '100px',
        fontSize: '12px', fontWeight: 500, letterSpacing: '0.05em',
        marginBottom: '40px', width: 'fit-content',
      }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
        Available for Projects
      </div>

      {/* Heading */}
      <h1 style={{
        fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: 700,
        lineHeight: 1.05, letterSpacing: '-0.03em',
        color: 'var(--navy)', marginBottom: '24px', maxWidth: '800px',
      }}>
        Building digital products that{' '}
        <span style={{ color: 'var(--accent)' }}>matter.</span>
      </h1>

      {/* Subtitle */}
      <p style={{
        fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 300,
        color: 'var(--muted)', lineHeight: 1.7,
        maxWidth: '540px', marginBottom: '48px',
      }}>
        Freelance developer specializing in Web, AI, Blockchain & Data Analytics. Turning complex ideas into elegant solutions.
      </p>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '72px' }}>
        <a href="#projects" style={{
          background: 'var(--navy)', color: 'var(--white)',
          padding: '14px 32px', borderRadius: '8px',
          fontWeight: 600, fontSize: '15px', textDecoration: 'none',
          transition: 'background 0.2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--navy-light)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--navy)')}
        >
          View Projects
        </a>
        <a href="#contact" style={{
          background: 'transparent', color: 'var(--navy)',
          padding: '14px 32px', borderRadius: '8px',
          fontWeight: 600, fontSize: '15px', textDecoration: 'none',
          border: '1.5px solid var(--border)', transition: 'border-color 0.2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--navy)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
        >
          Let&apos;s Talk
        </a>
      </div>

      {/* Skills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {skills.map(s => (
          <span key={s} style={{
            fontSize: '13px', fontWeight: 500, color: 'var(--navy-mid)',
            background: 'var(--cream-dark)', padding: '6px 14px',
            borderRadius: '100px', border: '1px solid var(--border)',
          }}>
            {s}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div style={{
        display: 'flex', gap: '48px', marginTop: '72px',
        paddingTop: '48px', borderTop: '1px solid var(--border)',
      }}>
        {[['50+', 'Projects'], ['5+', 'Years Exp.'], ['100%', 'Satisfaction']].map(([n, l]) => (
          <div key={l}>
            <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--navy)', letterSpacing: '-0.02em' }}>{n}</div>
            <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}