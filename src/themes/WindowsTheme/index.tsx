import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { PortfolioManifest } from '../../types/manifest'
import { Desktop } from './Desktop.tsx'
import { Window } from './Window.tsx'
import { Taskbar } from './Taskbar.tsx'
import { StartMenu } from './StartMenu.tsx'

interface WindowsThemeProps {
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
  size: { width: number; height: number }
  zIndex: number
}

export const WindowsTheme = ({ manifest }: WindowsThemeProps) => {
  const [windows, setWindows] = useState<WindowState[]>([])
  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const [highestZIndex, setHighestZIndex] = useState(10)
  const [showBSOD, setShowBSOD] = useState(false)

  // Windows XP style colored icons
  const appIcons: Record<string, JSX.Element> = {
    about: (
      <svg className="w-10 h-10" viewBox="0 0 48 48">
        <defs>
          <linearGradient id="aboutGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#64B5F6" />
            <stop offset="100%" stopColor="#1565C0" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="16" r="10" fill="url(#aboutGrad)" />
        <path d="M8 42c0-8.837 7.163-14 16-14s16 5.163 16 14" fill="url(#aboutGrad)" />
      </svg>
    ),
    projects: (
      <svg className="w-10 h-10" viewBox="0 0 48 48">
        <defs>
          <linearGradient id="folderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="100%" stopColor="#FFA000" />
          </linearGradient>
        </defs>
        <path d="M4 10h14l4 4h22c2.2 0 4 1.8 4 4v22c0 2.2-1.8 4-4 4H4c-2.2 0-4-1.8-4-4V14c0-2.2 1.8-4 4-4z" fill="url(#folderGrad)" />
        <path d="M4 18h40v22c0 2.2-1.8 4-4 4H4c-2.2 0-4-1.8-4-4V18z" fill="#FFCA28" />
      </svg>
    ),
    experience: (
      <svg className="w-10 h-10" viewBox="0 0 48 48">
        <defs>
          <linearGradient id="briefGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8D6E63" />
            <stop offset="100%" stopColor="#4E342E" />
          </linearGradient>
        </defs>
        <rect x="4" y="14" width="40" height="28" rx="3" fill="url(#briefGrad)" />
        <rect x="16" y="8" width="16" height="10" rx="2" fill="none" stroke="#5D4037" strokeWidth="3" />
        <rect x="20" y="26" width="8" height="6" rx="1" fill="#D7CCC8" />
      </svg>
    ),
    skills: (
      <svg className="w-10 h-10" viewBox="0 0 48 48">
        <defs>
          <linearGradient id="toolboxGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EF5350" />
            <stop offset="100%" stopColor="#C62828" />
          </linearGradient>
        </defs>
        {/* Toolbox body */}
        <rect x="4" y="18" width="40" height="24" rx="3" fill="url(#toolboxGrad)" />
        {/* Toolbox lid */}
        <rect x="6" y="14" width="36" height="6" rx="2" fill="#F44336" />
        {/* Handle */}
        <rect x="18" y="8" width="12" height="8" rx="2" fill="none" stroke="#B71C1C" strokeWidth="3" />
        {/* Latch */}
        <rect x="21" y="26" width="6" height="4" rx="1" fill="#FFCDD2" />
      </svg>
    ),
    education: (
      <svg className="w-10 h-10" viewBox="0 0 48 48">
        <defs>
          <linearGradient id="eduGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1565C0" />
            <stop offset="100%" stopColor="#0D47A1" />
          </linearGradient>
        </defs>
        <path d="M24 4L2 16l22 12 18-9.82V34h4V16L24 4z" fill="url(#eduGrad)" />
        <path d="M8 22v12l16 8 16-8V22L24 30 8 22z" fill="#1976D2" />
      </svg>
    ),
    contact: (
      <svg className="w-10 h-10" viewBox="0 0 48 48">
        <defs>
          <linearGradient id="mailGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#BBDEFB" />
            <stop offset="100%" stopColor="#1976D2" />
          </linearGradient>
        </defs>
        <rect x="4" y="10" width="40" height="28" rx="3" fill="url(#mailGrad)" />
        <path d="M4 14l20 12 20-12" fill="none" stroke="#0D47A1" strokeWidth="2" />
        <rect x="4" y="10" width="40" height="28" rx="3" fill="none" stroke="#1565C0" strokeWidth="2" />
      </svg>
    ),
  }

  const apps = [
    { id: 'about', title: 'My Profile', icon: appIcons.about, content: 'about' },
    { id: 'projects', title: 'My Projects', icon: appIcons.projects, content: 'projects' },
    { id: 'experience', title: 'Experience', icon: appIcons.experience, content: 'experience' },
    { id: 'skills', title: 'Skills', icon: appIcons.skills, content: 'skills' },
    { id: 'education', title: 'Education', icon: appIcons.education, content: 'education' },
    { id: 'contact', title: 'Contact Me', icon: appIcons.contact, content: 'contact' },
  ]

  useEffect(() => {
    if (windows.length >= 8 && !showBSOD) {
      setShowBSOD(true)
    }
  }, [windows.length, showBSOD])

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
      position: { x: 100 + offset, y: 50 + offset },
      size: { width: 600, height: 450 },
      zIndex: newZIndex,
    }
    setWindows([...windows, newWindow])
    setStartMenuOpen(false)
  }

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id))
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
  }

  const updatePosition = (id: string, position: { x: number; y: number }) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, position } : w
    ))
  }

  if (showBSOD) {
    return (
      <div 
        className="min-h-screen bg-[#0078D7] flex flex-col items-center justify-center p-8 cursor-pointer"
        onClick={() => {
          setShowBSOD(false)
          setWindows([])
        }}
        style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}
      >
        <div className="text-white text-center max-w-2xl">
          <p className="text-9xl mb-8">:(</p>
          <p className="text-2xl mb-4">Your portfolio ran into a problem and needs to restart.</p>
          <p className="text-lg mb-8">We're just collecting some error info, and then we'll restart for you.</p>
          <p className="text-sm text-white/70 mb-4">0% complete</p>
          <p className="text-sm text-white/70 mb-8">
            If you'd like to know more, you can search online later for this error: TOO_MANY_WINDOWS_EXCEPTION
          </p>
          <p className="text-lg animate-pulse">Click anywhere to restart...</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="h-screen overflow-hidden relative bg-[#245EDC]"
      style={{ fontFamily: "'Segoe UI Variable', 'Segoe UI', system-ui, sans-serif" }}
    >
      <Desktop apps={apps} onOpenApp={openWindow} />

      <AnimatePresence>
        {windows.map(window => (
          !window.isMinimized && (
            <Window
              key={window.id}
              window={window}
              manifest={manifest}
              onClose={() => closeWindow(window.id)}
              onMinimize={() => minimizeWindow(window.id)}
              onMaximize={() => maximizeWindow(window.id)}
              onFocus={() => bringToFront(window.id)}
              onDrag={(pos) => updatePosition(window.id, pos)}
            />
          )
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {startMenuOpen && (
          <StartMenu
            apps={apps}
            manifest={manifest}
            onOpenApp={openWindow}
            onClose={() => setStartMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <Taskbar
        windows={windows}
        onWindowClick={(id) => {
          const window = windows.find(w => w.id === id)
          if (window?.isMinimized) {
            setWindows(prev => prev.map(w =>
              w.id === id ? { ...w, isMinimized: false } : w
            ))
          }
          bringToFront(id)
        }}
        onStartClick={() => setStartMenuOpen(!startMenuOpen)}
        startMenuOpen={startMenuOpen}
      />
    </div>
  )
}
