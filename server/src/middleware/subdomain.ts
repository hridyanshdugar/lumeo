import { Request, Response, NextFunction } from 'express'

const RESERVED_SUBDOMAINS = [
  'www', 'api', 'admin', 'app', 'dashboard',
  'mail', 'ftp', 'localhost', 'test', 'staging',
  'dev', 'blog', 'docs', 'help', 'support'
]

const DOMAIN = process.env.DOMAIN || 'withlumeo.com'

export interface SubdomainRequest extends Request {
  subdomain?: string
}

export const extractSubdomain = (req: SubdomainRequest, res: Response, next: NextFunction): void => {
  const host = req.get('host') || req.hostname || ''
  
  // Extract subdomain from host
  // Format: subdomain.withlumeo.com or subdomain.localhost:3000
  const parts = host.split('.')
  
  // If we have more than 2 parts (subdomain.domain.tld) or it's localhost with subdomain
  if (parts.length > 2 || (parts[0] !== 'localhost' && parts.length === 2 && !host.includes(':'))) {
    // Check if it's a subdomain of our domain
    const domainParts = host.split('.').slice(-2).join('.')
    if (domainParts === DOMAIN || domainParts === 'localhost') {
      const subdomain = parts[0]
      req.subdomain = subdomain
    }
  } else if (parts.length === 2 && parts[0] !== 'www' && !parts[0].includes(':')) {
    // Handle localhost:port or IP:port cases
    const subdomain = parts[0]
    if (subdomain !== 'localhost' && !subdomain.match(/^\d+\.\d+\.\d+\.\d+$/)) {
      req.subdomain = subdomain
    }
  }
  
  next()
}

export const validateSubdomain = (subdomain: string): { valid: boolean; error?: string } => {
  // Check length
  if (subdomain.length < 3 || subdomain.length > 63) {
    return { valid: false, error: 'Subdomain must be between 3 and 63 characters' }
  }
  
  // Check format: lowercase alphanumeric and hyphens only
  if (!/^[a-z0-9-]+$/.test(subdomain)) {
    return { valid: false, error: 'Subdomain can only contain lowercase letters, numbers, and hyphens' }
  }
  
  // Cannot start or end with hyphen
  if (subdomain.startsWith('-') || subdomain.endsWith('-')) {
    return { valid: false, error: 'Subdomain cannot start or end with a hyphen' }
  }
  
  // Check reserved subdomains
  if (RESERVED_SUBDOMAINS.includes(subdomain.toLowerCase())) {
    return { valid: false, error: 'This subdomain is reserved and cannot be used' }
  }
  
  return { valid: true }
}
