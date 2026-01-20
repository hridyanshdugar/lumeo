import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { randomUUID } from 'crypto'
import db from '../db/connection.js'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this'

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    res.status(400).json({ error: 'Username, email, and password are required' })
    return
  }

  if (password.length < 6) {
    res.status(400).json({ error: 'Password must be at least 6 characters' })
    return
  }

  try {
    const usernameCheck = db.prepare('SELECT id FROM users WHERE username = ?').get(username)
    if (usernameCheck) {
      res.status(400).json({ error: 'Username already exists' })
      return
    }

    const emailCheck = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
    if (emailCheck) {
      res.status(400).json({ error: 'Email already exists' })
      return
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const userId = randomUUID()
    const insertUser = db.prepare(
      'INSERT INTO users (id, username, email, password_hash) VALUES (?, ?, ?, ?)'
    )
    insertUser.run(userId, username, email, passwordHash)

    const user = db.prepare('SELECT id, username, email, created_at FROM users WHERE id = ?').get(userId)

    const defaultManifest = {
      personalInfo: {
        name: 'Your Name',
        title: 'Your Professional Title',
        email: email,
        phone: '+1-555-123-4567',
        location: 'Your City, State',
        bio: 'Write a brief professional summary about yourself. This is your opportunity to make a great first impression and highlight what makes you unique.',
        links: {
          github: 'https://github.com/yourusername',
          linkedin: 'https://linkedin.com/in/yourusername',
          twitter: 'https://twitter.com/yourusername',
          website: 'https://yourwebsite.com'
        }
      },
      experience: [
        {
          company: 'Company Name',
          position: 'Job Title',
          startDate: '2020-01',
          endDate: 'Present',
          description: 'Describe your role and key responsibilities at this company.',
          achievements: [
            'Key achievement or impact you made',
            'Another notable accomplishment'
          ],
          technologies: ['Technology 1', 'Technology 2', 'Technology 3']
        }
      ],
      projects: [
        {
          name: 'Project Name',
          description: 'Describe what your project does and the problem it solves. Be clear and concise.',
          technologies: ['React', 'TypeScript', 'Node.js'],
          links: {
            github: 'https://github.com/yourusername/project',
            demo: 'https://your-project-demo.com'
          },
          highlights: [
            'Key feature or achievement',
            'Another impressive aspect'
          ]
        }
      ],
      education: [
        {
          institution: 'University Name',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2016-09',
          endDate: '2020-05',
          gpa: '3.8/4.0',
          achievements: [
            'Dean\'s List',
            'Relevant awards or honors'
          ]
        }
      ],
      skills: [
        {
          category: 'Frontend Development',
          items: ['React', 'TypeScript', 'HTML/CSS', 'Tailwind CSS']
        },
        {
          category: 'Backend Development',
          items: ['Node.js', 'Express', 'PostgreSQL', 'REST APIs']
        },
        {
          category: 'Tools & Technologies',
          items: ['Git', 'Docker', 'AWS', 'CI/CD']
        }
      ]
    }

    const portfolioId = randomUUID()
    // Set subdomain to username by default
    const insertPortfolio = db.prepare(
      'INSERT INTO portfolios (id, user_id, manifest, theme, subdomain) VALUES (?, ?, ?, ?, ?)'
    )
    insertPortfolio.run(portfolioId, userId, JSON.stringify(defaultManifest), 'minimal', username.toLowerCase())

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
    const user = db.prepare(
      'SELECT id, username, email, password_hash FROM users WHERE username = ?'
    ).get(username)

    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    const isValidPassword = await bcrypt.compare(password, (user as any).password_hash)

    if (!isValidPassword) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

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
