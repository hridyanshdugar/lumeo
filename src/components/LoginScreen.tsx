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
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4">
      {/* Tron Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,transparent_calc(100%-1px),#00f3ff_calc(100%-1px)),linear-gradient(90deg,transparent_0%,transparent_calc(100%-1px),#00f3ff_calc(100%-1px))] bg-[length:50px_50px] opacity-20"></div>

      <div className="bg-black border-2 border-cyan-400 shadow-[0_0_50px_rgba(0,243,255,0.3)] w-full max-w-md p-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 border-2 border-cyan-400 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(0,243,255,0.5)]">
            <span className="text-3xl text-cyan-400">◆</span>
          </div>
          <h2 className="text-3xl font-bold text-cyan-400 mb-2 tracking-wider">ACCESS CONTROL</h2>
          <p className="text-cyan-400/70 font-mono text-sm">&gt; Enter credentials to access grid</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-cyan-400 mb-2 font-mono tracking-wide">
              USERNAME
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-cyan-400/50 text-cyan-400 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,243,255,0.3)] outline-none transition font-mono"
              placeholder="enter_username"
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-cyan-400 mb-2 font-mono tracking-wide">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-cyan-400/50 text-cyan-400 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,243,255,0.3)] outline-none transition font-mono"
              placeholder="enter_password"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500">
              <p className="text-red-400 text-sm font-mono">&gt; ERROR: {error}</p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 border border-cyan-400/50 text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition font-mono tracking-wider"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-cyan-500/20 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-500/30 hover:shadow-[0_0_20px_rgba(0,243,255,0.5)] transition font-mono tracking-wider"
            >
              ACCESS
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
