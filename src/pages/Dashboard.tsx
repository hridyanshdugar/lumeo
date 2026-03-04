import { useState, lazy, Suspense } from 'react'
import { useUser } from '../contexts/UserContext'
import { ThemeName } from '../App'
import { Link } from 'react-router-dom'
import ManifestEditor from '../components/ManifestEditor'
import Dialog from '../components/Dialog'
import ThemeSelector from '../components/ThemeSelector'
import DomainSettings from '../components/DomainSettings'
import { PortfolioManifest } from '../types/manifest'

const MinimalTheme = lazy(() => import('../themes/MinimalTheme'))
const ModernTheme = lazy(() => import('../themes/ModernTheme'))
const GradientTheme = lazy(() => import('../themes/GradientTheme'))
const CyberTheme = lazy(() => import('../themes/CyberTheme'))
const TerminalTheme = lazy(() => import('../themes/TerminalTheme'))
const GoogleTheme = lazy(() => import('../themes/GoogleTheme/index').then(module => ({ default: module.GoogleTheme })))
const SpotifyTheme = lazy(() => import('../themes/SpotifyTheme/index').then(module => ({ default: module.SpotifyTheme })))
const NotionTheme = lazy(() => import('../themes/NotionTheme/index').then(module => ({ default: module.NotionTheme })))
const VSCodeTheme = lazy(() => import('../themes/VSCodeTheme/index').then(module => ({ default: module.VSCodeTheme })))
const AppleTheme = lazy(() => import('../themes/AppleTheme'))
const TwitterTheme = lazy(() => import('../themes/TwitterTheme/index').then(module => ({ default: module.TwitterTheme })))
const NetflixTheme = lazy(() => import('../themes/NetflixTheme/index').then(module => ({ default: module.NetflixTheme })))
const WindowsTheme = lazy(() => import('../themes/WindowsTheme/index').then(module => ({ default: module.WindowsTheme })))
const MacOSTheme = lazy(() => import('../themes/MacOSTheme/index').then(module => ({ default: module.MacOSTheme })))
const NewspaperTheme = lazy(() => import('../themes/NewspaperTheme/index').then(module => ({ default: module.NewspaperTheme })))

const themes = {
  minimal: MinimalTheme,
  modern: ModernTheme,
  gradient: GradientTheme,
  cyber: CyberTheme,
  terminal: TerminalTheme,
  google: GoogleTheme,
  spotify: SpotifyTheme,
  notion: NotionTheme,
  vscode: VSCodeTheme,
  apple: AppleTheme,
  twitter: TwitterTheme,
  netflix: NetflixTheme,
  windows: WindowsTheme,
  macos: MacOSTheme,
  newspaper: NewspaperTheme,
}

type ActiveTab = 'preview' | 'data' | 'themes' | 'domain'

const TAB_LABELS: Record<ActiveTab, string> = {
  preview: 'Preview',
  data: 'Manifest Editor',
  themes: 'Theme Selector',
  domain: 'Domain Settings',
}

const BOTTOM_NAV_ITEMS: { tab: ActiveTab; icon: string; label: string }[] = [
  { tab: 'preview', icon: '◆', label: 'Preview' },
  { tab: 'data', icon: '≡', label: 'Data' },
  { tab: 'themes', icon: '◈', label: 'Themes' },
  { tab: 'domain', icon: '⊕', label: 'Domain' },
]

