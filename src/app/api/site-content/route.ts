import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { siteContentTable } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

/**
 * GET /api/site-content?section=hero       → { skills: "...", name: "...", ... }
 * GET /api/site-content?section=about      → { bio: "...", expertise: "[...]", ... }
 * GET /api/site-content                    → all rows as flat array (for dashboard)
 */
export async function GET(req: NextRequest) {
  const section = req.nextUrl.searchParams.get('section')

  if (section && section !== '__all__') {
    // Specific section → return key-value map (used by front-end components)
    const rows = await db.select().from(siteContentTable).where(eq(siteContentTable.section, section)).all()
    const data: Record<string, string> = {}
    for (const r of rows) data[r.key] = r.value
    return NextResponse.json(data)
  }

  // No section or __all__ → return all rows (used by dashboard)
  const rows = await db.select().from(siteContentTable).all()
  return NextResponse.json(rows)
}

export async function PUT(req: NextRequest) {
  const { section, key, value } = await req.json()

  const existing = await db.select().from(siteContentTable)
    .where(and(eq(siteContentTable.section, section), eq(siteContentTable.key, key)))
    .get()

  if (existing) {
    await db.update(siteContentTable).set({ value, updatedAt: new Date().toISOString() })
      .where(and(eq(siteContentTable.section, section), eq(siteContentTable.key, key)))
      .run()
  } else {
    await db.insert(siteContentTable).values({ section, key, value }).run()
  }

  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const { section, key } = await req.json()
  if (!section || !key) {
    return NextResponse.json({ error: 'section and key required' }, { status: 400 })
  }

  await db.delete(siteContentTable)
    .where(and(eq(siteContentTable.section, section), eq(siteContentTable.key, key)))
    .run()

  return NextResponse.json({ ok: true })
}
