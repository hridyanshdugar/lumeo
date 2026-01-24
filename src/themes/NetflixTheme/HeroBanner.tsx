import { motion } from 'framer-motion'
import { Project } from '../../types/manifest'

interface HeroBannerProps {
  project: Project
  onMoreInfo: () => void
}

export const HeroBanner = ({ project, onMoreInfo }: HeroBannerProps) => {
  const gradients = [
    'from-blue-900',
    'from-purple-900',
    'from-red-900',
    'from-green-900',
  ]

  return (
    <div className="relative h-[80vh] md:h-[90vh]">
      {project.image ? (
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className={`w-full h-full bg-gradient-to-br ${gradients[Math.floor(Math.random() * gradients.length)]} to-black`} />
      )}
      
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-32 md:bottom-48 left-4 md:left-12 max-w-xl"
      >
        <p className="text-sm text-gray-300 mb-2 flex items-center gap-2">
          <span className="text-red-600 font-bold">N</span>
          <span className="uppercase tracking-wider">Series</span>
        </p>
        
        <h1 
          className="text-4xl md:text-6xl font-bold mb-4"
          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}
        >
          {project.name.toUpperCase()}
        </h1>

        <div className="flex items-center gap-3 text-sm text-gray-300 mb-4">
          <span className="text-green-500 font-semibold">98% Match</span>
          <span className="border border-gray-500 px-1">HD</span>
          <span>{project.technologies.length} Technologies</span>
        </div>

        <p className="text-sm md:text-base text-gray-200 line-clamp-3 mb-6 break-words" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
          {project.description}
        </p>

        <div className="flex gap-3">
          <button 
            className="flex items-center gap-2 px-6 py-2 bg-white text-black rounded font-semibold hover:bg-gray-200 transition"
            onClick={() => {
              if (project.links?.demo) window.open(project.links.demo, '_blank')
              else if (project.links?.github) window.open(project.links.github, '_blank')
            }}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play
          </button>
          <button 
            className="flex items-center gap-2 px-6 py-2 bg-gray-500/70 text-white rounded font-semibold hover:bg-gray-500/50 transition"
            onClick={onMoreInfo}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            More Info
          </button>
        </div>
      </motion.div>

      <div className="absolute bottom-32 md:bottom-48 right-4 md:right-12">
        <div className="flex items-center gap-2 bg-gray-800/80 px-4 py-1 border-l-4 border-gray-400">
          <span className="text-lg">PG-13</span>
        </div>
      </div>
    </div>
  )
}
