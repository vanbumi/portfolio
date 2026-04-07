'use client'

const projects = [
  {
    num: '01',
    title: 'AI Trading Dashboard',
    desc: 'Real-time algorithmic trading platform with ML-powered signal generation and risk management system.',
    tags: ['Python', 'Next.js', 'AI/ML'],
    color: '#1a2d45',
  },
  {
    num: '02',
    title: 'DeFi Analytics Platform',
    desc: 'On-chain data analytics tracking liquidity pools and yield farming opportunities across multiple chains.',
    tags: ['Blockchain', 'Web3.js', 'React'],
    color: '#1a2d45',
  },
  {
    num: '03',
    title: 'Enterprise Data Suite',
    desc: 'End-to-end business intelligence platform with predictive analytics and automated reporting workflows.',
    tags: ['Data Analytics', 'Python', 'SQL'],
    color: '#1a2d45',
  },
]

export default function Projects() {
  return (
    <section id="projects" style={{ background: 'var(--cream)', padding: '100px 48px' }}>
      <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '20px' }}>
        Selected Work
      </div>
      <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: 'var(--navy)', letterSpacing: '-0.02em', marginBottom: '56px', lineHeight: 1.1 }}>
        Projects that matter.
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {projects.map(p => (
          <div
            key={p.num}
            style={{
              background: 'var(--white)', borderRadius: '12px',
              padding: '36px 32px', border: '1px solid var(--border)',
              transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'default',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(15,28,46,0.1)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent)', marginBottom: '20px' }}>{p.num}</div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--navy)', marginBottom: '12px', letterSpacing: '-0.01em' }}>{p.title}</h3>
            <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '28px' }}>{p.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {p.tags.map(t => (
                <span key={t} style={{
                  fontSize: '12px', fontWeight: 500,
                  color: 'var(--navy)', background: 'var(--cream-dark)',
                  padding: '4px 12px', borderRadius: '100px',
                  border: '1px solid var(--border)',
                }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}