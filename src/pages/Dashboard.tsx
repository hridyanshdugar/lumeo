import { useState } from 'react'
import { useUser } from '../contexts/UserContext'
import { ThemeName } from '../App'
import MinimalTheme from '../themes/MinimalTheme'
import ModernTheme from '../themes/ModernTheme'
import GradientTheme from '../themes/GradientTheme'
import ManifestEditor from '../components/ManifestEditor'
import Dialog from '../components/Dialog'
import { PortfolioManifest } from '../types/manifest'

const themes = {
  minimal: MinimalTheme,
  modern: ModernTheme,
  gradient: GradientTheme,
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
  const portfolioUrl = `${window.location.origin}/portfolio/${currentUser.username}`

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
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Sidebar Control Panel */}
      <div
        className="fixed left-0 top-0 h-full bg-black border-r-2 border-cyan-400/50 z-40"
        style={{ width: '280px' }}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-cyan-400 tracking-wider mb-2">CONTROL_PANEL</h2>
            <p className="text-cyan-400/70 text-sm font-mono">&gt; system_controls</p>
          </div>

          {/* Theme Selector */}
          <div className="mb-8">
            <h3 className="text-sm font-mono text-cyan-400 mb-3 tracking-wide">VISUAL_PROTOCOL</h3>
            <div className="space-y-2">
              {Object.keys(themes).map((theme) => (
                <button
                  key={theme}
                  onClick={() => handleThemeChange(theme as ThemeName)}
                  className={`w-full px-4 py-3 text-left capitalize transition-colors font-mono tracking-wide ${
                    currentTheme === theme
                      ? 'bg-cyan-500/30 text-cyan-400 border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.4)]'
                      : 'bg-black text-cyan-400/70 border border-cyan-400/30 hover:border-cyan-400/50 hover:text-cyan-400'
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 flex-1">
            <button
              onClick={() => setIsEditorOpen(true)}
              className="w-full px-6 py-3 bg-cyan-500/20 text-cyan-400 border-2 border-cyan-400 hover:bg-cyan-500/30 hover:shadow-[0_0_20px_rgba(0,243,255,0.5)] transition font-mono tracking-wider"
            >
              ▶ EDIT_DATA
            </button>

            <button
              onClick={logout}
              className="w-full px-6 py-3 bg-red-500/20 text-red-400 border-2 border-red-400 hover:bg-red-500/30 hover:shadow-[0_0_20px_rgba(255,0,0,0.5)] transition font-mono tracking-wider"
            >
              ■ DISCONNECT
            </button>
          </div>

          {/* User Info */}
          <div className="mt-auto pt-6 border-t border-cyan-400/30">
            <p className="text-cyan-400/70 text-sm font-mono">&gt; user_id:</p>
            <p className="text-cyan-400 font-mono truncate">{currentUser.email}</p>
          </div>
        </div>
      </div>

      {/* Main Preview Window */}
      <div className="fixed left-[280px] right-0 top-0 bottom-0 p-4 flex flex-col gap-4">
        {/* Preview Window */}
        <div className={`border-2 border-cyan-400/30 flex flex-col transition-all duration-300 ${
          isEditorOpen ? 'h-1/2' : 'flex-1'
        }`}>
          {/* Preview Label */}
          <div className="bg-black border-b-2 border-cyan-400/30 px-4 py-2 flex items-center justify-between flex-shrink-0">
            <p className="text-cyan-400 font-mono text-sm">&gt; PREVIEW_WINDOW [{currentTheme}]</p>
            <button
              onClick={handleCopyLink}
              className={`px-4 py-1.5 border font-mono text-xs tracking-wider transition ${
                copied
                  ? 'bg-green-500/20 text-green-400 border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.4)]'
                  : 'bg-cyan-500/20 text-cyan-400 border-cyan-400 hover:bg-cyan-500/30 hover:shadow-[0_0_15px_rgba(0,243,255,0.4)]'
              }`}
            >
              {copied ? '✓ COPIED' : '🔗 COPY_LINK'}
            </button>
          </div>

          {/* Portfolio Preview with Scroll */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <CurrentThemeComponent manifest={currentUser.manifest} />
          </div>
        </div>

        {/* Editor Window */}
        {isEditorOpen && (
          <div className="flex-1 border-2 border-cyan-400/30 flex flex-col">
            {/* Editor Header */}
            <div className="bg-black border-b-2 border-cyan-400/30 px-4 py-2 flex items-center justify-between flex-shrink-0">
              <div>
                <p className="text-cyan-400 font-mono text-sm">&gt; DATA MATRIX EDITOR</p>
              </div>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="text-cyan-400 hover:text-cyan-300 text-xl font-bold w-8 h-8 flex items-center justify-center border border-cyan-400/30 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition"
              >
                ×
              </button>
            </div>

            {/* Editor Content */}
            <div className="flex-1 overflow-hidden p-4">
              <ManifestEditor
                manifest={currentUser.manifest}
                onSave={handleSaveManifest}
                onClose={() => setIsEditorOpen(false)}
              />
            </div>
          </div>
        )}
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
