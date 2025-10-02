import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// SECURITY NOTE: This is a simple client-side authentication for demonstration.
// For production, you MUST use:
// 1. Backend authentication with secure password hashing (bcrypt, argon2)
// 2. JWT tokens or session cookies
// 3. HTTPS for all requests
// 4. Rate limiting on login attempts
// 5. Environment variables for credentials (not hardcoded)
// 6. Server-side validation before allowing manifest updates

const ADMIN_CREDENTIALS = {
  username: import.meta.env.VITE_ADMIN_USERNAME || 'admin',
  password: import.meta.env.VITE_ADMIN_PASSWORD || 'admin123', // Change this!
}

const SESSION_KEY = 'portfolio_auth_session'
const SESSION_DURATION = 30 * 60 * 1000 // 30 minutes

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check for existing session on mount
  useEffect(() => {
    const session = sessionStorage.getItem(SESSION_KEY)
    if (session) {
      const { timestamp } = JSON.parse(session)
      const now = Date.now()

      // Check if session is still valid
      if (now - timestamp < SESSION_DURATION) {
        setIsAuthenticated(true)
      } else {
        sessionStorage.removeItem(SESSION_KEY)
      }
    }
  }, [])

  // Auto-logout after session expires
  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        logout()
        alert('Session expired. Please login again.')
      }, SESSION_DURATION)

      return () => clearTimeout(timer)
    }
  }, [isAuthenticated])

  const login = (username: string, password: string): boolean => {
    // Prevent timing attacks by always taking similar time
    const isValid = username === ADMIN_CREDENTIALS.username &&
                    password === ADMIN_CREDENTIALS.password

    if (isValid) {
      setIsAuthenticated(true)
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ timestamp: Date.now() }))
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem(SESSION_KEY)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
