import { useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ToggleBlockProps {
  title: string
  icon?: ReactNode
  defaultOpen?: boolean
  darkMode: boolean
  children: ReactNode
}

export const ToggleBlock = ({ title, icon, defaultOpen = false, darkMode, children }: ToggleBlockProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  return (
    <motion.div 
      className={`border-l-2 ${darkMode ? 'border-neutral-700' : 'border-neutral-200'} pl-4 py-1 my-2 relative group`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={isDragging ? { scale: 1.02, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' } : {}}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="absolute -left-8 top-1 cursor-grab active:cursor-grabbing"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
          >
            <svg className={`w-5 h-5 ${darkMode ? 'text-neutral-600' : 'text-neutral-400'}`} viewBox="0 0 24 24" fill="currentColor">
              <circle cx="9" cy="6" r="1.5" />
              <circle cx="15" cy="6" r="1.5" />
              <circle cx="9" cy="12" r="1.5" />
              <circle cx="15" cy="12" r="1.5" />
              <circle cx="9" cy="18" r="1.5" />
              <circle cx="15" cy="18" r="1.5" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 w-full text-left py-1.5 px-2 -ml-2 rounded transition-colors ${
          darkMode ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'
        }`}
      >
        <motion.span
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={`${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}
        >
          ▶
        </motion.span>
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span className="font-medium flex-1">{title}</span>
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1"
            >
              <button 
                className={`p-1 rounded ${darkMode ? 'hover:bg-neutral-700' : 'hover:bg-neutral-200'}`}
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
              <button 
                className={`p-1 rounded ${darkMode ? 'hover:bg-neutral-700' : 'hover:bg-neutral-200'}`}
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="pl-6 py-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
