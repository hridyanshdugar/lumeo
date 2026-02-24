import { Response, NextFunction } from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { SubdomainRequest } from './subdomain.js'
import { validateSubdomain } from './subdomain.js'
import { getPublicPortfolioDataBySubdomain } from '../controllers/portfolioController.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT_DOMAIN = process.env.ROOT_DOMAIN || 'withlumeo.com'

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function buildPersonJsonLd(manifest: any, subdomain: string): object {
  const { personalInfo } = manifest
  const url = `https://${subdomain}.${ROOT_DOMAIN}`
  const sameAs: string[] = []
  const links = personalInfo?.links
  if (links) {
    if (links.website) sameAs.push(links.website)
    if (links.github) sameAs.push(links.github)
    if (links.linkedin) sameAs.push(links.linkedin)
    if (links.twitter) sameAs.push(links.twitter)
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo?.name ?? '',
    jobTitle: personalInfo?.title ?? '',
    image: personalInfo?.avatar || undefined,
    url: url,
    ...(sameAs.length > 0 ? { sameAs } : {})
  }
}

function buildMetaTags(manifest: any, subdomain: string): string {
  const { personalInfo } = manifest
  const name = personalInfo?.name ?? 'Portfolio'
  const title = `${name} - Portfolio`
  const description = (personalInfo?.bio || personalInfo?.title || '').slice(0, 160)
  const url = `https://${subdomain}.${ROOT_DOMAIN}`
  const image = personalInfo?.avatar || ''

  const parts: string[] = [
    `<meta name="description" content="${escapeHtml(description)}">`,
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    `<meta property="og:url" content="${escapeHtml(url)}">`,
    `<meta property="og:type" content="profile">`,
    `<link rel="canonical" href="${escapeHtml(url)}">`
  ]
  if (image) {
    parts.push(`<meta property="og:image" content="${escapeHtml(image)}">`)
  }
  parts.push(
    `<meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}">`,
    `<meta name="twitter:title" content="${escapeHtml(title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(description)}">`
  )
  if (image) {
    parts.push(`<meta name="twitter:image" content="${escapeHtml(image)}">`)
  }
  return parts.join('\n    ')
}

/**
 * In production, for GET requests to / with a profile subdomain, serve index.html
 * with injected meta tags and JSON-LD so crawlers get full user info without JS.
 */
export function profileSeoMiddleware(
  frontendDistPath: string
) {
  return function (req: SubdomainRequest, res: Response, next: NextFunction): void {
    if (req.method !== 'GET' || req.path !== '/') {
      return next()
    }
    const subdomain = req.subdomain
    if (!subdomain) return next()
    const validation = validateSubdomain(subdomain)
    if (!validation.valid) return next()

    const data = getPublicPortfolioDataBySubdomain(subdomain)
    if (!data) return next()

    try {
      const indexPath = path.join(frontendDistPath, 'index.html')
      let html = fs.readFileSync(indexPath, 'utf-8')

      const { manifest } = data
      const name = manifest?.personalInfo?.name ?? 'Portfolio'
      const title = `${name} - Portfolio`

      html = html.replace('<title>Lumeo</title>', `<title>${escapeHtml(title)}</title>`)

      const metaTags = buildMetaTags(manifest, subdomain)
      const jsonLd = buildPersonJsonLd(manifest, subdomain)
      const jsonLdScript = `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
      html = html.replace('</head>', `    ${metaTags}\n    ${jsonLdScript}\n  </head>`)

      const noscriptSnippet = `<noscript><p><strong>${escapeHtml(name)}</strong> — ${escapeHtml(manifest?.personalInfo?.title ?? '')}</p><p>${escapeHtml((manifest?.personalInfo?.bio ?? '').slice(0, 300))}</p></noscript>`
      html = html.replace('<div id="root"></div>', `${noscriptSnippet}\n    <div id="root"></div>`)

      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.send(html)
    } catch (err) {
      console.error('Profile SEO middleware error:', err)
      next()
    }
  }
}
