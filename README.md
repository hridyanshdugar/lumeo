# Portfolio Generator

Make portfolios with JSON. Multiple themes, user accounts, public URLs. Uses SQLite so no database setup needed.

## Quick Start

```bash
npm install
```

Create `.env`:
```env
PORT=3001
JWT_SECRET=whatever-you-want
VITE_API_URL=http://localhost:3001
```

```bash
npm run dev:all
```

Open http://localhost:5173

## How It Works

1. Register an account
2. Edit your portfolio JSON
3. Pick a theme
4. Share at `/your-username`

## API

- `POST /api/auth/register` - sign up
- `POST /api/auth/login` - login
- `GET /api/portfolio/me` - get your portfolio
- `PUT /api/portfolio/me` - update it
- `GET /api/portfolio/public/:username` - view someone's portfolio

## Railway Deployment

1. Push to GitHub
2. Create new project on Railway, connect your repo
3. Add env var: `JWT_SECRET` (set to something random)
4. Add a volume: In Railway dashboard → your service → "Volumes" → "Add Volume" → mount at `/data`
5. Deploy

Railway automatically runs `npm install`, `npm run build`, and `npm start`. The database will be stored in the volume at `/data/portfolio.db` so it persists across deployments.

PS: Without a volume, your database will be wiped on every deploy. Always add a volume for prod.

## Adding Themes

Create `src/themes/YourTheme.tsx` and add it to the themes object in `Dashboard.tsx` and `PublicPortfolio.tsx`.

MIT
