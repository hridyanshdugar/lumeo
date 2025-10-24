import { Router } from 'express'
import db from '../db/connection.js'

const router = Router()

router.get('/sitemap.xml', (req, res) => {
  try {
    // Get the base URL from the request or environment variable
    const protocol = req.protocol
    const host = req.get('host')
    const baseUrl = process.env.BASE_URL || `${protocol}://${host}`

    // Get all public portfolios from database
    const portfolios = db
      .prepare(
        `SELECT u.username, p.updated_at
         FROM portfolios p
         JOIN users u ON p.user_id = u.id
         WHERE p.is_public = 1`
      )
      .all() as Array<{ username: string; updated_at: string }>

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Public portfolios -->
${portfolios
  .map(
    (portfolio) => `  <url>
    <loc>${baseUrl}/${portfolio.username}</loc>
    <lastmod>${new Date(portfolio.updated_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

    // Set correct content type and send XML
    res.header('Content-Type', 'application/xml')
    res.send(sitemap)
  } catch (error) {
    console.error('Error generating sitemap:', error)
    res.status(500).send('Error generating sitemap')
  }
})

export default router
