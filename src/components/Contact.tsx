'use client'

import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = () => {
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 16px',
    borderRadius: '8px', border: '1.5px solid var(--border)',
    fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif',
    color: 'var(--navy)', background: 'var(--white)',
    outline: 'none', transition: 'border-color 0.2s',
  }

  return (
    <section id="contact" style={{ background: 'var(--navy)', padding: '100px 48px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '20px' }}>
          Get In Touch
        </div>
        <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: 'var(--cream)', letterSpacing: '-0.02em', marginBottom: '16px', lineHeight: 1.1 }}>
          Let&apos;s build something great.
        </h2>
        <p style={{ fontSize: '16px', color: 'rgba(245,240,232,0.6)', fontWeight: 300, lineHeight: 1.7, marginBottom: '48px' }}>
          Have a project in mind? I&apos;d love to hear about it. Fill in the form and I&apos;ll get back to you within 24 hours.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <input style={inputStyle} placeholder="Your Name" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
            <input style={inputStyle} placeholder="Email Address" type="email" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
          </div>
          <input style={inputStyle} placeholder="Project Type (Web / AI / Blockchain / Trading)" value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
            onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          />
          <textarea style={{ ...inputStyle, height: '140px', resize: 'none' }} placeholder="Tell me about your project..." value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          />
          <button onClick={handleSubmit} style={{
            padding: '16px', borderRadius: '8px', border: 'none',
            background: sent ? '#4ade80' : 'var(--accent)',
            color: sent ? '#fff' : 'var(--navy)',
            fontSize: '15px', fontWeight: 700,
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            cursor: 'pointer', transition: 'background 0.2s',
          }}>
            {sent ? '✓ Message Sent!' : 'Send Message'}
          </button>
        </div>
      </div>
    </section>
  )
}