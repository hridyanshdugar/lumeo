import { useState, useEffect } from 'react'
import { PortfolioManifest } from '../types/manifest'

interface ThemeProps {
  manifest: PortfolioManifest
}

type PageType = 'home' | 'experience' | 'projects' | 'education' | 'skills'

// Navigation component
const Navigation = ({ currentPage, onPageChange, darkMode, toggleDarkMode }: {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}) => {
  const pages: { id: PageType; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: '◆' },
    { id: 'experience', label: 'Experience', icon: '▶' },
    { id: 'projects', label: 'Projects', icon: '●' },
    { id: 'education', label: 'Education', icon: '■' },
    { id: 'skills', label: 'Skills', icon: '▲' }
  ]

  return (
    <nav className="bg-black/90 dark:bg-black border-b-2 border-cyan-500 dark:border-cyan-400 backdrop-blur-sm relative overflow-hidden">
      {/* Animated scan line */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-scan pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-8 py-4 relative z-10">
        <div className="flex items-center justify-between">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 text-cyan-400 hover:text-cyan-300 transition border border-cyan-500/50 hover:border-cyan-400 rounded font-mono"
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☼' : '☾'}
          </button>

          {/* Navigation buttons */}
          <div className="flex items-center gap-2">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => onPageChange(page.id)}
                className={`px-4 py-2 text-xs transition font-mono border relative overflow-hidden group ${
                  currentPage === page.id
                    ? 'bg-cyan-500 text-black border-cyan-400 shadow-lg shadow-cyan-500/50'
                    : 'text-cyan-400 border-cyan-500/50 hover:border-cyan-400 hover:text-cyan-300'
                }`}
              >
                <span className="absolute inset-0 bg-cyan-400/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                <span className="relative flex items-center gap-2">
                  <span className="text-xs">{page.icon}</span>
                  <span className="hidden sm:inline">{page.label}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

// Glitch text effect component
const GlitchText = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return (
    <span className={`relative inline-block ${className}`} data-text={children}>
      <span className="relative z-10">{children}</span>
      <span className="absolute top-0 left-0 text-cyan-500 opacity-70 animate-glitch" style={{ animationDelay: '0s' }}>{children}</span>
      <span className="absolute top-0 left-0 text-pink-500 opacity-70 animate-glitch" style={{ animationDelay: '0.1s' }}>{children}</span>
    </span>
  )
}

