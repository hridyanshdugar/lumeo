import Database from 'better-sqlite3'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getDbPath = () => {
  if (process.env.DB_PATH) {
    return process.env.DB_PATH
  }
  if (process.env.RAILWAY_ENVIRONMENT) {
    return '/data/portfolio.db'
  }
  return path.join(process.cwd(), 'portfolio.db')
}

const DB_PATH = getDbPath()

const db = new Database(DB_PATH, { verbose: console.log })

db.pragma('foreign_keys = ON')

// Check if portfolios table exists and if it has subdomain column
// We need to add the column BEFORE running schema.sql which tries to create an index on it
let needsSubdomainMigration = false
try {
  const tableExists = db.prepare(`
    SELECT name FROM sqlite_master 
    WHERE type='table' AND name='portfolios'
  `).get()
  
  if (tableExists) {
    const tableInfo = db.prepare("PRAGMA table_info(portfolios)").all() as Array<{ name: string }>
    const hasSubdomain = tableInfo.some(col => col.name === 'subdomain')
    needsSubdomainMigration = !hasSubdomain
  }
} catch (error) {
  // Table doesn't exist yet, schema will create it with subdomain
  console.log('Portfolios table does not exist yet, will be created with subdomain column')
}

// If table exists but doesn't have subdomain, add it before running schema
if (needsSubdomainMigration) {
  console.log('Migrating: Adding subdomain column to portfolios table')
  try {
    db.exec('ALTER TABLE portfolios ADD COLUMN subdomain TEXT')
    console.log('Migration completed: subdomain column added')
  } catch (error) {
    console.error('Error adding subdomain column:', error)
  }
}

const schemaPath = path.join(__dirname, 'schema.sql')
const schema = fs.readFileSync(schemaPath, 'utf-8')

// Run schema - this will create tables if they don't exist, or do nothing if they do
db.exec(schema)

// Migration: Set subdomain to username for existing portfolios without subdomain
try {
  const portfoliosWithoutSubdomain = db.prepare(`
    SELECT p.id, p.user_id, u.username
    FROM portfolios p
    JOIN users u ON p.user_id = u.id
    WHERE p.subdomain IS NULL OR p.subdomain = ''
  `).all() as Array<{ id: string; user_id: string; username: string }>
  
  if (portfoliosWithoutSubdomain.length > 0) {
    console.log(`Migrating: Setting subdomain to username for ${portfoliosWithoutSubdomain.length} existing portfolio(s)`)
    const updateStmt = db.prepare('UPDATE portfolios SET subdomain = ? WHERE id = ?')
    
    for (const portfolio of portfoliosWithoutSubdomain) {
      try {
        const usernameLower = portfolio.username.toLowerCase()
        updateStmt.run(usernameLower, portfolio.id)
      } catch (error) {
        // If subdomain already exists (unique constraint), skip this portfolio
        console.warn(`Could not set subdomain for portfolio ${portfolio.id}: ${error}`)
      }
    }
    console.log('Migration completed: subdomain set to username for existing portfolios')
  }
} catch (error) {
  console.error('Post-schema migration error:', error)
}

console.log(`SQLite database initialized at: ${DB_PATH}`)

export default db
