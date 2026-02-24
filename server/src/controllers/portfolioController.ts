import { Request, Response } from 'express'
import { randomUUID } from 'crypto'
import db from '../db/connection.js'
import { AuthRequest } from '../middleware/auth.js'
import { SubdomainRequest, validateSubdomain } from '../middleware/subdomain.js'

export const getMyPortfolio = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const result = db.prepare(
      `SELECT p.id, p.theme, p.random_theme, p.manifest, p.is_public, p.subdomain, p.created_at, p.updated_at, u.username, u.email
       FROM portfolios p
       JOIN users u ON p.user_id = u.id
       WHERE p.user_id = ?`
    ).get(req.userId)

    if (!result) {
      res.status(404).json({ error: 'Portfolio not found' })
      return
    }

    res.json({
      ...(result as any),
      manifest: JSON.parse((result as any).manifest),
      is_public: Boolean((result as any).is_public),
      random_theme: Boolean((result as any).random_theme)
    })
  } catch (error) {
    console.error('Get portfolio error:', error)
    res.status(500).json({ error: 'Failed to fetch portfolio' })
  }
}

export const getPublicPortfolio = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.params

  try {
    const result = db.prepare(
      `SELECT p.id, p.theme, p.random_theme, p.manifest, p.created_at, p.updated_at, u.username
       FROM portfolios p
       JOIN users u ON p.user_id = u.id
       WHERE u.username = ? AND p.is_public = 1`
    ).get(username)

    if (!result) {
      res.status(404).json({ error: 'Portfolio not found or not public' })
      return
    }

    res.json({
      ...(result as any),
      manifest: JSON.parse((result as any).manifest),
      random_theme: Boolean((result as any).random_theme)
    })
  } catch (error) {
    console.error('Get public portfolio error:', error)
    res.status(500).json({ error: 'Failed to fetch portfolio' })
  }
}

export const updatePortfolio = async (req: AuthRequest, res: Response): Promise<void> => {
  const { manifest, theme, is_public, random_theme } = req.body

  try {
    const updates: string[] = []
    const values: any[] = []

    if (manifest !== undefined) {
      updates.push('manifest = ?')
      values.push(JSON.stringify(manifest))
    }

    if (theme !== undefined) {
      updates.push('theme = ?')
      values.push(theme)
    }

    if (is_public !== undefined) {
      updates.push('is_public = ?')
      values.push(is_public ? 1 : 0)
    }

    if (random_theme !== undefined) {
      updates.push('random_theme = ?')
      values.push(random_theme ? 1 : 0)
    }

    if (updates.length === 0) {
      res.status(400).json({ error: 'No fields to update' })
      return
    }

    updates.push('updated_at = CURRENT_TIMESTAMP')
    values.push(req.userId)

    const stmt = db.prepare(
      `UPDATE portfolios
       SET ${updates.join(', ')}
       WHERE user_id = ?`
    )

    stmt.run(...values)

    const portfolio = db.prepare(
      'SELECT id, theme, random_theme, manifest, is_public, updated_at FROM portfolios WHERE user_id = ?'
    ).get(req.userId)

    if (!portfolio) {
      res.status(404).json({ error: 'Portfolio not found' })
      return
    }

    res.json({
      ...(portfolio as any),
      manifest: JSON.parse((portfolio as any).manifest),
      is_public: Boolean((portfolio as any).is_public),
      random_theme: Boolean((portfolio as any).random_theme)
    })
  } catch (error) {
    console.error('Update portfolio error:', error)
    res.status(500).json({ error: 'Failed to update portfolio' })
  }
}

export const getAllPublicPortfolios = async (req: Request, res: Response): Promise<void> => {
  try {
    const results = db.prepare(
      `SELECT p.id, p.theme, u.username,
              json_extract(p.manifest, '$.personalInfo.name') as name,
              json_extract(p.manifest, '$.personalInfo.title') as title,
              p.updated_at
       FROM portfolios p
       JOIN users u ON p.user_id = u.id
       WHERE p.is_public = 1
       ORDER BY p.updated_at DESC`
    ).all()

    res.json(results)
  } catch (error) {
    console.error('Get all portfolios error:', error)
    res.status(500).json({ error: 'Failed to fetch portfolios' })
  }
}

/** Returns public portfolio data by subdomain for SEO/server use, or null if not found. */
export function getPublicPortfolioDataBySubdomain(subdomain: string): {
  manifest: any
  theme: string
  random_theme: boolean
} | null {
  const result = db.prepare(
    `SELECT p.theme, p.random_theme, p.manifest
     FROM portfolios p
     WHERE p.subdomain = ? AND p.is_public = 1`
  ).get(subdomain) as { theme: string; random_theme: number; manifest: string } | undefined

  if (!result) return null
  return {
    manifest: JSON.parse(result.manifest),
    theme: result.theme,
    random_theme: Boolean(result.random_theme)
  }
}

export const getPortfolioBySubdomain = async (req: SubdomainRequest, res: Response): Promise<void> => {
  const subdomain = req.subdomain

  if (!subdomain) {
    res.status(400).json({ error: 'No subdomain provided' })
    return
  }

  try {
    const data = getPublicPortfolioDataBySubdomain(subdomain)
    if (!data) {
      res.status(404).json({ error: 'Portfolio not found or not public' })
      return
    }
    const result = db.prepare(
      `SELECT p.id, p.theme, p.random_theme, p.created_at, p.updated_at, u.username
       FROM portfolios p
       JOIN users u ON p.user_id = u.id
       WHERE p.subdomain = ? AND p.is_public = 1`
    ).get(subdomain)
    res.json({
      ...(result as any),
      manifest: data.manifest,
      random_theme: data.random_theme
    })
  } catch (error) {
    console.error('Get portfolio by subdomain error:', error)
    res.status(500).json({ error: 'Failed to fetch portfolio' })
  }
}

export const updateSubdomain = async (req: AuthRequest, res: Response): Promise<void> => {
  const { subdomain } = req.body

  try {
    // Validate subdomain format
    if (subdomain !== null && subdomain !== undefined && subdomain !== '') {
      const validation = validateSubdomain(subdomain)
      if (!validation.valid) {
        res.status(400).json({ error: validation.error })
        return
      }

      // Check uniqueness (excluding current user's portfolio)
      const existing = db.prepare(
        `SELECT user_id FROM portfolios WHERE subdomain = ? AND user_id != ?`
      ).get(subdomain, req.userId)

      if (existing) {
        res.status(409).json({ error: 'This subdomain is already taken' })
        return
      }
    }

    // Update subdomain
    const stmt = db.prepare(
      `UPDATE portfolios
       SET subdomain = ?, updated_at = CURRENT_TIMESTAMP
       WHERE user_id = ?`
    )

    stmt.run(subdomain || null, req.userId)

    // Get updated portfolio
    const portfolio = db.prepare(
      `SELECT p.id, p.theme, p.random_theme, p.manifest, p.is_public, p.subdomain, p.updated_at, u.username, u.email
       FROM portfolios p
       JOIN users u ON p.user_id = u.id
       WHERE p.user_id = ?`
    ).get(req.userId)

    if (!portfolio) {
      res.status(404).json({ error: 'Portfolio not found' })
      return
    }

    res.json({
      ...(portfolio as any),
      manifest: JSON.parse((portfolio as any).manifest),
      is_public: Boolean((portfolio as any).is_public),
      random_theme: Boolean((portfolio as any).random_theme)
    })
  } catch (error) {
    console.error('Update subdomain error:', error)
    res.status(500).json({ error: 'Failed to update subdomain' })
  }
}
