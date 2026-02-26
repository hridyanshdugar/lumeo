import { Request, Response, NextFunction } from 'express'

const ROOT_DOMAIN = process.env.ROOT_DOMAIN || 'withlumeo.com'

/**
 * Redirect to canonical URL so Google indexes one version (no "Page with redirect").
 * - http → https
 * - www.{root} → {root} (only for the main site; subdomains are unchanged).
 */
export function canonicalRedirect(req: Request, res: Response, next: NextFunction): void {
  if (process.env.NODE_ENV !== 'production') {
    return next()
  }

  const host = (req.get('host') || '').toLowerCase()
  const protocol = req.get('x-forwarded-proto') || (req.secure ? 'https' : 'http')
  const isHttps = protocol === 'https'

  // 1. Force HTTPS
  if (!isHttps) {
    const canonical = `https://${host}${req.originalUrl || '/'}`
    res.redirect(301, canonical)
    return
  }

  // 2. Strip www only for the root domain (www.withlumeo.com → withlumeo.com)
  if (host === `www.${ROOT_DOMAIN}`) {
    const canonical = `https://${ROOT_DOMAIN}${req.originalUrl || '/'}`
    res.redirect(301, canonical)
    return
  }

  next()
}
