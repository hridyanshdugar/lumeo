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

export default function Dashboard() {
  const { currentUser, logout, updateManifest, updateTheme, toggleRandomTheme, updateSubdomain } = useUser()
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [isThemeSelectorPanelOpen, setIsThemeSelectorPanelOpen] = useState(false)
  const [isDomainPanelOpen, setIsDomainPanelOpen] = useState(false)
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
      setIsEditorOpen(false)
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
      {/* Sidebar Control Panel */}
      <div
        className="fixed left-0 top-0 h-full bg-neutral-800 border-r-4 border-neutral-600 shadow-lg z-40"
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
              onClick={() => {
                setIsEditorOpen(false)
                setIsThemeSelectorPanelOpen(false)
                setIsDomainPanelOpen(false)
              }}
              className="w-full px-6 py-3 bg-neutral-700 text-neutral-300 border-4 border-neutral-400 hover:bg-neutral-600 hover:shadow-md transition-all font-mono tracking-wider uppercase shadow-sm"
              style={{ imageRendering: 'pixelated' }}
            >
              Preview
            </button>

            <button
              onClick={() => {
                setIsEditorOpen(true)
                setIsThemeSelectorPanelOpen(false)
                setIsDomainPanelOpen(false)
              }}
              className="w-full px-6 py-3 bg-neutral-700 text-neutral-300 border-4 border-neutral-400 hover:bg-neutral-600 hover:shadow-md transition-all font-mono tracking-wider uppercase shadow-sm"
              style={{ imageRendering: 'pixelated' }}
            >
              Data
            </button>

            <button
              onClick={() => {
                setIsThemeSelectorPanelOpen(true)
                setIsEditorOpen(false)
                setIsDomainPanelOpen(false)
              }}
              className="w-full px-6 py-3 bg-neutral-700 text-neutral-300 border-4 border-neutral-400 hover:bg-neutral-600 hover:shadow-md transition-all font-mono tracking-wider uppercase shadow-sm"
              style={{ imageRendering: 'pixelated' }}
            >
              Themes
            </button>

            <button
              onClick={() => {
                setIsDomainPanelOpen(true)
                setIsEditorOpen(false)
                setIsThemeSelectorPanelOpen(false)
              }}
              className="w-full px-6 py-3 bg-neutral-700 text-neutral-300 border-4 border-neutral-400 hover:bg-neutral-600 hover:shadow-md transition-all font-mono tracking-wider uppercase shadow-sm"
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

      {/* Main Preview + Editor Area */}
      <div className="fixed left-[280px] right-0 top-0 bottom-0 p-4 flex flex-col min-h-0">
        {/* Preview Window */}
        <div className={`border-4 border-neutral-600 flex flex-col transition-all duration-500 ease-in-out shadow-lg ${
          (isEditorOpen || isThemeSelectorPanelOpen || isDomainPanelOpen) ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 flex-1'
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

        {/* Editor Window*/}
        <div className={`border-4 border-neutral-600 flex flex-col transition-all duration-500 ease-in-out shadow-lg ${
          isEditorOpen ? 'flex-1 opacity-100' : 'h-0 opacity-0 overflow-hidden'
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
                onClick={() => setIsEditorOpen(false)}
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
              onClose={() => setIsEditorOpen(false)}
            />
          </div>
        </div>

        {/* Theme Selector Window*/}
        <div className={`border-4 border-neutral-600 flex flex-col transition-all duration-500 ease-in-out shadow-lg ${
          isThemeSelectorPanelOpen ? 'flex-1 opacity-100' : 'h-0 opacity-0 overflow-hidden'
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
                onClick={() => setIsThemeSelectorPanelOpen(false)}
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
                setIsThemeSelectorPanelOpen(false)
              }}
              onClose={() => setIsThemeSelectorPanelOpen(false)}
            />
          </div>
        </div>

        {/* Domain Settings Window*/}
        <div className={`border-4 border-neutral-600 flex flex-col transition-all duration-500 ease-in-out shadow-lg ${
          isDomainPanelOpen ? 'flex-1 opacity-100' : 'h-0 opacity-0 overflow-hidden'
        } min-h-0`} style={{ imageRendering: 'pixelated' }}>
          {/* Domain Settings Header */}
          <div className="bg-neutral-800 border-b-4 border-neutral-600 px-4 py-2 flex items-center justify-between flex-shrink-0">
            <div>
              <p className="text-neutral-300 font-mono text-sm uppercase">&gt; Domain Settings</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDomainPanelOpen(false)}
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
