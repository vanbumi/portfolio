'use client'

const projects = [
  { num: '01', title: 'Crypto Portfolio Tracker', desc: 'Real-time crypto tracking app with live price updates, portfolio valuation, and interactive charts.', tags: ['Next.js 14', 'TypeScript', 'Chart.js', 'Zustand'] },
  { num: '02', title: 'QR Menu App', desc: 'Digital restaurant menu system via QR code — mobile-first, real-time updates, easy management.', tags: ['Next.js', 'TypeScript', 'Tailwind CSS'] },
  { num: '03', title: 'BI & Data Automation Pipeline', desc: 'End-to-end business intelligence pipeline with automated data processing and visualization.', tags: ['Python', 'Pandas', 'NumPy', 'Matplotlib'] },
  { num: '04', title: 'Leviathan Forge — Prompt AI', desc: 'AI prompt engineering tool that generates optimized prompts for various AI models.', tags: ['Next.js', 'React', 'TypeScript'] },
  { num: '05', title: 'Forex Replay Backtesting', desc: 'Backtesting platform to replay historical forex chart data for strategy validation.', tags: ['Python', 'TradingView API'] },
  { num: '06', title: 'Forex & Crypto Analysis', desc: 'Technical analysis dashboard integrating TradingView API for real-time market signals.', tags: ['Python', 'TradingView API'] },
  { num: '07', title: 'Financial Automation Hub', desc: 'Comprehensive financial automation platform combining analytics, reporting, and workflows.', tags: ['Next.js', 'Tailwind CSS'] },
]

export default function Projects() {
  return (
    <section id="projects" style={{ background: 'var(--cream)', padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 48px)' }}>
      <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '20px' }}>
        Selected Work
      </div>
      <h2 style={{ fontSize: 'clamp(24px, 4vw, 48px)', fontWeight: 700, color: 'var(--navy)', letterSpacing: '-0.02em', marginBottom: '40px', lineHeight: 1.1 }}>
        Projects that matter.
      </h2>

      <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px' }}>
        {projects.map(p => (
          <div key={p.num}
            style={{
              background: 'var(--white)', borderRadius: '12px',
              padding: '24px 20px', border: '1px solid var(--border)',
              transition: 'transform 0.2s, box-shadow 0.2s',
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
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent)', marginBottom: '10px' }}>{p.num}</div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{p.title}</h3>
            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '16px' }}>{p.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {p.tags.map(t => (
                <span key={t} style={{
                  fontSize: '11px', fontWeight: 500, color: 'var(--navy-mid)',
                  background: 'var(--cream-dark)', padding: '3px 10px',
                  borderRadius: '100px', border: '1px solid var(--border)',
                }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (min-width: 640px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 1024px) {
          .projects-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}