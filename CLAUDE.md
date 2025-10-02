# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio Generator is a multi-user portfolio platform with React + TypeScript frontend and Node.js + Express + PostgreSQL backend. Users register accounts, create portfolios using JSON manifests, choose from multiple themes, and share via public URLs.

## Development Commands

### Full Stack
- `npm install` - Install all dependencies
- `npm run dev:all` - Start both frontend and backend
- `npm run build` - Build frontend for production
- `npm run build:server` - Build backend for production

### Frontend Only
- `npm run dev` - Start Vite dev server (http://localhost:5173)
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend Only
- `npm run dev:server` - Start Express server (http://localhost:3001)

### Database
- **No setup needed!** SQLite database is auto-created on first server start
- Database file: `portfolio.db` in project root
- See DATABASE_SETUP.md for viewing/backup instructions

## Architecture

### System Design

This is a **full-stack multi-user application**:

**Frontend (React SPA)**
- React Router for page navigation
- User authentication with JWT tokens
- API calls to backend for all data operations
- Context API for global state management

**Backend (Express API)**
- RESTful API endpoints
- JWT authentication middleware
- SQLite for persistent storage
- Bcrypt for password hashing

**Database (SQLite)**
- `users` table - User accounts
- `portfolios` table - Portfolio data (JSON as TEXT)
- One-to-one relationship (1 user → 1 portfolio)
- File-based database (portfolio.db)

### Key Directories

**Frontend:**
- `src/pages/` - Page components (HomePage, Dashboard, PublicPortfolio)
- `src/components/` - Reusable components (LoginScreen, RegisterScreen, ManifestEditor, ThemeSwitcher)
- `src/themes/` - Portfolio themes (MinimalTheme, ModernTheme, GradientTheme)
- `src/contexts/` - React Context providers (UserContext)
- `src/services/` - API client (api.ts)
- `src/types/` - TypeScript type definitions

**Backend:**
- `server/src/controllers/` - Request handlers (authController, portfolioController)
- `server/src/routes/` - Route definitions (auth, portfolio)
- `server/src/middleware/` - Auth middleware
- `server/src/db/` - Database connection and schema

### Manifest Schema

The manifest contains five main sections:

```typescript
{
  personalInfo: { name, title, email, bio, links, etc. }
  experience: [{ company, position, dates, achievements, technologies }]
  projects: [{ name, description, technologies, links, highlights }]
  education: [{ institution, degree, field, dates, achievements }]
  skills: [{ category, items[] }]
}
```

All fields use optional chaining for flexibility. See `src/types/manifest.ts` for complete type definitions.

### User Flow

1. **Registration**: User fills form → Backend creates user + default portfolio → JWT returned → User logged in
2. **Login**: Credentials validated → JWT returned → Frontend loads portfolio from API
3. **Dashboard**: User sees their portfolio with edit controls → Can edit manifest or change theme → Changes saved to PostgreSQL
4. **Public View**: Anyone can visit `/:username` → Portfolio loads from API (if public)

### Authentication Flow

- User logs in → Backend returns JWT token
- Frontend stores token in sessionStorage
- All authenticated API requests include `Authorization: Bearer <token>` header
- Middleware validates token before allowing access to protected routes
- Token expires after 24 hours

### Data Flow

**Loading Portfolio:**
```
Frontend → GET /api/portfolio/me (with JWT)
→ Backend validates token
→ Database query
→ Returns portfolio JSON
→ Frontend displays in selected theme
```

**Updating Portfolio:**
```
User edits manifest → Frontend validates JSON
→ PUT /api/portfolio/me (with JWT + new manifest)
→ Backend validates token
→ Database update
→ Frontend updates local state
```

### Theme System

Each theme in `src/themes/` is a React component that:
- Accepts `manifest: PortfolioManifest` as prop
- Renders all sections (header, experience, projects, education, skills)
- Uses Tailwind CSS for styling
- Is completely self-contained

**To add a new theme:**
1. Create `src/themes/YourTheme.tsx`
2. Add to themes object in `src/pages/Dashboard.tsx` and `src/pages/PublicPortfolio.tsx`
3. Update ThemeName type in `src/App.tsx`

## Common Development Tasks

### Adding New API Endpoints

1. **Create controller function** in `server/src/controllers/`
2. **Add route** in `server/src/routes/`
3. **Update API client** in `src/services/api.ts`
4. **Use in components** via UserContext or direct API calls

### Adding Manifest Fields

1. Update `src/types/manifest.ts` TypeScript interfaces
2. Update database default manifest in `server/src/controllers/authController.ts`
3. Update all theme components to display new fields
4. Test with real data

### Modifying Database Schema

1. Edit `server/src/db/schema.sql`
2. For existing databases, delete `portfolio.db` and restart server (fresh schema)
3. For data preservation, manually migrate data before deleting
4. Update TypeScript types if needed

### Environment Variables

**Frontend** (prefix with `VITE_`):
- `VITE_API_URL` - Backend API URL

**Backend:**
- `PORT` - Server port
- `JWT_SECRET` - Token signing key (CHANGE IN PRODUCTION!)
- `DB_PATH` - SQLite database file path (optional, defaults to `./portfolio.db`)

### Testing Locally

1. `.env` file is configured (optional for defaults)
2. Run `npm run dev:all`
3. Database is auto-created on first run
4. Visit http://localhost:5173

## File Structure

```
portfolio-gen/
├── server/                    # Backend
│   └── src/
│       ├── controllers/       # Request handlers
│       ├── routes/           # API routes
│       ├── middleware/       # Auth middleware
│       └── db/               # Database config
├── src/                       # Frontend
│   ├── pages/                # Page components
│   ├── components/           # Reusable UI
│   ├── themes/               # Portfolio themes
│   ├── contexts/             # React Context
│   ├── services/             # API client
│   └── types/                # TypeScript types
├── DATABASE_SETUP.md         # DB setup guide
├── SECURITY.md               # Security notes
└── README.md                 # User documentation
```

## Important Notes

- **Authentication is required** to edit portfolios (not just browse)
- **Each user has ONE portfolio** (enforced by database unique constraint)
- **Portfolio data is stored as JSON TEXT** in SQLite
- **SQLite database** is a single file (`portfolio.db`) - easy to backup/move
- **Public portfolios** are accessible via `/:username` route
- **JWT tokens expire** after 24 hours
- **Passwords are hashed** with bcrypt before storage
- **Database auto-initializes** on first server start (no manual setup)

## Database Notes

### SQLite vs PostgreSQL

This project uses SQLite instead of PostgreSQL for:
- ✅ Zero configuration - no database server to install
- ✅ File-based - entire database in one portable file
- ✅ Perfect for development and small-to-medium deployments
- ✅ Built-in with better-sqlite3 package

**When to switch to PostgreSQL:**
- More than 100K users
- High concurrent write traffic
- Need for advanced features (full-text search, replication)
- Multi-server deployment

### Working with SQLite

**View database:**
```bash
sqlite3 portfolio.db
.tables
SELECT * FROM users;
.quit
```

**Backup:**
```bash
cp portfolio.db backup/portfolio_$(date +%Y%m%d).db
```

**Reset:**
```bash
rm portfolio.db
npm run dev:server  # Auto-recreates
```
