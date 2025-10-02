# Portfolio Generator

A multi-user portfolio website platform with PostgreSQL backend. Users can register, create stunning portfolios using JSON, switch between themes, and share their work via public URLs.

## Features

- ✨ **Multi-User System**: Register and manage your own portfolio
- 🎨 **Multiple Themes**: Choose from Minimal, Modern, and Gradient themes
- 🔐 **Secure Authentication**: JWT-based auth with bcrypt password hashing
- 📝 **JSON-Based Content**: Easy-to-edit portfolio data
- 🗄️ **PostgreSQL Database**: Persistent storage for all user data
- 🌐 **Public Portfolios**: Share your work via username URLs
- 📱 **Responsive Design**: All themes are mobile-friendly
- ⚡ **Real-time Updates**: Instant preview of changes

## Tech Stack

### Frontend
- React 18 + TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Vite for build tooling

### Backend
- Node.js + Express
- SQLite database (zero configuration!)
- JWT authentication
- Bcrypt for password hashing

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- That's it! (SQLite is built-in, no database installation needed)

### 1. Clone and Install

```bash
git clone <repo-url>
cd portfolio-gen
npm install
```

### 2. Environment Configuration

```bash
cp .env.example .env
```

Edit `.env` with your settings:
```env
# Frontend
VITE_API_URL=http://localhost:3001

# Backend
PORT=3001
JWT_SECRET=your-secret-key-here

# Database (optional - defaults to ./portfolio.db)
DB_PATH=./portfolio.db
```

### 3. Run the Application

**No database setup required!** The SQLite database is created automatically on first run.

**Option 1: Run everything together**
```bash
npm run dev:all
```

**Option 2: Run separately**

Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend):
```bash
npm run dev:server
```

### 4. Access the App

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- Database: `portfolio.db` file in project root

## Usage

### Creating an Account

1. Visit http://localhost:5173
2. Click "Get Started Free"
3. Fill in your username, email, and password
4. You'll be automatically logged in to your dashboard

### Editing Your Portfolio

1. Click "✏️ Edit Portfolio" button
2. Edit the JSON manifest with your information
3. Click "Save Changes"
4. Your portfolio updates instantly!

### Changing Themes

1. Use the theme switcher in the top-right
2. Choose from Minimal, Modern, or Gradient
3. Your preference is saved automatically

### Sharing Your Portfolio

Your portfolio is available at: `http://localhost:5173/your-username`

Example: `http://localhost:5173/johndoe`

## Portfolio Data Structure

```json
{
  "personalInfo": {
    "name": "Your Name",
    "title": "Your Title",
    "email": "your@email.com",
    "bio": "About you",
    "links": {
      "github": "https://github.com/you",
      "linkedin": "https://linkedin.com/in/you"
    }
  },
  "experience": [...],
  "projects": [...],
  "education": [...],
  "skills": [...]
}
```

See `manifest.json` for a complete example.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Portfolio
- `GET /api/portfolio/me` - Get your portfolio (authenticated)
- `PUT /api/portfolio/me` - Update your portfolio (authenticated)
- `GET /api/portfolio/public/:username` - Get public portfolio
- `GET /api/portfolio/public` - List all public portfolios

## Development Scripts

- `npm run dev` - Start frontend dev server
- `npm run dev:server` - Start backend dev server
- `npm run dev:all` - Start both frontend and backend
- `npm run build` - Build frontend for production
- `npm run build:server` - Build backend for production
- `npm run lint` - Lint code

## Adding New Themes

1. Create `src/themes/YourTheme.tsx`:
```tsx
import { PortfolioManifest } from '../types/manifest'

export default function YourTheme({ manifest }: { manifest: PortfolioManifest }) {
  // Your theme JSX
}
```

2. Add to `src/pages/Dashboard.tsx` and `src/pages/PublicPortfolio.tsx`:
```tsx
import YourTheme from '../themes/YourTheme'

const themes = {
  minimal: MinimalTheme,
  modern: ModernTheme,
  gradient: GradientTheme,
  yourtheme: YourTheme, // Add here
}
```

## Security Notes

See [SECURITY.md](./SECURITY.md) for important security information.

**Current implementation includes:**
- Password hashing with bcrypt
- JWT token authentication
- Session management
- Protected API endpoints

**For production, you must:**
- Use HTTPS
- Set strong JWT_SECRET
- Configure CORS properly
- Add rate limiting
- Implement proper backup strategy

## Deployment

### Database
- **SQLite**: Copy `portfolio.db` file to your server
- For larger scale, consider migrating to PostgreSQL/MySQL
- Backup regularly: `cp portfolio.db backup/portfolio_$(date +%Y%m%d).db`

### Backend
- Deploy to Railway, Render, or any Node.js hosting
- Include `portfolio.db` file or set `DB_PATH` in environment
- Set environment variables
- Build: `npm run build:server`

### Frontend
- Deploy to Vercel, Netlify, or Cloudflare Pages
- Set `VITE_API_URL` to your backend URL
- Build: `npm run build`

### All-in-One Deployment
- Use platforms like Railway or Render that can host both frontend and backend
- SQLite makes deployment simpler (no separate database service needed)

## Troubleshooting

See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for database-specific issues.

**Common issues:**
- **Port already in use**: Change `PORT` in `.env`
- **Database locked**: Stop the server and restart it
- **CORS errors**: Ensure `VITE_API_URL` matches backend URL
- **Database not found**: Make sure the server has write permissions in the project directory

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use for personal or commercial projects!
