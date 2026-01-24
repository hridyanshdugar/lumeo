import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { PortfolioManifest } from '../../types/manifest'
import { MenuBar } from './MenuBar.tsx'
import { Dock } from './Dock.tsx'
import { FinderWindow } from './FinderWindow.tsx'
import { Spotlight } from './Spotlight.tsx'

interface MacOSThemeProps {
  manifest: PortfolioManifest
}

interface WindowState {
  id: string
  title: string
  icon: React.ReactNode
  content: string
  isMinimized: boolean
  isMaximized: boolean
  position: { x: number; y: number }
  zIndex: number
}

// macOS-style app icons with gradients
const AppIcon = ({ type }: { type: string }) => {
  const icons: Record<string, JSX.Element> = {
    about: (
      <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center shadow-lg">
        <svg className="w-8 h-8 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
      </div>
    ),
    finder: (
      <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        <svg className="w-9 h-9 text-white relative z-10" viewBox="0 0 32 32" fill="currentColor">
          <path d="M5 6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h22c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2H5zm0 2h22v16H5V8zm3 2c-.6 0-1 .4-1 1v10c0 .6.4 1 1 1s1-.4 1-1V11c0-.6-.4-1-1-1zm6 3c-1.7 0-3 1.3-3 3s1.3 3 3 3c.8 0 1.5-.3 2-1v1h2v-6h-2v1c-.5-.6-1.2-1-2-1zm8 0c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm-8 2c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm8 0c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z"/>
        </svg>
      </div>
    ),
    calendar: (
      <div className="w-12 h-12 rounded-xl bg-white shadow-lg flex flex-col items-center justify-center overflow-hidden border border-gray-200">
        <div className="w-full bg-red-500 text-white text-[8px] font-bold text-center py-0.5">
          {new Date().toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
        </div>
        <div className="text-2xl font-light text-gray-800 leading-none mt-0.5">
          {new Date().getDate()}
        </div>
      </div>
    ),
    settings: (
      <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-gray-400 to-gray-600 flex items-center justify-center shadow-lg">
        <svg className="w-8 h-8 text-gray-200" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
        </svg>
      </div>
    ),
    preview: (
      <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-purple-400 to-purple-600 flex items-center justify-center shadow-lg">
        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="4" width="16" height="16" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
          <path d="M4 15l4-4 3 3 5-5 4 4"/>
        </svg>
      </div>
    ),
    mail: (
      <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      </div>
    ),
  }
  return icons[type] || icons.finder
}

export const MacOSTheme = ({ manifest }: MacOSThemeProps) => {
  const [windows, setWindows] = useState<WindowState[]>([])
  const [spotlightOpen, setSpotlightOpen] = useState(false)
  const [highestZIndex, setHighestZIndex] = useState(1)
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null)

  const apps = [
    { id: 'about', title: `About ${manifest.personalInfo.name}`, icon: <AppIcon type="about" />, content: 'about' },
    { id: 'finder', title: 'Projects', icon: <AppIcon type="finder" />, content: 'projects' },
    { id: 'calendar', title: 'Experience', icon: <AppIcon type="calendar" />, content: 'experience' },
    { id: 'settings', title: 'Skills', icon: <AppIcon type="settings" />, content: 'skills' },
    { id: 'preview', title: 'Education', icon: <AppIcon type="preview" />, content: 'education' },
    { id: 'mail', title: 'Contact', icon: <AppIcon type="mail" />, content: 'contact' },
  ]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSpotlightOpen(true)
      }
      if (e.key === 'Escape') {
        setSpotlightOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const openWindow = (app: { id: string; title: string; icon: React.ReactNode; content: string }) => {
    const existingWindow = windows.find(w => w.id === app.id)
    if (existingWindow) {
      bringToFront(app.id)
      if (existingWindow.isMinimized) {
        setWindows(prev => prev.map(w => 
          w.id === app.id ? { ...w, isMinimized: false } : w
        ))
      }
      return
    }

    const newZIndex = highestZIndex + 1
    setHighestZIndex(newZIndex)

    const offset = (windows.length % 5) * 30
    const newWindow: WindowState = {
      ...app,
      isMinimized: false,
      isMaximized: false,
      position: { x: 150 + offset, y: 80 + offset },
      zIndex: newZIndex,
    }
    setWindows([...windows, newWindow])
    setActiveWindowId(app.id)
    setSpotlightOpen(false)
  }

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id))
    if (activeWindowId === id) {
      const remaining = windows.filter(w => w.id !== id)
      setActiveWindowId(remaining.length > 0 ? remaining[remaining.length - 1].id : null)
    }
  }

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, isMinimized: true } : w
    ))
  }

  const maximizeWindow = (id: string) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ))
  }

  const bringToFront = (id: string) => {
    const newZIndex = highestZIndex + 1
    setHighestZIndex(newZIndex)
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, zIndex: newZIndex } : w
    ))
    setActiveWindowId(id)
  }

  const updatePosition = (id: string, position: { x: number; y: number }) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, position } : w
    ))
  }

  const activeWindow = windows.find(w => w.id === activeWindowId && !w.isMinimized)

  return (
    <div 
      className="h-screen overflow-hidden relative"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" }}
    >
      {/* macOS Sonoma-inspired wallpaper */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-300 via-pink-400 via-purple-500 to-blue-600">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-orange-200/20" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-blue-950/50 to-transparent" />
        {/* Soft blurred orbs for depth */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-300/40 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-pink-400/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl" />
      </div>

      <MenuBar 
        activeApp={activeWindow?.title || 'Finder'}
        onSpotlightOpen={() => setSpotlightOpen(true)}
      />

      <AnimatePresence>
        {windows.map(window => (
          !window.isMinimized && (
            <FinderWindow
              key={window.id}
              window={window}
              manifest={manifest}
              isActive={activeWindowId === window.id}
              onClose={() => closeWindow(window.id)}
              onMinimize={() => minimizeWindow(window.id)}
              onMaximize={() => maximizeWindow(window.id)}
              onFocus={() => bringToFront(window.id)}
              onDrag={(pos) => updatePosition(window.id, pos)}
            />
          )
        ))}
      </AnimatePresence>

      <Dock
        apps={apps}
        openWindows={windows}
        onAppClick={openWindow}
        onWindowClick={(id) => {
          const window = windows.find(w => w.id === id)
          if (window?.isMinimized) {
            setWindows(prev => prev.map(w =>
              w.id === id ? { ...w, isMinimized: false } : w
            ))
          }
          bringToFront(id)
        }}
      />

      <AnimatePresence>
        {spotlightOpen && (
          <Spotlight
            manifest={manifest}
            apps={apps}
            onClose={() => setSpotlightOpen(false)}
            onOpenApp={openWindow}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
