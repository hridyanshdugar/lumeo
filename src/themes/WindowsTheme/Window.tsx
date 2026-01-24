import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { PortfolioManifest, Project, Experience } from '../../types/manifest'

interface WindowState {
  id: string
  title: string
  icon: React.ReactNode
  content: string
  isMinimized: boolean
  isMaximized: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
}

interface WindowProps {
  window: WindowState
  manifest: PortfolioManifest
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  onFocus: () => void
  onDrag: (position: { x: number; y: number }) => void
}

// Folder icon component
const FolderIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 48 48">
    <defs>
      <linearGradient id="folderIconGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFE082" />
        <stop offset="100%" stopColor="#FFA000" />
      </linearGradient>
    </defs>
    <path d="M4 10h14l4 4h22c2.2 0 4 1.8 4 4v22c0 2.2-1.8 4-4 4H4c-2.2 0-4-1.8-4-4V14c0-2.2 1.8-4 4-4z" fill="url(#folderIconGrad)" />
    <path d="M4 18h40v22c0 2.2-1.8 4-4 4H4c-2.2 0-4-1.8-4-4V18z" fill="#FFCA28" />
  </svg>
)

// Briefcase icon component
const BriefcaseIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 48 48">
    <defs>
      <linearGradient id="briefIconGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#8D6E63" />
        <stop offset="100%" stopColor="#4E342E" />
      </linearGradient>
    </defs>
    <rect x="4" y="14" width="40" height="28" rx="3" fill="url(#briefIconGrad)" />
    <rect x="16" y="8" width="16" height="10" rx="2" fill="none" stroke="#5D4037" strokeWidth="3" />
    <rect x="20" y="26" width="8" height="6" rx="1" fill="#D7CCC8" />
  </svg>
)

