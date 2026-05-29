'use client'

import { useEffect, useState } from 'react'

// All site content rows from DB
interface SiteContentRow {
  id: number
  section: string
  key: string
  value: string
}

// Which sections we manage in the dashboard
const SECTIONS = ['hero', 'about', 'contact', 'footer']

// Human-readable labels for each section.key
const FIELD_LABELS: Record<string, Record<string, string>> = {
  hero: {
    name: 'Name',
    heading: 'Heading (HTML allowed)',
    tagline: 'Tagline',
    description: 'Description',
    badge: 'Badge Text',
    cta_primary: 'Primary CTA',
    cta_secondary: 'Secondary CTA',
    photo_url: 'Photo URL',
    skills: 'Skills (JSON array)',
  },
  about: {
    title: 'Section Title (HTML allowed)',
    bio: 'Bio Paragraph 1',
    paragraph2: 'Bio Paragraph 2 (HTML allowed)',
    expertise: 'Expertise (JSON array)',
  },
  contact: {
    title: 'Section Title',
    description: 'Description',
    emailjs_service_id: 'EmailJS Service ID',
    emailjs_template_id: 'EmailJS Template ID',
    emailjs_public_key: 'EmailJS Public Key',
    email_to: 'Email To',
  },
  footer: {
    copyright: 'Copyright Text',
    links: 'Links (JSON array)',
  },
}

// Default values from static fallbacks in each component — shown when no DB data exists yet
const DEFAULTS: Record<string, Record<string, string>> = {
  hero: {
    name: 'S. Widyo Bumi',
    heading: 'Building digital products that <span style="color: var(--accent)">matter.</span>',
    tagline: 'Full-Stack Developer & Automation Specialist.',
    description: 'Building scalable web apps and efficient automation tools using Next.js, Python, and TypeScript.',
    badge: 'Available for Projects',
    cta_primary: 'View Projects',
    cta_secondary: "Let's Talk",
    photo_url: '/profile.jpg',
    skills: '["Next.js & TypeScript","Python Automation","Blockchain & DeFi","Data Analytics","Forex & Crypto Trading"]',
  },
  about: {
    title: 'Full-Stack Developer &<br />Automation Engineer.',
    bio: 'With 5+ years of experience, I build scalable web applications and efficient automation tools. Proficient in Python, Next.js, TypeScript, and Tailwind CSS.',
    paragraph2: 'Extensive experience integrating real-time databases like <span style="color: var(--cream); font-weight: 500">Firebase and Supabase</span>, developing digital ecosystems from QR-based service systems to professional portfolio hubs.',
    expertise: '[{"name":"Full-Stack Web Development","tag":"Next.js · TypeScript · Tailwind"},{"name":"Python Automation","tag":"Pandas · NumPy · Pipeline"},{"name":"Blockchain & Web3","tag":"DeFi · Smart Contracts"},{"name":"Data Analytics & BI","tag":"Matplotlib · Power BI · SQL"},{"name":"Forex & Crypto Trading","tag":"TradingView · Backtesting"}]',
  },
  contact: {
    title: "Let's build something great.",
    description: "Have a project in mind? Fill in the form and I'll get back to you within 24 hours.",
    emailjs_service_id: 'service_8b664y1',
    emailjs_template_id: 'template_o7h8nks',
    emailjs_public_key: 'J7h3ENEWcHViRiaMj',
    email_to: '',
  },
  footer: {
    copyright: '',
    links: '[]',
  },
}

