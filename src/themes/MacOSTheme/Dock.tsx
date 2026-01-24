import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'

interface App {
  id: string
  title: string
  icon: React.ReactNode
  content: string
}

interface WindowState {
  id: string
  isMinimized: boolean
}

interface DockProps {
  apps: App[]
  openWindows: WindowState[]
  onAppClick: (app: App) => void
  onWindowClick: (id: string) => void
}

const ICON_SPACING = 6
const MAX_SCALE = 1.5

const DockIcon = ({ 
  app, 
  isOpen, 
  isBouncing, 
  isHovered,
  showTooltip,
  onMouseEnter,
  onMouseLeave,
  onClick 
}: { 
  app: App
  isOpen: boolean
  isBouncing: boolean
  isHovered: boolean
  showTooltip: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick: () => void
}) => {
  const scale = useSpring(isHovered ? MAX_SCALE : 1, {
    mass: 0.1,
    stiffness: 300,
    damping: 20
  })

  const translateX = useTransform(scale, [1, MAX_SCALE], [0, 12])

  return (
    <motion.button
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{ 
        scale: isBouncing ? 1 : scale,
        x: isBouncing ? 0 : translateX
      }}
      animate={isBouncing ? {
        x: [0, 20, 0, 10, 0, 4, 0],
      } : {}}
      transition={isBouncing ? { 
        duration: 0.6, 
        times: [0, 0.2, 0.4, 0.55, 0.7, 0.85, 1],
        ease: 'easeOut'
      } : undefined}
      className="relative flex items-center origin-left"
    >
      <motion.div
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        {app.icon}
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute -left-1.5 w-1 h-1 bg-white/90 rounded-full"
            style={{ boxShadow: '0 0 4px rgba(255,255,255,0.5)' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: -5, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -5, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="absolute left-14 bg-gray-900/90 text-white text-[11px] px-3 py-1.5 rounded-lg whitespace-nowrap backdrop-blur-xl font-medium shadow-xl border border-white/10"
          >
            {app.title}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900/90 rotate-45 border-l border-b border-white/10" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export const Dock = ({ apps, openWindows, onAppClick, onWindowClick }: DockProps) => {
  const [bouncingApp, setBouncingApp] = useState<string | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    if (bouncingApp) {
      const timer = setTimeout(() => setBouncingApp(null), 800)
      return () => clearTimeout(timer)
    }
  }, [bouncingApp])

  const handleAppClick = (app: App) => {
    const isOpen = openWindows.some(w => w.id === app.id)
    if (isOpen) {
      onWindowClick(app.id)
    } else {
      setBouncingApp(app.id)
      onAppClick(app)
    }
  }

  return (
    <div className="fixed left-3 top-1/2 -translate-y-1/2 z-50" style={{ marginTop: '13px' }}>
      <motion.div 
        className="bg-white/20 backdrop-blur-2xl rounded-[20px] py-2 px-2 flex flex-col items-center border border-white/30"
        style={{ 
          boxShadow: '0 0 0 0.5px rgba(255,255,255,0.2) inset, 0 25px 50px -12px rgba(0,0,0,0.4), 0 0 80px -20px rgba(0,0,0,0.3)',
          gap: `${ICON_SPACING}px`
        }}
        onMouseLeave={() => setHoveredIndex(null)}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 25, delay: 0.2 }}
      >
        {apps.map((app, index) => {
          const isOpen = openWindows.some(w => w.id === app.id)
          const isBouncing = bouncingApp === app.id
          return (
            <DockIcon
              key={app.id}
              app={app}
              isOpen={isOpen}
              isBouncing={isBouncing}
              isHovered={hoveredIndex === index}
              showTooltip={hoveredIndex === index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleAppClick(app)}
            />
          )
        })}
        
        <div className="h-px w-10 bg-white/30 my-1 rounded-full" />
        
        <TrashIcon 
          isHovered={hoveredIndex === apps.length}
          showTooltip={hoveredIndex === apps.length}
          onMouseEnter={() => setHoveredIndex(apps.length)}
          onMouseLeave={() => setHoveredIndex(null)}
        />
      </motion.div>
    </div>
  )
}

const TrashIcon = ({ 
  isHovered,
  showTooltip,
  onMouseEnter,
  onMouseLeave
}: { 
  isHovered: boolean
  showTooltip: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}) => {
  const scale = useSpring(isHovered ? MAX_SCALE : 1, {
    mass: 0.1,
    stiffness: 300,
    damping: 20
  })

  const translateX = useTransform(scale, [1, MAX_SCALE], [0, 12])

  return (
    <motion.button
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ scale, x: translateX }}
      className="relative origin-left"
    >
      <motion.div 
        className="w-12 h-12 rounded-xl bg-gradient-to-b from-gray-200 to-gray-400 flex items-center justify-center shadow-lg"
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"/>
        </svg>
      </motion.div>
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: -5, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -5, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="absolute left-14 top-1/2 -translate-y-1/2 bg-gray-900/90 text-white text-[11px] px-3 py-1.5 rounded-lg whitespace-nowrap backdrop-blur-xl font-medium shadow-xl border border-white/10"
          >
            Trash
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900/90 rotate-45 border-l border-b border-white/10" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
