import { motion } from 'framer-motion'
import { Project, PortfolioManifest } from '../../types/manifest'

interface MiniModalProps {
  project: Project
  onClose: () => void
  manifest: PortfolioManifest
}

export const MiniModal = ({ project, onClose, manifest }: MiniModalProps) => {
  const gradients = [
    'from-blue-900',
    'from-purple-900',
    'from-red-900',
    'from-green-900',
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#181818] rounded-lg max-w-3xl w-full overflow-hidden shadow-2xl my-8"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative h-80">
          {project.image ? (
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${gradients[Math.floor(Math.random() * gradients.length)]} to-black flex items-center justify-center`}>
              <span className="text-6xl font-bold opacity-50">{project.name[0]}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#181818] flex items-center justify-center hover:bg-gray-700 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-3xl font-bold mb-4">{project.name}</h2>
            <div className="flex gap-3">
              <button 
                className="flex items-center gap-2 px-6 py-2 bg-white text-black rounded font-semibold hover:bg-gray-200 transition"
                onClick={() => {
                  if (project.links?.demo) window.open(project.links.demo, '_blank')
                  else if (project.links?.github) window.open(project.links.github, '_blank')
                }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play
              </button>
              <button className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 text-sm mb-4">
                <span className="text-green-500 font-semibold">98% Match</span>
                <span className="border border-gray-500 px-1 text-xs">HD</span>
                <span className="text-gray-400">{project.technologies.length} Technologies</span>
              </div>
              <p className="text-gray-300 mb-6 break-words" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{project.description}</p>
              
              {project.highlights && project.highlights.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm text-gray-400 mb-2">Highlights</h3>
                  <ul className="space-y-1">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-red-600">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="w-48 flex-shrink-0">
              <div className="mb-4">
                <span className="text-gray-500 text-sm">Tech Stack: </span>
                <span className="text-sm">
                  {project.technologies.join(', ')}
                </span>
              </div>
              
              {project.links && (
                <div>
                  <span className="text-gray-500 text-sm">Links: </span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.links.github && (
                      <a 
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-400 hover:underline"
                      >
                        GitHub
                      </a>
                    )}
                    {project.links.demo && (
                      <a 
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-400 hover:underline"
                      >
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-700">
            <h3 className="font-semibold mb-4">More Like This</h3>
            <div className="grid grid-cols-3 gap-3">
              {manifest.projects.filter(p => p.name !== project.name).slice(0, 3).map((p, idx) => (
                <div key={idx} className="aspect-video rounded overflow-hidden bg-gray-800">
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm font-medium p-2 text-center">
                      {p.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
