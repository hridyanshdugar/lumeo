import { Router } from 'express'
import db from '../db/connection.js'

const router = Router()

const ROOT_DOMAIN = process.env.ROOT_DOMAIN || 'withlumeo.com'
const BASE_URL = process.env.BASE_URL || `https://${ROOT_DOMAIN}`

router.get('/robots.txt', (_req, res) => {
  res.type('text/plain')
  res.send(`User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`)
})

router.get('/sitemap.xml', (req, res) => {
  try {
    const portfolios = db
      .prepare(
        `SELECT p.subdomain, p.updated_at
         FROM portfolios p
         WHERE p.is_public = 1 AND p.subdomain IS NOT NULL AND p.subdomain != ''`
      )
      .all() as Array<{ subdomain: string; updated_at: string }>

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${BASE_URL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Public portfolios (subdomain URLs) -->
${portfolios
  .map(
    (portfolio) => `  <url>
    <loc>https://${portfolio.subdomain}.${ROOT_DOMAIN}</loc>
    <lastmod>${new Date(portfolio.updated_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

    res.header('Content-Type', 'application/xml')
    res.send(sitemap)
  } catch (error) {
    console.error('Error generating sitemap:', error)
    res.status(500).send('Error generating sitemap')
  }
})

export default router
