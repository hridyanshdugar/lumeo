import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { randomUUID } from 'crypto'
import db from '../db/connection.js'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this'

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body

  // Validation
  if (!username || !email || !password) {
    res.status(400).json({ error: 'Username, email, and password are required' })
    return
  }

  if (password.length < 6) {
    res.status(400).json({ error: 'Password must be at least 6 characters' })
    return
  }

  try {
    // Check if username already exists
    const usernameCheck = db.prepare('SELECT id FROM users WHERE username = ?').get(username)
    if (usernameCheck) {
      res.status(400).json({ error: 'Username already exists' })
      return
    }

    // Check if email already exists
    const emailCheck = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
    if (emailCheck) {
      res.status(400).json({ error: 'Email already exists' })
      return
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create user
    const userId = randomUUID()
    const insertUser = db.prepare(
      'INSERT INTO users (id, username, email, password_hash) VALUES (?, ?, ?, ?)'
    )
    insertUser.run(userId, username, email, passwordHash)

    const user = db.prepare('SELECT id, username, email, created_at FROM users WHERE id = ?').get(userId)

    // Create default portfolio
    const defaultManifest = {
      personalInfo: {
        name: '',
        title: '',
        email: email,
        bio: '',
        links: {}
      },
      experience: [],
      projects: [],
      education: [],
      skills: []
    }

    const portfolioId = randomUUID()
    const insertPortfolio = db.prepare(
      'INSERT INTO portfolios (id, user_id, manifest, theme) VALUES (?, ?, ?, ?)'
    )
    insertPortfolio.run(portfolioId, userId, JSON.stringify(defaultManifest), 'minimal')

    // Generate JWT
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' })

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: (user as any).id,
        username: (user as any).username,
        email: (user as any).email
      },
      token
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'Failed to register user' })
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body

  if (!username || !password) {
    res.status(400).json({ error: 'Username and password are required' })
    return
  }

  try {
    // Find user
    const user = db.prepare(
      'SELECT id, username, email, password_hash FROM users WHERE username = ?'
    ).get(username)

    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, (user as any).password_hash)

    if (!isValidPassword) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    // Generate JWT
    const token = jwt.sign({ userId: (user as any).id }, JWT_SECRET, { expiresIn: '24h' })

    res.json({
      message: 'Login successful',
      user: {
        id: (user as any).id,
        username: (user as any).username,
        email: (user as any).email
      },
      token
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Failed to login' })
  }
}
