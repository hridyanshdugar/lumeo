import { PortfolioManifest } from './manifest'

export interface User {
  id: string
  username: string
  email: string
  password: string // In production, this should be hashed
  createdAt: string
  manifest: PortfolioManifest
  theme: string
  randomTheme?: boolean
}

export interface UserRegistration {
  username: string
  email: string
  password: string
}

export interface UserLogin {
  username: string
  password: string
}
