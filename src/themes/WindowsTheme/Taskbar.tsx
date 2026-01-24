import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface WindowState {
  id: string
  title: string
  icon: React.ReactNode
  isMinimized: boolean
}

interface TaskbarProps {
  windows: WindowState[]
  onWindowClick: (id: string) => void
  onStartClick: () => void
  startMenuOpen: boolean
}

export const Taskbar = ({ windows, onWindowClick, onStartClick, startMenuOpen }: TaskbarProps) => {
  const [time, setTime] = useState(new Date())
  const [showNotifications, setShowNotifications] = useState(false)
  const [showQuickSettings, setShowQuickSettings] = useState(false)
  const [hoveredWindow, setHoveredWindow] = useState<string | null>(null)
  const [wifi, setWifi] = useState(true)
  const [bluetooth, setBluetooth] = useState(true)
  const [volume, setVolume] = useState(75)

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const notifications = [
    { id: 1, app: 'Portfolio', title: 'Welcome!', message: 'Thanks for viewing my portfolio', time: 'Just now' },
    { id: 2, app: 'Projects', title: 'New project available', message: 'Check out my latest work', time: '5m ago' },
  ]

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-gray-900/95 backdrop-blur-xl flex items-center justify-center px-2 z-50">
        <div className="flex items-center gap-1">
          <motion.button
            onClick={onStartClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-10 h-10 flex items-center justify-center rounded hover:bg-white/10 transition ${startMenuOpen ? 'bg-white/10' : ''}`}
          >
            <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/>
            </svg>
          </motion.button>

          <motion.button 
            className="w-10 h-10 flex items-center justify-center rounded hover:bg-white/10 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </motion.button>

          <div className="w-px h-6 bg-white/20 mx-1" />

          {windows.map((window) => (
            <motion.button
              key={window.id}
              onClick={() => onWindowClick(window.id)}
              onMouseEnter={() => setHoveredWindow(window.id)}
              onMouseLeave={() => setHoveredWindow(null)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`h-10 px-3 flex items-center gap-2 rounded transition relative ${
                window.isMinimized 
                  ? 'bg-white/5 hover:bg-white/10' 
                  : 'bg-white/20 hover:bg-white/25'
              }`}
            >
              <span>{window.icon}</span>
              <span className="text-white text-sm max-w-24 truncate hidden md:block">{window.title}</span>
              {!window.isMinimized && (
                <motion.div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-blue-400 rounded-full"
                  layoutId={`indicator-${window.id}`}
                />
              )}
              <AnimatePresence>
                {hoveredWindow === window.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 rounded-lg shadow-xl overflow-hidden"
                  >
                    <div className="w-48 h-32 bg-gray-700 flex items-center justify-center">
                      <span className="text-4xl">{window.icon}</span>
                    </div>
                    <div className="px-3 py-2">
                      <p className="text-white text-sm truncate">{window.title}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>

        <div className="absolute right-2 flex items-center gap-1 text-white text-xs">
          <motion.button 
            className="p-2 hover:bg-white/10 rounded flex items-center gap-2"
            onClick={() => setShowQuickSettings(!showQuickSettings)}
            whileHover={{ scale: 1.05 }}
          >
            {wifi && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>}
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
          </motion.button>
          <motion.button 
            className="p-2 hover:bg-white/10 rounded relative"
            onClick={() => setShowNotifications(!showNotifications)}
            whileHover={{ scale: 1.05 }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
          </motion.button>
          <motion.div 
            className="text-right hover:bg-white/10 px-2 py-1 rounded cursor-pointer"
            onClick={() => setShowNotifications(!showNotifications)}
            whileHover={{ scale: 1.02 }}
          >
            <p>{formatTime(time)}</p>
            <p className="text-white/70">{formatDate(time)}</p>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed right-0 top-0 bottom-12 w-80 bg-gray-900/95 backdrop-blur-xl z-40 border-l border-white/10 overflow-y-auto"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Notifications</h3>
                <button className="text-blue-400 text-sm hover:underline">Clear all</button>
              </div>
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <motion.div
                    key={notif.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/10 rounded-lg p-3 hover:bg-white/15 cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-white text-sm font-medium">{notif.app}</p>
                      <p className="text-white/50 text-xs">{notif.time}</p>
                    </div>
                    <p className="text-white/90 text-sm">{notif.title}</p>
                    <p className="text-white/60 text-xs mt-1">{notif.message}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showQuickSettings && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-14 right-4 w-80 bg-gray-900/95 backdrop-blur-xl z-40 rounded-lg border border-white/10 p-4"
          >
            <div className="grid grid-cols-3 gap-2 mb-4">
              <button 
                onClick={() => setWifi(!wifi)}
                className={`p-3 rounded-lg flex flex-col items-center gap-1 ${wifi ? 'bg-blue-500' : 'bg-white/10'}`}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
                <span className="text-white text-xs">WiFi</span>
              </button>
              <button 
                onClick={() => setBluetooth(!bluetooth)}
                className={`p-3 rounded-lg flex flex-col items-center gap-1 ${bluetooth ? 'bg-blue-500' : 'bg-white/10'}`}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z"/></svg>
                <span className="text-white text-xs">Bluetooth</span>
              </button>
              <button className="p-3 rounded-lg bg-white/10 flex flex-col items-center gap-1">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
                <span className="text-white text-xs">Location</span>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3z"/></svg>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #3b82f6 ${volume}%, rgba(255,255,255,0.2) ${volume}%)`
                }}
              />
              <span className="text-white text-xs w-8">{volume}%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
