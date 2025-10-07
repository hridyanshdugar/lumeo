import { useState, useEffect } from 'react'
import { PortfolioManifest } from '../types/manifest'

interface ThemeProps {
  manifest: PortfolioManifest
}

type PageType = 'home' | 'experience' | 'projects' | 'education' | 'skills'

const SocialIcon = ({ type }: { type: string }) => {
  const iconClass = "w-4 h-4 fill-current"

  switch (type.toLowerCase()) {
    case 'github':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    case 'linkedin':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    case 'twitter':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    case 'website':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm9.5 12c0 1.466-.332 2.853-.925 4.097l-2.588-7.088A4.48 4.48 0 0018.5 12zM12 19.5c-1.466 0-2.853-.332-4.097-.925l7.088-2.588A7.476 7.476 0 0012 19.5zm-7.5-7.5c0-1.466.332-2.853.925-4.097l2.588 7.088A4.48 4.48 0 005.5 12zM12 4.5c1.466 0 2.853.332 4.097.925l-7.088 2.588A7.476 7.476 0 0012 4.5z"/>
        </svg>
      )
    case 'demo':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 5v14l11-7z"/>
        </svg>
      )
    default:
      return (
        <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
        </svg>
      )
  }
}

// Decorative geometric patterns
const GeometricPattern = ({ page }: { page: PageType }) => {
  const patterns = {
    home: (
      <div className="absolute top-20 right-10 opacity-10 pointer-events-none">
        <svg width="300" height="300" viewBox="0 0 300 300">
          <circle cx="150" cy="150" r="100" fill="none" stroke="currentColor" strokeWidth="1"/>
          <circle cx="150" cy="150" r="70" fill="none" stroke="currentColor" strokeWidth="1"/>
          <circle cx="150" cy="150" r="40" fill="none" stroke="currentColor" strokeWidth="1"/>
          <line x1="50" y1="150" x2="250" y2="150" stroke="currentColor" strokeWidth="1"/>
          <line x1="150" y1="50" x2="150" y2="250" stroke="currentColor" strokeWidth="1"/>
        </svg>
      </div>
    ),
    experience: (
      <div className="absolute bottom-10 left-10 opacity-10 pointer-events-none">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="1"/>
          <rect x="60" y="60" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="1"/>
          <rect x="100" y="100" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="1"/>
        </svg>
      </div>
    ),
    projects: (
      <div className="absolute top-1/4 right-20 opacity-10 pointer-events-none">
        <svg width="250" height="250" viewBox="0 0 250 250">
          <polygon points="125,25 225,125 125,225 25,125" fill="none" stroke="currentColor" strokeWidth="1"/>
          <polygon points="125,50 200,125 125,200 50,125" fill="none" stroke="currentColor" strokeWidth="1"/>
        </svg>
      </div>
    ),
    education: (
      <div className="absolute bottom-20 right-20 opacity-10 pointer-events-none">
        <svg width="180" height="180" viewBox="0 0 180 180">
          <path d="M90 20 L160 90 L90 160 L20 90 Z" fill="none" stroke="currentColor" strokeWidth="1"/>
          <path d="M90 50 L130 90 L90 130 L50 90 Z" fill="none" stroke="currentColor" strokeWidth="1"/>
        </svg>
      </div>
    ),
    skills: (
      <div className="absolute top-1/3 left-20 opacity-10 pointer-events-none">
        <svg width="220" height="220" viewBox="0 0 220 220">
          <path d="M110 20 L200 110 L110 200 L20 110 Z" fill="none" stroke="currentColor" strokeWidth="1"/>
          <circle cx="110" cy="110" r="60" fill="none" stroke="currentColor" strokeWidth="1"/>
        </svg>
      </div>
    )
  }

  return patterns[page]
}

