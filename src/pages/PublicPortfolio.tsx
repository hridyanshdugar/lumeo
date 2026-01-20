import { useEffect, useState, lazy, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, PublicPortfolioResponse } from '../services/api'
import { ThemeName } from '../App'

const MinimalTheme = lazy(() => import('../themes/MinimalTheme'))
const ModernTheme = lazy(() => import('../themes/ModernTheme'))
const GradientTheme = lazy(() => import('../themes/GradientTheme'))
const CyberTheme = lazy(() => import('../themes/CyberTheme'))
const TerminalTheme = lazy(() => import('../themes/TerminalTheme'))
const SereneTheme = lazy(() => import('../themes/SereneTheme'))
const GoogleTheme = lazy(() => import('../themes/GoogleTheme/index').then(module => ({ default: module.GoogleTheme })))

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
  const navigate = useNavigate()
  const [portfolio, setPortfolio] = useState<PublicPortfolioResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [displayTheme, setDisplayTheme] = useState<ThemeName>('minimal')

  useEffect(() => {
    const loadPortfolio = async () => {
      // Extract subdomain from hostname
      const hostname = window.location.hostname
      const parts = hostname.split('.')
      
      // Extract subdomain (e.g., subdomain.withlumeo.com -> subdomain)
      let subdomain: string | null = null
      
      if (parts.length > 2) {
        // Has subdomain (subdomain.domain.tld)
        // Skip 'www' - treat it as the main domain
        if (parts[0] !== 'www') {
          subdomain = parts[0]
        }
      } else if (parts.length === 2 && parts[0] !== 'www' && !parts[0].includes(':')) {
        // Could be subdomain on localhost or similar
        const domain = parts.join('.')
        if (domain !== 'withlumeo.com' && domain !== 'localhost') {
          subdomain = parts[0]
        }
      }

      // If on main domain (withlumeo.com) with no subdomain, redirect to home
      if (!subdomain && (hostname === 'withlumeo.com' || hostname === 'www.withlumeo.com')) {
        navigate('/', { replace: true })
        return
      }

      if (!subdomain) {
        setError('No subdomain detected. Please access your portfolio via your custom subdomain.')
        setLoading(false)
        return
      }

      try {
        const data = await api.getPublicPortfolioBySubdomain(subdomain)
        setPortfolio(data)

        // If random theme is enabled, cycle through themes
        if (data.random_theme) {
          const themeKeys = Object.keys(themes) as ThemeName[]
          // Use a session counter to cycle through themes
          const viewCount = sessionStorage.getItem(`theme-cycle-${subdomain}`)
          const count = viewCount ? parseInt(viewCount) : 0
          const cycleTheme = themeKeys[count % themeKeys.length]
          sessionStorage.setItem(`theme-cycle-${subdomain}`, String(count + 1))
          setDisplayTheme(cycleTheme)
        } else {
          setDisplayTheme((data.theme || 'minimal') as ThemeName)
        }

        // Update page title with portfolio name
        document.title = `${data.manifest.personalInfo.name} - Portfolio`
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load portfolio')
      } finally {
        setLoading(false)
      }
    }

    loadPortfolio()
  }, [])

  // Reset title when component unmounts
  useEffect(() => {
    return () => {
      document.title = 'Portfolio Generator'
    }
  }, [])

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
            href={`${window.location.protocol}//withlumeo.com`}
            className="inline-block px-8 py-3 bg-neutral-700 text-white border-4 border-neutral-500 hover:bg-neutral-600 hover:shadow-md transition font-mono tracking-wider uppercase shadow-sm"
            style={{ imageRendering: 'pixelated' }}
          >
            ◀ Return Home
          </a>
        </div>
      </div>
    )
  }

  const CurrentThemeComponent = themes[displayTheme]

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
