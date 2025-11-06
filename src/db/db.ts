import { join, resolve } from 'node:path'
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import { migrate } from 'drizzle-orm/libsql/migrator'
import { app } from 'electron'
import * as schema from './schema'

const dbFileName = process.env.DATABASE_URL!
const dbFilePath = app.isPackaged
  ? join(resolve(app.getPath('userData')), dbFileName)
  : join(resolve(), dbFileName)

const migrationsFolder = app.isPackaged
  ? join(resolve(process.resourcesPath), 'migrations')
  : join(resolve(), 'migrations')

export function createDatabase() {
  const client = createClient({ url: `file:${dbFilePath}` })
  return drizzle({ client, schema })
}

export const db = createDatabase()

export async function runMigrations() {
  migrate(db, { migrationsFolder })
}
