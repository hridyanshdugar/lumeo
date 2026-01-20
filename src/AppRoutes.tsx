import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { useUser } from './contexts/UserContext'

const HomePage = lazy(() => import('./pages/HomePage'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const PublicPortfolio = lazy(() => import('./pages/PublicPortfolio'))
const ManifestInfoPage = lazy(() => import('./pages/ManifestInfoPage'))

// Check if we're on a subdomain (not www or main domain)
function isOnSubdomain(): boolean {
  const hostname = window.location.hostname
  const parts = hostname.split('.')
  
  // subdomain.domain.tld = 3+ parts
  if (parts.length >= 3) {
    // 'www' is not a real subdomain
    return parts[0] !== 'www'
  }
  
  return false
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useUser()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

// Renders HomePage on main domain, PublicPortfolio on subdomains
function HomeOrPortfolio() {
  if (isOnSubdomain()) {
    return <PublicPortfolio />
  }
  return <HomePage />
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-xl font-mono">Loading...</div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomeOrPortfolio />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/manifest-info" element={<ManifestInfoPage />} />
          {/* PublicPortfolio is now accessed via subdomain, not route */}
          <Route path="*" element={<PublicPortfolio />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
