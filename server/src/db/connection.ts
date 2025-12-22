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

const schemaPath = path.join(__dirname, 'schema.sql')
const schema = fs.readFileSync(schemaPath, 'utf-8')

db.exec(schema)

console.log(`SQLite database initialized at: ${DB_PATH}`)

export default db
