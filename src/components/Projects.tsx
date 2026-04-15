'use client'

import { useState } from 'react'

// ✅ TAMBAH PROJECT BARU DI PALING ATAS ARRAY INI
const projects = [
  {
    title: 'Lead Generation Pro',
    desc: 'Online lead generation app that scrapes Google Maps data to help clients find targeted consumers and export results directly to Excel.',
    tags: ['Python', 'Google Maps API', 'Excel', 'Automation'],
    live: 'https://huggingface.co/spaces/Vanbumi/lead-gen-pro',
    github: 'https://github.com/vanbumi/lead-gen-web',
  },
  {
    title: 'AU Workforce Intelligence',
    desc: 'Australian workforce analytics platform providing labor market insights and intelligence reports.',
    tags: ['Next.js', 'Data Analytics', 'TypeScript'],
    live: 'https://au-workforce-intelligence.vercel.app/',
    github: 'https://github.com/vanbumi/au-workforce-intelligence',
  },
  {
    title: 'DochuChat',
    desc: 'Document-based AI chat app — upload your docs and have intelligent conversations with them.',
    tags: ['Next.js', 'AI', 'TypeScript'],
    live: 'https://dochuchat.vercel.app/',
    github: 'https://github.com/vanbumi/dochuchat',
  },
  {
    title: 'WriteAI',
    desc: 'AI-powered writing assistant that helps generate, refine, and optimize content with ease.',
    tags: ['Next.js', 'AI', 'TypeScript'],
    live: 'https://writeai-orcin.vercel.app/',
    github: 'https://github.com/vanbumi/writeai',
  },
  {
    title: 'Vantage Data Engine',
    desc: 'Powerful data engine for processing, transforming, and analyzing large-scale datasets efficiently.',
    tags: ['Python', 'Data Engineering'],
    live: null,
    github: 'https://github.com/vanbumi/vantage-data-engine',
  },
  {
    title: 'Financial Automation Hub',
    desc: 'Comprehensive financial automation platform combining analytics, reporting, and workflows.',
    tags: ['Next.js', 'Tailwind CSS'],
    live: 'https://automation-hub-sigma.vercel.app/',
    github: 'https://github.com/vanbumi/automation-hub',
  },
  {
    title: 'Forex & Crypto Analysis',
    desc: 'Technical analysis dashboard integrating TradingView API for real-time market signals.',
    tags: ['Python', 'TradingView API'],
    live: null,
    github: 'https://github.com/vanbumi/forex-crypto-analysis',
  },
  {
    title: 'Forex Replay Backtesting',
    desc: 'Backtesting platform to replay historical forex chart data for strategy validation.',
    tags: ['Python', 'TradingView API'],
    live: null,
    github: 'https://github.com/vanbumi/Replay_chart',
  },
  {
    title: 'Leviathan Forge — Prompt AI',
    desc: 'AI prompt engineering tool that generates optimized prompts for various AI models.',
    tags: ['Next.js', 'React', 'TypeScript'],
    live: null,
    github: 'https://github.com/vanbumi/leviathan-baru',
  },
  {
    title: 'BI & Data Automation Pipeline',
    desc: 'End-to-end business intelligence pipeline with automated data processing and visualization.',
    tags: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
    live: null,
    github: 'https://github.com/vanbumi/bi-automation',
  },
  {
    title: 'QR Menu App',
    desc: 'Digital restaurant menu system via QR code — mobile-first, real-time updates, easy management.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    live: 'https://qr-menu-app-silk.vercel.app/menu/A12',
    github: 'https://github.com/vanbumi/qr-menu-app',
  },
  {
    title: 'Crypto Portfolio Tracker',
    desc: 'Real-time crypto tracking app with live price updates, portfolio valuation, and interactive charts.',
    tags: ['Next.js 14', 'TypeScript', 'Chart.js', 'Zustand'],
    live: 'https://crypto-portfolio-tracker-liart.vercel.app/',
    github: 'https://github.com/vanbumi/crypto-portfolio-tracker',
  },
]

