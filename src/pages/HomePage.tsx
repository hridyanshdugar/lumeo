import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import LoginScreen from '../components/LoginScreen'
import RegisterScreen from '../components/RegisterScreen'
import Dialog from '../components/Dialog'

export default function HomePage() {
  const navigate = useNavigate()
  const { isAuthenticated, login, register } = useUser()
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [dialog, setDialog] = useState<{ isOpen: boolean; title: string; message: string; type: 'error' | 'success' | 'info' }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  })

  // Redirect to dashboard if authenticated (use effect to avoid render-time navigation)
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  const handleLogin = async (username: string, password: string) => {
    const result = await login({ username, password })
    if (result.success) {
      navigate('/dashboard')
    } else {
      setDialog({
        isOpen: true,
        title: 'ACCESS DENIED',
        message: result.error || 'Invalid credentials. Please try again.',
        type: 'error'
      })
    }
  }

  const handleRegister = async (username: string, email: string, password: string) => {
    const result = await register({ username, email, password })
    if (result.success) {
      navigate('/dashboard')
    } else {
      setDialog({
        isOpen: true,
        title: 'INITIALIZATION FAILED',
        message: result.error || 'Registration failed. Please try again.',
        type: 'error'
      })
    }
  }

  // Don't render if authenticated (will redirect via useEffect)
  if (isAuthenticated) {
    return null
  }

  return (
    <div className="h-screen bg-neutral-100 relative overflow-hidden" style={{ imageRendering: 'pixelated' }}>
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,transparent_calc(100%-1px),rgba(64,64,64,0.1)_calc(100%-1px)),linear-gradient(90deg,transparent_0%,transparent_calc(100%-1px),rgba(64,64,64,0.1)_calc(100%-1px))] bg-[length:40px_40px] opacity-50"></div>

      {/* Subtle Border Lines */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-neutral-400 opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-neutral-400 opacity-30"></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center text-neutral-800 mb-16">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-wider uppercase" style={{ textShadow: '2px 2px 0 rgba(64,64,64,0.1)' }}>
            Lumeo
          </h1>
          <p className="text-2xl md:text-3xl mb-12 text-neutral-700 font-light tracking-wide">
            Simple. Professional. Yours.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-6 justify-center flex-wrap">
            <button
              onClick={() => setShowRegister(true)}
              className="px-8 py-4 bg-neutral-700 text-white border-4 border-neutral-500 font-bold text-lg hover:bg-neutral-600 hover:shadow-md transition uppercase tracking-wider shadow-sm"
              style={{ imageRendering: 'pixelated' }}
            >
              Get Started
            </button>
            <button
              onClick={() => setShowLogin(true)}
              className="px-8 py-4 bg-neutral-200 text-neutral-800 border-4 border-neutral-400 font-bold text-lg hover:bg-neutral-300 hover:shadow-md transition uppercase tracking-wider shadow-sm"
              style={{ imageRendering: 'pixelated' }}
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white backdrop-blur-sm border-4 border-neutral-300 p-8 text-neutral-800 hover:border-neutral-400 hover:shadow-lg transition shadow-md" style={{ imageRendering: 'pixelated' }}>
            <div className="text-4xl mb-4">◆</div>
            <h3 className="text-2xl font-bold mb-3 tracking-wide uppercase">Create</h3>
            <p className="text-neutral-600 font-mono text-sm">
              &gt; Multiple styles. Switch anytime.
            </p>
          </div>

          <div className="bg-white backdrop-blur-sm border-4 border-neutral-300 p-8 text-neutral-800 hover:border-neutral-400 hover:shadow-lg transition shadow-md" style={{ imageRendering: 'pixelated' }}>
            <div className="text-4xl mb-4">▶</div>
            <h3 className="text-2xl font-bold mb-3 tracking-wide uppercase">Edit</h3>
            <p className="text-neutral-600 font-mono text-sm">
              &gt; Change content. See updates instantly.
            </p>
          </div>

          <div className="bg-white backdrop-blur-sm border-4 border-neutral-300 p-8 text-neutral-800 hover:border-neutral-400 hover:shadow-lg transition shadow-md" style={{ imageRendering: 'pixelated' }}>
            <div className="text-4xl mb-4">■</div>
            <h3 className="text-2xl font-bold mb-3 tracking-wide uppercase">Share</h3>
            <p className="text-neutral-600 font-mono text-sm">
              &gt; Public link. Your control.
            </p>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <LoginScreen
          onLogin={handleLogin}
          onCancel={() => setShowLogin(false)}
          onSwitchToRegister={() => {
            setShowLogin(false)
            setShowRegister(true)
          }}
        />
      )}

      {/* Register Modal */}
      {showRegister && (
        <RegisterScreen
          onRegister={handleRegister}
          onCancel={() => setShowRegister(false)}
          onSwitchToLogin={() => {
            setShowRegister(false)
            setShowLogin(true)
          }}
        />
      )}

      {/* Dialog */}
      <Dialog
        isOpen={dialog.isOpen}
        title={dialog.title}
        message={dialog.message}
        type={dialog.type}
        onClose={() => setDialog({ ...dialog, isOpen: false })}
      />
    </div>
  )
}
