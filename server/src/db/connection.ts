import Database from 'better-sqlite3'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Database file path
// Use Railway volume mount if available, otherwise use current directory
const getDbPath = () => {
  if (process.env.DB_PATH) {
    return process.env.DB_PATH
  }
  // Railway volumes are mounted at /data
  // Use /data if we're on Railway (they set RAILWAY_ENVIRONMENT)
  if (process.env.RAILWAY_ENVIRONMENT) {
    return '/data/portfolio.db'
  }
  // Fallback to project root for local development
  return path.join(process.cwd(), 'portfolio.db')
}

const DB_PATH = getDbPath()

// Create database connection
const db = new Database(DB_PATH, { verbose: console.log })

// Enable foreign keys
db.pragma('foreign_keys = ON')

// Initialize database schema
const schemaPath = path.join(__dirname, 'schema.sql')
const schema = fs.readFileSync(schemaPath, 'utf-8')

// Execute schema
db.exec(schema)

console.log(`SQLite database initialized at: ${DB_PATH}`)

export default db
