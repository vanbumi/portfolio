'use client'

const testimonials = [
  {
    text: 'Widyo built our QR menu system from scratch and delivered ahead of schedule. The app is fast, easy for staff to use, and customers love it. Highly recommended for any restaurant owner.',
    name: 'Budi Santoso',
    role: 'Owner, Warung Nusantara',
    initial: 'B',
  },
  {
    text: 'The data automation pipeline he built saved our team 20+ hours per week. Complex Python scripts made simple and reliable. Very professional and responsive throughout.',
    name: 'Dewi Rahayu',
    role: 'Operations Manager, PT DataTech',
    initial: 'D',
  },
  {
    text: 'Our crypto dashboard is exactly what we envisioned. Real-time data, clean UI, and the chart integration is smooth. Widyo understood our needs and delivered beyond expectations.',
    name: 'Kevin Lim',
    role: 'Founder, CryptoTrack ID',
    initial: 'K',
  },
  {
    text: 'Excellent work on our financial automation hub. He has a rare combination of technical depth and business understanding. The system runs flawlessly and has transformed our workflow.',
    name: 'Rina Maharani',
    role: 'CFO, Investindo Group',
    initial: 'R',
  },
]

export default function Testimonials() {
  return (
    <section id="reviews" style={{ background: 'var(--cream-dark)', padding: '100px 48px' }}>
      <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '20px' }}>
        Client Reviews
      </div>
      <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: 'var(--navy)', letterSpacing: '-0.02em', marginBottom: '52px', lineHeight: 1.1 }}>
        What clients say.
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        {testimonials.map(t => (
          <div key={t.name} style={{
            background: 'var(--white)', borderRadius: '12px',
            padding: '32px', border: '1px solid var(--border)',
          }}>
            <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--text)', marginBottom: '24px', fontWeight: 300 }}>
              &ldquo;{t.text}&rdquo;
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: 'var(--navy)', color: 'var(--cream)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '15px', fontWeight: 700, flexShrink: 0,
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