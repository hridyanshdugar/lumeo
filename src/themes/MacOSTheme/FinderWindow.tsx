import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { PortfolioManifest, Project } from '../../types/manifest'

interface WindowState {
  id: string
  title: string
  icon: React.ReactNode
  content: string
  isMinimized: boolean
  isMaximized: boolean
  position: { x: number; y: number }
  zIndex: number
}

interface FinderWindowProps {
  window: WindowState
  manifest: PortfolioManifest
  isActive: boolean
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  onFocus: () => void
  onDrag: (position: { x: number; y: number }) => void
}

export const FinderWindow = ({ window, manifest, isActive, onClose, onMinimize, onMaximize, onFocus, onDrag }: FinderWindowProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<number>(0)
  const [selectedExperienceIndex, setSelectedExperienceIndex] = useState<number | null>(null)

  const renderContent = () => {
    switch (window.content) {
      case 'about':
        return (
          <div className="p-8 text-center bg-gradient-to-b from-gray-50 to-gray-100 h-full">
            <div className="flex justify-center mb-6">
              {manifest.personalInfo.avatar ? (
                <img src={manifest.personalInfo.avatar} alt="" className="w-24 h-24 rounded-full object-cover shadow-xl ring-4 ring-white" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-semibold shadow-xl ring-4 ring-white">
                  {manifest.personalInfo.name[0]}
                </div>
              )}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{manifest.personalInfo.name}</h2>
            <p className="text-gray-500 mb-6 text-lg">{manifest.personalInfo.title}</p>
            
            <div className="flex justify-center gap-6 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{manifest.projects.length}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Projects</div>
              </div>
              <div className="w-px bg-gray-300" />
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{manifest.experience.length}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Roles</div>
              </div>
              <div className="w-px bg-gray-300" />
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{manifest.skills.reduce((a, s) => a + s.items.length, 0)}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Skills</div>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 leading-relaxed max-w-md mx-auto">{manifest.personalInfo.bio}</p>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-400">Press ⌘K to open Spotlight</p>
            </div>
          </div>
        )
      case 'projects':
        return (
          <div className="flex h-full">
            {/* Finder Sidebar */}
            <div className="w-44 bg-gray-100/80 backdrop-blur border-r border-gray-200/50 p-2 flex-shrink-0">
              <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider px-2 py-1">Favorites</p>
              <div className="space-y-0.5">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] transition ${!selectedProject ? 'bg-blue-500/90 text-white' : 'hover:bg-black/5 text-gray-600'}`}
                >
                  <svg className={`w-4 h-4 ${!selectedProject ? 'text-blue-200' : 'text-blue-500'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg> 
                  Projects
                </button>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-black/5 text-gray-600 text-[13px] cursor-pointer transition">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                  About Me
                </div>
              </div>
              <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider px-2 py-1 mt-4">Tags</p>
              <div className="space-y-0.5">
                {manifest.skills.slice(0, 3).map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-black/5 text-gray-600 text-[13px] cursor-pointer transition">
                    <span className={`w-3 h-3 rounded-full ${['bg-red-400', 'bg-orange-400', 'bg-green-400'][idx]}`} />
                    {skill.category}
                  </div>
                ))}
              </div>
            </div>
            {/* Finder Content */}
            <div className="flex-1 flex flex-col bg-white">
              {/* Toolbar */}
              <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200 bg-gray-50">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className={`p-1 hover:bg-gray-200 rounded transition ${!selectedProject ? 'opacity-50' : ''}`}
                  disabled={!selectedProject}
                >
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>
                <button className="p-1 hover:bg-gray-200 rounded transition opacity-50" disabled>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
                <div className="flex items-center gap-1 ml-2 text-[13px] text-gray-600">
                  <span className={selectedProject ? 'text-gray-400 cursor-pointer hover:text-gray-600' : ''} onClick={() => setSelectedProject(null)}>Projects</span>
                  {selectedProject && (
                    <>
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                      </svg>
                      <span className="font-medium truncate max-w-[200px]">{selectedProject.name}</span>
                    </>
                  )}
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <button className="p-1.5 hover:bg-gray-200 rounded transition">
                    <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="3" y="3" width="7" height="7" rx="1"/>
                      <rect x="14" y="3" width="7" height="7" rx="1"/>
                      <rect x="3" y="14" width="7" height="7" rx="1"/>
                      <rect x="14" y="14" width="7" height="7" rx="1"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="flex-1 flex overflow-hidden">
                {/* Projects Grid */}
                <div className={`${selectedProject ? 'w-1/2 border-r border-gray-200' : 'flex-1'} p-4 overflow-auto transition-all`}>
                  <div className={`grid ${selectedProject ? 'grid-cols-2' : 'grid-cols-4'} gap-2`}>
                    {manifest.projects.map((project, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => setSelectedProject(project)}
                        className={`flex flex-col items-center p-3 rounded-lg cursor-pointer transition group ${
                          selectedProject?.name === project.name 
                            ? 'bg-blue-500 text-white' 
                            : 'hover:bg-blue-50'
                        }`}
                      >
                        <div className="w-14 h-14 mb-2 relative">
                          <svg className={`w-full h-full drop-shadow ${selectedProject?.name === project.name ? 'text-blue-200' : 'text-blue-400'}`} viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                          </svg>
                          {project.links?.demo && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center shadow">
                              <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                              </svg>
                            </div>
                          )}
                        </div>
                        <span className={`text-[11px] text-center line-clamp-2 leading-tight ${
                          selectedProject?.name === project.name 
                            ? 'text-white' 
                            : 'text-gray-700 group-hover:text-blue-600'
                        }`}>{project.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Project Details Panel */}
                <AnimatePresence>
                  {selectedProject && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      className="w-1/2 bg-gray-50 overflow-auto"
                    >
                      <div className="p-6">
                        {/* Project Header */}
                        <div className="flex items-start gap-4 mb-6">
                          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                            <svg className="w-12 h-12 text-white/90" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{selectedProject.name}</h3>
                            <p className="text-sm text-gray-500">Project</p>
                          </div>
                        </div>
                        
                        {/* Description */}
                        <div className="mb-6">
                          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</h4>
                          <p className="text-sm text-gray-700 leading-relaxed break-words" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                            {selectedProject.description}
                          </p>
                        </div>
                        
                        {/* Technologies */}
                        {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                          <div className="mb-6">
                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Technologies</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {selectedProject.technologies.map((tech, i) => (
                                <span key={i} className="text-[11px] bg-white text-gray-700 px-2.5 py-1 rounded-full border border-gray-200 shadow-sm">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Highlights */}
                        {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                          <div className="mb-6">
                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Highlights</h4>
                            <ul className="space-y-2">
                              {selectedProject.highlights.map((highlight, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                  <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                                  </svg>
                                  <span className="break-words" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {/* Links */}
                        {selectedProject.links && (selectedProject.links.github || selectedProject.links.demo) && (
                          <div className="pt-4 border-t border-gray-200">
                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Links</h4>
                            <div className="flex gap-2">
                              {selectedProject.links.github && (
                                <a 
                                  href={selectedProject.links.github} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-sm font-medium transition shadow-sm"
                                >
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                  GitHub
                                </a>
                              )}
                              {selectedProject.links.demo && (
                                <a 
                                  href={selectedProject.links.demo} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition shadow-sm"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                                  </svg>
                                  Live Demo
                                </a>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Status Bar */}
              <div className="px-4 py-1.5 border-t border-gray-200 bg-gray-50 text-[11px] text-gray-500">
                {selectedProject ? `"${selectedProject.name}" selected` : `${manifest.projects.length} items`}
              </div>
            </div>
          </div>
        )
      case 'experience':
        const experienceToShow = selectedExperienceIndex !== null 
          ? [manifest.experience[selectedExperienceIndex]]
          : manifest.experience
        return (
          <div className="flex h-full bg-white">
            {/* Calendar sidebar */}
            <div className="w-52 bg-gray-50 border-r border-gray-200 p-3 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm border p-3 mb-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500 uppercase font-medium">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                  <p className="text-4xl font-light text-gray-800 my-1">{new Date().getDate()}</p>
                  <p className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</p>
                </div>
              </div>
              <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider px-1 mb-2">Timeline</p>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedExperienceIndex(null)}
                  className={`w-full text-left text-[12px] px-2 py-1.5 rounded cursor-pointer transition ${
                    selectedExperienceIndex === null 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  All Experience
                </button>
                {manifest.experience.map((exp, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedExperienceIndex(idx)}
                    className={`w-full text-left text-[12px] px-2 py-1.5 rounded cursor-pointer transition ${
                      selectedExperienceIndex === idx 
                        ? 'bg-blue-500 text-white' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {exp.startDate.split(' ')[1] || exp.startDate}
                  </button>
                ))}
              </div>
            </div>
            {/* Calendar content */}
            <div className="flex-1 p-4 overflow-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {selectedExperienceIndex !== null ? manifest.experience[selectedExperienceIndex].company : 'Career Timeline'}
              </h3>
              <div className="space-y-4">
                {experienceToShow.map((exp, idx) => (
                  <div key={idx} className="relative pl-6 pb-4 border-l-2 border-blue-200 last:border-transparent">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow" />
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                          <p className="text-blue-600 text-sm font-medium">{exp.company}</p>
                        </div>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full font-medium">
                          {exp.startDate} — {exp.endDate || 'Present'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 break-words leading-relaxed" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{exp.description}</p>
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {exp.technologies.slice(0, 5).map((tech, i) => (
                            <span key={i} className="text-[11px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{tech}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'skills':
        const selectedGroup = manifest.skills[selectedSkillCategory]
        return (
          <div className="flex h-full bg-gray-100">
            {/* Settings sidebar */}
            <div className="w-56 bg-gray-50/80 backdrop-blur border-r border-gray-200 p-2 flex-shrink-0 overflow-auto">
              <div className="relative mb-3">
                <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="w-full bg-gray-200/60 rounded-lg py-1.5 pl-8 pr-3 text-[13px] placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
              <div className="space-y-0.5">
                {manifest.skills.map((group, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSkillCategory(idx)}
                    className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer transition ${
                      selectedSkillCategory === idx 
                        ? 'bg-blue-500 text-white' 
                        : 'hover:bg-gray-200/60 text-gray-700'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm ${
                      selectedSkillCategory === idx 
                        ? 'bg-blue-400' 
                        : 'bg-gradient-to-b from-gray-400 to-gray-500 text-white'
                    }`}>
                      {['⚙️', '🔧', '💻', '🛠️', '📦', '🎨'][idx % 6]}
                    </div>
                    <span className="text-[13px] font-medium text-left">{group.category}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* Settings content */}
            <div className="flex-1 p-6 overflow-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedGroup.category}</h2>
              <p className="text-gray-500 text-sm mb-6">{selectedGroup.items.length} skills in this category</p>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3">
                    {selectedGroup.items.map((skill, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition border border-gray-100">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-medium shadow-sm">
                          {skill.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-[13px] text-gray-700 font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'education':
        return (
          <div className="flex h-full bg-gray-900">
            {/* Preview sidebar */}
            <div className="w-48 bg-gray-800 border-r border-gray-700 p-2 flex-shrink-0 overflow-auto">
              <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider px-2 py-2">Documents</p>
              {manifest.education.map((edu, idx) => (
                <div key={idx} className={`p-2 rounded-lg cursor-pointer transition mb-1 ${idx === 0 ? 'bg-blue-500/20 ring-2 ring-blue-500' : 'hover:bg-gray-700'}`}>
                  <div className="w-full aspect-[3/4] bg-white rounded-md mb-2 flex items-center justify-center shadow-lg">
                    <span className="text-3xl">🎓</span>
                  </div>
                  <p className="text-[11px] text-gray-300 text-center truncate">{edu.institution}</p>
                </div>
              ))}
            </div>
            {/* Preview content */}
            <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
              <div className="max-w-lg w-full">
                {manifest.education.map((edu, idx) => (
                  <div key={idx} className="bg-white rounded-xl shadow-2xl p-8 mb-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-3xl">🎓</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{edu.degree}</h3>
                        <p className="text-gray-500">{edu.field}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                        </svg>
                        <span className="text-gray-700 font-medium">{edu.institution}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <span className="text-gray-600">{edu.startDate} — {edu.endDate || 'Present'}</span>
                      </div>
                      {edu.gpa && (
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                          </svg>
                          <span className="text-gray-600">GPA: <strong className="text-gray-800">{edu.gpa}</strong></span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'contact':
        return (
          <div className="flex h-full bg-gray-50">
            {/* Mail sidebar */}
            <div className="w-56 bg-gray-100/80 backdrop-blur border-r border-gray-200 flex flex-col flex-shrink-0">
              <div className="p-3">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-4 text-[13px] font-medium shadow-sm transition flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
                  </svg>
                  New Message
                </button>
              </div>
              <div className="flex-1 p-2 space-y-1">
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-blue-500 text-white text-[13px]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                  </svg>
                  Inbox
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-gray-600 hover:bg-gray-200/60 text-[13px] cursor-pointer transition">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                  </svg>
                  Favorites
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-gray-600 hover:bg-gray-200/60 text-[13px] cursor-pointer transition">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                  </svg>
                  Sent
                </div>
              </div>
            </div>
            {/* Mail content */}
            <div className="flex-1 flex flex-col bg-white">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
                <p className="text-sm text-gray-500">Get in touch with me</p>
              </div>
              <div className="flex-1 p-6 overflow-auto">
                <div className="max-w-lg mx-auto space-y-4">
                  <a href={`mailto:${manifest.personalInfo.email}`} className="block bg-gray-50 hover:bg-blue-50 rounded-xl p-4 border border-gray-200 hover:border-blue-300 transition group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Email</p>
                        <p className="text-blue-600 group-hover:text-blue-700 font-medium">{manifest.personalInfo.email}</p>
                      </div>
                    </div>
                  </a>
                  
                  {manifest.personalInfo.phone && (
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Phone</p>
                          <p className="text-gray-700 font-medium">{manifest.personalInfo.phone}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {manifest.personalInfo.location && (
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Location</p>
                          <p className="text-gray-700 font-medium">{manifest.personalInfo.location}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {manifest.personalInfo.links && (
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Social Links</p>
                      <div className="grid grid-cols-2 gap-3">
                        {manifest.personalInfo.links.github && (
                          <a href={manifest.personalInfo.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
                            <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                            </div>
                            <span className="text-sm text-gray-600">GitHub</span>
                          </a>
                        )}
                        {manifest.personalInfo.links.linkedin && (
                          <a href={manifest.personalInfo.links.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                            </div>
                            <span className="text-sm text-gray-600">LinkedIn</span>
                          </a>
                        )}
                        {manifest.personalInfo.links.twitter && (
                          <a href={manifest.personalInfo.links.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
                            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                            </div>
                            <span className="text-sm text-gray-600">X / Twitter</span>
                          </a>
                        )}
                        {manifest.personalInfo.links.website && (
                          <a href={manifest.personalInfo.links.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
                            </div>
                            <span className="text-sm text-gray-600">Website</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: 0,
        x: window.isMaximized ? 0 : window.position.x,
        ...(window.isMaximized ? {} : { y: window.position.y }),
        width: window.isMaximized ? '100%' : 750,
        height: window.isMaximized ? 'calc(100% - 100px)' : 520,
      }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      drag={!window.isMaximized}
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(_, info) => {
        setIsDragging(false)
        onDrag({ x: window.position.x + info.offset.x, y: window.position.y + info.offset.y })
      }}
      onMouseDown={onFocus}
      className={`absolute rounded-xl overflow-hidden flex flex-col ${isDragging ? 'cursor-grabbing' : ''}`}
      style={{ 
        zIndex: window.zIndex,
        boxShadow: isActive 
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.1)' 
          : '0 10px 40px -10px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Title bar with frosted glass effect */}
      <div className={`h-[52px] flex items-center px-4 gap-3 flex-shrink-0 cursor-grab active:cursor-grabbing border-b ${
        isActive 
          ? 'bg-gradient-to-b from-gray-100 to-gray-200 border-gray-300' 
          : 'bg-gray-200 border-gray-300'
      }`}>
        <div className="flex items-center gap-2 group">
          <button 
            onClick={onClose}
            className={`w-3 h-3 rounded-full flex items-center justify-center transition ${
              isActive ? 'bg-[#ff5f57] hover:bg-[#ff4136]' : 'bg-gray-400'
            }`}
          >
            <svg className="w-2 h-2 text-red-900/80 opacity-0 group-hover:opacity-100 transition" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"/>
            </svg>
          </button>
          <button 
            onClick={onMinimize}
            className={`w-3 h-3 rounded-full flex items-center justify-center transition ${
              isActive ? 'bg-[#febc2e] hover:bg-[#ffa500]' : 'bg-gray-400'
            }`}
          >
            <svg className="w-2 h-2 text-yellow-900/80 opacity-0 group-hover:opacity-100 transition" viewBox="0 0 24 24">
              <path d="M6 12h12" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"/>
            </svg>
          </button>
          <button 
            onClick={onMaximize}
            className={`w-3 h-3 rounded-full flex items-center justify-center transition ${
              isActive ? 'bg-[#28c840] hover:bg-[#1db954]' : 'bg-gray-400'
            }`}
          >
            <svg className="w-[6px] h-[6px] text-green-900/80 opacity-0 group-hover:opacity-100 transition" viewBox="0 0 24 24" fill="none">
              <path d="M4 14v6h6M20 10V4h-6M4 4l7 7M20 20l-7-7" stroke="currentColor" strokeWidth={3} strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 flex items-center justify-center">
              {window.icon && <div className="scale-[0.3] origin-center">{window.icon}</div>}
            </div>
            <span className="text-[13px] text-gray-700 font-medium">{window.title}</span>
          </div>
        </div>
        <div className="w-16" />
      </div>

      <div className="flex-1 overflow-hidden bg-white">
        {renderContent()}
      </div>
    </motion.div>
  )
}
