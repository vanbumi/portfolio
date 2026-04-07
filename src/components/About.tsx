'use client'

const expertise = [
  { name: 'Full-Stack Web Development', tag: 'Next.js · TypeScript · Tailwind' },
  { name: 'Python Automation', tag: 'Pandas · NumPy · Pipeline' },
  { name: 'Blockchain & Web3', tag: 'DeFi · Smart Contracts · Web3' },
  { name: 'Data Analytics & BI', tag: 'Matplotlib · Power BI · SQL' },
  { name: 'Forex & Crypto Trading', tag: 'TradingView API · Backtesting' },
]

export default function About() {
  return (
    <section id="about" style={{ background: 'var(--navy)', padding: '100px 48px' }}>
      <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '20px' }}>
        About Me
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
        <div>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, color: 'var(--cream)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '24px' }}>
            Full-Stack Developer &<br />Automation Specialist.
          </h2>
          <p style={{ fontSize: '15px', fontWeight: 300, lineHeight: 1.8, color: 'rgba(245,240,232,0.6)', marginBottom: '16px' }}>
            With 5+ years of experience, I build scalable web applications and efficient automation tools. Proficient in Python, Next.js, TypeScript, and Tailwind CSS.
          </p>
          <p style={{ fontSize: '15px', fontWeight: 300, lineHeight: 1.8, color: 'rgba(245,240,232,0.6)', marginBottom: '28px' }}>
            Extensive experience integrating real-time databases like <span style={{ color: 'var(--cream)', fontWeight: 500 }}>Firebase and Supabase</span>, developing digital ecosystems from QR-based service systems to professional portfolio hubs.
          </p>

          {/* Contact links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'Email', value: 'jsp.dio@gmail.com', href: 'mailto:jsp.dio@gmail.com' },
              { label: 'LinkedIn', value: 'linkedin.com/in/widyobumi', href: 'https://linkedin.com/in/widyobumi' },
              { label: 'GitHub', value: 'github.com/vanbumi', href: 'https://github.com/vanbumi' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', width: '60px' }}>{item.label}</span>
                <a href={item.href} target="_blank" rel="noreferrer" style={{ fontSize: '14px', color: 'rgba(245,240,232,0.7)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.7)')}
                >
                  {item.value}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {expertise.map(item => (
            <div
              key={item.name}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '16px 20px', borderRadius: '8px',
                background: 'rgba(245,240,232,0.04)',
                border: '1px solid rgba(245,240,232,0.08)',
                transition: 'background 0.2s', cursor: 'default',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(245,240,232,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(245,240,232,0.04)')}
            >
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--cream)' }}>{item.name}</span>
              <span style={{ fontSize: '11px', color: 'var(--accent)' }}>{item.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}