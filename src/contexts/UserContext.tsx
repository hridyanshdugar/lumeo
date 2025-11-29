import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { User, UserRegistration, UserLogin } from '../types/user'
import { PortfolioManifest } from '../types/manifest'
import { api } from '../services/api'

interface UserContextType {
  currentUser: User | null
  isAuthenticated: boolean
  isLoading: boolean
  register: (data: UserRegistration) => Promise<{ success: boolean; error?: string }>
  login: (data: UserLogin) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateManifest: (manifest: PortfolioManifest) => Promise<void>
  updateTheme: (theme: string) => Promise<void>
  toggleRandomTheme: () => Promise<void>
  loadUserPortfolio: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user on mount if token exists
  useEffect(() => {
    const loadUser = async () => {
      const token = sessionStorage.getItem('auth_token')
      if (token) {
        try {
          const portfolio = await api.getMyPortfolio()
          setCurrentUser({
            id: portfolio.id,
            username: portfolio.username || '',
            email: portfolio.email || '',
            password: '', // Not needed on frontend
            createdAt: portfolio.created_at,
            manifest: portfolio.manifest,
            theme: portfolio.theme,
            randomTheme: portfolio.random_theme
          })
        } catch (error) {
          console.error('Failed to load user:', error)
          api.logout()
        }
      }
      setIsLoading(false)
    }

    loadUser()
  }, [])

  const register = async (data: UserRegistration): Promise<{ success: boolean; error?: string }> => {
    try {
      await api.register(data)
      await loadUserPortfolio()
      return { success: true }
    } catch (error) {
      console.error('Registration error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Registration failed'
      return { success: false, error: errorMessage }
    }
  }

  const login = async (data: UserLogin): Promise<{ success: boolean; error?: string }> => {
    try {
      await api.login(data)
      await loadUserPortfolio()
      return { success: true }
    } catch (error) {
      console.error('Login error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Login failed'
      return { success: false, error: errorMessage }
    }
  }

  const logout = () => {
    api.logout()
    setCurrentUser(null)
  }

  const loadUserPortfolio = async () => {
    try {
      const portfolio = await api.getMyPortfolio()
      setCurrentUser({
        id: portfolio.id,
        username: portfolio.username || '',
        email: portfolio.email || '',
        password: '',
        createdAt: portfolio.created_at,
        manifest: portfolio.manifest,
        theme: portfolio.theme,
        randomTheme: portfolio.random_theme
      })
    } catch (error) {
      console.error('Failed to load portfolio:', error)
      throw error
    }
  }

  const updateManifest = async (manifest: PortfolioManifest) => {
    if (!currentUser) return

    try {
      await api.updatePortfolio({ manifest })
      setCurrentUser({ ...currentUser, manifest })
    } catch (error) {
      console.error('Failed to update manifest:', error)
      throw error
    }
  }

  const updateTheme = async (theme: string) => {
    if (!currentUser) return

    try {
      await api.updatePortfolio({ theme, random_theme: false })
      setCurrentUser({ ...currentUser, theme, randomTheme: false })
    } catch (error) {
      console.error('Failed to update theme:', error)
      throw error
    }
  }

  const toggleRandomTheme = async () => {
    if (!currentUser) return

    try {
      const newRandomTheme = !currentUser.randomTheme
      await api.updatePortfolio({ random_theme: newRandomTheme })
      setCurrentUser({ ...currentUser, randomTheme: newRandomTheme })
    } catch (error) {
      console.error('Failed to toggle random theme:', error)
      throw error
    }
  }

  return (
    <UserContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isLoading,
        register,
        login,
        logout,
        updateManifest,
        updateTheme,
        toggleRandomTheme,
        loadUserPortfolio
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
