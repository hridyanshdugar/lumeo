import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useUser } from './contexts/UserContext'
import HomePage from './pages/HomePage'
import Dashboard from './pages/Dashboard'
import PublicPortfolio from './pages/PublicPortfolio'
import ManifestInfoPage from './pages/ManifestInfoPage'

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
        <Route path="/:username" element={<PublicPortfolio />} />
      </Routes>
    </BrowserRouter>
  )
}
