# Database Setup Guide

## SQLite Database

This project uses **SQLite** for the database - a lightweight, file-based database that requires no installation or configuration!

### Benefits of SQLite

- ✅ **Zero Configuration**: No database server to install or configure
- ✅ **File-Based**: All data stored in a single `portfolio.db` file
- ✅ **Portable**: Move the database by copying the file
- ✅ **Perfect for Development**: No complex setup required
- ✅ **Production Ready**: Works great for small-to-medium apps

## Setup (Automatic)

**Good news!** The database is automatically created when you start the server. No manual setup required!

```bash
npm run dev:server
```

This will:
1. Create `portfolio.db` in your project root (if it doesn't exist)
2. Initialize the schema (users and portfolios tables)
3. Start the API server

## Database Location

By default, the database file is created at:
```
portfolio-gen/portfolio.db
```

You can customize the location by setting `DB_PATH` in your `.env` file:
```env
DB_PATH=./data/portfolio.db
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

### Portfolios Table
```sql
CREATE TABLE portfolios (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL UNIQUE,
    theme TEXT DEFAULT 'minimal',
    manifest TEXT NOT NULL,  -- JSON stored as TEXT
    is_public INTEGER DEFAULT 1,  -- SQLite uses INTEGER for boolean
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## Viewing Database Contents

### Option 1: SQLite CLI
```bash
# Open database
sqlite3 portfolio.db

# List tables
.tables

# View users
SELECT * FROM users;

# View portfolios
SELECT id, user_id, theme, is_public FROM portfolios;

# Exit
.quit
```

### Option 2: DB Browser for SQLite (GUI)
1. Download from: https://sqlitebrowser.org/
2. Open `portfolio.db` file
3. Browse data visually

### Option 3: VS Code Extension
Install "SQLite Viewer" or "SQLite" extension in VS Code to view the database directly in your editor.

## Resetting the Database

To start fresh, simply delete the database file:

```bash
# Stop the server first
rm portfolio.db

# Restart the server - database will be recreated
npm run dev:server
```

## Backup

To backup your data, just copy the database file:

```bash
cp portfolio.db portfolio_backup_$(date +%Y%m%d).db
```

## Migration from Development to Production

### Option 1: Copy the database file
```bash
# Local
scp portfolio.db user@server:/path/to/app/

# Server
# Database is ready to use!
```

### Option 2: Export/Import SQL
```bash
# Export
sqlite3 portfolio.db .dump > backup.sql

# Import (on new machine)
sqlite3 new_portfolio.db < backup.sql
```

## Production Considerations

SQLite is suitable for production when:
- ✅ You have fewer than 100K users
- ✅ Moderate write traffic
- ✅ Single server deployment
- ✅ Simple backup requirements

For larger scale applications, consider:
- PostgreSQL
- MySQL
- MongoDB

But for most portfolio websites, SQLite is perfect!

## Common SQLite Commands

```bash
# Create backup
sqlite3 portfolio.db ".backup backup.db"

# Show schema
sqlite3 portfolio.db ".schema"

# Export to CSV
sqlite3 portfolio.db -header -csv "SELECT * FROM users;" > users.csv

# Compact database
sqlite3 portfolio.db "VACUUM;"
```

## Troubleshooting

### Database locked
- Stop the server
- Make sure no other process is accessing the database
- Restart the server

### Permission denied
```bash
chmod 644 portfolio.db
```

### Corrupted database
```bash
# Try to recover
sqlite3 portfolio.db ".recover" | sqlite3 recovered.db

# Or restore from backup
cp portfolio_backup.db portfolio.db
```

## No Installation Required!

Unlike PostgreSQL or MySQL, SQLite requires no installation. It's included with Node.js through the `better-sqlite3` package, which is already in your dependencies.

Just run `npm install` and you're ready to go! 🚀
