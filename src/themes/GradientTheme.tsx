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
  const pages: { id: PageType; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' }
  ]

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-800 dark:via-pink-800 dark:to-blue-800">
      <div className="max-w-6xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 text-white/80 hover:text-white transition rounded-lg"
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
                className={`px-4 py-2 text-sm transition rounded-xl ${
                  currentPage === page.id
                    ? 'bg-white text-purple-600 font-semibold shadow-lg'
                    : 'text-white/80 hover:text-white hover:bg-white/20 backdrop-blur-sm'
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

export default function GradientTheme({ manifest }: ThemeProps) {
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
      <div className="h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950 dark:via-pink-950 dark:to-blue-950 w-full max-w-full flex flex-col overflow-hidden relative">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-300 dark:bg-pink-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-300 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <Navigation currentPage={currentPage} onPageChange={handlePageChange} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <div className="flex-1 overflow-y-auto relative z-10">
          {/* Arrow Navigation */}
          {currentIndex > 0 && (
            <button
              onClick={goToPreviousPage}
              className="fixed left-4 top-1/2 -translate-y-1/2 p-3 bg-white dark:bg-purple-900 border-2 border-purple-300 dark:border-purple-700 hover:border-purple-600 dark:hover:border-purple-400 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-all z-20 rounded-full shadow-xl"
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
              className="fixed right-4 top-1/2 -translate-y-1/2 p-3 bg-white dark:bg-purple-900 border-2 border-purple-300 dark:border-purple-700 hover:border-purple-600 dark:hover:border-purple-400 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-all z-20 rounded-full shadow-xl"
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
              <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 dark:from-purple-700 dark:via-pink-700 dark:to-blue-700 text-white rounded-3xl p-12 shadow-2xl backdrop-blur-sm">
                <div className="flex flex-col items-center text-center">
                  {personalInfo.avatar && (
                    <img
                      src={personalInfo.avatar}
                      alt={personalInfo.name}
                      className="w-40 h-40 rounded-full border-4 border-white shadow-2xl mb-8"
                    />
                  )}
                  <div className="flex-1">
                    <h1 className="text-6xl md:text-7xl font-bold mb-4">{personalInfo.name}</h1>
                    <p className="text-3xl font-semibold text-white/90 mb-6">{personalInfo.title}</p>
                    <p className="text-xl text-white/80 max-w-3xl mb-8 leading-relaxed">{personalInfo.bio}</p>

                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                      {['experience', 'projects', 'education', 'skills'].map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page as PageType)}
                          className="px-8 py-4 bg-white text-purple-600 rounded-full hover:bg-white/90 transition-all duration-300 font-semibold capitalize shadow-xl hover:scale-105"
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 text-white/90 mb-6">
                      <a href={`mailto:${personalInfo.email}`} className="hover:text-white transition">
                        {personalInfo.email}
                      </a>
                      {personalInfo.location && <span>{personalInfo.location}</span>}
                    </div>

                    {personalInfo.links && (
                      <div className="flex flex-wrap justify-center gap-4">
                        {Object.entries(personalInfo.links).map(([key, url]) =>
                          url ? (
                            <a
                              key={key}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-full transition capitalize backdrop-blur-sm border border-white/30 font-medium"
                            >
                              {key}
                            </a>
                          ) : null
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Experience Page */}
          {currentPage === 'experience' && (
            <div className="max-w-6xl mx-auto px-8 py-16">
              <h2 className="text-5xl font-bold mb-12 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp, idx) => {
                  const isExpanded = expandedExperience.includes(idx)
                  return (
                    <div
                      key={idx}
                      className="bg-white/80 dark:bg-purple-900/30 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all p-6 border-2 border-purple-200 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-500"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            {exp.position}
                          </h3>
                          <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">{exp.company}</p>
                        </div>
                        <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-800 dark:to-pink-800 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold whitespace-nowrap">
                          {exp.startDate} - {exp.endDate || 'Present'}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {exp.description && exp.description.length > 120 && !isExpanded
                          ? exp.description.substring(0, 120) + '...'
                          : exp.description}
                      </p>

                      {isExpanded && (
                        <div className="space-y-4">
                          {exp.achievements && exp.achievements.length > 0 && (
                            <ul className="space-y-2">
                              {exp.achievements.map((achievement, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                                  <span className="text-purple-600 dark:text-purple-400 font-bold text-lg mt-1">✦</span>
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
                                  className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-800 dark:to-pink-800 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium border border-purple-200 dark:border-purple-600"
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
                        className="mt-4 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition font-semibold underline"
                      >
                        {isExpanded ? 'Show Less' : 'Read More'}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Projects Page */}
          {currentPage === 'projects' && (
            <div className="max-w-6xl mx-auto px-8 py-16">
              <h2 className="text-5xl font-bold mb-12 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Projects
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((project, idx) => {
                  const isExpanded = expandedProjects.includes(idx)
                  return (
                    <div
                      key={idx}
                      className="bg-white/80 dark:bg-pink-900/30 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all p-6 border-2 border-pink-200 dark:border-pink-700 hover:border-pink-400 dark:hover:border-pink-500 hover:scale-105"
                    >
                      {project.image && isExpanded && (
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-48 object-cover rounded-xl mb-4"
                        />
                      )}
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent mb-3">
                        {project.name}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {project.description && project.description.length > 100 && !isExpanded
                          ? project.description.substring(0, 100) + '...'
                          : project.description}
                      </p>

                      {isExpanded && (
                        <div className="space-y-4">
                          {project.highlights && project.highlights.length > 0 && (
                            <ul className="space-y-1">
                              {project.highlights.map((highlight, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                  <span className="text-pink-600 dark:text-pink-400 font-bold">✓</span>
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, i) => (
                              <span key={i} className="px-3 py-1 bg-gradient-to-r from-pink-50 to-blue-50 dark:from-pink-800 dark:to-blue-800 text-pink-700 dark:text-pink-300 rounded-lg text-xs font-medium border border-pink-200 dark:border-pink-600">
                                {tech}
                              </span>
                            ))}
                          </div>
                          {project.links && (
                            <div className="flex gap-3">
                              {Object.entries(project.links).map(([key, url]) =>
                                url ? (
                                  <a
                                    key={key}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-pink-600 dark:text-pink-400 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-sm capitalize"
                                  >
                                    {key} →
                                  </a>
                                ) : null
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      <button
                        onClick={() => toggleProject(idx)}
                        className="mt-4 text-sm text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300 transition font-semibold underline"
                      >
                        {isExpanded ? 'Show Less' : 'Read More'}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Education Page */}
          {currentPage === 'education' && (
            <div className="max-w-6xl mx-auto px-8 py-16">
              <h2 className="text-5xl font-bold mb-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Education
              </h2>
              <div className="space-y-6">
                {education.map((edu, idx) => (
                  <div key={idx} className="bg-white/80 dark:bg-blue-900/30 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {edu.institution}
                        </h3>
                        <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                          {edu.degree} • {edu.field}
                        </p>
                        {edu.gpa && <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">GPA: {edu.gpa}</p>}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-800 px-3 py-1.5 rounded-full">
                        {edu.startDate} - {edu.endDate || 'Present'}
                      </span>
                    </div>
                    {edu.achievements && edu.achievements.length > 0 && (
                      <ul className="space-y-1 mt-3">
                        {edu.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <span className="text-blue-600 dark:text-blue-400">▸</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Page */}
          {currentPage === 'skills' && (
            <div className="max-w-6xl mx-auto px-8 py-16">
              <h2 className="text-5xl font-bold mb-12 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Skills
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {skills.map((skillGroup, idx) => (
                  <div key={idx} className="bg-white/80 dark:bg-purple-900/30 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-purple-200 dark:border-purple-700">
                    <h3 className="font-bold text-xl mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {skillGroup.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-800 dark:to-pink-800 text-purple-700 dark:text-purple-300 rounded-xl font-medium border border-purple-200 dark:border-purple-600 hover:scale-105 transition cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