export default function SiteContentPage() {
  const [rows, setRows] = useState<SiteContentRow[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<Record<string, boolean>>({})

  const load = () => {
    setLoading(true)
    fetch('/api/site-content')
      .then(r => r.json())
      .then((data: SiteContentRow[]) => {
        // Ensure all known keys exist with defaults from static fallback data
        const map = new Map<string, SiteContentRow>()
        for (const row of data) {
          map.set(`${row.section}:${row.key}`, row)
        }
        const result: SiteContentRow[] = []
        for (const section of SECTIONS) {
          const keys = FIELD_LABELS[section] ? Object.keys(FIELD_LABELS[section]) : []
          for (const key of keys) {
            const existing = map.get(`${section}:${key}`)
            const defaultValue = DEFAULTS[section]?.[key] ?? ''
            result.push(existing ?? { id: 0, section, key, value: defaultValue })
          }
        }
        setRows(result)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleSave = async (section: string, key: string, value: string) => {
    const label = `${section}.${key}`
    setSaving(prev => ({ ...prev, [label]: true }))
    await fetch('/api/site-content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section, key, value }),
    })
    setSaving(prev => ({ ...prev, [label]: false }))
  }

  const field: React.CSSProperties = {
    width: '100%', padding: '10px 14px', borderRadius: '8px',
    border: '1.5px solid #e5e0d8', fontSize: '14px', fontFamily: 'inherit',
    outline: 'none', boxSizing: 'border-box', color: '#0f1c2e',
    background: '#fff',
  }

  const sectionTitle: React.CSSProperties = {
    fontSize: '16px', fontWeight: 700, color: '#0f1c2e',
    marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid #c4a882',
    letterSpacing: '-0.01em', textTransform: 'capitalize',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '12px', fontWeight: 600, color: '#6b7280',
    marginBottom: '4px',
  }

  if (loading) return <p style={{ color: '#6b7280' }}>Loading...</p>

  // Group rows by section
  const grouped = new Map<string, SiteContentRow[]>()
  for (const row of rows) {
    const list = grouped.get(row.section) || []
    list.push(row)
    grouped.set(row.section, list)
  }

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0f1c2e', marginBottom: '8px', letterSpacing: '-0.02em' }}>
        Site Content
      </h1>
      <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '32px' }}>
        Edit all site content — hero, about, contact, and footer
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px' }}>
        {SECTIONS.map(section => {
          const sectionRows = grouped.get(section) || []
          const labels = FIELD_LABELS[section] || {}

          return (
            <div key={section} style={{
              background: '#fff', borderRadius: '12px', padding: '24px',
              border: '1px solid #e5e0d8',
            }}>
              <div style={sectionTitle}>{section}</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {sectionRows.map((row, idx) => {
                  const saveLabel = `${row.section}.${row.key}`
                  const isSaving = saving[saveLabel]
                  const isJson = row.key === 'skills' || row.key === 'expertise' || row.key === 'links'
                  const isHtml = row.key === 'heading' || row.key === 'title' || row.key === 'paragraph2'

                  return (
                    <div key={`${row.section}-${row.key}`}>
                      <div style={labelStyle}>
                        {labels[row.key] || row.key}
                        {isHtml && <span style={{ fontSize: '10px', color: '#c4a882', marginLeft: '6px' }}>(HTML supported)</span>}
                      </div>
                      <textarea
                        style={{
                          ...field,
                          height: isJson || row.value.length > 100 ? '100px' : '60px',
                          fontFamily: isJson ? 'monospace' : 'inherit',
                          fontSize: isJson ? '12px' : '14px',
                          resize: 'vertical',
                        }}
                        value={row.value}
                        onChange={e => {
                          const updated = [...rows]
                          const globalIdx = rows.findIndex(r => r.section === row.section && r.key === row.key)
                          if (globalIdx >= 0) {
                            updated[globalIdx] = { ...updated[globalIdx], value: e.target.value }
                            setRows(updated)
                          }
                        }}
                      />
                      <button
                        onClick={() => handleSave(row.section, row.key, row.value)}
                        disabled={isSaving}
                        style={{
                          marginTop: '6px', padding: '7px 16px', borderRadius: '6px',
                          border: 'none', background: isSaving ? '#ab916e' : '#c4a882',
                          color: '#0f1c2e', fontSize: '12px', fontWeight: 700,
                          cursor: isSaving ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
                        }}
                      >
                        {isSaving ? 'Saving...' : `Save`}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
