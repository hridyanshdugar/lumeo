import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { useUser } from './contexts/UserContext'

const HomePage = lazy(() => import('./pages/HomePage'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const PublicPortfolio = lazy(() => import('./pages/PublicPortfolio'))
const ManifestInfoPage = lazy(() => import('./pages/ManifestInfoPage'))

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
          <Route path="/" element={<HomePage />} />
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
