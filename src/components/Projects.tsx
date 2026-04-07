'use client'

const projects = [
  {
    num: '01',
    title: 'Crypto Portfolio Tracker',
    desc: 'Real-time crypto tracking app with live price updates, portfolio valuation, and interactive charts.',
    tags: ['Next.js 14', 'TypeScript', 'Chart.js', 'Zustand', 'Tailwind'],
  },
  {
    num: '02',
    title: 'QR Menu App',
    desc: 'Digital restaurant menu system via QR code — mobile-first, real-time updates, easy management.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    num: '03',
    title: 'BI & Data Automation Pipeline',
    desc: 'End-to-end business intelligence pipeline with automated data processing and visualization reports.',
    tags: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
  },
  {
    num: '04',
    title: 'Leviathan Forge — Prompt AI Generator',
    desc: 'AI prompt engineering tool that generates optimized prompts for various AI models and use cases.',
    tags: ['Next.js', 'React', 'TypeScript', 'JavaScript'],
  },
  {
    num: '05',
    title: 'Forex Replay Chart Backtesting',
    desc: 'Backtesting platform to replay historical forex chart data for strategy validation and analysis.',
    tags: ['Python', 'TradingView API'],
  },
  {
    num: '06',
    title: 'Forex & Crypto Analysis Tool',
    desc: 'Technical analysis dashboard integrating TradingView API for real-time market signals and alerts.',
    tags: ['Python', 'TradingView API'],
  },
  {
    num: '07',
    title: 'Financial Analyst & Automation Hub',
    desc: 'Comprehensive financial automation platform combining analytics, reporting, and workflow automation.',
    tags: ['Next.js', 'Tailwind CSS'],
  },
]

export default function Projects() {
  return (
    <section id="projects" style={{ background: 'var(--cream)', padding: '100px 48px' }}>
      <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '20px' }}>
        Selected Work
      </div>
      <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: 'var(--navy)', letterSpacing: '-0.02em', marginBottom: '52px', lineHeight: 1.1 }}>
        Projects that matter.
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {projects.map(p => (
          <div
            key={p.num}
            style={{
              background: 'var(--white)', borderRadius: '12px',
              padding: '28px 24px', border: '1px solid var(--border)',
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
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent)', marginBottom: '14px' }}>{p.num}</div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy)', marginBottom: '10px', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{p.title}</h3>
            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '20px' }}>{p.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {p.tags.map(t => (
                <span key={t} style={{
                  fontSize: '11px', fontWeight: 500,
                  color: 'var(--navy-mid)', background: 'var(--cream-dark)',
                  padding: '3px 10px', borderRadius: '100px',
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