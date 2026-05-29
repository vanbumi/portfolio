import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { projectsTable } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'

export async function GET() {
  const rows = await db.select().from(projectsTable).orderBy(desc(projectsTable.sortOrder)).all()
  const projects = rows.map((r) => ({
    ...r,
    tags: JSON.parse(r.tags) as string[],
    live: r.liveUrl,
    github: r.githubUrl,
    liveUrl: undefined,
    githubUrl: undefined,
  }))
  return NextResponse.json(projects)
}

export async function POST(req: NextRequest) {
  const { title, desc, tags, liveUrl, githubUrl } = await req.json()

  // Project baru otomatis dapat sortOrder tertinggi → tampil di urutan #1
  const maxRow = await db.select({ max: projectsTable.sortOrder }).from(projectsTable).get()
  const newSort = (maxRow?.max ?? 0) + 1

  const result = await db.insert(projectsTable).values({
    title,
    desc,
    tags: JSON.stringify(tags || []),
    liveUrl: liveUrl || null,
    githubUrl: githubUrl || null,
    sortOrder: newSort,
  }).returning({ id: projectsTable.id }).run()
  return NextResponse.json({ id: result.rows[0]?.id }, { status: 201 })
}