// Hologram card component
const HologramCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <div
      className="relative bg-black/50 backdrop-blur-md border-2 border-cyan-500/50 p-6 hover:border-cyan-400 transition-all duration-300 group overflow-hidden"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>

      {/* Scan line effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan-fast pointer-events-none"></div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-50 pointer-events-none"></div>

      {children}
    </div>
  )
}

export default function CyberTheme({ manifest }: ThemeProps) {
  const [currentPage, setCurrentPage] = useState<PageType>('home')
  const [expandedExperience, setExpandedExperience] = useState<number[]>([])
  const [expandedProjects, setExpandedProjects] = useState<number[]>([])
  const [darkMode, setDarkMode] = useState(true) // Cyber theme defaults to dark
  const { personalInfo, experience, projects, education, skills } = manifest

  // Initialize dark mode from system preference
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(isDark)
  }, [])

  const pages: PageType[] = ['home', 'experience', 'projects', 'education', 'skills']

  const handlePageChange = (page: PageType) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToPreviousPage = () => {
    const currentIndex = pages.indexOf(currentPage)
    if (currentIndex > 0) {
      handlePageChange(pages[currentIndex - 1])
    }
  }

  const goToNextPage = () => {
    const currentIndex = pages.indexOf(currentPage)
    if (currentIndex < pages.length - 1) {
      handlePageChange(pages[currentIndex + 1])
    }
  }

  const toggleExperience = (idx: number) => {
    setExpandedExperience(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    )
  }

  const toggleProject = (idx: number) => {
    setExpandedProjects(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    )
  }

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
  }

  const currentIndex = pages.indexOf(currentPage)

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="h-screen bg-black dark:bg-black text-cyan-400 dark:text-cyan-300 w-full max-w-full flex flex-col overflow-hidden relative font-mono">
        {/* Animated grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_2px,transparent_2px),linear-gradient(90deg,rgba(0,255,255,0.05)_2px,transparent_2px)] bg-[size:50px_50px] animate-grid-move"></div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
                opacity: Math.random() * 0.5 + 0.2
              }}
            ></div>
          ))}
        </div>

        <Navigation currentPage={currentPage} onPageChange={handlePageChange} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <div className="flex-1 overflow-y-auto relative z-10">
          {/* Arrow Navigation */}
          {currentIndex > 0 && (
            <button
              onClick={goToPreviousPage}
              className="fixed left-4 top-1/2 -translate-y-1/2 p-3 bg-black border-2 border-cyan-500 hover:border-cyan-400 text-cyan-400 hover:text-cyan-300 hover:shadow-lg hover:shadow-cyan-500/50 transition-all z-20 font-mono"
              aria-label="Previous page"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {currentIndex < pages.length - 1 && (
            <button
              onClick={goToNextPage}
              className="fixed right-4 top-1/2 -translate-y-1/2 p-3 bg-black border-2 border-cyan-500 hover:border-cyan-400 text-cyan-400 hover:text-cyan-300 hover:shadow-lg hover:shadow-cyan-500/50 transition-all z-20 font-mono"
              aria-label="Next page"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Home Page */}
          {currentPage === 'home' && (
            <div className="max-w-6xl mx-auto px-8 py-16">
              <div className="relative">
                <HologramCard>
                  <div className="text-center py-12">
                    {personalInfo.avatar && (
                      <div className="mb-8 inline-block relative">
                        <div className="absolute inset-0 bg-cyan-500 blur-2xl opacity-50 animate-pulse"></div>
                        <img
                          src={personalInfo.avatar}
                          alt={personalInfo.name}
                          className="w-40 h-40 rounded-full border-4 border-cyan-400 shadow-lg shadow-cyan-500/50 relative z-10"
                        />
                      </div>
                    )}
                    <h1 className="text-6xl md:text-7xl font-bold mb-4">
                      <GlitchText>{personalInfo.name}</GlitchText>
                    </h1>
                    <p className="text-2xl text-cyan-300 mb-6 tracking-wider">&gt; {personalInfo.title}</p>
                    <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-6"></div>
                    <p className="text-lg text-cyan-400/80 max-w-3xl mx-auto mb-8 leading-relaxed">{personalInfo.bio}</p>

                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                      {['experience', 'projects', 'education', 'skills'].map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page as PageType)}
                          className="px-6 py-3 bg-black border-2 border-cyan-500 hover:border-cyan-400 text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 uppercase tracking-wider text-sm hover:shadow-lg hover:shadow-cyan-500/30 relative overflow-hidden group"
                        >
                          <span className="absolute inset-0 bg-cyan-400/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                          <span className="relative">[ {page} ]</span>
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 text-cyan-400/70 mb-6 text-sm">
                      <a href={`mailto:${personalInfo.email}`} className="hover:text-cyan-300 transition flex items-center gap-2">
                        <span>▸</span> {personalInfo.email}
                      </a>
                      {personalInfo.phone && (
                        <span className="flex items-center gap-2">
                          <span>◆</span> {personalInfo.phone}
                        </span>
                      )}
                      {personalInfo.location && (
                        <span className="flex items-center gap-2">
                          <span>●</span> {personalInfo.location}
                        </span>
                      )}
                    </div>

                    {personalInfo.links && (
                      <div className="flex flex-wrap justify-center gap-3">
                        {Object.entries(personalInfo.links).map(([key, url]) =>
                          url ? (
                            <a
                              key={key}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 border border-cyan-500/50 hover:border-cyan-400 text-cyan-400 hover:text-cyan-300 transition uppercase text-xs tracking-wider hover:bg-cyan-500/10"
                            >
                              {key}
                            </a>
                          ) : null
                        )}
                      </div>
                    )}
                  </div>
                </HologramCard>
              </div>
            </div>
          )}

          {/* Experience Page */}
          {currentPage === 'experience' && (
            <div className="max-w-6xl mx-auto px-8 py-16">
              <h2 className="text-5xl font-bold mb-12 text-center">
                <GlitchText>&gt;&gt; EXPERIENCE_LOG</GlitchText>
              </h2>
              <div className="space-y-6">
                {experience.map((exp, idx) => {
                  const isExpanded = expandedExperience.includes(idx)
                  return (
                    <HologramCard key={idx} delay={idx * 0.1}>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-2xl font-bold text-cyan-300 mb-1">{exp.position}</h3>
                          <p className="text-lg text-cyan-400/70">&gt; {exp.company}</p>
                        </div>
                        <span className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 text-xs uppercase tracking-wider whitespace-nowrap">
                          {exp.startDate} — {exp.endDate || 'ACTIVE'}
                        </span>
                      </div>
                      <p className="text-cyan-400/80 mb-4 leading-relaxed break-words" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                        {exp.description && exp.description.length > 120 && !isExpanded
                          ? exp.description.substring(0, 120) + '...'
                          : exp.description}
                      </p>

                      {isExpanded && (
                        <div className="space-y-4 animate-slideDown">
                          {exp.achievements && exp.achievements.length > 0 && (
                            <ul className="space-y-2">
                              {exp.achievements.map((achievement, i) => (
                                <li key={i} className="flex items-start gap-3 text-cyan-400/70">
                                  <span className="text-cyan-400 mt-1">▸</span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          {exp.technologies && (
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-black border border-cyan-500/50 text-cyan-400 text-xs uppercase tracking-wider hover:border-cyan-400 transition"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      <button
                        onClick={() => toggleExperience(idx)}
                        className="mt-4 text-sm text-cyan-400 hover:text-cyan-300 transition uppercase tracking-wider border border-cyan-500/50 hover:border-cyan-400 px-4 py-1"
                      >
                        {isExpanded ? '[ COLLAPSE ]' : '[ EXPAND ]'}
                      </button>
                    </HologramCard>
                  )
                })}
              </div>
            </div>
          )}

          {/* Projects Page */}
          {currentPage === 'projects' && (
            <div className="max-w-6xl mx-auto px-8 py-16">
              <h2 className="text-5xl font-bold mb-12 text-center">
                <GlitchText>&gt;&gt; PROJECT_ARCHIVE</GlitchText>
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((project, idx) => {
                  const isExpanded = expandedProjects.includes(idx)
                  return (
                    <HologramCard key={idx} delay={idx * 0.1}>
                      {project.image && isExpanded && (
                        <div className="mb-4 relative overflow-hidden border-2 border-cyan-500/30">
                          <img
                            src={project.image}
                            alt={project.name}
                            className="w-full h-48 object-cover opacity-80 hover:opacity-100 transition"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
                        </div>
                      )}
                      <h3 className="text-2xl font-bold text-cyan-300 mb-3">&gt; {project.name}</h3>
                      <p className="text-cyan-400/80 mb-4 break-words" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                        {project.description && project.description.length > 100 && !isExpanded
                          ? project.description.substring(0, 100) + '...'
                          : project.description}
                      </p>

                      {isExpanded && (
                        <div className="space-y-4 animate-slideDown">
                          {project.highlights && project.highlights.length > 0 && (
                            <ul className="space-y-1">
                              {project.highlights.map((highlight, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-cyan-400/70">
                                  <span className="text-cyan-400">●</span>
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, i) => (
                              <span key={i} className="px-2 py-1 bg-black border border-cyan-500/50 text-cyan-400 text-xs uppercase">
                                {tech}
                              </span>
                            ))}
                          </div>
                          {project.links && (
                            <div className="flex gap-3 flex-wrap">
                              {Object.entries(project.links).map(([key, url]) =>
                                url ? (
                                  <a
                                    key={key}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cyan-400 hover:text-cyan-300 uppercase text-sm border border-cyan-500/50 hover:border-cyan-400 px-3 py-1 transition"
                                  >
                                    [ {key} ]
                                  </a>
                                ) : null
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      <button
                        onClick={() => toggleProject(idx)}
                        className="mt-4 text-sm text-cyan-400 hover:text-cyan-300 transition uppercase tracking-wider border border-cyan-500/50 hover:border-cyan-400 px-4 py-1"
                      >
                        {isExpanded ? '[ COLLAPSE ]' : '[ EXPAND ]'}
                      </button>
                    </HologramCard>
                  )
                })}
              </div>
            </div>
          )}

          {/* Education Page */}
          {currentPage === 'education' && (
            <div className="max-w-6xl mx-auto px-8 py-16">
              <h2 className="text-5xl font-bold mb-12 text-center">
                <GlitchText>&gt;&gt; EDUCATION_DATA</GlitchText>
              </h2>
              <div className="space-y-6">
                {education.map((edu, idx) => (
                  <HologramCard key={idx} delay={idx * 0.1}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-2xl font-bold text-cyan-300">{edu.institution}</h3>
                        <p className="text-lg text-cyan-400/80 mt-1">
                          {edu.degree} • {edu.field}
                        </p>
                        {edu.gpa && <p className="text-sm text-cyan-400/60 mt-2">&gt; GPA: {edu.gpa}</p>}
                      </div>
                      <span className="text-sm text-cyan-400/70 bg-cyan-500/10 border border-cyan-500/50 px-3 py-1.5 uppercase tracking-wider whitespace-nowrap">
                        {edu.startDate} — {edu.endDate || 'PRESENT'}
                      </span>
                    </div>
                    {edu.achievements && edu.achievements.length > 0 && (
                      <ul className="space-y-1 mt-4">
                        {edu.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-cyan-400/70">
                            <span className="text-cyan-400">▸</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </HologramCard>
                ))}
              </div>
            </div>
          )}

          {/* Skills Page */}
          {currentPage === 'skills' && (
            <div className="max-w-6xl mx-auto px-8 py-16">
              <h2 className="text-5xl font-bold mb-12 text-center">
                <GlitchText>&gt;&gt; SKILL_MATRIX</GlitchText>
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {skills.map((skillGroup, idx) => (
                  <HologramCard key={idx} delay={idx * 0.1}>
                    <h3 className="font-bold text-xl mb-4 text-cyan-300 uppercase tracking-wider border-b border-cyan-500/50 pb-2">
                      &gt; {skillGroup.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-black border border-cyan-500/50 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-500/10 transition cursor-default uppercase text-sm tracking-wider"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </HologramCard>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CSS Animations */}
        <style>{`
          @keyframes scan {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }

          @keyframes scan-fast {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }

          @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
            50% { transform: translateY(-100px) translateX(50px); opacity: 0.8; }
          }

          @keyframes grid-move {
            0% { background-position: 0 0; }
            100% { background-position: 50px 50px; }
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              max-height: 0;
            }
            to {
              opacity: 1;
              max-height: 1000px;
            }
          }

          .animate-scan {
            animation: scan 3s linear infinite;
          }

          .animate-scan-fast {
            animation: scan-fast 1.5s linear infinite;
          }

          .animate-glitch {
            animation: glitch 0.3s infinite;
          }

          .animate-float {
            animation: float linear infinite;
          }

          .animate-grid-move {
            animation: grid-move 20s linear infinite;
          }

          .animate-slideDown {
            animation: slideDown 0.3s ease-out forwards;
          }
        `}</style>
      </div>
    </div>
  )
}
