import { useState } from 'react'

interface RegisterScreenProps {
  onRegister: (username: string, email: string, password: string) => void
  onCancel: () => void
  onSwitchToLogin: () => void
}

export default function RegisterScreen({ onRegister, onCancel, onSwitchToLogin }: RegisterScreenProps) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email')
      return
    }

    onRegister(username, email, password)
  }

  return (
    <div className="fixed inset-0 bg-neutral-900/90 z-50 flex items-center justify-center p-4" style={{ imageRendering: 'pixelated' }}>
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,transparent_calc(100%-1px),rgba(64,64,64,0.2)_calc(100%-1px)),linear-gradient(90deg,transparent_0%,transparent_calc(100%-1px),rgba(64,64,64,0.2)_calc(100%-1px))] bg-[length:40px_40px] opacity-30"></div>

      <div className="bg-white border-4 border-neutral-600 shadow-lg w-full max-w-md p-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 border-4 border-neutral-600 flex items-center justify-center mx-auto mb-4 shadow-md">
            <span className="text-3xl text-neutral-800">▶</span>
          </div>
          <h2 className="text-3xl font-bold text-neutral-800 mb-2 tracking-wider uppercase">Register</h2>
          <p className="text-neutral-600 font-mono text-sm">&gt; Create your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-neutral-700 mb-2 font-mono tracking-wide uppercase">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-50 border-3 border-neutral-400 text-neutral-800 focus:border-neutral-600 focus:shadow-md outline-none transition font-mono"
              style={{ borderWidth: '3px' }}
              placeholder="choose username"
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2 font-mono tracking-wide uppercase">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-50 border-3 border-neutral-400 text-neutral-800 focus:border-neutral-600 focus:shadow-md outline-none transition font-mono"
              style={{ borderWidth: '3px' }}
              placeholder="user@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2 font-mono tracking-wide uppercase">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-50 border-3 border-neutral-400 text-neutral-800 focus:border-neutral-600 focus:shadow-md outline-none transition font-mono"
              style={{ borderWidth: '3px' }}
              placeholder="min 6 characters"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-2 font-mono tracking-wide uppercase">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-50 border-3 border-neutral-400 text-neutral-800 focus:border-neutral-600 focus:shadow-md outline-none transition font-mono"
              style={{ borderWidth: '3px' }}
              placeholder="re-enter password"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-100 border-4 border-red-700">
              <p className="text-red-800 text-sm font-mono uppercase">&gt; ERROR: {error}</p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 border-4 border-neutral-500 bg-neutral-200 text-neutral-800 hover:bg-neutral-300 hover:shadow-md transition font-mono tracking-wider uppercase shadow-sm"
              style={{ imageRendering: 'pixelated' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-neutral-700 border-4 border-neutral-500 text-white hover:bg-neutral-600 hover:shadow-md transition font-mono tracking-wider uppercase shadow-sm"
              style={{ imageRendering: 'pixelated' }}
            >
              Register
            </button>
          </div>
        </form>

        {/* Switch to login */}
        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-600 font-mono">
            &gt; Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-neutral-800 hover:text-neutral-600 font-medium underline"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
