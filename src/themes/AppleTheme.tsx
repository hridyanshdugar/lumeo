import { motion, animate, MotionValue, useMotionValue, useMotionValueEvent } from 'framer-motion'
import { PortfolioManifest, Project } from '../types/manifest'
import { useState, useEffect, useRef } from 'react'

interface ThemeProps {
  manifest: PortfolioManifest
}

interface ProjectsScrollerProps {
  projects: Project[]
  isDark: boolean
}

const left = `0%`
const right = `100%`
const leftInset = `20%`
const rightInset = `80%`
const transparent = `#0000`
const opaque = `#000`

function useScrollOverflowMask(scrollXProgress: MotionValue<number>) {
  const maskImage = useMotionValue(
    `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
  )

  useMotionValueEvent(scrollXProgress, "change", (value) => {
    if (value === 0) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
      )
    } else if (value === 1) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`
      )
    } else if (
      scrollXProgress.getPrevious() === 0 ||
      scrollXProgress.getPrevious() === 1
    ) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`
      )
    }
  })

  return maskImage
}

interface ProjectsSectionWrapperProps {
  projects: Project[]
  isDark: boolean
}

function ProjectsSectionWrapper({ projects, isDark }: ProjectsSectionWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (isMobile) {
    // Mobile: regular section without sticky or spacer
    return (
      <section id="projects" className="py-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 px-6"
        >
          Featured Projects
        </motion.h2>

        <ProjectsScroller projects={projects} isDark={isDark} wrapperRef={wrapperRef} />
      </section>
    )
  }

  return (
    <div ref={wrapperRef} className="relative">
      <section id="projects" className="h-screen flex items-center justify-center sticky top-0">
        <div className="w-full">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Featured Projects
          </motion.h2>

          <ProjectsScroller projects={projects} isDark={isDark} wrapperRef={wrapperRef} />
        </div>
      </section>

      {/* Spacer for scroll progression */}
      <div className="h-[300vh] pointer-events-none" aria-hidden="true" />
    </div>
  )
}

interface ProjectsScrollerWithRefProps extends ProjectsScrollerProps {
  wrapperRef: React.RefObject<HTMLDivElement>
}

function ProjectsScroller({ projects, isDark, wrapperRef }: ProjectsScrollerWithRefProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollProgress = useMotionValue(0)
  const maskImage = useScrollOverflowMask(scrollProgress)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const scrollContainer = scrollRef.current
    const wrapper = wrapperRef.current
    if (!scrollContainer || !wrapper || isMobile) return

    const handleScroll = () => {
      const wrapperRect = wrapper.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      // Calculate scroll progress (0 when wrapper top hits viewport top, 1 when wrapper bottom leaves viewport top)
      const totalScrollDistance = wrapperRect.height - viewportHeight
      const currentScroll = -wrapperRect.top

      // Add break zones: 0-10% is intro, 10%-85% is active scrolling, 85%-100% is outro
      let progress = Math.max(0, Math.min(1, currentScroll / totalScrollDistance))

      if (progress < 0.1) {
        // Intro zone: stay at 0
        progress = 0
      } else if (progress > 0.85) {
        // Outro zone: stay at 1
        progress = 1
      } else {
        // Active zone: remap 0.1-0.85 to 0-1
        progress = (progress - 0.1) / 0.75
      }

      // Update scroll progress for mask
      scrollProgress.set(progress)

      // Map progress to horizontal scroll
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth
      scrollContainer.scrollLeft = progress * maxScroll
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation
    return () => window.removeEventListener('scroll', handleScroll)
  }, [wrapperRef, scrollProgress, isMobile])

  if (isMobile) {
    // Mobile: regular horizontal scroll without scroll-jacking
    return (
      <div className="relative px-6">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6"
        >
          {projects.map((project, idx) => (
            <div
              key={idx}
              className={`flex-shrink-0 w-[85vw] snap-center rounded-2xl p-6 ${
                isDark
                  ? 'bg-zinc-900 border-zinc-800'
                  : 'bg-white border-neutral-200 shadow-xl'
              } border`}
            >
              <h3 className="text-xl font-bold mb-3">{project.name}</h3>
              <p className={`mb-3 text-sm leading-relaxed break-words ${
                isDark ? 'text-zinc-400' : 'text-neutral-600'
              }`} style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                {project.description}
              </p>

              {project.highlights && project.highlights.length > 0 && (
                <ul className="space-y-1 mb-3">
                  {project.highlights.slice(0, 2).map((highlight, i) => (
                    <li key={i} className={`text-xs flex items-start gap-2 ${
                      isDark ? 'text-zinc-500' : 'text-neutral-500'
                    }`}>
                      <span className="text-xs mt-1">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap gap-2 mb-3">
                {project.technologies.slice(0, 4).map((tech, i) => (
                  <span
                    key={i}
                    className={`text-xs px-2 py-1 rounded-full ${
                      isDark
                        ? 'bg-zinc-800 text-zinc-300'
                        : 'bg-neutral-100 text-neutral-700'
                    }`}
                  >
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
                        className={`text-xs font-medium hover:underline ${
                          isDark ? 'text-zinc-300' : 'text-neutral-700'
                        }`}
                      >
                        {key} →
                      </a>
                    ) : null
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex gap-8 px-6 max-w-7xl mx-auto">
      {/* Progress Circle - Left Side */}
      <div className="flex-shrink-0">
        <svg
          className="rotate-180"
          width="80"
          height="80"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="30"
            pathLength={1}
            className={`${isDark ? 'stroke-zinc-800' : 'stroke-neutral-300'}`}
            strokeWidth="10"
            fill="none"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="30"
            pathLength={1}
            className={`${isDark ? 'stroke-white' : 'stroke-black'}`}
            strokeWidth="10"
            fill="none"
            style={{ pathLength: scrollProgress }}
            strokeDasharray="0 1"
          />
        </svg>
      </div>

      {/* Scrollable Projects Container */}
      <motion.div
        ref={scrollRef}
        style={{ maskImage }}
        className="flex gap-6 overflow-x-scroll pb-8 flex-1 pointer-events-none scrollbar-hide"
      >
        {projects.map((project, idx) => (
          <div
            key={idx}
            className={`flex-shrink-0 w-[85vw] md:w-[600px] snap-center rounded-2xl p-8 pointer-events-auto ${
              isDark
                ? 'bg-zinc-900 border-zinc-800'
                : 'bg-white border-neutral-200 shadow-xl'
            } border`}
          >
            <h3 className="text-2xl font-bold mb-4">{project.name}</h3>
            <p className={`mb-4 text-sm leading-relaxed break-words ${
              isDark ? 'text-zinc-400' : 'text-neutral-600'
            }`} style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
              {project.description}
            </p>

            {project.highlights && project.highlights.length > 0 && (
              <ul className="space-y-1 mb-4">
                {project.highlights.slice(0, 2).map((highlight, i) => (
                  <li key={i} className={`text-sm flex items-start gap-2 ${
                    isDark ? 'text-zinc-500' : 'text-neutral-500'
                  }`}>
                    <span className="text-xs mt-1">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 4).map((tech, i) => (
                <span
                  key={i}
                  className={`text-xs px-3 py-1 rounded-full ${
                    isDark
                      ? 'bg-zinc-800 text-zinc-300'
                      : 'bg-neutral-100 text-neutral-700'
                  }`}
                >
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
                      className={`text-sm font-medium hover:underline ${
                        isDark ? 'text-zinc-300' : 'text-neutral-700'
                      }`}
                    >
                      {key} →
                    </a>
                  ) : null
                )}
              </div>
            )}
          </div>
        ))}
      </motion.div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default function AppleTheme({ manifest }: ThemeProps) {
  const { personalInfo, experience, projects, education, skills } = manifest
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Load SF Pro font
    const link = document.createElement('link')
    link.href = 'https://fonts.cdnfonts.com/css/sf-pro-display'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(prefersDark)
    
    return () => { document.head.removeChild(link) }
  }, [])

  const toggleTheme = () => setIsDark(!isDark)

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div 
      className={`relative min-h-screen transition-colors duration-500 ${
        isDark ? 'bg-black text-white' : 'bg-[#fbfbfd] text-[#1d1d1f]'
      }`}
      style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      {/* Floating Navbar */}
      <div className="sticky top-4 left-0 right-0 z-50 flex justify-center px-4 py-4">
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`px-4 md:px-6 py-3 rounded-full backdrop-blur-md transition-all duration-300 ${
            isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white/80 border-neutral-200'
          } border shadow-lg`}
        >
          <div className="flex items-center justify-center gap-3 md:gap-6 text-sm md:text-base">
            <a href="#home" className="font-semibold hover:opacity-70 transition-opacity whitespace-nowrap">Home</a>
            <a href="#projects" className="hover:opacity-70 transition-opacity whitespace-nowrap">Projects</a>
            <a href="#about" className="hover:opacity-70 transition-opacity whitespace-nowrap">About</a>
            <a href="#contact" className="hover:opacity-70 transition-opacity whitespace-nowrap">Contact</a>
            <button
              onClick={toggleTheme}
              className={`ml-1 md:ml-2 p-2 rounded-full transition-colors ${
                isDark ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-neutral-200 hover:bg-neutral-300'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-6 md:-mt-8 pb-8">
        <div className="max-w-7xl mx-auto w-full">
          {/* Two Column Layout: Info Left, Work/Experience Right */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Personal Info */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-6"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-7xl font-bold tracking-tight"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                {personalInfo.name}
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className={`text-xl md:text-2xl font-medium ${isDark ? 'text-zinc-300' : 'text-neutral-700'}`}
              >
                {personalInfo.title}
              </motion.p>

              <motion.p
                variants={fadeInUp}
                className={`text-base md:text-lg leading-relaxed ${
                  isDark ? 'text-zinc-400' : 'text-neutral-600'
                }`}
              >
                {personalInfo.bio}
              </motion.p>

              {/* Contact Info */}
              <motion.div
                variants={fadeInUp}
                className="space-y-3"
              >
                <div>
                  <div className={`text-xs font-medium mb-1 ${
                    isDark ? 'text-zinc-500' : 'text-neutral-500'
                  }`}>
                    Email
                  </div>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className={`hover:underline ${
                      isDark ? 'text-zinc-300' : 'text-neutral-700'
                    }`}
                  >
                    {personalInfo.email}
                  </a>
                </div>

                {personalInfo.phone && (
                  <div>
                    <div className={`text-xs font-medium mb-1 ${
                      isDark ? 'text-zinc-500' : 'text-neutral-500'
                    }`}>
                      Phone
                    </div>
                    <div className={isDark ? 'text-zinc-300' : 'text-neutral-700'}>
                      {personalInfo.phone}
                    </div>
                  </div>
                )}

                {personalInfo.links && Object.keys(personalInfo.links).length > 0 && (
                  <div>
                    <div className={`text-xs font-medium mb-2 ${
                      isDark ? 'text-zinc-500' : 'text-neutral-500'
                    }`}>
                      Connect
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(personalInfo.links).map(([key, url]) =>
                        url ? (
                          <a
                            key={key}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm px-4 py-2 rounded-full border transition-all hover:scale-105 ${
                              isDark
                                ? 'border-zinc-700 hover:bg-zinc-800 text-zinc-300'
                                : 'border-neutral-300 hover:bg-neutral-100 text-neutral-700'
                            }`}
                          >
                            {key}
                          </a>
                        ) : null
                      )}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                variants={fadeInUp}
                className="flex gap-8"
              >
                <div>
                  <div className="text-3xl font-bold mb-1">{projects.length}+</div>
                  <div className={`text-sm ${isDark ? 'text-zinc-500' : 'text-neutral-500'}`}>
                    Projects
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">{experience.length}+</div>
                  <div className={`text-sm ${isDark ? 'text-zinc-500' : 'text-neutral-500'}`}>
                    Years Exp
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">
                    {skills.reduce((total, group) => total + group.items.length, 0)}+
                  </div>
                  <div className={`text-sm ${isDark ? 'text-zinc-500' : 'text-neutral-500'}`}>
                    Skills
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="flex gap-3 flex-wrap"
              >
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-3 rounded-full font-medium transition-all ${
                    isDark
                      ? 'bg-white text-black hover:bg-neutral-200'
                      : 'bg-black text-white hover:bg-neutral-800'
                  }`}
                >
                  View Projects
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right Side - Featured Work + Recent Experience */}
            <div className="space-y-8">
              {/* Featured Projects Preview */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Featured Work</h3>
                <a
                  href="#projects"
                  className={`text-xs hover:underline ${isDark ? 'text-zinc-400' : 'text-neutral-600'}`}
                >
                  View all →
                </a>
              </div>

              <div className="space-y-3">
                {projects.slice(0, 2).map((project, idx) => (
                  <motion.a
                    key={idx}
                    href="#projects"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className={`block p-4 rounded-xl border cursor-pointer hover:-translate-y-1 ${
                      isDark
                        ? 'bg-zinc-900/30 border-zinc-800 hover:bg-zinc-900/60'
                        : 'bg-white border-neutral-200 hover:shadow-lg'
                    }`}
                    style={{ transition: 'transform 0.15s ease-out, background-color 0.15s, box-shadow 0.15s' }}
                  >
                    <h4 className="text-base font-semibold mb-1">{project.name}</h4>
                    <p className={`text-xs mb-2 line-clamp-1 break-words ${
                      isDark ? 'text-zinc-400' : 'text-neutral-600'
                    }`} style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            isDark
                              ? 'bg-zinc-800 text-zinc-400'
                              : 'bg-neutral-100 text-neutral-600'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

              {/* Recent Experience Preview */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Recent Experience</h3>
                <a
                  href="#about"
                  className={`text-xs hover:underline ${isDark ? 'text-zinc-400' : 'text-neutral-600'}`}
                >
                  View all →
                </a>
              </div>

              <div className="space-y-3">
                {experience.slice(0, 2).map((exp, idx) => (
                  <motion.a
                    key={idx}
                    href="#about"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className={`block p-4 rounded-xl border cursor-pointer hover:-translate-y-1 ${
                      isDark
                        ? 'bg-zinc-900/30 border-zinc-800 hover:bg-zinc-900/60'
                        : 'bg-white border-neutral-200 hover:shadow-lg'
                    }`}
                    style={{ transition: 'transform 0.15s ease-out, background-color 0.15s, box-shadow 0.15s' }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-base font-semibold">{exp.position}</h4>
                        <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-neutral-600'}`}>
                          {exp.company}
                        </p>
                      </div>
                      <span className={`text-xs ${isDark ? 'text-zinc-500' : 'text-neutral-500'}`}>
                        {exp.startDate}
                      </span>
                    </div>
                    <p className={`text-xs line-clamp-1 break-words ${
                      isDark ? 'text-zinc-500' : 'text-neutral-600'
                    }`} style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                      {exp.description}
                    </p>
                  </motion.a>
                ))}
              </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Divider */}
      <motion.div
        className={`h-px mx-auto max-w-4xl bg-gradient-to-r ${
          isDark ? 'from-transparent via-zinc-700 to-transparent' : 'from-transparent via-neutral-300 to-transparent'
        }`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />

      {/* Projects Section Wrapper */}
      <ProjectsSectionWrapper projects={projects} isDark={isDark} />

      {/* Animated Divider */}
      <motion.div
        className={`h-px mx-auto max-w-4xl bg-gradient-to-r ${
          isDark ? 'from-transparent via-zinc-700 to-transparent' : 'from-transparent via-neutral-300 to-transparent'
        }`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">About Me</h2>
            <p className={`text-lg leading-relaxed ${
              isDark ? 'text-zinc-400' : 'text-neutral-600'
            }`}>
              {personalInfo.bio}
            </p>
          </motion.div>

          {/* Experience - Timeline */}
          {experience.length > 0 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="mb-16"
            >
              <h3 className="text-2xl font-semibold mb-8">Experience</h3>
              <div className="relative">
                {/* Timeline Line */}
                <div className={`absolute left-0 top-0 bottom-0 w-0.5 ${
                  isDark ? 'bg-zinc-800' : 'bg-neutral-200'
                }`} />

                {experience.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeInUp}
                    className="relative pl-8 pb-12 last:pb-0"
                  >
                    {/* Timeline Dot */}
                    <div className={`absolute left-0 top-1 w-2 h-2 rounded-full -translate-x-[3px] ${
                      isDark ? 'bg-zinc-400' : 'bg-neutral-400'
                    }`} />

                    {/* Content */}
                    <div className={`p-6 rounded-2xl border ${
                      isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-neutral-200'
                    }`}>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-lg font-semibold">{exp.position}</h4>
                          <p className={isDark ? 'text-zinc-400' : 'text-neutral-600'}>
                            {exp.company}
                          </p>
                        </div>
                        <span className={`text-sm whitespace-nowrap ml-4 ${isDark ? 'text-zinc-500' : 'text-neutral-500'}`}>
                          {exp.startDate} - {exp.endDate || 'Present'}
                        </span>
                      </div>
                      <p className={`text-sm mb-4 break-words ${isDark ? 'text-zinc-500' : 'text-neutral-600'}`} style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                        {exp.description}
                      </p>
                      {exp.technologies && (
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className={`text-xs px-3 py-1 rounded-full ${
                                isDark ? 'bg-zinc-800 text-zinc-400' : 'bg-neutral-100 text-neutral-600'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Education - Timeline */}
          {education.length > 0 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="mb-16"
            >
              <h3 className="text-2xl font-semibold mb-8">Education</h3>
              <div className="relative">
                {/* Timeline Line */}
                <div className={`absolute left-0 top-0 bottom-0 w-0.5 ${
                  isDark ? 'bg-zinc-800' : 'bg-neutral-200'
                }`} />

                {education.map((edu, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeInUp}
                    className="relative pl-8 pb-12 last:pb-0"
                  >
                    {/* Timeline Dot */}
                    <div className={`absolute left-0 top-1 w-2 h-2 rounded-full -translate-x-[3px] ${
                      isDark ? 'bg-zinc-400' : 'bg-neutral-400'
                    }`} />

                    {/* Content */}
                    <div className={`p-6 rounded-2xl border ${
                      isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-neutral-200'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-semibold">{edu.institution}</h4>
                          <p className={isDark ? 'text-zinc-400' : 'text-neutral-600'}>
                            {edu.degree} in {edu.field}
                          </p>
                          {edu.gpa && (
                            <p className={`text-sm ${isDark ? 'text-zinc-500' : 'text-neutral-500'}`}>
                              GPA: {edu.gpa}
                            </p>
                          )}
                        </div>
                        <span className={`text-sm whitespace-nowrap ml-4 ${isDark ? 'text-zinc-500' : 'text-neutral-500'}`}>
                          {edu.startDate} - {edu.endDate || 'Present'}
                        </span>
                      </div>
                      {edu.achievements && edu.achievements.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {edu.achievements.map((achievement, i) => (
                            <div key={i} className={`text-sm flex items-start gap-2 ${
                              isDark ? 'text-zinc-500' : 'text-neutral-600'
                            }`}>
                              <span className={`${isDark ? 'text-zinc-400' : 'text-neutral-400'}`}>•</span>
                              <span>{achievement}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <h3 className="text-2xl font-semibold mb-6">Skills</h3>
              <div className="space-y-6">
                {skills.map((skillGroup, idx) => (
                  <motion.div key={idx} variants={fadeInUp}>
                    <h4 className={`text-sm font-medium mb-3 ${
                      isDark ? 'text-zinc-400' : 'text-neutral-600'
                    }`}>
                      {skillGroup.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, i) => (
                        <span
                          key={i}
                          className={`px-4 py-2 rounded-full text-sm ${
                            isDark
                              ? 'bg-zinc-900 border-zinc-800 text-zinc-300'
                              : 'bg-white border-neutral-200 text-neutral-700'
                          } border`}
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
        </div>
      </section>

      {/* Animated Divider */}
      <motion.div
        className={`h-px mx-auto max-w-4xl bg-gradient-to-r ${
          isDark ? 'from-transparent via-zinc-700 to-transparent' : 'from-transparent via-neutral-300 to-transparent'
        }`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h2>
            <p className={`text-lg ${isDark ? 'text-zinc-400' : 'text-neutral-600'}`}>
              Have a project in mind? Let's work together.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`p-8 rounded-2xl border ${
              isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-neutral-200'
            }`}
          >
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-zinc-400' : 'text-neutral-600'
                }`}>
                  Email
                </label>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className={`text-lg font-medium hover:underline ${
                    isDark ? 'text-zinc-200' : 'text-neutral-900'
                  }`}
                >
                  {personalInfo.email}
                </a>
              </div>

              {personalInfo.phone && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-zinc-400' : 'text-neutral-600'
                  }`}>
                    Phone
                  </label>
                  <p className="text-lg">{personalInfo.phone}</p>
                </div>
              )}

              {personalInfo.links && Object.keys(personalInfo.links).length > 0 && (
                <div>
                  <label className={`block text-sm font-medium mb-3 ${
                    isDark ? 'text-zinc-400' : 'text-neutral-600'
                  }`}>
                    Connect
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(personalInfo.links).map(([key, url]) =>
                      url ? (
                        <motion.a
                          key={key}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-6 py-2 rounded-full border font-medium transition-all ${
                            isDark
                              ? 'border-zinc-700 hover:bg-zinc-800 text-zinc-300'
                              : 'border-neutral-300 hover:bg-neutral-100 text-neutral-700'
                          }`}
                        >
                          {key}
                        </motion.a>
                      ) : null
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-6 border-t ${
        isDark ? 'border-zinc-800' : 'border-neutral-200'
      }`}>
        <div className="max-w-6xl mx-auto text-center">
          <p className={`text-sm ${isDark ? 'text-zinc-500' : 'text-neutral-500'}`}>
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
