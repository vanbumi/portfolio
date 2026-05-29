'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

const NAV = [
  { label: 'Overview', href: '/dashboard' },
  { label: 'Projects', href: '/dashboard/projects' },
  { label: 'Testimonials', href: '/dashboard/testimonials' },
  { label: 'Content', href: '/dashboard/site-content' },
]

const BREAKPOINT = 768

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [authorized, setAuthorized] = useState<boolean | null>(null)
  const checkedRef = useRef(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const isLoginPage = pathname === '/dashboard/login'

  // Auth check
  useEffect(() => {
    if (isLoginPage) return
    if (checkedRef.current) return
    checkedRef.current = true

    fetch('/api/auth/check')
      .then((res) => {
        if (res.ok) {
          setAuthorized(true)
        } else {
          setAuthorized(false)
          router.push('/dashboard/login')
        }
      })
      .catch(() => {
        setAuthorized(false)
        router.push('/dashboard/login')
      })
  }, [isLoginPage, router])

  // Responsive detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < BREAKPOINT)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/dashboard/login')
  }

  const handleNavClick = () => {
    setMenuOpen(false)
  }

  // Close menu when clicking overlay
  const handleOverlayClick = () => setMenuOpen(false)

  if (isLoginPage) {
    return <>{children}</>
  }

  if (authorized === null) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0f1c2e', color: '#c4a882' }}>
        Loading...
      </div>
    )
  }

  if (!authorized) return null

  // ── Sidebar content (reused in both desktop sidebar and mobile drawer) ──
  const sidebarContent = (
    <>
      <div style={{ padding: '0 24px', marginBottom: '32px' }}>
        <div style={{ fontSize: '16px', fontWeight: 700, color: '#c4a882', letterSpacing: '-0.01em' }}>Dashboard</div>
        <div style={{ fontSize: '11px', color: 'rgba(245,240,232,0.35)', marginTop: '4px' }}>Portfolio Manager</div>
      </div>
      <nav style={{ flex: 1 }}>
        {NAV.map((item) => {
          const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
          return (
            <Link key={item.href} href={item.href} onClick={handleNavClick} style={{
              display: 'block', padding: '10px 24px', fontSize: '13px', fontWeight: 500,
              color: active ? '#c4a882' : 'rgba(245,240,232,0.55)',
              background: active ? 'rgba(196,168,130,0.08)' : 'transparent',
              textDecoration: 'none', borderLeft: active ? '3px solid #c4a882' : '3px solid transparent',
              transition: 'all 0.15s',
            }}>
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(245,240,232,0.08)' }}>
        <button onClick={handleLogout} style={{
          background: 'transparent', border: '1px solid rgba(245,240,232,0.15)', color: 'rgba(245,240,232,0.55)',
          padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
          width: '100%', fontFamily: 'inherit',
        }}>
          Logout
        </button>
      </div>
    </>
  )

  // ── Burger icon ──
  const burgerLine = (open: boolean, top: boolean, bottom: boolean) => ({
    display: 'block', width: '20px', height: '2px',
    background: '#c4a882', borderRadius: '2px',
    transition: 'all 0.3s ease',
    ...(open && top ? { transform: 'translateY(5.5px) rotate(45deg)' } : {}),
    ...(open && !top && !bottom ? { opacity: 0 } : {}),
    ...(open && bottom ? { transform: 'translateY(-5.5px) rotate(-45deg)' } : {}),
  })

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f0e8', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      {/* ── Desktop Sidebar ── */}
      {!isMobile && (
        <aside style={{
          width: '220px', minWidth: '220px', background: '#0f1c2e', color: '#f5f0e8',
          padding: '28px 0', display: 'flex', flexDirection: 'column',
          borderRight: '1px solid rgba(245,240,232,0.08)',
        }}>
          {sidebarContent}
        </aside>
      )}

      {/* ── Mobile Top Bar ── */}
      {isMobile && (
        <header style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 99,
          background: '#0f1c2e', height: '52px', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between',
          padding: '0 18px', borderBottom: '1px solid rgba(245,240,232,0.08)',
        }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              padding: '6px', display: 'flex', flexDirection: 'column', gap: '4px',
            }}
          >
            <span style={burgerLine(menuOpen, true, false)} />
            <span style={burgerLine(menuOpen, false, false)} />
            <span style={burgerLine(menuOpen, false, true)} />
          </button>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#c4a882', letterSpacing: '-0.01em' }}>
            Dashboard
          </div>
          <div style={{ width: '32px' }} /> {/* spacer for centering */}
        </header>
      )}

      {/* ── Mobile Drawer Overlay ── */}
      {isMobile && menuOpen && (
        <div
          onClick={handleOverlayClick}
          style={{
            position: 'fixed', inset: 0, zIndex: 98,
            background: 'rgba(0,0,0,0.5)',
          }}
        />
      )}

      {/* ── Mobile Drawer ── */}
      {isMobile && (
        <aside style={{
          position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100,
          width: '240px', background: '#0f1c2e', color: '#f5f0e8',
          padding: '16px 0', display: 'flex', flexDirection: 'column',
          borderRight: '1px solid rgba(245,240,232,0.08)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
        }}>
          {/* Close button in drawer */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 16px', marginBottom: '8px' }}>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              style={{
                background: 'transparent', border: 'none', color: 'rgba(245,240,232,0.55)',
                fontSize: '22px', cursor: 'pointer', lineHeight: 1, padding: '4px',
              }}
            >
              ✕
            </button>
          </div>
          {sidebarContent}
        </aside>
      )}

      {/* ── Main Content ── */}
      <main style={{
        flex: 1, padding: isMobile ? '68px 18px 32px' : '32px',
        overflow: 'auto',
      }}>
        {children}
      </main>
    </div>
  )
}
