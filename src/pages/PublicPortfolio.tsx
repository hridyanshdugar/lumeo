import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api, PublicPortfolioResponse } from '../services/api'
import { ThemeName } from '../App'
import MinimalTheme from '../themes/MinimalTheme'
import ModernTheme from '../themes/ModernTheme'
import GradientTheme from '../themes/GradientTheme'

const themes = {
  minimal: MinimalTheme,
  modern: ModernTheme,
  gradient: GradientTheme,
}

export default function PublicPortfolio() {
  const { username } = useParams<{ username: string }>()
  const [portfolio, setPortfolio] = useState<PublicPortfolioResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPortfolio = async () => {
      if (!username) {
        setError('No username provided')
        setLoading(false)
        return
      }

      try {
        const data = await api.getPublicPortfolio(username)
        setPortfolio(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load portfolio')
      } finally {
        setLoading(false)
      }
    }

    loadPortfolio()
  }, [username])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-xl text-cyan-400 font-mono">Loading portfolio...</div>
      </div>
    )
  }

  if (error || !portfolio) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black relative overflow-hidden">
        {/* Tron Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,transparent_calc(100%-1px),#00f3ff_calc(100%-1px)),linear-gradient(90deg,transparent_0%,transparent_calc(100%-1px),#00f3ff_calc(100%-1px))] bg-[length:50px_50px] opacity-20"></div>

        <div className="text-center relative z-10">
          <div className="w-24 h-24 border-2 border-red-400 flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(239,68,68,0.5)]">
            <span className="text-5xl text-red-400">✕</span>
          </div>
          <h1 className="text-4xl font-bold text-cyan-400 mb-4 tracking-wider">PORTFOLIO NOT FOUND</h1>
          <p className="text-cyan-400/70 font-mono mb-8">&gt; {error || 'This portfolio does not exist or is not public.'}</p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-cyan-500/20 text-cyan-400 border-2 border-cyan-400 hover:bg-cyan-500/30 hover:shadow-[0_0_20px_rgba(0,243,255,0.5)] transition font-mono tracking-wider"
          >
            ◀ RETURN_HOME
          </a>
        </div>
      </div>
    )
  }

  const currentTheme = (portfolio.theme || 'minimal') as ThemeName
  const CurrentThemeComponent = themes[currentTheme]

  return <CurrentThemeComponent manifest={portfolio.manifest} />
}
