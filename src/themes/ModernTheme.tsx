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
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-6xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition rounded-lg"
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
                className={`px-4 py-2 text-sm transition rounded-lg ${
                  currentPage === page.id
                    ? 'bg-blue-600 text-white font-medium'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
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

export default function ModernTheme({ manifest }: ThemeProps) {
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
      <div className="h-screen bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 w-full max-w-full flex flex-col overflow-hidden">
        <Navigation currentPage={currentPage} onPageChange={handlePageChange} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <div className="flex-1 overflow-y-auto relative">
          {/* Arrow Navigation */}
          {currentIndex > 0 && (
            <button
              onClick={goToPreviousPage}
              className="fixed left-4 top-1/2 -translate-y-1/2 p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-blue-600 dark:hover:border-blue-500 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 transition-all z-10 rounded-full shadow-lg"
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
              className="fixed right-4 top-1/2 -translate-y-1/2 p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-blue-600 dark:hover:border-blue-500 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 transition-all z-10 rounded-full shadow-lg"
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
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 text-white rounded-3xl p-12 shadow-xl">
                <div className="flex items-center gap-8">
                  {personalInfo.avatar && (
                    <img
                      src={personalInfo.avatar}
                      alt={personalInfo.name}
                      className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                    />
                  )}
                  <div className="flex-1">
                    <h1 className="text-5xl font-bold mb-3">{personalInfo.name}</h1>
                    <p className="text-2xl text-blue-100 mb-4">{personalInfo.title}</p>
                    <p className="text-blue-50 text-lg max-w-3xl mb-6">{personalInfo.bio}</p>

                    <div className="flex gap-4 mb-6">
                      {['experience', 'projects', 'education', 'skills'].map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page as PageType)}
                          className="px-6 py-3 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 font-medium capitalize shadow-md"
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4 text-blue-100">
                      <a href={`mailto:${personalInfo.email}`} className="hover:text-white transition">
                        {personalInfo.email}
                      </a>
                      {personalInfo.phone && <span>{personalInfo.phone}</span>}
                      {personalInfo.location && <span>{personalInfo.location}</span>}
                    </div>

                    {personalInfo.links && (
                      <div className="flex gap-4 mt-6">
                        {Object.entries(personalInfo.links).map(([key, url]) =>
                          url ? (
                            <a
                              key={key}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition capitalize backdrop-blur-sm"
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
              <h2 className="text-4xl font-bold mb-12">Experience</h2>
              <div className="space-y-6">
                {experience.map((exp, idx) => {
                  const isExpanded = expandedExperience.includes(idx)
                  return (
                    <div
                      key={idx}
                      className="bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-lg transition p-6 border border-slate-200 dark:border-slate-700"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{exp.position}</h3>
                          <p className="text-lg text-slate-600 dark:text-slate-400">{exp.company}</p>
                        </div>
                        <span className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium whitespace-nowrap">
                          {exp.startDate} - {exp.endDate || 'Present'}
                        </span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 mb-4 break-words" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                        {exp.description && exp.description.length > 120 && !isExpanded
                          ? exp.description.substring(0, 120) + '...'
                          : exp.description}
                      </p>

                      {isExpanded && (
                        <div className="space-y-4">
                          {exp.achievements && exp.achievements.length > 0 && (
                            <ul className="space-y-2">
                              {exp.achievements.map((achievement, i) => (
                                <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                                  <span className="text-blue-600 dark:text-blue-400 mt-1">▸</span>
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
                                  className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium"
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
                        className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition font-medium"
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
              <h2 className="text-4xl font-bold mb-12">Projects</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((project, idx) => {
                  const isExpanded = expandedProjects.includes(idx)
                  return (
                    <div
                      key={idx}
                      className="bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-lg transition p-6 border border-slate-200 dark:border-slate-700"
                    >
                      {project.image && isExpanded && (
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                      )}
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">{project.name}</h3>
                      <p className="text-slate-700 dark:text-slate-300 mb-4 break-words" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                        {project.description && project.description.length > 100 && !isExpanded
                          ? project.description.substring(0, 100) + '...'
                          : project.description}
                      </p>

                      {isExpanded && (
                        <div className="space-y-4">
                          {project.highlights && project.highlights.length > 0 && (
                            <ul className="space-y-1">
                              {project.highlights.map((highlight, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, i) => (
                              <span key={i} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs">
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
                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm capitalize"
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
                        className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition font-medium"
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
              <h2 className="text-4xl font-bold mb-12">Education</h2>
              <div className="space-y-6">
                {education.map((edu, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 border border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{edu.institution}</h3>
                        <p className="text-lg text-slate-700 dark:text-slate-300">
                          {edu.degree} • {edu.field}
                        </p>
                        {edu.gpa && <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">GPA: {edu.gpa}</p>}
                      </div>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {edu.startDate} - {edu.endDate || 'Present'}
                      </span>
                    </div>
                    {edu.achievements && edu.achievements.length > 0 && (
                      <ul className="space-y-1 mt-3">
                        {edu.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
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
              <h2 className="text-4xl font-bold mb-12">Skills</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {skills.map((skillGroup, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 border border-slate-200 dark:border-slate-700">
                    <h3 className="font-bold text-lg mb-3 text-slate-900 dark:text-slate-100">{skillGroup.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition cursor-default"
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
