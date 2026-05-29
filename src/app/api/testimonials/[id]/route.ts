import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { testimonialsTable } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { text, name, role, initial, sortOrder } = await req.json()

  await db.update(testimonialsTable).set({
    text, name, role, initial, sortOrder: sortOrder ?? 0,
  }).where(eq(testimonialsTable.id, parseInt(id))).run()

  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await db.delete(testimonialsTable).where(eq(testimonialsTable.id, parseInt(id))).run()
  return NextResponse.json({ ok: true })
}
