import Database from 'better-sqlite3'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Database file path
const DB_PATH = process.env.DB_PATH || path.join(process.cwd(), 'portfolio.db')

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
