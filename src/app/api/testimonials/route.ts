import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { testimonialsTable } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'

export async function GET() {
  const rows = await db.select().from(testimonialsTable).orderBy(desc(testimonialsTable.sortOrder)).all()
  return NextResponse.json(rows)
}

export async function POST(req: NextRequest) {
  const { text, name, role, initial, sortOrder } = await req.json()
  const result = await db.insert(testimonialsTable).values({
    text, name, role, initial, sortOrder: sortOrder ?? 0,
  }).returning({ id: testimonialsTable.id }).run()
  return NextResponse.json({ id: result.rows[0]?.id }, { status: 201 })
}
