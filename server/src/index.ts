import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/auth.js'
import portfolioRoutes from './routes/portfolio.js'
import sitemapRoutes from './routes/sitemap.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/portfolio', portfolioRoutes)
app.use('/', sitemapRoutes)

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

if (process.env.NODE_ENV === 'production') {
  const frontendDistPath = path.join(__dirname, '../../dist')
  app.use(express.static(frontendDistPath))
  
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
