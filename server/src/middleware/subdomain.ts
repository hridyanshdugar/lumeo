import { Request, Response, NextFunction } from 'express'

const RESERVED = ['www', 'api', 'admin', 'app', 'dashboard', 'mail', 'ftp', 'localhost', 'test', 'staging', 'dev', 'blog', 'docs', 'help', 'support']

export interface SubdomainRequest extends Request {
  subdomain?: string
}

export const extractSubdomain = (req: SubdomainRequest, _res: Response, next: NextFunction): void => {
  const host = req.get('host') || ''
  const parts = host.split('.')
  
  // subdomain.domain.tld = 3+ parts
  if (parts.length >= 3) {
    req.subdomain = parts[0]
  }
  next()
}

export const validateSubdomain = (subdomain: string): { valid: boolean; error?: string } => {
  const s = subdomain.toLowerCase()
  if (s.length < 3 || s.length > 63) return { valid: false, error: 'Subdomain must be 3-63 characters' }
  if (!/^[a-z0-9-]+$/.test(s)) return { valid: false, error: 'Only lowercase letters, numbers, and hyphens allowed' }
  if (s.startsWith('-') || s.endsWith('-')) return { valid: false, error: 'Cannot start or end with hyphen' }
  if (RESERVED.includes(s)) return { valid: false, error: 'This subdomain is reserved' }
  return { valid: true }
}
