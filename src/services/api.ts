import { PortfolioManifest } from '../types/manifest'
import { UserRegistration, UserLogin } from '../types/user'

const API_URL = import.meta.env.VITE_API_URL || import.meta.env.PROD

// Helper to get token from session storage
const getToken = (): string | null => {
  const session = sessionStorage.getItem('auth_token')
  return session
}

// Helper to set token
const setToken = (token: string) => {
  sessionStorage.setItem('auth_token', token)
}

// Helper to remove token
const removeToken = () => {
  sessionStorage.removeItem('auth_token')
}

export interface RegisterResponse {
  message: string
  user: {
    id: string
    username: string
    email: string
  }
  token: string
}

export interface LoginResponse {
  message: string
  user: {
    id: string
    username: string
    email: string
  }
  token: string
}

export interface PortfolioResponse {
  id: string
  username: string
  email: string
  theme: string
  random_theme: boolean
  manifest: PortfolioManifest
  is_public: boolean
  created_at: string
  updated_at: string
}

export interface PublicPortfolioResponse extends PortfolioResponse {
  // Inherits username from PortfolioResponse
}

export const api = {
  // Auth endpoints
  async register(data: UserRegistration): Promise<RegisterResponse> {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Registration failed')
    }

    const result = await response.json()
    setToken(result.token)
    return result
  },

  async login(data: UserLogin): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Login failed')
    }

    const result = await response.json()
    setToken(result.token)
    return result
  },

  logout() {
    removeToken()
  },

  // Portfolio endpoints
  async getMyPortfolio(): Promise<PortfolioResponse> {
    const token = getToken()
    if (!token) throw new Error('Not authenticated')

    const response = await fetch(`${API_URL}/api/portfolio/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to fetch portfolio')
    }

    return response.json()
  },

  async updatePortfolio(updates: {
    manifest?: PortfolioManifest
    theme?: string
    is_public?: boolean
    random_theme?: boolean
  }): Promise<PortfolioResponse> {
    const token = getToken()
    if (!token) throw new Error('Not authenticated')

    const response = await fetch(`${API_URL}/api/portfolio/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updates)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to update portfolio')
    }

    return response.json()
  },

  async getPublicPortfolio(username: string): Promise<PublicPortfolioResponse> {
    const response = await fetch(`${API_URL}/api/portfolio/public/${username}`)

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to fetch portfolio')
    }

    return response.json()
  },

  async getAllPublicPortfolios(): Promise<PublicPortfolioResponse[]> {
    const response = await fetch(`${API_URL}/api/portfolio/public`)

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to fetch portfolios')
    }

    return response.json()
  }
}
