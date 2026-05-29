'use client'

import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'

const STATIC = {
  title: "Let's build something great.",
  description: "Have a project in mind? Fill in the form and I'll get back to you within 24 hours.",
  emailjs_service_id: 'service_8b664y1',
  emailjs_template_id: 'template_o7h8nks',
  emailjs_public_key: 'J7h3ENEWcHViRiaMj',
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [content, setContent] = useState(STATIC)

  useEffect(() => {
    fetch('/api/site-content?section=contact')
      .then(r => r.json())
      .then(data => {
        setContent({
          title: typeof data.title === 'string' ? data.title : STATIC.title,
          description: typeof data.description === 'string' ? data.description : STATIC.description,
          emailjs_service_id: typeof data.emailjs_service_id === 'string' ? data.emailjs_service_id : STATIC.emailjs_service_id,
          emailjs_template_id: typeof data.emailjs_template_id === 'string' ? data.emailjs_template_id : STATIC.emailjs_template_id,
          emailjs_public_key: typeof data.emailjs_public_key === 'string' ? data.emailjs_public_key : STATIC.emailjs_public_key,
        })
      })
      .catch(() => {})
  }, [])

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return

    setStatus('loading')
    try {
      await emailjs.send(
        content.emailjs_service_id,
        content.emailjs_template_id,
        {
          from_name:    form.name,
          from_email:   form.email,
          project_type: form.type || 'Not specified',
          message:      form.message,
        },
        content.emailjs_public_key
      )
      setStatus('success')
      setForm({ name: '', email: '', type: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    } catch (err) {
        console.log('EmailJS error:', err)
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 16px',
    borderRadius: '8px', border: '1.5px solid rgba(245,240,232,0.15)',
    fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif',
    color: '#F5F0E8', background: 'rgba(245,240,232,0.06)',
    outline: 'none', transition: 'border-color 0.2s',
  }

  const btnLabel = {
    idle:    'Send Message →',
    loading: 'Sending...',
    success: '✓ Message Sent!',
    error:   '✕ Failed, try again',
  }

  const btnColor = {
    idle:    'var(--accent)',
    loading: '#a08860',
    success: '#4ade80',
    error:   '#f87171',
  }

  return (
    <section id="contact" style={{ background: 'var(--navy)', padding: '100px 48px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '20px' }}>
          Get In Touch
        </div>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: 'var(--cream)', letterSpacing: '-0.02em', marginBottom: '16px', lineHeight: 1.1 }}>
          {content.title}
        </h2>
        <p style={{ fontSize: '15px', color: 'rgba(245,240,232,0.5)', fontWeight: 300, lineHeight: 1.75, marginBottom: '48px' }}>
          {content.description}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <input
              style={inputStyle}
              placeholder="Your Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(245,240,232,0.15)')}
            />
            <input
              style={inputStyle}
              placeholder="Email Address"
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(245,240,232,0.15)')}
            />
          </div>
          <input
            style={inputStyle}
            placeholder="Project Type (Web / AI / Blockchain / Trading)"
            value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
            onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onBlur={e => (e.currentTarget.style.borderColor = 'rgba(245,240,232,0.15)')}
          />
          <textarea
            style={{ ...inputStyle, height: '140px', resize: 'none' }}
            placeholder="Tell me about your project..."
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onBlur={e => (e.currentTarget.style.borderColor = 'rgba(245,240,232,0.15)')}
          />
          <button
            onClick={handleSubmit}
            disabled={status === 'loading'}
            style={{
              padding: '16px', borderRadius: '8px', border: 'none',
              background: btnColor[status],
              color: status === 'success' ? '#fff' : 'var(--navy)',
              fontSize: '15px', fontWeight: 700,
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              marginTop: '4px',
            }}
          >
            {btnLabel[status]}
          </button>

          <p style={{ fontSize: '12px', color: 'rgba(245,240,232,0.3)', textAlign: 'center', marginTop: '4px' }}>
            Name, email & message are required
          </p>
        </div>
      </div>
    </section>
  )
}