export const Window = ({ window, manifest, onClose, onMinimize, onMaximize, onFocus, onDrag }: WindowProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)

  const renderProjectDetail = (project: Project) => (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="bg-gradient-to-b from-[#f5f5f5] to-[#e5e5e5] border-b px-2 py-1 flex items-center gap-1">
        <button 
          onClick={() => setSelectedProject(null)}
          className="flex items-center gap-1 px-3 py-1 hover:bg-white/50 rounded text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div className="h-4 w-px bg-gray-300 mx-1" />
        <span className="text-sm text-gray-600">My Projects › {project.name}</span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 bg-white">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0">
              <FolderIcon />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{project.name}</h2>
              <p className="text-gray-500 text-sm">Project Folder</p>
            </div>
          </div>

          {/* Project Image */}
          {project.image && (
            <div className="mb-6 rounded-lg overflow-hidden border shadow-sm">
              <img src={project.image} alt={project.name} className="w-full h-48 object-cover" />
            </div>
          )}

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed break-words" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{project.description}</p>
          </div>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Highlights</h3>
              <ul className="space-y-2">
                {project.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {project.links && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Links</h3>
              <div className="flex flex-wrap gap-3">
                {project.links.github && (
                  <a 
                    href={project.links.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                )}
                {project.links.live && (
                  <a 
                    href={project.links.live} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                )}
                {project.links.demo && (
                  <a 
                    href={project.links.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Demo
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderExperienceDetail = (exp: Experience) => (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="bg-gradient-to-b from-[#f5f5f5] to-[#e5e5e5] border-b px-2 py-1 flex items-center gap-1">
        <button 
          onClick={() => setSelectedExperience(null)}
          className="flex items-center gap-1 px-3 py-1 hover:bg-white/50 rounded text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div className="h-4 w-px bg-gray-300 mx-1" />
        <span className="text-sm text-gray-600">Experience › {exp.company}</span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 bg-white">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0">
              <BriefcaseIcon />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{exp.position}</h2>
              <p className="text-blue-600 font-medium">{exp.company}</p>
              <p className="text-gray-500 text-sm">{exp.startDate} - {exp.endDate || 'Present'}</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed break-words" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{exp.description}</p>
          </div>

          {/* Achievements */}
          {exp.achievements && exp.achievements.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Key Achievements</h3>
              <ul className="space-y-2">
                {exp.achievements.map((achievement: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
          {exp.technologies && exp.technologies.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech: string, i: number) => (
                  <span key={i} className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (window.content) {
      case 'about':
        return (
          <div className="p-6">
            <div className="flex items-start gap-6 mb-6">
              {manifest.personalInfo.avatar ? (
                <img src={manifest.personalInfo.avatar} alt="" className="w-24 h-24 rounded-lg object-cover" />
              ) : (
                <div className="w-24 h-24 rounded-lg bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
                  {manifest.personalInfo.name[0]}
                </div>
              )}
              <div>
                <h2 className="text-2xl font-semibold">{manifest.personalInfo.name}</h2>
                <p className="text-gray-600">{manifest.personalInfo.title}</p>
                <p className="text-sm text-gray-500 mt-1">{manifest.personalInfo.location}</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">{manifest.personalInfo.bio}</p>
          </div>
        )
      case 'projects':
        return (
          <AnimatePresence mode="wait">
            {selectedProject ? (
              <motion.div
                key="detail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full"
              >
                {renderProjectDetail(selectedProject)}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col"
              >
                {/* Toolbar */}
                <div className="bg-gradient-to-b from-[#f5f5f5] to-[#e5e5e5] border-b px-2 py-1 flex items-center gap-2">
                  <span className="text-sm text-gray-600">📁 My Projects</span>
                  <span className="text-xs text-gray-400 ml-auto">{manifest.projects.length} items</span>
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-auto p-4 bg-white">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {manifest.projects.map((project, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedProject(project)}
                        className="bg-gray-50 border rounded-lg p-4 hover:bg-blue-50 hover:border-blue-300 transition cursor-pointer text-left group"
                      >
                        <div className="flex flex-col items-center text-center">
                          <FolderIcon />
                          <h3 className="font-medium text-sm mt-2 group-hover:text-blue-600 line-clamp-2">{project.name}</h3>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )
      case 'experience':
        return (
          <AnimatePresence mode="wait">
            {selectedExperience ? (
              <motion.div
                key="detail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full"
              >
                {renderExperienceDetail(selectedExperience)}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col"
              >
                {/* Toolbar */}
                <div className="bg-gradient-to-b from-[#f5f5f5] to-[#e5e5e5] border-b px-2 py-1 flex items-center gap-2">
                  <span className="text-sm text-gray-600">💼 Experience</span>
                  <span className="text-xs text-gray-400 ml-auto">{manifest.experience.length} items</span>
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-auto p-4 bg-white">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {manifest.experience.map((exp, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedExperience(exp)}
                        className="bg-gray-50 border rounded-lg p-4 hover:bg-amber-50 hover:border-amber-300 transition cursor-pointer text-left group"
                      >
                        <div className="flex flex-col items-center text-center">
                          <BriefcaseIcon />
                          <h3 className="font-medium text-sm mt-2 group-hover:text-amber-700 line-clamp-1">{exp.position}</h3>
                          <p className="text-xs text-gray-500 line-clamp-1">{exp.company}</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )
      case 'skills':
        return (
          <div className="p-4 space-y-4">
            {manifest.skills.map((group, idx) => (
              <div key={idx} className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold mb-3">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill, i) => (
                    <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
      case 'education':
        return (
          <div className="p-4 space-y-4">
            {manifest.education.map((edu, idx) => (
              <div key={idx} className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold">{edu.degree} in {edu.field}</h3>
                <p className="text-blue-600">{edu.institution}</p>
                <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate || 'Present'}</p>
                {edu.gpa && <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        )
      case 'contact':
        return (
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3 p-3 bg-white border rounded-lg">
              <span className="text-2xl">📧</span>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <a href={`mailto:${manifest.personalInfo.email}`} className="text-blue-600 hover:underline">{manifest.personalInfo.email}</a>
              </div>
            </div>
            {manifest.personalInfo.phone && (
              <div className="flex items-center gap-3 p-3 bg-white border rounded-lg">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p>{manifest.personalInfo.phone}</p>
                </div>
              </div>
            )}
            {manifest.personalInfo.links?.github && (
              <a href={manifest.personalInfo.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white border rounded-lg hover:bg-gray-50">
                <span className="text-2xl">🐙</span>
                <div>
                  <p className="text-sm text-gray-500">GitHub</p>
                  <p className="text-blue-600">{manifest.personalInfo.links.github}</p>
                </div>
              </a>
            )}
            {manifest.personalInfo.links?.linkedin && (
              <a href={manifest.personalInfo.links.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white border rounded-lg hover:bg-gray-50">
                <span className="text-2xl">💼</span>
                <div>
                  <p className="text-sm text-gray-500">LinkedIn</p>
                  <p className="text-blue-600">{manifest.personalInfo.links.linkedin}</p>
                </div>
              </a>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: window.isMaximized ? 0 : window.position.x,
        y: window.isMaximized ? 0 : window.position.y,
        width: window.isMaximized ? '100%' : window.size.width,
        height: window.isMaximized ? 'calc(100% - 48px)' : window.size.height,
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      drag={!window.isMaximized}
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(_, info) => {
        setIsDragging(false)
        onDrag({ x: window.position.x + info.offset.x, y: window.position.y + info.offset.y })
      }}
      onMouseDown={onFocus}
      className={`absolute bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col ${isDragging ? 'cursor-grabbing' : ''}`}
      style={{ zIndex: window.zIndex }}
    >
      <div className="h-8 bg-gray-100 flex items-center justify-between px-2 flex-shrink-0 cursor-grab active:cursor-grabbing">
        <div className="flex items-center gap-2">
          <span>{window.icon}</span>
          <span className="text-sm">{window.title}</span>
        </div>
        <div className="flex items-center">
          <button onClick={onMinimize} className="w-8 h-8 hover:bg-gray-200 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <button onClick={onMaximize} className="w-8 h-8 hover:bg-gray-200 flex items-center justify-center">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="4" y="4" width="16" height="16" rx="1" strokeWidth={2} />
            </svg>
          </button>
          <button onClick={onClose} className="w-8 h-8 hover:bg-red-500 hover:text-white flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-gray-50">
        {renderContent()}
      </div>
    </motion.div>
  )
}