const PER_PAGE = 9

const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const ExternalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)

export default function Projects() {
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(projects.length / PER_PAGE)
  const start = (page - 1) * PER_PAGE
  const current = projects.slice(start, start + PER_PAGE)

  const goTo = (p: number) => {
    setPage(p)
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="projects" style={{ background: 'var(--cream)', padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 48px)' }}>
      <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '20px' }}>
        Selected Work
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '12px' }}>
        <h2 style={{ fontSize: 'clamp(24px, 4vw, 48px)', fontWeight: 700, color: 'var(--navy)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          Projects that matter.
        </h2>
        <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
          {projects.length} projects total
        </span>
      </div>

      {/* Grid */}
      <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px', marginBottom: '40px' }}>
        {current.map((p, i) => {
          const num = String(start + i + 1).padStart(2, '0')
          return (
            <div key={p.title}
              style={{
                background: 'var(--white)', borderRadius: '12px',
                padding: '24px 20px', border: '1px solid var(--border)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                display: 'flex', flexDirection: 'column',
                position: 'relative', overflow: 'hidden',
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
              {/* NEW badge for first project on page 1 */}
              {i === 0 && page === 1 && (
                <span style={{
                  position: 'absolute', top: '16px', right: '16px',
                  fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em',
                  color: '#fff', background: 'var(--accent)',
                  padding: '3px 8px', borderRadius: '100px',
                  textTransform: 'uppercase',
                }}>
                  Latest
                </span>
              )}

              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent)', marginBottom: '10px' }}>{num}</div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{p.title}</h3>
              <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '16px', flex: 1 }}>{p.desc}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                {p.tags.map(t => (
                  <span key={t} style={{
                    fontSize: '11px', fontWeight: 500, color: 'var(--navy-mid)',
                    background: 'var(--cream-dark)', padding: '3px 10px',
                    borderRadius: '100px', border: '1px solid var(--border)',
                  }}>{t}</span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '8px', paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    fontSize: '12px', fontWeight: 600, color: 'var(--white)',
                    background: 'var(--navy)', padding: '7px 14px',
                    borderRadius: '6px', textDecoration: 'none', transition: 'background 0.2s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--navy-light)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'var(--navy)')}
                  >
                    <ExternalIcon /> Live Demo
                  </a>
                )}
                {p.github && (
                  <a href={p.github} target="_blank" rel="noreferrer" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    fontSize: '12px', fontWeight: 600, color: 'var(--navy)',
                    padding: '7px 14px', borderRadius: '6px',
                    textDecoration: 'none', border: '1px solid var(--border)',
                    transition: 'border-color 0.2s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--navy)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  >
                    <GithubIcon /> GitHub
                  </a>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
          <button onClick={() => goTo(page - 1)} disabled={page === 1} style={{
            padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border)',
            background: 'transparent', color: 'var(--navy)', fontSize: '13px', fontWeight: 600,
            cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.4 : 1, transition: 'all 0.2s',
          }}>← Prev</button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => goTo(p)} style={{
              width: '38px', height: '38px', borderRadius: '8px',
              border: '1px solid', borderColor: p === page ? 'var(--navy)' : 'var(--border)',
              background: p === page ? 'var(--navy)' : 'transparent',
              color: p === page ? 'var(--white)' : 'var(--navy)',
              fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
            }}>{p}</button>
          ))}

          <button onClick={() => goTo(page + 1)} disabled={page === totalPages} style={{
            padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border)',
            background: 'transparent', color: 'var(--navy)', fontSize: '13px', fontWeight: 600,
            cursor: page === totalPages ? 'not-allowed' : 'pointer', opacity: page === totalPages ? 0.4 : 1, transition: 'all 0.2s',
          }}>Next →</button>
        </div>
      )}

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