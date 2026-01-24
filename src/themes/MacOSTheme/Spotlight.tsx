import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PortfolioManifest } from '../../types/manifest'

interface App {
  id: string
  title: string
  icon: React.ReactNode
  content: string
}

interface SpotlightProps {
  manifest: PortfolioManifest
  apps: App[]
  onClose: () => void
  onOpenApp: (app: App) => void
}

export const Spotlight = ({ manifest, apps, onClose, onOpenApp }: SpotlightProps) => {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const projectIcon = (
    <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center shadow">
      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>
    </div>
  )
  const skillIcon = (
    <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-gray-400 to-gray-600 flex items-center justify-center shadow">
      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
    </div>
  )

  const allItems = [
    ...apps.map(app => ({ type: 'app', ...app })),
    ...manifest.projects.map(p => ({ type: 'project', id: p.name, title: p.name, icon: projectIcon })),
    ...manifest.skills.flatMap(g => g.items.map(s => ({ type: 'skill', id: s, title: s, icon: skillIcon, description: g.category }))),
  ]

  const filtered = query 
    ? allItems.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        (item as any).description?.toLowerCase().includes(query.toLowerCase())
      )
    : allItems.slice(0, 8)

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, filtered.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault()
        const item = filtered[selectedIndex]
        if (item.type === 'app') {
          onOpenApp(item as App)
        }
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [filtered, selectedIndex, onClose, onOpenApp])

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -20 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[680px] bg-gray-100/98 backdrop-blur-2xl rounded-2xl shadow-2xl overflow-hidden z-50"
        style={{ boxShadow: '0 25px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.1)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-4 px-5 py-4 border-b border-gray-200/80">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Spotlight Search"
            className="flex-1 bg-transparent outline-none text-xl text-gray-800 placeholder-gray-400"
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 hover:bg-gray-200 rounded-full transition"
            >
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          )}
        </div>

        <div className="max-h-[400px] overflow-auto">
          {filtered.length > 0 ? (
            <div className="p-2">
              <p className="text-[11px] text-gray-500 uppercase font-semibold tracking-wider px-3 py-2">
                {query ? `${filtered.length} Result${filtered.length > 1 ? 's' : ''}` : 'Suggestions'}
              </p>
              {filtered.map((item, idx) => (
                <button
                  key={item.id + idx}
                  onClick={() => {
                    if (item.type === 'app') {
                      onOpenApp(item as App)
                    }
                    onClose()
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-xl transition-colors ${
                    idx === selectedIndex ? 'bg-blue-500' : 'hover:bg-gray-200/60'
                  }`}
                >
                  <div className={`${idx === selectedIndex ? 'brightness-110' : ''}`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className={`font-medium truncate ${idx === selectedIndex ? 'text-white' : 'text-gray-800'}`}>
                      {item.title}
                    </p>
                    {(item as any).description && (
                      <p className={`text-[12px] truncate ${idx === selectedIndex ? 'text-blue-100' : 'text-gray-500'}`}>
                        {(item as any).description}
                      </p>
                    )}
                  </div>
                  <span className={`text-[11px] font-medium uppercase tracking-wider ${
                    idx === selectedIndex ? 'text-blue-200' : 'text-gray-400'
                  }`}>
                    {item.type}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <p className="text-gray-500 font-medium">No results found</p>
              <p className="text-gray-400 text-sm mt-1">Try a different search term</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-4 py-2.5 border-t border-gray-300 bg-gray-100">
          <div className="flex items-center gap-4 text-[11px] text-gray-600">
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 bg-gray-300 text-gray-700 rounded text-[10px] font-medium shadow-sm">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-gray-300 text-gray-700 rounded text-[10px] font-medium shadow-sm">↓</kbd>
              <span className="text-gray-600">navigate</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 bg-gray-300 text-gray-700 rounded text-[10px] font-medium shadow-sm">↵</kbd>
              <span className="text-gray-600">open</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 bg-gray-300 text-gray-700 rounded text-[10px] font-medium shadow-sm">esc</kbd>
              <span className="text-gray-600">close</span>
            </span>
          </div>
          <span className="text-[11px] text-gray-500 font-medium">Spotlight</span>
        </div>
      </motion.div>
    </>
  )
}
