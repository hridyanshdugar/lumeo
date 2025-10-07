import { useState } from 'react'
import { useUser } from '../contexts/UserContext'
import { ThemeName } from '../App'
import { Link } from 'react-router-dom'
import MinimalTheme from '../themes/MinimalTheme'
import ModernTheme from '../themes/ModernTheme'
import GradientTheme from '../themes/GradientTheme'
import CyberTheme from '../themes/CyberTheme'
import ManifestEditor from '../components/ManifestEditor'
import Dialog from '../components/Dialog'
import { PortfolioManifest } from '../types/manifest'

const themes = {
  minimal: MinimalTheme,
  modern: ModernTheme,
  gradient: GradientTheme,
  cyber: CyberTheme,
}

export default function Dashboard() {
  const { currentUser, logout, updateManifest, updateTheme } = useUser()
  const [isEditorOpen, setIsEditorOpen] = useState(false)
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
  const portfolioUrl = `${window.location.origin}/${currentUser.username}`

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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(portfolioUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex h-screen bg-neutral-100 overflow-hidden">
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

          {/* Theme Selector */}
          <div className="mb-8">
            <h3 className="text-sm font-mono text-neutral-300 mb-3 tracking-wide uppercase px-2 py-1 bg-neutral-900 border-2 border-neutral-600 inline-block">Themes</h3>
            <div className="mt-3 border-4 border-neutral-600 bg-neutral-900 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-600 scrollbar-track-neutral-900">
              {Object.keys(themes).map((theme) => (
                <button
                  key={theme}
                  onClick={() => handleThemeChange(theme as ThemeName)}
                  className={`w-full px-4 py-3 text-left capitalize transition-all font-mono tracking-wide border-b-2 border-neutral-700 last:border-b-0 ${
                    currentTheme === theme
                      ? 'bg-neutral-600 text-white'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }`}
                  style={{ imageRendering: 'pixelated' }}
                >
                  <span className="mr-2">{currentTheme === theme ? '▶' : '◆'}</span>
                  {theme}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 flex-1">
            <button
              onClick={() => setIsEditorOpen(true)}
              className="w-full px-6 py-3 bg-neutral-600 text-white border-4 border-neutral-400 hover:bg-neutral-500 hover:shadow-md transition-all font-mono tracking-wider uppercase shadow-sm"
              style={{ imageRendering: 'pixelated' }}
            >
              ▶ Edit Data
            </button>

            <button
              onClick={logout}
              className="w-full px-6 py-3 bg-neutral-700 text-neutral-300 border-4 border-neutral-500 hover:bg-neutral-600 hover:shadow-md transition-all font-mono tracking-wider uppercase shadow-sm"
              style={{ imageRendering: 'pixelated' }}
            >
              ■ Logout
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
      <div className="fixed left-[280px] right-0 top-0 bottom-0 p-4 flex flex-col gap-4 min-h-0">
        {/* Preview Window */}
        <div className={`border-4 border-neutral-600 flex flex-col transition-all duration-500 ease-in-out shadow-lg ${
          isEditorOpen ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 flex-1'
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
          <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 bg-white">
            <CurrentThemeComponent manifest={currentUser.manifest} />
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
