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

function buildFullProfileJsonLd(manifest: any, subdomain: string): object {
  const { personalInfo, experience = [], projects = [], education = [], skills = [] } = manifest
  const url = `https://${subdomain}.${ROOT_DOMAIN}`
  const sameAs: string[] = []
  const links = personalInfo?.links
  if (links) {
    if (links.website) sameAs.push(links.website)
    if (links.github) sameAs.push(links.github)
    if (links.linkedin) sameAs.push(links.linkedin)
    if (links.twitter) sameAs.push(links.twitter)
  }

  const person: Record<string, unknown> = {
    '@type': 'Person',
    name: personalInfo?.name ?? '',
    jobTitle: personalInfo?.title ?? '',
    image: personalInfo?.avatar || undefined,
    url,
    ...(sameAs.length > 0 ? { sameAs } : {})
  }

  if (experience?.length > 0) {
    person.worksFor = experience.map((exp: { company: string; position: string; startDate: string; endDate?: string }) => ({
      '@type': 'Organization',
      name: exp.company,
      description: exp.position,
      ...(exp.startDate && { startDate: exp.startDate }),
      ...(exp.endDate && { endDate: exp.endDate })
    }))
  }
  if (education?.length > 0) {
    person.alumniOf = education.map((edu: { institution: string; degree: string; field: string }) => ({
      '@type': 'CollegeOrUniversity',
      name: edu.institution,
      description: `${edu.degree} in ${edu.field}`
    }))
  }
  const skillItems = skills?.flatMap((s: { items: string[] }) => s.items || []) || []
  if (skillItems.length > 0) {
    person.knowsAbout = [...new Set(skillItems)].slice(0, 50)
  }

  const graph: object[] = [
    { '@context': 'https://schema.org', ...person }
  ]

  if (projects?.length > 0) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Projects',
      numberOfItems: projects.length,
      itemListElement: projects.slice(0, 20).map((p: { name: string; description: string; links?: { demo?: string } }, i: number) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'CreativeWork',
          name: p.name,
          description: (p.description || '').slice(0, 500),
          ...(p.links?.demo && { url: p.links.demo })
        }
      }))
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}

function buildMetaTags(manifest: any, subdomain: string): string {
  const { personalInfo } = manifest
  const name = personalInfo?.name ?? 'Portfolio'
  const title = `${name} - Portfolio`
  const rawDesc = (personalInfo?.bio || personalInfo?.title || '').trim()
  const description = rawDesc ? rawDesc.slice(0, 160) : `About ${name}`
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

function truncate(str: string, max: number): string {
  if (!str || typeof str !== 'string') return ''
  return str.length <= max ? str : str.slice(0, max) + '…'
}

function buildNoscriptFullProfile(manifest: any): string {
  const { personalInfo = {}, experience = [], projects = [], education = [], skills = [] } = manifest
  const name = personalInfo?.name ?? 'Portfolio'
  const jobTitle = personalInfo?.title ?? ''
  const bio = truncate(personalInfo?.bio ?? '', 500)
  const parts: string[] = [
    '<noscript>',
    '<article class="profile-seo-content" style="max-width:720px;margin:0 auto;padding:1.5rem;font-family:system-ui,sans-serif;line-height:1.5;color:#1a1a1a;">',
    `<header><h1 style="margin:0 0 0.25rem 0;font-size:1.75rem;">${escapeHtml(name)}</h1>`,
    jobTitle ? `<p style="margin:0 0 1rem 0;font-size:1rem;color:#555;">${escapeHtml(jobTitle)}</p>` : '',
    bio ? `<p style="margin:0 0 1.5rem 0;">${escapeHtml(bio)}</p></header>` : '</header>'
  ]

  if (experience?.length > 0) {
    parts.push('<section style="margin-bottom:1.5rem;"><h2 style="margin:0 0 0.5rem 0;font-size:1.25rem;">Experience</h2><ul style="margin:0;padding-left:1.25rem;">')
    for (const exp of experience.slice(0, 10)) {
      const range = exp.endDate ? `${exp.startDate} – ${exp.endDate}` : exp.startDate
      const line = `${escapeHtml(exp.position)} at ${escapeHtml(exp.company)} (${escapeHtml(range)}). ${truncate(exp.description, 200)}`
      parts.push(`<li style="margin-bottom:0.5rem;">${line}</li>`)
    }
    parts.push('</ul></section>')
  }

  if (projects?.length > 0) {
    parts.push('<section style="margin-bottom:1.5rem;"><h2 style="margin:0 0 0.5rem 0;font-size:1.25rem;">Projects</h2><ul style="margin:0;padding-left:1.25rem;">')
    for (const p of projects.slice(0, 15)) {
      const desc = truncate(p.description || '', 150)
      parts.push(`<li style="margin-bottom:0.5rem;"><strong>${escapeHtml(p.name)}</strong> — ${escapeHtml(desc)}</li>`)
    }
    parts.push('</ul></section>')
  }

  if (skills?.length > 0) {
    const flat = skills.flatMap((s: { category: string; items: string[] }) => (s.items || []).map((i: string) => (s.category ? `${i} (${s.category})` : i)))
    const unique = [...new Set(flat)].slice(0, 30)
    if (unique.length > 0) {
      parts.push('<section style="margin-bottom:1.5rem;"><h2 style="margin:0 0 0.5rem 0;font-size:1.25rem;">Skills</h2>')
      parts.push(`<p style="margin:0;">${escapeHtml(unique.join(', '))}</p></section>`)
    }
  }

  if (education?.length > 0) {
    parts.push('<section style="margin-bottom:1.5rem;"><h2 style="margin:0 0 0.5rem 0;font-size:1.25rem;">Education</h2><ul style="margin:0;padding-left:1.25rem;">')
    for (const edu of education.slice(0, 5)) {
      const line = `${escapeHtml(edu.degree)} in ${escapeHtml(edu.field)} — ${escapeHtml(edu.institution)}${edu.endDate ? ` (${edu.endDate})` : ''}`
      parts.push(`<li style="margin-bottom:0.5rem;">${line}</li>`)
    }
    parts.push('</ul></section>')
  }

  parts.push('</article></noscript>')
  return parts.filter(Boolean).join('\n')
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
      // Remove default Lumeo meta so profile description/title are the only ones
      html = html.replace(/<meta name="description" content="[^"]*" \/>\s*/g, '')
      html = html.replace(/<meta property="og:title" content="[^"]*" \/>\s*/g, '')
      html = html.replace(/<meta property="og:description" content="[^"]*" \/>\s*/g, '')
      html = html.replace(/<meta property="og:type" content="[^"]*" \/>\s*/g, '')
      html = html.replace(/<meta name="twitter:card" content="[^"]*" \/>\s*/g, '')
      html = html.replace(/<meta name="twitter:title" content="[^"]*" \/>\s*/g, '')
      html = html.replace(/<meta name="twitter:description" content="[^"]*" \/>\s*/g, '')

      const metaTags = buildMetaTags(manifest, subdomain)
      const jsonLd = buildFullProfileJsonLd(manifest, subdomain)
      const jsonLdScript = `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
      html = html.replace('</head>', `    ${metaTags}\n    ${jsonLdScript}\n  </head>`)

      const noscriptSnippet = buildNoscriptFullProfile(manifest)
      html = html.replace('<div id="root"></div>', `${noscriptSnippet}\n    <div id="root"></div>`)

      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60')
      res.send(html)
    } catch (err) {
      console.error('Profile SEO middleware error:', err)
      next()
    }
  }
}
