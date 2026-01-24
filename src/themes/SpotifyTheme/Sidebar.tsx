import { motion } from 'framer-motion'
import { PortfolioManifest } from '../../types/manifest'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  currentSection: 'home' | 'projects' | 'experience' | 'skills' | 'education' | 'contact'
  onSectionChange: (section: 'home' | 'projects' | 'experience' | 'skills' | 'education' | 'contact') => void
  onLogoClick: () => void
  manifest: PortfolioManifest
}

export const Sidebar = ({ collapsed, onToggle, currentSection, onSectionChange, onLogoClick, manifest }: SidebarProps) => {
  const navItems = [
    { id: 'home' as const, label: 'Home', icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.5 3.247a1 1 0 00-1 0L4 7.577V20h4.5v-6a1 1 0 011-1h5a1 1 0 011 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 013 0l7.5 4.33a2 2 0 011 1.732V21a1 1 0 01-1 1h-6.5a1 1 0 01-1-1v-6h-3v6a1 1 0 01-1 1H3a1 1 0 01-1-1V7.577a2 2 0 011-1.732l7.5-4.33z" />
      </svg>
    )},
    { id: 'projects' as const, label: 'Projects', icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M15 4v4h4l-4-4zM8 3a1 1 0 00-1 1v16a1 1 0 001 1h10a1 1 0 001-1V8l-5-5H8z" />
      </svg>
    )},
    { id: 'experience' as const, label: 'Experience', icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 8V4l8 8-8 8v-4H4V8h8z" />
      </svg>
    )},
    { id: 'skills' as const, label: 'Skills', icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    )},
    { id: 'education' as const, label: 'Education', icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
      </svg>
    )},
    { id: 'contact' as const, label: 'Contact', icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    )},
  ]

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 280 }}
      className="bg-black h-full flex flex-col border-r border-zinc-800 flex-shrink-0"
    >
      <div className="p-4">
        <button
          onClick={onLogoClick}
          className="flex items-center gap-2 text-white hover:text-green-500 transition"
        >
          <svg className="w-10 h-10 text-green-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          {!collapsed && <span className="font-bold text-xl">Portfolio</span>}
        </button>
      </div>

      <nav className="flex-1 px-2">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition mb-1 ${
              currentSection === item.id 
                ? 'bg-zinc-800 text-white' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {item.icon}
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-zinc-800">
        {!collapsed && (
          <div className="space-y-2">
            <p className="text-xs text-zinc-500 uppercase tracking-wider">Your Library</p>
            {manifest.education.slice(0, 2).map((edu, idx) => (
              <div key={idx} className="text-sm text-zinc-400 hover:text-white cursor-pointer truncate">
                {edu.institution}
              </div>
            ))}
          </div>
        )}
        <button
          onClick={onToggle}
          className="mt-4 w-full flex items-center justify-center p-2 text-zinc-400 hover:text-white transition"
        >
          <svg 
            className={`w-5 h-5 transition-transform ${collapsed ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </motion.aside>
  )
}
