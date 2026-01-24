import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PortfolioManifest, Project, Experience } from '../../types/manifest'
import { Sidebar } from './Sidebar.tsx'
import { NowPlayingBar } from './NowPlayingBar.tsx'
import { AlbumGrid } from './AlbumGrid.tsx'
import { Equalizer } from './Equalizer.tsx'

interface SpotifyThemeProps {
  manifest: PortfolioManifest
}

export const SpotifyTheme = ({ manifest }: SpotifyThemeProps) => {
  const [currentSection, setCurrentSection] = useState<'home' | 'projects' | 'experience' | 'skills' | 'education' | 'contact'>('home')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [currentItem, setCurrentItem] = useState<string>(manifest.personalInfo.name + "'s Portfolio")
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [shuffled, setShuffled] = useState(false)
  const [wrappedVisible, setWrappedVisible] = useState(false)
  const [logoClicks, setLogoClicks] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set())
  const [recentlyPlayed, setRecentlyPlayed] = useState<string[]>([])
  const [hoverGradient, setHoverGradient] = useState('from-zinc-800')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)

  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    return () => { document.head.removeChild(link) }
  }, [])

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 0 : prev + 0.5))
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isPlaying])

  const handleLogoClick = () => {
    const newClicks = logoClicks + 1
    setLogoClicks(newClicks)
    if (newClicks >= 3) {
      setWrappedVisible(true)
      setLogoClicks(0)
    }
  }

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  const displayProjects = shuffled ? shuffleArray(manifest.projects) : manifest.projects

  const filteredProjects = searchQuery 
    ? displayProjects.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : displayProjects

  const toggleLike = (item: string) => {
    setLikedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(item)) {
        newSet.delete(item)
      } else {
        newSet.add(item)
      }
      return newSet
    })
  }

  const playItem = (name: string) => {
    setCurrentItem(name)
    setIsPlaying(true)
    setRecentlyPlayed(prev => [name, ...prev.filter(p => p !== name)].slice(0, 5))
  }

  const openProjectDetail = (project: Project) => {
    setSelectedProject(project)
    playItem(project.name)
  }

  const openExperienceDetail = (experience: Experience) => {
    setSelectedExperience(experience)
    playItem(experience.position)
  }

  const gradients = [
    'from-purple-800', 'from-blue-800', 'from-green-800', 
    'from-red-800', 'from-orange-800', 'from-pink-800'
  ]

  return (
    <div 
      className="h-screen bg-black text-white flex flex-col overflow-hidden"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="flex flex-1 overflow-hidden min-h-0">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          currentSection={currentSection}
          onSectionChange={setCurrentSection}
          onLogoClick={handleLogoClick}
          manifest={manifest}
        />

        <main className={`flex-1 overflow-y-auto bg-gradient-to-b ${hoverGradient} to-black p-4 md:p-8 pb-24 transition-all duration-700`}>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              <div className="relative max-w-md">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What do you want to explore?"
                  className="w-full bg-white text-black rounded-full px-12 py-3 outline-none"
                  autoFocus
                />
                <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                  >
                    ✕
                  </button>
                )}
              </div>
              {searchQuery && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4"
                >
                  <p className="text-sm text-zinc-400 mb-2">
                    Found {filteredProjects.length} results for "{searchQuery}"
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
          
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2 rounded-full transition ${searchOpen ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          <AnimatePresence mode="wait">
            {currentSection === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div className="flex items-end gap-6 mb-8">
                  {manifest.personalInfo.avatar ? (
                    <img 
                      src={manifest.personalInfo.avatar} 
                      alt={manifest.personalInfo.name}
                      className="w-48 h-48 rounded-full shadow-2xl object-cover"
                    />
                  ) : (
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-2xl">
                      <span className="text-6xl font-bold">{manifest.personalInfo.name[0]}</span>
                    </div>
                  )}
                  <div>
                    <p className="text-sm uppercase tracking-wider text-zinc-400">Profile</p>
                    <h1 className="text-4xl md:text-6xl font-bold mt-2">{manifest.personalInfo.name}</h1>
                    <p className="text-zinc-400 mt-2">{manifest.personalInfo.title}</p>
                    <p className="text-zinc-500 text-sm mt-1">{manifest.projects.length} projects • {manifest.experience.length} experiences</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-8">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center hover:scale-105 transition"
                  >
                    {isPlaying ? (
                      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => setShuffled(!shuffled)}
                    className={`p-3 rounded-full transition ${shuffled ? 'text-green-500' : 'text-zinc-400 hover:text-white'}`}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
                    </svg>
                  </button>
                  {isPlaying && <Equalizer />}
                </div>

                <p className="text-zinc-300 max-w-2xl">{manifest.personalInfo.bio}</p>

                {recentlyPlayed.length > 0 && (
                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Recently Played</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {recentlyPlayed.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-zinc-800/50 rounded-lg p-3 flex items-center gap-3 hover:bg-zinc-700/50 cursor-pointer group"
                          onClick={() => playItem(item)}
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded flex items-center justify-center flex-shrink-0">
                            <span className="font-bold">{item[0]}</span>
                          </div>
                          <span className="font-medium truncate text-sm">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                )}

                <section>
                  <h2 className="text-2xl font-bold mb-4">Featured Projects</h2>
                  <AlbumGrid 
                    projects={filteredProjects.slice(0, 6)} 
                    onSelect={(name: string) => {
                      const project = manifest.projects.find(p => p.name === name)
                      if (project) openProjectDetail(project)
                    }}
                    onLike={toggleLike}
                    likedItems={likedItems}
                    onHover={(idx: number) => setHoverGradient(gradients[idx % gradients.length])}
                  />
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {manifest.skills.map((skillGroup, idx) => (
                      skillGroup.items.map((skill, i) => (
                        <span 
                          key={`${idx}-${i}`}
                          className="px-4 py-2 bg-zinc-800 rounded-full text-sm hover:bg-zinc-700 transition cursor-pointer"
                        >
                          {skill}
                        </span>
                      ))
                    ))}
                  </div>
                </section>
              </motion.div>
            )}

            {currentSection === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h1 className="text-3xl font-bold mb-6">All Projects</h1>
                <AlbumGrid 
                  projects={filteredProjects} 
                  onSelect={(name: string) => {
                    const project = manifest.projects.find(p => p.name === name)
                    if (project) openProjectDetail(project)
                  }}
                  onLike={toggleLike}
                  likedItems={likedItems}
                  onHover={(idx: number) => setHoverGradient(gradients[idx % gradients.length])}
                />
              </motion.div>
            )}

            {currentSection === 'experience' && (
              <motion.div
                key="experience"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h1 className="text-3xl font-bold mb-6">Experience Playlist</h1>
                <div className="bg-zinc-900/50 rounded-lg">
                  <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-2 border-b border-zinc-800 text-sm text-zinc-400">
                    <span>#</span>
                    <span>Title</span>
                    <span>Company</span>
                    <span>Duration</span>
                  </div>
                  {manifest.experience.map((exp, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-3 hover:bg-zinc-800/50 rounded group cursor-pointer"
                      onClick={() => openExperienceDetail(exp)}
                    >
                      <span className="text-zinc-400 group-hover:hidden w-4">{idx + 1}</span>
                      <svg className="w-4 h-4 text-white hidden group-hover:block" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <div>
                        <p className="font-medium">{exp.position}</p>
                        <p className="text-sm text-zinc-400 line-clamp-1 break-words" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{exp.description}</p>
                      </div>
                      <span className="text-zinc-400">{exp.company}</span>
                      <span className="text-zinc-400 text-sm">{exp.startDate} - {exp.endDate || 'Present'}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {currentSection === 'skills' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h1 className="text-3xl font-bold mb-6">Genres</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {manifest.skills.map((skillGroup, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 rounded-lg"
                    >
                      <h3 className="text-xl font-bold mb-4 text-green-400">{skillGroup.category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill, i) => (
                          <span 
                            key={i}
                            className="px-3 py-1 bg-zinc-700 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {currentSection === 'education' && (
              <motion.div
                key="education"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h1 className="text-3xl font-bold mb-6">Education Playlist</h1>
                <div className="space-y-6">
                  {manifest.education.map((edu, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-zinc-900/50 rounded-lg p-6 hover:bg-zinc-800/50 transition cursor-pointer group"
                    >
                      <div className="flex items-start gap-6">
                        <div className={`w-24 h-24 rounded-lg bg-gradient-to-br ${gradients[idx % gradients.length]} flex items-center justify-center flex-shrink-0`}>
                          <span className="text-3xl font-bold text-white/70">{edu.institution[0]}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h2 className="text-xl font-bold mb-1">{edu.degree}</h2>
                              <p className="text-green-400 font-medium">{edu.field}</p>
                              <p className="text-zinc-400 mt-1">{edu.institution}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-zinc-400 text-sm">{edu.startDate} - {edu.endDate || 'Present'}</p>
                              {edu.gpa && (
                                <p className="text-green-400 font-semibold mt-1">GPA: {edu.gpa}</p>
                              )}
                            </div>
                          </div>
                          {edu.achievements && edu.achievements.length > 0 && (
                            <div className="mt-4">
                              <p className="text-sm text-zinc-500 uppercase tracking-wider mb-2">Achievements</p>
                              <ul className="space-y-1">
                                {edu.achievements.map((achievement, i) => (
                                  <li key={i} className="text-sm text-zinc-300 flex items-start gap-2">
                                    <span className="text-green-500 mt-1">•</span>
                                    {achievement}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {currentSection === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h1 className="text-3xl font-bold mb-6">Connect</h1>
                <div className="max-w-4xl">
                  <div className="bg-zinc-900/50 rounded-lg p-6">
                    <div className="flex items-center gap-4 mb-6">
                      {manifest.personalInfo.avatar ? (
                        <img 
                          src={manifest.personalInfo.avatar} 
                          alt={manifest.personalInfo.name}
                          className="w-20 h-20 rounded-full object-cover shadow-xl"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-xl">
                          <span className="text-2xl font-bold">{manifest.personalInfo.name[0]}</span>
                        </div>
                      )}
                      <div>
                        <h2 className="text-xl font-bold">{manifest.personalInfo.name}</h2>
                        <p className="text-zinc-400 text-sm">{manifest.personalInfo.title}</p>
                        {manifest.personalInfo.location && (
                          <p className="text-zinc-500 text-xs mt-1 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {manifest.personalInfo.location}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <a 
                        href={`mailto:${manifest.personalInfo.email}`}
                        className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition group"
                      >
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-zinc-400">Email</p>
                          <p className="font-medium text-sm group-hover:text-green-400 transition truncate">{manifest.personalInfo.email}</p>
                        </div>
                      </a>

                      {manifest.personalInfo.phone && (
                        <a 
                          href={`tel:${manifest.personalInfo.phone}`}
                          className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition group"
                        >
                          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-zinc-400">Phone</p>
                            <p className="font-medium text-sm group-hover:text-green-400 transition truncate">{manifest.personalInfo.phone}</p>
                          </div>
                        </a>
                      )}

                      {manifest.personalInfo.links?.github && (
                        <a 
                          href={manifest.personalInfo.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition group"
                        >
                          <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-zinc-400">GitHub</p>
                            <p className="font-medium text-sm group-hover:text-green-400 transition">View Profile</p>
                          </div>
                        </a>
                      )}

                      {manifest.personalInfo.links?.linkedin && (
                        <a 
                          href={manifest.personalInfo.links.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition group"
                        >
                          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-zinc-400">LinkedIn</p>
                            <p className="font-medium text-sm group-hover:text-green-400 transition">Connect</p>
                          </div>
                        </a>
                      )}

                      {manifest.personalInfo.links?.twitter && (
                        <a 
                          href={manifest.personalInfo.links.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition group"
                        >
                          <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-sky-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-zinc-400">Twitter / X</p>
                            <p className="font-medium text-sm group-hover:text-green-400 transition">Follow</p>
                          </div>
                        </a>
                      )}

                      {manifest.personalInfo.links?.website && (
                        <a 
                          href={manifest.personalInfo.links.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition group"
                        >
                          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-zinc-400">Website</p>
                            <p className="font-medium text-sm group-hover:text-green-400 transition">Visit</p>
                          </div>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <NowPlayingBar
        currentItem={currentItem}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        progress={progress}
        manifest={manifest}
      />

      <AnimatePresence>
        {wrappedVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setWrappedVisible(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-green-600 to-green-900 p-8 rounded-2xl max-w-md w-full text-center"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold mb-6">Your Portfolio Wrapped</h2>
              <div className="space-y-4 text-left">
                <div className="bg-black/30 p-4 rounded-lg">
                  <p className="text-sm text-green-300">Projects</p>
                  <p className="text-4xl font-bold">{manifest.projects.length}</p>
                </div>
                <div className="bg-black/30 p-4 rounded-lg">
                  <p className="text-sm text-green-300">Experience Entries</p>
                  <p className="text-4xl font-bold">{manifest.experience.length}</p>
                </div>
                <div className="bg-black/30 p-4 rounded-lg">
                  <p className="text-sm text-green-300">Skills</p>
                  <p className="text-4xl font-bold">{manifest.skills.reduce((acc, s) => acc + s.items.length, 0)}</p>
                </div>
                <div className="bg-black/30 p-4 rounded-lg">
                  <p className="text-sm text-green-300">Top Genre</p>
                  <p className="text-2xl font-bold">{manifest.skills[0]?.category || 'N/A'}</p>
                </div>
              </div>
              <button
                onClick={() => setWrappedVisible(false)}
                className="mt-6 px-6 py-2 bg-white text-black rounded-full font-semibold hover:scale-105 transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/95 z-50 overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="min-h-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative">
                <div className={`h-40 bg-gradient-to-b ${gradients[manifest.projects.indexOf(selectedProject) % gradients.length]} to-transparent`}>
                  {selectedProject.image && (
                    <img src={selectedProject.image} alt="" className="w-full h-full object-cover opacity-50" />
                  )}
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="px-6 pb-6 -mt-16 relative">
                <div className="flex items-end gap-4 mb-6">
                  <div className={`w-28 h-28 rounded-lg shadow-2xl flex-shrink-0 bg-gradient-to-br ${gradients[manifest.projects.indexOf(selectedProject) % gradients.length]} flex items-center justify-center`}>
                    {selectedProject.image ? (
                      <img src={selectedProject.image} alt="" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <span className="text-4xl font-bold text-white/50">{selectedProject.name[0]}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wider text-zinc-400 mb-1">Project</p>
                    <h1 className="text-2xl md:text-3xl font-bold mb-1">{selectedProject.name}</h1>
                    <p className="text-zinc-400 text-sm">{selectedProject.technologies.length} technologies used</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <button
                    onClick={() => {
                      if (selectedProject.links?.demo) window.open(selectedProject.links.demo, '_blank')
                      else if (selectedProject.links?.github) window.open(selectedProject.links.github, '_blank')
                    }}
                    className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center hover:scale-105 transition"
                  >
                    <svg className="w-5 h-5 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => toggleLike(selectedProject.name)}
                    className={`p-2 rounded-full transition ${likedItems.has(selectedProject.name) ? 'text-green-500' : 'text-zinc-400 hover:text-white'}`}
                  >
                    <svg className="w-6 h-6" fill={likedItems.has(selectedProject.name) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-5">
                  <div>
                    <h2 className="text-lg font-bold mb-2">Description</h2>
                    <p className="text-zinc-300 leading-relaxed text-sm break-words" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{selectedProject.description}</p>
                  </div>

                  <div>
                    <h2 className="text-lg font-bold mb-2">Technologies</h2>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, i) => (
                        <span key={i} className="px-3 py-1.5 bg-zinc-800 rounded-full text-sm hover:bg-zinc-700 transition">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {(selectedProject.links?.github || selectedProject.links?.demo) && (
                    <div>
                      <h2 className="text-xl font-bold mb-3">Links</h2>
                      <div className="flex gap-4">
                        {selectedProject.links?.github && (
                          <a
                            href={selectedProject.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-zinc-800 rounded-full hover:bg-zinc-700 transition"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            GitHub
                          </a>
                        )}
                        {selectedProject.links?.demo && (
                          <a
                            href={selectedProject.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-green-500 text-black rounded-full hover:bg-green-400 transition font-semibold"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedExperience && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/95 z-50 overflow-y-auto"
            onClick={() => setSelectedExperience(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="min-h-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative">
                <div className={`h-40 bg-gradient-to-b ${gradients[manifest.experience.indexOf(selectedExperience) % gradients.length]} to-transparent`} />
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="px-6 pb-6 -mt-16 relative">
                <div className="flex items-end gap-4 mb-6">
                  <div className={`w-28 h-28 rounded-lg shadow-2xl flex-shrink-0 bg-gradient-to-br ${gradients[manifest.experience.indexOf(selectedExperience) % gradients.length]} flex items-center justify-center`}>
                    <span className="text-4xl font-bold text-white/50">{selectedExperience.company[0]}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wider text-zinc-400 mb-1">Experience</p>
                    <h1 className="text-2xl md:text-3xl font-bold mb-1">{selectedExperience.position}</h1>
                    <p className="text-zinc-400">{selectedExperience.company}</p>
                    <p className="text-zinc-500 text-sm mt-1">{selectedExperience.startDate} - {selectedExperience.endDate || 'Present'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center hover:scale-105 transition"
                  >
                    {isPlaying ? (
                      <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => toggleLike(selectedExperience.position)}
                    className={`p-2 rounded-full transition ${likedItems.has(selectedExperience.position) ? 'text-green-500' : 'text-zinc-400 hover:text-white'}`}
                  >
                    <svg className="w-6 h-6" fill={likedItems.has(selectedExperience.position) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-5">
                  <div>
                    <h2 className="text-lg font-bold mb-2">About This Role</h2>
                    <p className="text-zinc-300 leading-relaxed text-sm break-words" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{selectedExperience.description}</p>
                  </div>

                  {selectedExperience.technologies && selectedExperience.technologies.length > 0 && (
                    <div>
                      <h2 className="text-lg font-bold mb-2">Technologies Used</h2>
                      <div className="flex flex-wrap gap-2">
                        {selectedExperience.technologies.map((tech, i) => (
                          <span key={i} className="px-3 py-1.5 bg-zinc-800 rounded-full text-sm hover:bg-zinc-700 transition">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h2 className="text-lg font-bold mb-2">Timeline</h2>
                    <div className="bg-zinc-900 rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                        <div>
                          <p className="font-medium text-sm">Started</p>
                          <p className="text-zinc-400 text-xs">{selectedExperience.startDate}</p>
                        </div>
                        <div className="flex-1 h-0.5 bg-zinc-700" />
                        <div className={`w-2.5 h-2.5 rounded-full ${selectedExperience.endDate ? 'bg-zinc-500' : 'bg-green-500 animate-pulse'}`} />
                        <div>
                          <p className="font-medium text-sm">{selectedExperience.endDate ? 'Ended' : 'Present'}</p>
                          <p className="text-zinc-400 text-xs">{selectedExperience.endDate || 'Currently working'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
