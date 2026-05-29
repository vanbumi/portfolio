import { sqliteTable, text, integer, unique } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

// ─── Projects ──────────────────────────────────────────────
export const projectsTable = sqliteTable('projects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  desc: text('desc').notNull(),
  tags: text('tags').notNull().default('[]'),       // JSON array string
  liveUrl: text('live_url'),
  githubUrl: text('github_url'),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: text('created_at').default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').default(sql`(datetime('now'))`),
})

// ─── Testimonials ──────────────────────────────────────────
export const testimonialsTable = sqliteTable('testimonials', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  text: text('text').notNull(),
  name: text('name').notNull(),
  role: text('role').notNull(),
  initial: text('initial').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: text('created_at').default(sql`(datetime('now'))`),
})

// ─── Site Content (hero skills, about bio/expertise) ──────
export const siteContentTable = sqliteTable('site_content', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  section: text('section').notNull(),   // 'hero' | 'about'
  key: text('key').notNull(),           // 'skills' | 'bio' | 'expertise'
  value: text('value').notNull(),       // JSON array or plain text
  updatedAt: text('updated_at').default(sql`(datetime('now'))`),
}, (t) => [
  unique().on(t.section, t.key),
])
