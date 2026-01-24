import { motion } from 'framer-motion'
import { PortfolioManifest } from '../../types/manifest'

interface App {
  id: string
  title: string
  icon: React.ReactNode
  content: string
}

interface StartMenuProps {
  apps: App[]
  manifest: PortfolioManifest
  onOpenApp: (app: App) => void
  onClose: () => void
}

export const StartMenu = ({ apps, manifest, onOpenApp, onClose }: StartMenuProps) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="fixed bottom-14 left-1/2 -translate-x-1/2 w-[600px] bg-gray-900/95 backdrop-blur-xl rounded-lg overflow-hidden z-50 shadow-2xl"
      >
        <div className="p-6">
          <input
            type="text"
            placeholder="Type here to search"
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg outline-none placeholder-gray-400 mb-6"
          />

          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white text-sm font-medium">Pinned</h3>
              <button className="text-xs text-blue-400 hover:text-blue-300">All apps &gt;</button>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {apps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => onOpenApp(app)}
                  className="flex flex-col items-center gap-1 p-2 rounded hover:bg-white/10 transition"
                >
                  <span className="text-3xl">{app.icon}</span>
                  <span className="text-white text-xs truncate w-full text-center">{app.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white text-sm font-medium">Recommended</h3>
              <button className="text-xs text-blue-400 hover:text-blue-300">More &gt;</button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {manifest.projects.slice(0, 4).map((project, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2 rounded hover:bg-white/10 transition cursor-pointer"
                >
                  <span className="text-2xl">📁</span>
                  <div className="min-w-0">
                    <p className="text-white text-sm truncate">{project.name}</p>
                    <p className="text-gray-400 text-xs">Recently opened</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {manifest.personalInfo.avatar ? (
              <img src={manifest.personalInfo.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                {manifest.personalInfo.name[0]}
              </div>
            )}
            <span className="text-white text-sm">{manifest.personalInfo.name}</span>
          </div>
          <button className="p-2 hover:bg-white/10 rounded text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </motion.div>
    </>
  )
}
