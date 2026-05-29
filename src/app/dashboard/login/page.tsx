'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/dashboard')
    } else {
      setError('Invalid password')
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#0f1c2e', fontFamily: 'Plus Jakarta Sans, sans-serif',
    }}>
      <form onSubmit={handleLogin} style={{
        background: '#1a2d44', padding: '40px 32px', borderRadius: '12px',
        width: '100%', maxWidth: '360px', border: '1px solid rgba(245,240,232,0.08)',
      }}>
        <div style={{ fontSize: '20px', fontWeight: 700, color: '#c4a882', textAlign: 'center', marginBottom: '8px' }}>
          Dashboard Login
        </div>
        <p style={{ fontSize: '12px', color: 'rgba(245,240,232,0.4)', textAlign: 'center', marginBottom: '24px' }}>
          Enter password to access portfolio manager
        </p>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          style={{
            width: '100%', padding: '12px 14px', borderRadius: '8px',
            border: '1.5px solid rgba(245,240,232,0.15)',
            background: 'rgba(245,240,232,0.06)', color: '#f5f0e8',
            fontSize: '14px', outline: 'none', fontFamily: 'inherit',
            boxSizing: 'border-box',
          }}
        />

        {error && (
          <p style={{ color: '#f87171', fontSize: '12px', marginTop: '8px' }}>{error}</p>
        )}

        <button type="submit" disabled={loading || !password} style={{
          width: '100%', marginTop: '16px', padding: '12px',
          borderRadius: '8px', border: 'none',
          background: loading ? '#8a6f4a' : '#c4a882',
          color: '#0f1c2e', fontSize: '14px', fontWeight: 700,
          cursor: loading ? 'not-allowed' : 'pointer',
          fontFamily: 'inherit', transition: 'background 0.2s',
        }}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