// Navigation component
const Navigation = ({ currentPage, onPageChange, darkMode, toggleDarkMode }: {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}) => {
  const pages: { id: PageType; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' }
  ]

  return (
    <nav className="bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-5xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Navigation buttons */}
          <div className="flex items-center gap-3">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => onPageChange(page.id)}
                className={`px-4 py-2 text-sm transition ${
                  currentPage === page.id
                    ? 'text-neutral-900 dark:text-white font-medium'
                    : 'text-neutral-500 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300'
                }`}
              >
                {page.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

// Page wrapper with animations
const PageWrapper = ({ children, page }: { children: React.ReactNode; page: PageType }) => {
  return (
    <div className="animate-fadeIn">
      <div className="relative">
        <GeometricPattern page={page} />
        {children}
      </div>
    </div>
  )
}

export default function MinimalTheme({ manifest }: ThemeProps) {
  const [currentPage, setCurrentPage] = useState<PageType>('home')
  const [expandedExperience, setExpandedExperience] = useState<number[]>([])
  const [expandedProjects, setExpandedProjects] = useState<number[]>([])
  const [darkMode, setDarkMode] = useState(false)
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
      <div className="h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 w-full max-w-full flex flex-col overflow-hidden">
        <Navigation currentPage={currentPage} onPageChange={handlePageChange} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className="flex-1 overflow-y-auto relative">
        {/* Arrow Navigation */}
        {currentIndex > 0 && (
          <button
            onClick={goToPreviousPage}
            className="fixed left-4 top-1/2 -translate-y-1/2 p-3 bg-white dark:bg-neutral-900 border-2 border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-neutral-100 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all z-10 rounded-full shadow-lg"
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
            className="fixed right-4 top-1/2 -translate-y-1/2 p-3 bg-white dark:bg-neutral-900 border-2 border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-neutral-100 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all z-10 rounded-full shadow-lg"
            aria-label="Next page"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Home Page */}
        {currentPage === 'home' && (
          <PageWrapper page="home">
            <div className="max-w-5xl mx-auto px-8 py-16 h-full flex items-center">
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-6 animate-slideInLeft">
                    <h1 className="text-7xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight">{personalInfo.name}</h1>
                    <p className="text-3xl text-neutral-600 dark:text-neutral-400 font-light">{personalInfo.title}</p>
                    <div className="w-24 h-1 bg-neutral-900 dark:bg-neutral-100"></div>
                    <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-xl max-w-2xl">{personalInfo.bio}</p>

                    <div className="flex gap-4 pt-6">
                      {['experience', 'projects', 'education', 'skills'].map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page as PageType)}
                          className="px-6 py-3 border-2 border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-900 dark:hover:bg-neutral-100 hover:text-white dark:hover:text-neutral-950 transition-all duration-300 font-mono text-sm uppercase tracking-wider"
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 text-sm animate-slideInRight">
                    <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition group">
                      <SocialIcon type="email" />
                      <span className="break-all group-hover:translate-x-1 transition-transform">{personalInfo.email}</span>
                    </a>
                    {personalInfo.phone && (
                      <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                        <SocialIcon type="phone" />
                        <span>{personalInfo.phone}</span>
                      </div>
                    )}
                    {personalInfo.location && (
                      <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                        <SocialIcon type="location" />
                        <span>{personalInfo.location}</span>
                      </div>
                    )}
                    {personalInfo.links && (
                      <div className="flex gap-2 pt-4">
                        {Object.entries(personalInfo.links).map(([key, url]) =>
                          url ? (
                            <a
                              key={key}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 border border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all hover:scale-110"
                              title={key}
                            >
                              <SocialIcon type={key} />
                            </a>
                          ) : null
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </PageWrapper>
        )}

        {/* Experience Page */}
        {currentPage === 'experience' && (
          <PageWrapper page="experience">
            <div className="max-w-5xl mx-auto px-8 py-16">
              <h2 className="text-4xl font-bold mb-12 animate-slideInDown">Experience</h2>
              <div className="space-y-6">
                {experience.map((exp, idx) => {
                  const isExpanded = expandedExperience.includes(idx)
                  return (
                    <div
                      key={idx}
                      className="border-2 border-neutral-200 dark:border-neutral-800 p-6 hover:border-neutral-900 dark:hover:border-neutral-100 transition-all duration-300 animate-fadeIn"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">{exp.position}</h3>
                          <p className="text-base text-neutral-600 dark:text-neutral-400 font-medium">{exp.company}</p>
                        </div>
                        <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900 px-3 py-1.5 whitespace-nowrap">
                          {exp.startDate} — {exp.endDate || 'Present'}
                        </span>
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed mb-4">
                        {exp.description && exp.description.length > 120 && !isExpanded
                          ? exp.description.substring(0, 120) + '...'
                          : exp.description}
                      </p>

                      {isExpanded && (
                        <div className="space-y-4 animate-slideInDown">
                          {exp.achievements && exp.achievements.length > 0 && (
                            <div className="space-y-2">
                              {exp.achievements.map((achievement, i) => (
                                <div key={i} className="flex items-start gap-3">
                                  <span className="text-neutral-400 mt-1">●</span>
                                  <span className="text-neutral-700 dark:text-neutral-300 text-sm">{achievement}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          {exp.technologies && (
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech, i) => (
                                <span key={i} className="text-xs px-3 py-1 border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-900 dark:hover:border-neutral-100 transition">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      <button
                        onClick={() => toggleExperience(idx)}
                        className="mt-4 text-sm font-mono text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition underline"
                      >
                        {isExpanded ? 'Show Less' : 'Read More'}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </PageWrapper>
        )}

        {/* Projects Page */}
        {currentPage === 'projects' && (
          <PageWrapper page="projects">
            <div className="max-w-5xl mx-auto px-8 py-16">
              <h2 className="text-4xl font-bold mb-12 animate-slideInDown">Projects</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((project, idx) => {
                  const isExpanded = expandedProjects.includes(idx)
                  return (
                    <div
                      key={idx}
                      className="border-2 border-neutral-200 dark:border-neutral-800 p-6 hover:border-neutral-900 dark:hover:border-neutral-100 transition-all duration-300 animate-fadeIn"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <h3 className="text-xl font-semibold mb-3 text-neutral-900 dark:text-neutral-100">{project.name}</h3>
                      <p className="text-neutral-700 dark:text-neutral-300 mb-4 text-sm leading-relaxed">
                        {project.description && project.description.length > 100 && !isExpanded
                          ? project.description.substring(0, 100) + '...'
                          : project.description}
                      </p>

                      {isExpanded && (
                        <div className="space-y-4 animate-slideInDown">
                          {project.highlights && project.highlights.length > 0 && (
                            <div className="space-y-1">
                              {project.highlights.map((highlight, i) => (
                                <div key={i} className="flex items-start gap-2 text-sm">
                                  <span className="text-neutral-400">→</span>
                                  <span className="text-neutral-700 dark:text-neutral-300">{highlight}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, i) => (
                              <span key={i} className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300">
                                {tech}
                              </span>
                            ))}
                          </div>
                          {project.links && (
                            <div className="flex gap-2">
                              {Object.entries(project.links).map(([key, url]) =>
                                url ? (
                                  <a
                                    key={key}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 border border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-neutral-100 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all hover:scale-110"
                                    title={key}
                                  >
                                    <SocialIcon type={key} />
                                  </a>
                                ) : null
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      <button
                        onClick={() => toggleProject(idx)}
                        className="mt-4 text-sm font-mono text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition underline"
                      >
                        {isExpanded ? 'Show Less' : 'Read More'}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </PageWrapper>
        )}

        {/* Education Page */}
        {currentPage === 'education' && (
          <PageWrapper page="education">
            <div className="max-w-5xl mx-auto px-8 py-16">
              <h2 className="text-4xl font-bold mb-12 animate-slideInDown">Education</h2>
              <div className="space-y-8">
                {education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="border-b-2 border-neutral-200 dark:border-neutral-800 pb-8 hover:border-neutral-900 dark:hover:border-neutral-100 transition animate-slideInUp"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">{edu.institution}</h3>
                        <p className="text-lg text-neutral-700 dark:text-neutral-300 mt-1">{edu.degree} • {edu.field}</p>
                        {edu.gpa && <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">GPA: {edu.gpa}</p>}
                      </div>
                      <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                        {edu.startDate} — {edu.endDate || 'Present'}
                      </span>
                    </div>
                    {edu.achievements && edu.achievements.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {edu.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className="text-neutral-400">—</span>
                            <span className="text-neutral-700 dark:text-neutral-300">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </PageWrapper>
        )}

        {/* Skills Page */}
        {currentPage === 'skills' && (
          <PageWrapper page="skills">
            <div className="max-w-5xl mx-auto px-8 py-16">
              <h2 className="text-4xl font-bold mb-12 animate-slideInDown">Skills</h2>
              <div className="grid md:grid-cols-2 gap-10">
                {skills.map((skillGroup, idx) => (
                  <div
                    key={idx}
                    className="animate-fadeIn"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <h3 className="font-bold mb-4 text-neutral-900 dark:text-neutral-100 text-lg uppercase tracking-wide border-b-2 border-neutral-900 dark:border-neutral-100 pb-2">{skillGroup.category}</h3>
                    <div className="flex flex-wrap gap-3">
                      {skillGroup.items.map((skill, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 border-2 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-900 dark:hover:border-neutral-100 hover:bg-neutral-900 dark:hover:bg-neutral-100 hover:text-white dark:hover:text-neutral-950 transition-all duration-300 cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </PageWrapper>
        )}
      </div>

      {/* Add CSS animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out forwards;
        }

        .animate-slideInDown {
          animation: slideInDown 0.6s ease-out forwards;
        }

        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out forwards;
        }
      `}</style>
      </div>
    </div>
  )
}
