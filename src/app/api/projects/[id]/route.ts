import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { projectsTable } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const row = await db.select().from(projectsTable).where(eq(projectsTable.id, parseInt(id))).get()
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const project = { ...row, tags: JSON.parse(row.tags), live: row.liveUrl, github: row.githubUrl }
  return NextResponse.json(project)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { title, desc, tags, liveUrl, githubUrl, sortOrder } = await req.json()

  const updateData: Record<string, unknown> = {
    title,
    desc,
    tags: JSON.stringify(tags || []),
    liveUrl: liveUrl || null,
    githubUrl: githubUrl || null,
    updatedAt: new Date().toISOString(),
  }

  if (sortOrder !== undefined) {
    updateData.sortOrder = sortOrder
  }

  await db.update(projectsTable).set(updateData).where(eq(projectsTable.id, parseInt(id))).run()

  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await db.delete(projectsTable).where(eq(projectsTable.id, parseInt(id))).run()
  return NextResponse.json({ ok: true })
}
