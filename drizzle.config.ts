import dotenv from 'dotenv'
import type { Config } from 'drizzle-kit'

// Explicitly load .env.local (cwd is project root when running drizzle-kit)
dotenv.config({ path: '.env.local' })

export default {
  schema: './src/lib/db/schema.ts',
  out: './drizzle',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
} satisfies Config
