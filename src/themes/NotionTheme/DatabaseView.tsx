import { useState } from 'react'
import { motion } from 'framer-motion'
import { Project } from '../../types/manifest'

interface DatabaseViewProps {
  projects: Project[]
  darkMode: boolean
}

type ViewType = 'table' | 'board' | 'gallery'

export const DatabaseView = ({ projects, darkMode }: DatabaseViewProps) => {
  const [viewType, setViewType] = useState<ViewType>('table')

  const borderColor = darkMode ? 'border-neutral-700' : 'border-neutral-200'
  const hoverBg = darkMode ? 'hover:bg-neutral-800' : 'hover:bg-neutral-50'

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {(['table', 'board', 'gallery'] as ViewType[]).map((view) => (
          <button
            key={view}
            onClick={() => setViewType(view)}
            className={`px-3 py-1.5 rounded text-sm capitalize ${
              viewType === view
                ? darkMode ? 'bg-neutral-700 text-white' : 'bg-neutral-200 text-neutral-900'
                : darkMode ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            {view}
          </button>
        ))}
      </div>

      {viewType === 'table' && (
        <div className={`border ${borderColor} rounded-lg overflow-hidden`}>
          <div className={`grid grid-cols-[2fr_1fr_1fr] gap-4 px-4 py-2 ${darkMode ? 'bg-neutral-800' : 'bg-neutral-100'} text-sm font-medium`}>
            <span>Name</span>
            <span>Technologies</span>
            <span>Links</span>
          </div>
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              className={`grid grid-cols-[2fr_1fr_1fr] gap-4 px-4 py-3 border-t ${borderColor} ${hoverBg} cursor-pointer`}
            >
              <div>
                <p className="font-medium">{project.name}</p>
                <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'} line-clamp-1 break-words`} style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{project.description}</p>
              </div>
              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 2).map((tech, i) => (
                  <span
                    key={i}
                    className={`px-2 py-0.5 rounded text-xs ${darkMode ? 'bg-neutral-700' : 'bg-neutral-200'}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 text-sm">
                {project.links?.github && (
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
                )}
                {project.links?.demo && (
                  <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="hover:underline">Demo</a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {viewType === 'board' && (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {['Planning', 'In Progress', 'Completed'].map((status, statusIdx) => (
            <div key={status} className={`flex-shrink-0 w-72 ${darkMode ? 'bg-neutral-800' : 'bg-neutral-100'} rounded-lg p-3`}>
              <h3 className="font-medium mb-3">{status}</h3>
              <div className="space-y-2">
                {projects.slice(statusIdx * 2, statusIdx * 2 + 2).map((project, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`${darkMode ? 'bg-neutral-700' : 'bg-white'} p-3 rounded shadow-sm cursor-pointer ${hoverBg}`}
                  >
                    <p className="font-medium text-sm">{project.name}</p>
                    <p className={`text-xs mt-1 line-clamp-2 break-words ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`} style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{project.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {viewType === 'gallery' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className={`${darkMode ? 'bg-neutral-800' : 'bg-neutral-100'} rounded-lg overflow-hidden cursor-pointer ${hoverBg}`}
            >
              {project.image ? (
                <img src={project.image} alt={project.name} className="w-full h-32 object-cover" />
              ) : (
                <div className={`w-full h-32 ${darkMode ? 'bg-neutral-700' : 'bg-neutral-200'} flex items-center justify-center text-4xl`}>
                  📁
                </div>
              )}
              <div className="p-3">
                <p className="font-medium">{project.name}</p>
                <p className={`text-sm mt-1 line-clamp-2 break-words ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`} style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