export default function Dashboard() {
  const { currentUser, logout, updateManifest, updateTheme, toggleRandomTheme, updateSubdomain } = useUser()
  const [activeTab, setActiveTab] = useState<ActiveTab>('preview')
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [dialog, setDialog] = useState<{ isOpen: boolean; title: string; message: string; type: 'error' | 'success' | 'info' }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  })

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  const currentTheme = (currentUser.theme || 'minimal') as ThemeName
  const CurrentThemeComponent = themes[currentTheme]
  const portfolioUrl = currentUser.subdomain
    ? `https://${currentUser.subdomain}.withlumeo.com`
    : `${window.location.origin}/${currentUser.username}`

  const handleSaveManifest = async (manifest: PortfolioManifest) => {
    try {
      await updateManifest(manifest)
      setActiveTab('preview')
    } catch (error) {
      setDialog({
        isOpen: true,
        title: 'SAVE FAILED',
        message: 'Failed to save manifest. Please try again.',
        type: 'error'
      })
    }
  }

  const handleThemeChange = async (theme: ThemeName) => {
    try {
      await updateTheme(theme)
    } catch (error) {
      setDialog({
        isOpen: true,
        title: 'THEME UPDATE FAILED',
        message: 'Failed to change theme. Please try again.',
        type: 'error'
      })
    }
  }

  const handleRandomThemeToggle = async () => {
    try {
      await toggleRandomTheme()
    } catch (error) {
      setDialog({
        isOpen: true,
        title: 'RANDOM THEME TOGGLE FAILED',
        message: 'Failed to toggle random theme. Please try again.',
        type: 'error'
      })
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(portfolioUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex h-screen bg-neutral-400 overflow-hidden">
      {/* Sidebar Control Panel - hidden on mobile */}
      <div
        className="hidden md:block fixed left-0 top-0 h-full bg-neutral-800 border-r-4 border-neutral-600 shadow-lg z-40"
        style={{ width: '280px', imageRendering: 'pixelated' }}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="mb-8 border-4 border-neutral-600 bg-neutral-900 p-4 shadow-md">
            <h2 className="text-2xl font-bold text-neutral-300 tracking-wider mb-2 uppercase" style={{ fontFamily: 'monospace' }}>Lumeo</h2>
            <p className="text-neutral-400 text-sm font-mono">&gt; Dashboard</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 flex-1">
            <button
              onClick={() => setActiveTab('preview')}
              className={`w-full px-6 py-3 text-neutral-300 border-4 border-neutral-400 hover:bg-neutral-600 hover:shadow-md transition-all font-mono tracking-wider uppercase shadow-sm ${
                activeTab === 'preview' ? 'bg-neutral-600' : 'bg-neutral-700'
              }`}
              style={{ imageRendering: 'pixelated' }}
            >
              Preview
            </button>

            <button
              onClick={() => setActiveTab('data')}
              className={`w-full px-6 py-3 text-neutral-300 border-4 border-neutral-400 hover:bg-neutral-600 hover:shadow-md transition-all font-mono tracking-wider uppercase shadow-sm ${
                activeTab === 'data' ? 'bg-neutral-600' : 'bg-neutral-700'
              }`}
              style={{ imageRendering: 'pixelated' }}
            >
              Data
            </button>

            <button
              onClick={() => setActiveTab('themes')}
              className={`w-full px-6 py-3 text-neutral-300 border-4 border-neutral-400 hover:bg-neutral-600 hover:shadow-md transition-all font-mono tracking-wider uppercase shadow-sm ${
                activeTab === 'themes' ? 'bg-neutral-600' : 'bg-neutral-700'
              }`}
              style={{ imageRendering: 'pixelated' }}
            >
              Themes
            </button>

            <button
              onClick={() => setActiveTab('domain')}
              className={`w-full px-6 py-3 text-neutral-300 border-4 border-neutral-400 hover:bg-neutral-600 hover:shadow-md transition-all font-mono tracking-wider uppercase shadow-sm ${
                activeTab === 'domain' ? 'bg-neutral-600' : 'bg-neutral-700'
              }`}
              style={{ imageRendering: 'pixelated' }}
            >
              Domain
            </button>

            <button
              onClick={logout}
              className="w-full px-6 py-3 bg-neutral-700 text-neutral-300 border-4 border-neutral-400 hover:bg-neutral-600 hover:shadow-md transition-all font-mono tracking-wider uppercase shadow-sm"
              style={{ imageRendering: 'pixelated' }}
            >
              Logout
            </button>
          </div>

          {/* User Info */}
          <div className="mt-auto pt-6 border-t-4 border-neutral-600">
            <p className="text-neutral-400 text-sm font-mono uppercase">&gt; User:</p>
            <p className="text-neutral-300 font-mono truncate text-sm">{currentUser.email}</p>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 bg-neutral-800 border-b-4 border-neutral-600 px-4 py-3 flex items-center justify-between z-40"
        style={{ imageRendering: 'pixelated' }}
      >
        <h2 className="text-lg font-bold text-neutral-300 tracking-wider uppercase font-mono">Lumeo</h2>
        <p className="text-neutral-400 text-xs font-mono truncate ml-3">
          &gt; {TAB_LABELS[activeTab]}{activeTab === 'preview' ? ` [${currentTheme}]` : ''}
        </p>
      </div>

      {/* Main Preview + Editor Area */}
      <div className="fixed left-0 md:left-[280px] right-0 top-[52px] md:top-0 bottom-[60px] md:bottom-0 p-2 md:p-4 flex flex-col min-h-0">
        {/* Preview Window */}
        <div className={`border-4 border-neutral-600 flex flex-col transition-all duration-500 ease-in-out shadow-lg ${
          activeTab !== 'preview' ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 flex-1'
        } min-h-0`} style={{ imageRendering: 'pixelated' }}>
          {/* Preview Label */}
          <div className="bg-neutral-800 border-b-4 border-neutral-600 px-4 py-2 flex items-center justify-between flex-shrink-0">
            <p className="text-neutral-300 font-mono text-sm uppercase">&gt; Preview [{currentTheme}]</p>
            <button
              onClick={handleCopyLink}
              className={`px-4 py-1.5 border-3 font-mono text-xs tracking-wider transition uppercase shadow-sm ${
                copied
                  ? 'bg-green-700 text-white border-green-500 shadow-md'
                  : 'bg-neutral-600 text-white border-neutral-400 hover:bg-neutral-500 hover:shadow-md'
              }`}
              style={{ imageRendering: 'pixelated', borderWidth: '3px' }}
            >
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>

          {/* Portfolio Preview with Scroll */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 bg-white relative" style={{ transform: 'scale(1)', isolation: 'isolate' }}>
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-h-screen">
                  <div className="text-xl font-mono">Loading theme...</div>
                </div>
              }
            >
              <CurrentThemeComponent manifest={currentUser.manifest} />
            </Suspense>
          </div>
        </div>

        {/* Editor Window */}
        <div className={`border-4 border-neutral-600 flex flex-col transition-all duration-500 ease-in-out shadow-lg ${
          activeTab === 'data' ? 'flex-1 opacity-100' : 'h-0 opacity-0 overflow-hidden'
        } min-h-0`} style={{ imageRendering: 'pixelated' }}>
          {/* Editor Header */}
          <div className="bg-neutral-800 border-b-4 border-neutral-600 px-4 py-2 flex items-center justify-between flex-shrink-0">
            <div>
              <p className="text-neutral-300 font-mono text-sm uppercase">&gt; Manifest Editor</p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/manifest-info"
                target="_blank"
                className="px-4 py-1.5 border-3 border-neutral-500 text-neutral-300 bg-neutral-700 hover:bg-neutral-600 hover:border-neutral-400 hover:shadow-md transition font-mono text-xs tracking-wider uppercase shadow-sm"
                style={{ imageRendering: 'pixelated', borderWidth: '3px' }}
              >
                Field Guide
              </Link>

              <button
                onClick={() => setActiveTab('preview')}
                className="text-white bg-neutral-700 hover:bg-neutral-600 text-xl font-bold w-8 h-8 flex items-center justify-center border-3 border-neutral-500 hover:shadow-md transition shadow-sm"
                style={{ imageRendering: 'pixelated', borderWidth: '3px' }}
              >
                ×
              </button>
            </div>
          </div>

          {/* Editor Content */}
          <div className="flex-1 overflow-hidden p-4 min-h-0 bg-neutral-900">
            <ManifestEditor
              manifest={currentUser.manifest}
              onSave={handleSaveManifest}
              onClose={() => setActiveTab('preview')}
            />
          </div>
        </div>

        {/* Theme Selector Window */}
        <div className={`border-4 border-neutral-600 flex flex-col transition-all duration-500 ease-in-out shadow-lg ${
          activeTab === 'themes' ? 'flex-1 opacity-100' : 'h-0 opacity-0 overflow-hidden'
        } min-h-0`} style={{ imageRendering: 'pixelated' }}>
          {/* Theme Selector Header */}
          <div className="bg-neutral-800 border-b-4 border-neutral-600 px-4 py-2 flex items-center justify-between flex-shrink-0">
            <div>
              <p className="text-neutral-300 font-mono text-sm uppercase">&gt; Theme Selector</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleRandomThemeToggle}
                className={`px-4 py-1.5 border-3 font-mono text-xs tracking-wider uppercase shadow-sm ${
                  currentUser.randomTheme
                    ? 'bg-neutral-600 text-white border-neutral-400 hover:bg-neutral-500'
                    : 'bg-neutral-700 text-neutral-300 border-neutral-500 hover:bg-neutral-600'
                }`}
                style={{ imageRendering: 'pixelated', borderWidth: '3px' }}
              >
                <span className="mr-2">{currentUser.randomTheme ? '▶' : '◆'}</span>
                Shuffle Themes
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className="text-white bg-neutral-700 hover:bg-neutral-600 text-xl font-bold w-8 h-8 flex items-center justify-center border-3 border-neutral-500 hover:shadow-md transition shadow-sm"
                style={{ imageRendering: 'pixelated', borderWidth: '3px' }}
              >
                ×
              </button>
            </div>
          </div>

          {/* Theme Selector Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 min-h-0 bg-neutral-900">
            <ThemeSelector
              themes={themes}
              currentTheme={currentTheme}
              onThemeChange={(theme) => {
                handleThemeChange(theme)
                setActiveTab('preview')
              }}
              onClose={() => setActiveTab('preview')}
            />
          </div>
        </div>

        {/* Domain Settings Window */}
        <div className={`border-4 border-neutral-600 flex flex-col transition-all duration-500 ease-in-out shadow-lg ${
          activeTab === 'domain' ? 'flex-1 opacity-100' : 'h-0 opacity-0 overflow-hidden'
        } min-h-0`} style={{ imageRendering: 'pixelated' }}>
          {/* Domain Settings Header */}
          <div className="bg-neutral-800 border-b-4 border-neutral-600 px-4 py-2 flex items-center justify-between flex-shrink-0">
            <div>
              <p className="text-neutral-300 font-mono text-sm uppercase">&gt; Domain Settings</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('preview')}
                className="text-white bg-neutral-700 hover:bg-neutral-600 text-xl font-bold w-8 h-8 flex items-center justify-center border-3 border-neutral-500 hover:shadow-md transition shadow-sm"
                style={{ imageRendering: 'pixelated', borderWidth: '3px' }}
              >
                ×
              </button>
            </div>
          </div>

          {/* Domain Settings Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 min-h-0 bg-neutral-900">
            <DomainSettings
              currentSubdomain={currentUser.subdomain}
              username={currentUser.username}
              onSave={updateSubdomain}
            />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 bg-neutral-800 border-t-4 border-neutral-600 z-40"
        style={{ imageRendering: 'pixelated' }}
      >
        {/* More popover */}
        {isMoreOpen && (
          <div className="absolute bottom-full left-0 right-0 bg-neutral-900 border-t-4 border-x-4 border-neutral-600 p-4 space-y-3">
            <div className="border-b-2 border-neutral-700 pb-3">
              <p className="text-neutral-400 text-xs font-mono uppercase">&gt; User:</p>
              <p className="text-neutral-300 font-mono truncate text-sm">{currentUser.email}</p>
            </div>
            <button
              onClick={() => { setIsMoreOpen(false); handleCopyLink() }}
              className="w-full px-4 py-2.5 bg-neutral-700 text-neutral-300 border-2 border-neutral-500 hover:bg-neutral-600 transition-all font-mono text-sm tracking-wider uppercase"
              style={{ imageRendering: 'pixelated' }}
            >
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
            <button
              onClick={logout}
              className="w-full px-4 py-2.5 bg-neutral-700 text-neutral-300 border-2 border-neutral-500 hover:bg-neutral-600 transition-all font-mono text-sm tracking-wider uppercase"
              style={{ imageRendering: 'pixelated' }}
            >
              Logout
            </button>
          </div>
        )}

        <div className="flex items-stretch">
          {BOTTOM_NAV_ITEMS.map(({ tab, icon, label }) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setIsMoreOpen(false) }}
              className={`flex-1 flex flex-col items-center py-2.5 font-mono text-xs tracking-wider uppercase transition-all ${
                activeTab === tab && !isMoreOpen ? 'bg-neutral-600 text-white' : 'text-neutral-400 hover:bg-neutral-700'
              }`}
            >
              <span className="text-base mb-0.5">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
          <button
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            className={`flex-1 flex flex-col items-center py-2.5 font-mono text-xs tracking-wider uppercase transition-all ${
              isMoreOpen ? 'bg-neutral-600 text-white' : 'text-neutral-400 hover:bg-neutral-700'
            }`}
          >
            <span className="text-base mb-0.5">···</span>
            <span>More</span>
          </button>
        </div>
      </div>

      {/* Dismiss more popover on tap outside */}
      {isMoreOpen && (
        <div className="md:hidden fixed inset-0 z-30" onClick={() => setIsMoreOpen(false)} />
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
