import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/auth.js'
import portfolioRoutes from './routes/portfolio.js'
import sitemapRoutes from './routes/sitemap.js'
import { extractSubdomain } from './middleware/subdomain.js'
import { profileSeoMiddleware } from './middleware/profileSeo.js'
import { canonicalRedirect } from './middleware/canonicalRedirect.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Trust proxy for accurate host header (needed for Railway/deployment)
app.set('trust proxy', true)

// Canonical URL redirects (http→https, www→apex) so sitemap URL is the one Google indexes
app.use(canonicalRedirect)

app.use(cors())
app.use(express.json())

// Extract subdomain from all requests
app.use(extractSubdomain)

app.use('/api/auth', authRoutes)
app.use('/api/portfolio', portfolioRoutes)
app.use('/', sitemapRoutes)

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Debug: see what host/subdomain the server receives (for Cloudflare/routing). Remove or guard in prod if desired.
app.get('/_host-debug', (req, res) => {
  const subReq = req as express.Request & { subdomain?: string }
  res.json({
    host: req.get('host') ?? null,
    xForwardedHost: req.get('x-forwarded-host') ?? null,
    subdomain: subReq.subdomain ?? null,
    nodeEnv: process.env.NODE_ENV ?? null
  })
})

if (process.env.NODE_ENV === 'production') {
  const frontendDistPath = path.join(__dirname, '../../dist')
  app.use(express.static(frontendDistPath))

  app.use(profileSeoMiddleware(frontendDistPath))

  app.use((req, res, next) => {
    if (req.path.startsWith('/api/')) {
      return next()
    }
    if (req.method === 'GET') {
      res.sendFile(path.join(frontendDistPath, 'index.html'), (err) => {
        if (err) {
          next(err)
        }
      })
    } else {
      next()
    }
  })
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  if (process.env.NODE_ENV === 'production') {
    console.log('Serving static files from dist/')
  }
})
