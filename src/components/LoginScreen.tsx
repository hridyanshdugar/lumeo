import { useState } from 'react'

interface LoginScreenProps {
  onLogin: (username: string, password: string) => void
  onCancel: () => void
}

export default function LoginScreen({ onLogin, onCancel }: LoginScreenProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!username || !password) {
      setError('Please enter both username and password')
      return
    }

    onLogin(username, password)
  }

  return (
    <div className="fixed inset-0 bg-neutral-900/90 z-50 flex items-center justify-center p-4" style={{ imageRendering: 'pixelated' }}>
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,transparent_calc(100%-1px),rgba(64,64,64,0.2)_calc(100%-1px)),linear-gradient(90deg,transparent_0%,transparent_calc(100%-1px),rgba(64,64,64,0.2)_calc(100%-1px))] bg-[length:40px_40px] opacity-30"></div>

      <div className="bg-white border-4 border-neutral-600 shadow-lg w-full max-w-md p-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 border-4 border-neutral-600 flex items-center justify-center mx-auto mb-4 shadow-md">
            <span className="text-3xl text-neutral-800">◆</span>
          </div>
          <h2 className="text-3xl font-bold text-neutral-800 mb-2 tracking-wider uppercase">Sign In</h2>
          <p className="text-neutral-600 font-mono text-sm">&gt; Enter your credentials</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="enter username"
              autoFocus
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
              placeholder="enter password"
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
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
