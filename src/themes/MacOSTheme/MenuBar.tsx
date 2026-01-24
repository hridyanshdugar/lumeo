import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MenuBarProps {
  activeApp: string
  onSpotlightOpen: () => void
}

const MenuItem = ({ children, bold = false }: { children: React.ReactNode; bold?: boolean }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.span
      className={`px-2.5 py-0.5 rounded cursor-pointer relative select-none ${bold ? 'font-semibold' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.97 }}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.span
            className="absolute inset-0 bg-white/10 rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
        )}
      </AnimatePresence>
      <span className="relative z-10">{children}</span>
    </motion.span>
  )
}

const IconButton = ({ children, onClick, className = '' }: { children: React.ReactNode; onClick?: () => void; className?: string }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.button
      onClick={onClick}
      className={`p-2 rounded-md relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.85 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.span
            className="absolute inset-0 bg-white/15 rounded-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>
      <motion.span 
        className="relative z-10 flex items-center justify-center"
        animate={{ scale: isHovered ? 1.15 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      >
        {children}
      </motion.span>
    </motion.button>
  )
}

export const MenuBar = ({ activeApp, onSpotlightOpen }: MenuBarProps) => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  return (
    <motion.div 
      className="h-[26px] bg-black/30 backdrop-blur-2xl flex items-center justify-between px-3 text-white/95 text-[13px] relative z-50"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        boxShadow: '0 0.5px 0 0 rgba(255,255,255,0.1) inset, 0 1px 3px rgba(0,0,0,0.1)'
      }}
    >
      <div className="flex items-center gap-4">
        {/* Apple Logo */}
        <motion.button 
          className="px-1 py-0.5 rounded relative"
          whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.svg 
            className="w-[14px] h-[14px]" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </motion.svg>
        </motion.button>
        
        {/* Active App Name */}
        <MenuItem bold>{activeApp}</MenuItem>
        
        {/* Menu Items */}
        <MenuItem>File</MenuItem>
        <MenuItem>Edit</MenuItem>
        <MenuItem>View</MenuItem>
        <MenuItem>Go</MenuItem>
        <MenuItem>Window</MenuItem>
        <MenuItem>Help</MenuItem>
      </div>

      <div className="flex items-center gap-1">
        {/* Battery */}
        <IconButton>
          <svg className="w-[18px] h-[11px] opacity-90" viewBox="0 0 25 12" fill="none">
            <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeOpacity="0.5"/>
            <path d="M23 4v4a2 2 0 002-2v0a2 2 0 00-2-2z" fill="currentColor" fillOpacity="0.5"/>
            <rect x="2" y="2" width="15" height="8" rx="1.5" fill="currentColor"/>
          </svg>
        </IconButton>
        
        {/* WiFi */}
        <IconButton>
          <svg className="w-[15px] h-[15px] opacity-90" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 18c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-4.9-2.3l1.4 1.4C9.4 16.5 10.6 16 12 16s2.6.5 3.5 1.1l1.4-1.4C15.6 14.6 13.9 14 12 14s-3.6.6-4.9 1.7zm-2.8-2.8l1.4 1.4C7.3 13 9.5 12 12 12s4.7 1 6.3 2.3l1.4-1.4C17.7 11.2 15 10 12 10s-5.7 1.2-7.7 2.9zm-2.8-2.8l1.4 1.4C5.3 10.2 8.5 9 12 9s6.7 1.2 9.1 2.5l1.4-1.4C19.8 8.5 16.1 7 12 7s-7.8 1.5-10.5 3.1z"/>
          </svg>
        </IconButton>
        
        {/* Control Center */}
        <IconButton>
          <svg className="w-[14px] h-[14px] opacity-90" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="3" width="8" height="8" rx="2"/>
            <rect x="13" y="3" width="8" height="8" rx="2"/>
            <rect x="3" y="13" width="8" height="8" rx="2"/>
            <rect x="13" y="13" width="8" height="8" rx="2"/>
          </svg>
        </IconButton>
        
        {/* Spotlight */}
        <IconButton onClick={onSpotlightOpen}>
          <svg className="w-[14px] h-[14px] opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </IconButton>
        
        {/* Siri */}
        <IconButton className="mr-1">
          <div
            className="w-[16px] h-[16px] rounded-full"
            style={{
              background: 'linear-gradient(135deg, #FF6B9D 0%, #C865FF 50%, #65C8FF 100%)'
            }}
          />
        </IconButton>
        
        {/* Time */}
        <motion.span 
          className="text-[13px] font-medium ml-1 tabular-nums"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.95 }}
          transition={{ delay: 0.2 }}
        >
          {formatTime(time)}
        </motion.span>
      </div>
    </motion.div>
  )
}
