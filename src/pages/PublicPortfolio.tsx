import { useEffect, useState, lazy, Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { api, PublicPortfolioResponse } from '../services/api'
import { ThemeName } from '../App'

const MinimalTheme = lazy(() => import('../themes/MinimalTheme'))
const ModernTheme = lazy(() => import('../themes/ModernTheme'))
const GradientTheme = lazy(() => import('../themes/GradientTheme'))
const CyberTheme = lazy(() => import('../themes/CyberTheme'))
const TerminalTheme = lazy(() => import('../themes/TerminalTheme'))
const SereneTheme = lazy(() => import('../themes/SereneTheme'))
const GoogleTheme = lazy(() => import('../themes/GoogleTheme').then(module => ({ default: module.GoogleTheme })))

const themes = {
  minimal: MinimalTheme,
  modern: ModernTheme,
  gradient: GradientTheme,
  cyber: CyberTheme,
  terminal: TerminalTheme,
  serene: SereneTheme,
  google: GoogleTheme,
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
      <div className="flex items-center justify-center min-h-screen bg-neutral-100">
        <div className="text-xl text-neutral-800 font-mono">Loading portfolio...</div>
      </div>
    )
  }

  if (error || !portfolio) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-100 relative overflow-hidden" style={{ imageRendering: 'pixelated' }}>
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,transparent_calc(100%-1px),rgba(64,64,64,0.1)_calc(100%-1px)),linear-gradient(90deg,transparent_0%,transparent_calc(100%-1px),rgba(64,64,64,0.1)_calc(100%-1px))] bg-[length:40px_40px] opacity-50"></div>

        <div className="text-center relative z-10">
          <div className="w-24 h-24 border-4 border-red-700 flex items-center justify-center mx-auto mb-6 shadow-md bg-white">
            <span className="text-5xl text-red-700">✕</span>
          </div>
          <h1 className="text-4xl font-bold text-neutral-800 mb-4 tracking-wider uppercase">Portfolio Not Found</h1>
          <p className="text-neutral-600 font-mono mb-8 max-w-md">&gt; {error || 'This portfolio does not exist or is not public.'}</p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-neutral-700 text-white border-4 border-neutral-500 hover:bg-neutral-600 hover:shadow-md transition font-mono tracking-wider uppercase shadow-sm"
            style={{ imageRendering: 'pixelated' }}
          >
            ◀ Return Home
          </a>
        </div>
      </div>
    )
  }

  const currentTheme = (portfolio.theme || 'minimal') as ThemeName
  const CurrentThemeComponent = themes[currentTheme]

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-neutral-100">
          <div className="text-xl text-neutral-800 font-mono">Loading theme...</div>
        </div>
      }
    >
      <CurrentThemeComponent manifest={portfolio.manifest} />
    </Suspense>
  )
}
