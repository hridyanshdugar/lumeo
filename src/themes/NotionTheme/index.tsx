import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PortfolioManifest } from '../../types/manifest'
import { PageHeader } from './PageHeader.tsx'
import { ToggleBlock } from './ToggleBlock.tsx'
import { DatabaseView } from './DatabaseView.tsx'
import { Callout } from './Callout.tsx'

interface NotionThemeProps {
  manifest: PortfolioManifest
}

export const NotionTheme = ({ manifest }: NotionThemeProps) => {
  const [darkMode, setDarkMode] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showCommandMenu, setShowCommandMenu] = useState(false)
  const [activePage, setActivePage] = useState('About')

  const pages = [
    { name: 'About', id: 'about-section' },
    { name: 'Projects', id: 'projects-section' },
    { name: 'Experience', id: 'experience-section' },
    { name: 'Skills', id: 'skills-section' },
    { name: 'Education', id: 'education-section' },
  ]

  const scrollToSection = (page: { name: string; id: string }) => {
    setActivePage(page.name)
    const element = document.getElementById(page.id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    return () => { document.head.removeChild(link) }
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '/') {
        e.preventDefault()
        setShowCommandMenu(true)
        setTimeout(() => setShowCommandMenu(false), 2000)
      }
    }
    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [])

  const bgColor = darkMode ? 'bg-neutral-900' : 'bg-white'
  const textColor = darkMode ? 'text-neutral-100' : 'text-neutral-900'
  const secondaryText = darkMode ? 'text-neutral-400' : 'text-neutral-500'
  const borderColor = darkMode ? 'border-neutral-700' : 'border-neutral-200'

  return (
    <div 
      className={`min-h-screen ${bgColor} ${textColor} transition-colors`}
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <div className="flex">
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 240, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className={`h-screen sticky top-0 ${darkMode ? 'bg-neutral-800' : 'bg-neutral-100'} border-r ${borderColor} flex-shrink-0 overflow-hidden`}
            >
              <div className="p-3">
                <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 cursor-pointer">
                  <div className="w-5 h-5 rounded bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-xs font-semibold">
                    {manifest.personalInfo.name[0]}
                  </div>
                  <span className="font-medium text-sm truncate">{manifest.personalInfo.name}'s Portfolio</span>
                </div>
              </div>
              
              <div className="px-2 py-1">
                <p className={`text-xs px-3 py-1 ${secondaryText}`}>Pages</p>
                {pages.map((page, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToSection(page)}
                    className={`w-full flex items-center gap-2 px-3 py-1.5 rounded text-sm cursor-pointer transition-colors ${
                      activePage === page.name
                        ? darkMode ? 'bg-neutral-700' : 'bg-neutral-200'
                        : darkMode ? 'hover:bg-neutral-700/50' : 'hover:bg-neutral-200/50'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    <span>{page.name}</span>
                  </button>
                ))}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-3 border-t ${borderColor}">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-full flex items-center gap-2 px-3 py-1.5 rounded text-sm ${
                    darkMode ? 'hover:bg-neutral-700/50' : 'hover:bg-neutral-200/50'
                  }`}
                >
                  {darkMode ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg> : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>}
                  <span>{darkMode ? 'Light mode' : 'Dark mode'}</span>
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        <main className="flex-1 min-h-screen">
          <div className={`sticky top-0 z-10 ${bgColor} border-b ${borderColor} px-4 py-2 flex items-center justify-between`}>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`p-1.5 rounded ${darkMode ? 'hover:bg-neutral-700' : 'hover:bg-neutral-100'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className={`flex items-center gap-1 text-sm ${secondaryText}`}>
                <span>{manifest.personalInfo.name}'s Portfolio</span>
                <span>/</span>
                <span className={textColor}>{activePage}</span>
              </div>
            </div>
            <div className={`text-xs ${secondaryText}`}>Press "/" for commands</div>
          </div>

          <div className="max-w-4xl mx-auto px-6 py-8">
            <div id="about-section">
            <PageHeader
              name={manifest.personalInfo.name}
              title={manifest.personalInfo.title}
              avatar={manifest.personalInfo.avatar}
              darkMode={darkMode}
            />

            <Callout icon={<svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>} darkMode={darkMode}>
              {manifest.personalInfo.bio}
            </Callout>

            <div className="mt-8">
              <ToggleBlock title="Contact Information" icon={<svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>} defaultOpen darkMode={darkMode}>
                <div className={`text-sm space-y-2 ${secondaryText}`}>
                  <p className="flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> {manifest.personalInfo.email}</p>
                  {manifest.personalInfo.phone && <p className="flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg> {manifest.personalInfo.phone}</p>}
                  {manifest.personalInfo.location && <p className="flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> {manifest.personalInfo.location}</p>}
                  {manifest.personalInfo.links && (
                    <div className="flex gap-3 mt-2">
                      {manifest.personalInfo.links.github && (
                        <a href={manifest.personalInfo.links.github} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
                      )}
                      {manifest.personalInfo.links.linkedin && (
                        <a href={manifest.personalInfo.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                      )}
                      {manifest.personalInfo.links.twitter && (
                        <a href={manifest.personalInfo.links.twitter} target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter</a>
                      )}
                    </div>
                  )}
                </div>
              </ToggleBlock>
            </div>

            </div>

            <div id="projects-section" className="mt-8 scroll-mt-16">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                Projects
              </h2>
              <DatabaseView projects={manifest.projects} darkMode={darkMode} />
            </div>

            <div id="experience-section" className="mt-8 scroll-mt-16">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                Experience
              </h2>
              {manifest.experience.map((exp, idx) => (
                <ToggleBlock
                  key={idx}
                  title={`${exp.position} at ${exp.company}`}
                  icon={<svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                  darkMode={darkMode}
                >
                  <div className={`text-sm ${secondaryText}`}>
                    <p className="mb-2">{exp.startDate} - {exp.endDate || 'Present'}</p>
                    <p className="mb-2 break-words" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{exp.description}</p>
                    {exp.technologies && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {exp.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className={`px-2 py-0.5 rounded text-xs ${
                              darkMode ? 'bg-neutral-700' : 'bg-neutral-200'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </ToggleBlock>
              ))}
            </div>

            <div id="skills-section" className="mt-8 scroll-mt-16">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                Skills
              </h2>
              {manifest.skills.map((skillGroup, idx) => (
                <Callout key={idx} icon={<svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>} darkMode={darkMode}>
                  <p className="font-medium mb-2">{skillGroup.category}</p>
                  <div className="flex flex-wrap gap-1">
                    {skillGroup.items.map((skill, i) => (
                      <span
                        key={i}
                        className={`px-2 py-0.5 rounded text-xs ${
                          darkMode ? 'bg-neutral-600' : 'bg-white'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </Callout>
              ))}
            </div>

            <div id="education-section" className="mt-8 scroll-mt-16">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
                Education
              </h2>
              {manifest.education.map((edu, idx) => (
                <ToggleBlock
                  key={idx}
                  title={`${edu.degree} in ${edu.field}`}
                  icon={<svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
                  darkMode={darkMode}
                >
                  <div className={`text-sm ${secondaryText}`}>
                    <p className="font-medium">{edu.institution}</p>
                    <p>{edu.startDate} - {edu.endDate || 'Present'}</p>
                    {edu.gpa && <p>GPA: {edu.gpa}</p>}
                    {edu.achievements && edu.achievements.length > 0 && (
                      <ul className="list-disc list-inside mt-2">
                        {edu.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </ToggleBlock>
              ))}
            </div>

            <div className={`mt-12 pt-8 border-t ${borderColor} text-center ${secondaryText} text-sm`}>
              <p>+ Add a page</p>
            </div>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {showCommandMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className={`${darkMode ? 'bg-neutral-800' : 'bg-white'} rounded-lg shadow-2xl border ${borderColor} p-2 w-80`}>
              <input
                type="text"
                placeholder="Type a command..."
                className={`w-full px-3 py-2 rounded ${darkMode ? 'bg-neutral-700' : 'bg-neutral-100'} text-sm outline-none`}
                autoFocus
              />
              <div className="mt-2 space-y-1">
                {['Text', 'Heading 1', 'Heading 2', 'Bulleted list', 'Toggle list'].map((cmd, idx) => (
                  <div
                    key={idx}
                    className={`px-3 py-1.5 rounded text-sm cursor-pointer ${
                      darkMode ? 'hover:bg-neutral-700' : 'hover:bg-neutral-100'
                    }`}
                  >
                    {cmd}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
