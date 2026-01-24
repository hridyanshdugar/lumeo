import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Project } from '../../types/manifest'

interface AlbumGridProps {
  projects: Project[]
  onSelect: (name: string) => void
  onLike?: (name: string) => void
  likedItems?: Set<string>
  onHover?: (index: number) => void
}

export const AlbumGrid = ({ projects, onSelect, onLike, likedItems, onHover }: AlbumGridProps) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [showHeartAnimation, setShowHeartAnimation] = useState<number | null>(null)

  const getGradient = (index: number) => {
    const gradients = [
      'from-purple-600 to-blue-600',
      'from-green-600 to-teal-600',
      'from-orange-600 to-red-600',
      'from-pink-600 to-purple-600',
      'from-blue-600 to-indigo-600',
      'from-yellow-600 to-orange-600',
    ]
    return gradients[index % gradients.length]
  }

  const handleDoubleClick = (e: React.MouseEvent, project: Project, idx: number) => {
    e.stopPropagation()
    if (onLike) {
      onLike(project.name)
      setShowHeartAnimation(idx)
      setTimeout(() => setShowHeartAnimation(null), 1000)
    }
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {projects.map((project, idx) => (
        <motion.div
          key={project.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="group cursor-pointer"
          onClick={() => onSelect(project.name)}
          onDoubleClick={(e) => handleDoubleClick(e, project, idx)}
          onMouseEnter={() => {
            setHoveredIdx(idx)
            onHover?.(idx)
          }}
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <div className="relative aspect-square mb-3">
            {project.image ? (
              <img
                src={project.image}
                alt={project.name}
                className={`w-full h-full object-cover rounded-lg shadow-lg transition-all duration-300 ${
                  hoveredIdx === idx ? 'scale-105 shadow-2xl' : ''
                }`}
              />
            ) : (
              <motion.div 
                className={`w-full h-full bg-gradient-to-br ${getGradient(idx)} rounded-lg shadow-lg flex items-center justify-center`}
                animate={{ scale: hoveredIdx === idx ? 1.05 : 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className="text-4xl font-bold text-white/80">{project.name[0]}</span>
              </motion.div>
            )}
            
            <AnimatePresence>
              {showHeartAnimation === idx && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 1 }}
                  exit={{ scale: 2, opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <span className="text-6xl">💚</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: hoveredIdx === idx ? 1 : 0, 
                y: hoveredIdx === idx ? 0 : 10 
              }}
              className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-xl hover:scale-110 hover:bg-green-400 transition-transform"
              onClick={(e) => {
                e.stopPropagation()
                onSelect(project.name)
              }}
            >
              <svg className="w-5 h-5 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.button>

            {onLike && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIdx === idx ? 1 : 0 }}
                className="absolute bottom-2 left-2 p-2 rounded-full bg-black/50 backdrop-blur"
                onClick={(e) => {
                  e.stopPropagation()
                  onLike(project.name)
                }}
              >
                <motion.svg 
                  className={`w-5 h-5 ${likedItems?.has(project.name) ? 'text-green-500' : 'text-white'}`}
                  fill={likedItems?.has(project.name) ? 'currentColor' : 'none'}
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={likedItems?.has(project.name) ? { scale: [1, 1.3, 1] } : {}}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </motion.svg>
              </motion.button>
            )}

            {likedItems?.has(project.name) && hoveredIdx !== idx && (
              <div className="absolute top-2 right-2">
                <span className="text-green-500">💚</span>
              </div>
            )}
          </div>
          <h3 className="font-semibold truncate group-hover:text-white transition">{project.name}</h3>
          <p className="text-sm text-zinc-400 line-clamp-2 break-words" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{project.description}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {project.technologies.slice(0, 3).map((tech, i) => (
              <span key={i} className="text-xs text-zinc-500">{tech}{i < Math.min(project.technologies.length, 3) - 1 ? ' •' : ''}</span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
