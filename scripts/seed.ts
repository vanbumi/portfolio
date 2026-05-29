import dotenv from 'dotenv'
import path from 'path'

// Load .env.local from project root
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import { projectsTable, testimonialsTable, siteContentTable } from '../src/lib/db/schema'
import { projects } from '../src/data/projects'

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
})

const db = drizzle(client)

const expertise = [
  { name: 'Full-Stack Web Development', tag: 'Next.js · TypeScript · Tailwind' },
  { name: 'Python Automation', tag: 'Pandas · NumPy · Pipeline' },
  { name: 'Blockchain & Web3', tag: 'DeFi · Smart Contracts' },
  { name: 'Data Analytics & BI', tag: 'Matplotlib · Power BI · SQL' },
  { name: 'Forex & Crypto Trading', tag: 'TradingView · Backtesting' },
]

const skills = [
  'Next.js & TypeScript', 'Python Automation', 'Blockchain & DeFi',
  'Data Analytics', 'Forex & Crypto Trading',
]

const bio = 'With 5+ years of experience, I build scalable web applications and efficient automation tools. Proficient in Python, Next.js, TypeScript, and Tailwind CSS. Extensive experience integrating real-time databases like Firebase and Supabase, developing digital ecosystems from QR-based service systems to professional portfolio hubs.'

const testimonials = [
  { text: 'Widyo built our QR menu system from scratch and delivered ahead of schedule. The app is fast, easy for staff to use, and customers love it. Highly recommended!', name: 'Budi Santoso', role: 'Owner, Warung Nusantara', initial: 'B' },
  { text: 'The data automation pipeline saved our team 20+ hours per week. Complex Python scripts made simple and reliable. Very professional and responsive throughout.', name: 'Dewi Rahayu', role: 'Operations Manager, PT DataTech', initial: 'D' },
  { text: 'Our crypto dashboard is exactly what we envisioned. Real-time data, clean UI, and the chart integration is smooth. Delivered beyond expectations.', name: 'Kevin Lim', role: 'Founder, CryptoTrack ID', initial: 'K' },
  { text: 'Excellent work on our financial automation hub. A rare combination of technical depth and business understanding. The system runs flawlessly.', name: 'Rina Maharani', role: 'CFO, Investindo Group', initial: 'R' },
]

async function seed() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await db.delete(projectsTable).run()
  await db.delete(testimonialsTable).run()
  await db.delete(siteContentTable).run()

  // Seed projects — sortOrder tertinggi = tampil pertama
  // Urutan sesuai docs/Urutan-project-portfolio.txt: 01 LinkTo → ... → 23 Crypto Portfolio Tracker
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i]
    await db.insert(projectsTable).values({
      title: p.title,
      desc: p.desc,
      tags: JSON.stringify(p.tags),
      liveUrl: p.live,
      githubUrl: p.github,
      sortOrder: projects.length - 1 - i,  // 01 LinkTo = 22 (tertinggi), 23 Crypto = 0 (terendah)
    }).run()
  }
  console.log(`✅ ${projects.length} projects seeded`)

  // Seed testimonials
  for (let i = 0; i < testimonials.length; i++) {
    const t = testimonials[i]
    await db.insert(testimonialsTable).values({
      text: t.text,
      name: t.name,
      role: t.role,
      initial: t.initial,
      sortOrder: i,
    }).run()
  }
  console.log(`✅ ${testimonials.length} testimonials seeded`)

  // ── Seed site content - hero ──────────────────────────────────
  await db.insert(siteContentTable).values({ section: 'hero', key: 'skills', value: JSON.stringify(skills) }).run()
  await db.insert(siteContentTable).values({ section: 'hero', key: 'name', value: 'S. Widyo Bumi' }).run()
  await db.insert(siteContentTable).values({ section: 'hero', key: 'tagline', value: 'Full-Stack Developer & Automation Specialist.' }).run()
  await db.insert(siteContentTable).values({ section: 'hero', key: 'description', value: 'Building scalable web apps and efficient automation tools using Next.js, Python, and TypeScript.' }).run()
  await db.insert(siteContentTable).values({ section: 'hero', key: 'badge', value: 'Available for Projects' }).run()
  await db.insert(siteContentTable).values({ section: 'hero', key: 'cta_primary', value: 'View Projects' }).run()
  await db.insert(siteContentTable).values({ section: 'hero', key: 'cta_secondary', value: "Let's Talk" }).run()
  await db.insert(siteContentTable).values({ section: 'hero', key: 'photo_url', value: '/profile.jpg' }).run()
  await db.insert(siteContentTable).values({ section: 'hero', key: 'heading', value: 'Building digital products that <span style="color: var(--accent)">matter.</span>' }).run()
  console.log('✅ Hero content seeded')

  // ── Seed site content - about ─────────────────────────────────
  await db.insert(siteContentTable).values({ section: 'about', key: 'bio', value: bio }).run()
  await db.insert(siteContentTable).values({ section: 'about', key: 'expertise', value: JSON.stringify(expertise) }).run()
  await db.insert(siteContentTable).values({ section: 'about', key: 'title', value: 'Full-Stack Developer &<br />Automation Engineer.' }).run()
  await db.insert(siteContentTable).values({ section: 'about', key: 'paragraph2', value: 'Extensive experience integrating real-time databases like Firebase and Supabase, developing digital ecosystems from QR-based service systems to professional portfolio hubs.' }).run()
  console.log('✅ About content seeded')

  // ── Seed site content - contact ───────────────────────────────
  await db.insert(siteContentTable).values({ section: 'contact', key: 'title', value: "Let's build something great." }).run()
  await db.insert(siteContentTable).values({ section: 'contact', key: 'description', value: "Have a project in mind? Fill in the form and I'll get back to you within 24 hours." }).run()
  await db.insert(siteContentTable).values({ section: 'contact', key: 'emailjs_service_id', value: 'service_8b664y1' }).run()
  await db.insert(siteContentTable).values({ section: 'contact', key: 'emailjs_template_id', value: 'template_o7h8nks' }).run()
  await db.insert(siteContentTable).values({ section: 'contact', key: 'emailjs_public_key', value: 'J7h3ENEWcHViRiaMj' }).run()
  await db.insert(siteContentTable).values({ section: 'contact', key: 'email_to', value: 'jsp.dio@gmail.com' }).run()
  console.log('✅ Contact content seeded')

  // ── Seed site content - footer ────────────────────────────────
  await db.insert(siteContentTable).values({ section: 'footer', key: 'copyright', value: '© 2025 S. Widyo Bumi. All rights reserved.' }).run()
  await db.insert(siteContentTable).values({ section: 'footer', key: 'links', value: JSON.stringify([
    { label: 'LinkedIn', href: 'https://linkedin.com/in/widyobumi' },
    { label: 'GitHub', href: 'https://github.com/vanbumi' },
    { label: 'Email', href: 'mailto:jsp.dio@gmail.com' },
    { label: 'Dashboard', href: '/dashboard' },
  ]) }).run()
  console.log('✅ Footer content seeded')

  console.log('\n🎉 Database seeded successfully!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
