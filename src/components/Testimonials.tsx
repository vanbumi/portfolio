'use client'

const testimonials = [
  { text: 'Exceptional work on our DeFi platform. The level of expertise in both blockchain and frontend development is rare to find in a single freelancer. Delivered ahead of schedule.', name: 'Alex Chen', role: 'CEO, CryptoVentures', initial: 'A' },
  { text: 'The AI-powered analytics dashboard transformed how we make trading decisions. Incredibly sophisticated solution built with precision and deep domain knowledge.', name: 'Sarah Kim', role: 'Head of Trading, QuantFi', initial: 'S' },
  { text: 'Professional, communicative, and technically brilliant. Built our entire web platform from scratch — the result exceeded every expectation we had going in.', name: 'Marco Rivera', role: 'Founder, TechStartup', initial: 'M' },
  { text: 'Our data pipeline went from manual chaos to a fully automated system. Processes 10x more data at half the cost. Absolute game changer for our business.', name: 'Jessica Wong', role: 'CTO, DataDriven Co', initial: 'J' },
]

export default function Testimonials() {
  return (
    <section id="reviews" style={{ background: 'var(--cream-dark)', padding: '100px 48px' }}>
      <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '20px' }}>
        Client Reviews
      </div>
      <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: 'var(--navy)', letterSpacing: '-0.02em', marginBottom: '56px', lineHeight: 1.1 }}>
        What clients say.
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {testimonials.map(t => (
          <div key={t.name} style={{
            background: 'var(--white)', borderRadius: '12px',
            padding: '36px', border: '1px solid var(--border)',
          }}>
            <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'var(--text)', marginBottom: '28px', fontWeight: 300 }}>
              &ldquo;{t.text}&rdquo;
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: 'var(--navy)', color: 'var(--cream)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '16px', fontWeight: 700, flexShrink: 0,
              }}>
                {t.initial}
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--navy)' }}>{t.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}