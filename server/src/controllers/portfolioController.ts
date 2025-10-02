import { Request, Response } from 'express'
import { randomUUID } from 'crypto'
import db from '../db/connection.js'
import { AuthRequest } from '../middleware/auth.js'

export const getMyPortfolio = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const result = db.prepare(
      `SELECT p.id, p.theme, p.manifest, p.is_public, p.created_at, p.updated_at, u.username, u.email
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
      is_public: Boolean((result as any).is_public)
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
      `SELECT p.id, p.theme, p.manifest, p.created_at, p.updated_at, u.username
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
      manifest: JSON.parse((result as any).manifest)
    })
  } catch (error) {
    console.error('Get public portfolio error:', error)
    res.status(500).json({ error: 'Failed to fetch portfolio' })
  }
}

export const updatePortfolio = async (req: AuthRequest, res: Response): Promise<void> => {
  const { manifest, theme, is_public } = req.body

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
      'SELECT id, theme, manifest, is_public, updated_at FROM portfolios WHERE user_id = ?'
    ).get(req.userId)

    if (!portfolio) {
      res.status(404).json({ error: 'Portfolio not found' })
      return
    }

    res.json({
      ...(portfolio as any),
      manifest: JSON.parse((portfolio as any).manifest),
      is_public: Boolean((portfolio as any).is_public)
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
