import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import type { LibSQLDatabase } from 'drizzle-orm/libsql'

let _db: LibSQLDatabase | null = null

function getDb(): LibSQLDatabase {
  if (!_db) {
    const url = process.env.TURSO_DATABASE_URL
    const authToken = process.env.TURSO_AUTH_TOKEN
    if (!url) {
      throw new Error('TURSO_DATABASE_URL environment variable is not set')
    }
    const client = createClient({ url, authToken })
    _db = drizzle(client)
  }
  return _db
}

// Lazy-initialized proxy — defers client creation to request time,
// so Vercel builds (which lack TURSO_* env vars) don't fail.
export const db = new Proxy({} as LibSQLDatabase, {
  get(_target, prop) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (getDb() as any)[prop]
  },
})
