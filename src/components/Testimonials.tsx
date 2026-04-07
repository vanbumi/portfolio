'use client'

const testimonials = [
  { text: 'Widyo built our QR menu system from scratch and delivered ahead of schedule. The app is fast, easy for staff to use, and customers love it. Highly recommended!', name: 'Budi Santoso', role: 'Owner, Warung Nusantara', initial: 'B' },
  { text: 'The data automation pipeline saved our team 20+ hours per week. Complex Python scripts made simple and reliable. Very professional and responsive throughout.', name: 'Dewi Rahayu', role: 'Operations Manager, PT DataTech', initial: 'D' },
  { text: 'Our crypto dashboard is exactly what we envisioned. Real-time data, clean UI, and the chart integration is smooth. Delivered beyond expectations.', name: 'Kevin Lim', role: 'Founder, CryptoTrack ID', initial: 'K' },
  { text: 'Excellent work on our financial automation hub. A rare combination of technical depth and business understanding. The system runs flawlessly.', name: 'Rina Maharani', role: 'CFO, Investindo Group', initial: 'R' },
]

export default function Testimonials() {
  return (
    <section id="reviews" style={{ background: 'var(--cream-dark)', padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 48px)' }}>
      <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '20px' }}>
        Client Reviews
      </div>
      <h2 style={{ fontSize: 'clamp(24px, 4vw, 48px)', fontWeight: 700, color: 'var(--navy)', letterSpacing: '-0.02em', marginBottom: '40px', lineHeight: 1.1 }}>
        What clients say.
      </h2>

      <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px' }}>
        {testimonials.map(t => (
          <div key={t.name} style={{
            background: 'var(--white)', borderRadius: '12px',
            padding: '28px 24px', border: '1px solid var(--border)',
          }}>
            <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--text)', marginBottom: '20px', fontWeight: 300 }}>
              &ldquo;{t.text}&rdquo;
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
                background: 'var(--navy)', color: 'var(--cream)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', fontWeight: 700,
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

      <style>{`
        @media (min-width: 768px) {
          .testimonials-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}