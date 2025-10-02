import { useState } from 'react'
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

  if (isAuthenticated) {
    navigate('/dashboard')
    return null
  }

  return (
    <div className="h-screen bg-black relative overflow-hidden">
      {/* Tron Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,transparent_calc(100%-1px),#00f3ff_calc(100%-1px)),linear-gradient(90deg,transparent_0%,transparent_calc(100%-1px),#00f3ff_calc(100%-1px))] bg-[length:50px_50px] opacity-20"></div>

      {/* Animated Glow Lines */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center text-cyan-400 mb-16">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-wider drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]">
            BUILD YOUR PORTFOLIO
          </h1>
          <p className="text-2xl md:text-3xl mb-8 text-cyan-300 font-light tracking-wide">
            DIGITAL IDENTITY. UNLIMITED POSSIBILITIES.
          </p>
          <p className="text-xl text-cyan-400/70 max-w-3xl mx-auto mb-12 font-mono">
            &gt; Initialize your presence in the digital grid. Choose from advanced themes,
            customize with JSON protocols, and deploy your work to the network.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-6 justify-center">
            <button
              onClick={() => setShowRegister(true)}
              className="px-8 py-4 bg-cyan-500/20 text-cyan-400 border-2 border-cyan-400 font-bold text-lg hover:bg-cyan-500/30 hover:shadow-[0_0_20px_rgba(0,243,255,0.5)] transition transform hover:scale-105 tracking-wider"
            >
              INITIALIZE
            </button>
            <button
              onClick={() => setShowLogin(true)}
              className="px-8 py-4 bg-transparent text-cyan-400 border-2 border-cyan-400/50 font-bold text-lg hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition tracking-wider"
            >
              ACCESS GRID
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-black/50 backdrop-blur-sm border-2 border-cyan-500/30 p-8 text-cyan-400 hover:border-cyan-500 hover:shadow-[0_0_30px_rgba(0,243,255,0.2)] transition">
            <div className="text-4xl mb-4">◆</div>
            <h3 className="text-2xl font-bold mb-3 tracking-wide">MULTIPLE PROTOCOLS</h3>
            <p className="text-cyan-400/70 font-mono text-sm">
              &gt; Access Minimal, Modern, and Gradient visual modes. Switch protocols in real-time.
            </p>
          </div>

          <div className="bg-black/50 backdrop-blur-sm border-2 border-cyan-500/30 p-8 text-cyan-400 hover:border-cyan-500 hover:shadow-[0_0_30px_rgba(0,243,255,0.2)] transition">
            <div className="text-4xl mb-4">▶</div>
            <h3 className="text-2xl font-bold mb-3 tracking-wide">INSTANT UPDATES</h3>
            <p className="text-cyan-400/70 font-mono text-sm">
              &gt; Modify your data matrix with integrated JSON editor. Zero compilation required.
            </p>
          </div>

          <div className="bg-black/50 backdrop-blur-sm border-2 border-cyan-500/30 p-8 text-cyan-400 hover:border-cyan-500 hover:shadow-[0_0_30px_rgba(0,243,255,0.2)] transition">
            <div className="text-4xl mb-4">■</div>
            <h3 className="text-2xl font-bold mb-3 tracking-wide">SECURE NETWORK</h3>
            <p className="text-cyan-400/70 font-mono text-sm">
              &gt; Encrypted data storage. Full control over grid visibility parameters.
            </p>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <LoginScreen
          onLogin={handleLogin}
          onCancel={() => setShowLogin(false)}
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
