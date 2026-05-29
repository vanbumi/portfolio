'use client'
// Client Component — requires hooks (useState, useEffect, useCallback, useRef)
// to fetch CMS-driven content at runtime while providing static fallback data
// for instant first paint before the API resolves.

import { useState, useEffect, useCallback, useRef } from 'react'

// ── Types ──────────────────────────────────────────────────────────────
interface ExpertiseItem {
  name: string
  tag: string
}

interface ContactLink {
  label: string
  value: string
  href: string
}

interface AboutApiResponse {
  bio?: string
  expertise?: string // JSON-serialized ExpertiseItem[] stored in the DB
  title?: string
  paragraph2?: string
}

// ── Static Fallback Data ───────────────────────────────────────────────
const STATIC_EXPERTISE: ExpertiseItem[] = [
  { name: 'Full-Stack Web Development', tag: 'Next.js · TypeScript · Tailwind' },
  { name: 'Python Automation', tag: 'Pandas · NumPy · Pipeline' },
  { name: 'Blockchain & Web3', tag: 'DeFi · Smart Contracts' },
  { name: 'Data Analytics & BI', tag: 'Matplotlib · Power BI · SQL' },
  { name: 'Forex & Crypto Trading', tag: 'TradingView · Backtesting' },
]

const STATIC_BIO =
  'With 5+ years of experience, I build scalable web applications and efficient automation tools. Proficient in Python, Next.js, TypeScript, and Tailwind CSS.'

const STATIC_TITLE = 'Full-Stack Developer &<br />Automation Engineer.'

const STATIC_PARAGRAPH2 =
  'Extensive experience integrating real-time databases like <span style="color: var(--cream); font-weight: 500">Firebase and Supabase</span>, developing digital ecosystems from QR-based service systems to professional portfolio hubs.'

const CONTACT_LINKS: ContactLink[] = [
  { label: 'Email', value: 'jsp.dio@gmail.com', href: 'mailto:jsp.dio@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/widyobumi', href: 'https://linkedin.com/in/widyobumi' },
  { label: 'GitHub', value: 'github.com/vanbumi', href: 'https://github.com/vanbumi' },
]

// ── Shared Style Objects (avoid recreation per render) ─────────────────
const SECTION_STYLE: React.CSSProperties = {
  background: 'var(--navy)',
  padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 48px)',
}

const SECTION_LABEL_STYLE: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '0.15em',
  color: 'var(--accent)',
  textTransform: 'uppercase',
  marginBottom: '20px',
}

// ── Helpers ────────────────────────────────────────────────────────────

function parseExpertise(raw: unknown): ExpertiseItem[] | null {
  if (typeof raw !== 'string') return null
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed) || parsed.length === 0) return null

    const isValid = parsed.every(
      (item): item is ExpertiseItem =>
        item !== null &&
        typeof item === 'object' &&
        typeof (item as ExpertiseItem).name === 'string',
    )
    return isValid ? parsed : null
  } catch {
    return null
  }
}

// ── Component ──────────────────────────────────────────────────────────
export default function About() {
  const [expertise, setExpertise] = useState<ExpertiseItem[]>(STATIC_EXPERTISE)
  const [bio, setBio] = useState<string>(STATIC_BIO)
  const [title, setTitle] = useState<string>(STATIC_TITLE)
  const [paragraph2, setParagraph2] = useState<string>(STATIC_PARAGRAPH2)
  const [loading, setLoading] = useState(true)
  const mountedRef = useRef(true)

  const handleLinkEnter = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = 'var(--cream)'
  }, [])

  const handleLinkLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = 'rgba(245,240,232,0.7)'
  }, [])

  const handleCardEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.background = 'rgba(245,240,232,0.08)'
  }, [])

  const handleCardLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.background = 'rgba(245,240,232,0.04)'
  }, [])

  useEffect(() => {
    mountedRef.current = true

    async function fetchAbout() {
      try {
        const res = await fetch('/api/site-content?section=about')

        if (!res.ok) {
          console.warn(`[About] API responded with ${res.status}, using static fallback.`)
          return
        }

        const data: AboutApiResponse = await res.json()

        if (!mountedRef.current) return

        if (typeof data.bio === 'string' && data.bio.length > 0) {
          setBio(data.bio)
        }

        if (typeof data.title === 'string' && data.title.length > 0) {
          setTitle(data.title)
        }

        if (typeof data.paragraph2 === 'string' && data.paragraph2.length > 0) {
          setParagraph2(data.paragraph2)
        }

        const parsed = parseExpertise(data.expertise)
        if (parsed) {
          setExpertise(parsed)
        }
      } catch (err) {
        if (mountedRef.current) {
          console.warn('[About] Failed to load CMS data, keeping static fallback.', err)
        }
      } finally {
        if (mountedRef.current) {
          setLoading(false)
        }
      }
    }

    fetchAbout()

    return () => {
      mountedRef.current = false
    }
  }, [])

  return (
    <section id="about" style={SECTION_STYLE}>
      <div style={SECTION_LABEL_STYLE}>About Me</div>

      {loading && (
        <div
          style={{
            fontSize: '11px',
            color: 'rgba(245,240,232,0.25)',
            marginTop: '-12px',
            marginBottom: '16px',
          }}
          aria-live="polite"
        >
          Syncing…
        </div>
      )}

      <div
        className="about-grid"
        style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}
      >
        {/* ── Left Column ── */}
        <div>
          <h2
            style={{
              fontSize: 'clamp(24px, 4vw, 44px)',
              fontWeight: 700,
              color: 'var(--cream)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '20px',
            }}
            dangerouslySetInnerHTML={{ __html: title }}
          />

          <p
            style={{
              fontSize: '15px',
              fontWeight: 300,
              lineHeight: 1.8,
              color: 'rgba(245,240,232,0.6)',
              marginBottom: '14px',
            }}
          >
            {bio}
          </p>

          <p
            style={{
              fontSize: '15px',
              fontWeight: 300,
              lineHeight: 1.8,
              color: 'rgba(245,240,232,0.6)',
              marginBottom: '28px',
            }}
            dangerouslySetInnerHTML={{ __html: paragraph2 }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {CONTACT_LINKS.map((item) => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--accent)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    width: '64px',
                    flexShrink: 0,
                    paddingTop: '2px',
                  }}
                >
                  {item.label}
                </span>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.label}: ${item.value}`}
                  style={{
                    fontSize: '14px',
                    color: 'rgba(245,240,232,0.7)',
                    textDecoration: 'none',
                    wordBreak: 'break-all',
                  }}
                  onMouseEnter={handleLinkEnter}
                  onMouseLeave={handleLinkLeave}
                >
                  {item.value}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right Column — Expertise ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {expertise.map((item) => (
            <div
              key={item.name}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '6px',
                padding: '14px 16px',
                borderRadius: '8px',
                background: 'rgba(245,240,232,0.04)',
                border: '1px solid rgba(245,240,232,0.08)',
                transition: 'background 0.2s',
              }}
              onMouseEnter={handleCardEnter}
              onMouseLeave={handleCardLeave}
            >
              <span
                style={{ fontSize: '14px', fontWeight: 600, color: 'var(--cream)' }}
              >
                {item.name}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--accent)' }}>
                {item.tag}
              </span>
            </div>
          ))}

          {expertise.length === 0 && (
            <p
              style={{
                fontSize: '13px',
                color: 'rgba(245,240,232,0.3)',
                fontStyle: 'italic',
              }}
            >
              No expertise items to display.
            </p>
          )}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 80px !important;
          }
        }
      `}</style>
    </section>
  )
}
