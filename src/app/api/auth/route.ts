import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  if (password === process.env.DASHBOARD_PASSWORD) {
    const response = NextResponse.json({ ok: true })
    response.cookies.set('dashboard_token', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    })
    return response
  }

  return NextResponse.json({ ok: false, error: 'Invalid password' }, { status: 401 })
}
