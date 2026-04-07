'use client'

const expertise = [
  { name: 'Web Development', tag: 'Next.js · React · TypeScript' },
  { name: 'Artificial Intelligence', tag: 'ML · LLM · Python' },
  { name: 'Blockchain & Web3', tag: 'DeFi · Smart Contracts' },
  { name: 'Data Analytics', tag: 'Visualization · BI · SQL' },
  { name: 'Crypto & Trading', tag: 'Algo · Technical Analysis' },
]

export default function About() {
  return (
    <section id="about" style={{ background: 'var(--navy)', padding: '100px 48px' }}>
      {/* Label */}
      <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '20px' }}>
        About Me
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
        {/* Left */}
        <div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: 'var(--cream)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '28px' }}>
            Multi-disciplinary technologist.
          </h2>
          <p style={{ fontSize: '16px', fontWeight: 300, lineHeight: 1.8, color: 'rgba(245,240,232,0.6)', marginBottom: '20px' }}>
            I specialize in building sophisticated digital products across multiple domains. With expertise in web development, AI, and blockchain, I bridge complex technology with real business value.
          </p>
          <p style={{ fontSize: '16px', fontWeight: 300, lineHeight: 1.8, color: 'rgba(245,240,232,0.6)' }}>
            As a freelancer, I bring a <span style={{ color: 'var(--cream)', fontWeight: 500 }}>comprehensive perspective</span> that few developers can offer — from frontend to data pipelines to on-chain systems.
          </p>
        </div>

        {/* Right — expertise */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {expertise.map((item, i) => (
            <div
              key={item.name}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '18px 20px', borderRadius: '8px',
                background: 'rgba(245,240,232,0.04)',
                border: '1px solid rgba(245,240,232,0.08)',
                transition: 'background 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(245,240,232,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(245,240,232,0.04)')}
            >
              <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--cream)' }}>{item.name}</span>
              <span style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 400 }}>{item.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}