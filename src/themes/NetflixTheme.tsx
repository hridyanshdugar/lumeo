import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PortfolioManifest } from '../types/manifest'

interface ThemeProps {
  manifest: PortfolioManifest
}

type SectionType = 'hero' | 'experience' | 'projects' | 'education' | 'skills'

// Navigation Bar Component
const NavigationBar = ({
  activeSection,
  onNavigate,
  name
}: {
  activeSection: SectionType
  onNavigate: (section: SectionType) => void
  name: string
}) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const sections: { id: SectionType; label: string }[] = [
    { id: 'hero', label: 'Home' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' }
  ]

  return (
    <nav className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/95 shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <button
            onClick={() => onNavigate('hero')}
            className="text-[#E50914] text-3xl font-black tracking-tight hover:opacity-80 transition uppercase"
          >
            {name}
          </button>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            {sections.slice(1).map((section) => (
              <button
                key={section.id}
                onClick={() => onNavigate(section.id)}
                className={`text-sm font-medium transition-all duration-200 hover:text-gray-300 ${
                  activeSection === section.id ? 'text-white' : 'text-gray-400'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default function NetflixTheme({ manifest }: ThemeProps) {
  const [activeSection, setActiveSection] = useState<SectionType>('hero')
  const [hoveredExpIndex, setHoveredExpIndex] = useState<number | null>(null)
  const [hoveredProjIndex, setHoveredProjIndex] = useState<number | null>(null)
  const [showIntro, setShowIntro] = useState(true)
  const [hasShownIntro, setHasShownIntro] = useState(false)
  const experienceScrollRef = useRef<HTMLDivElement>(null)

  const { personalInfo, experience, projects, education, skills } = manifest

  // Show intro animation only once on first load
  useEffect(() => {
    const introShown = sessionStorage.getItem('netflixIntroShown')
    if (introShown) {
      setShowIntro(false)
      setHasShownIntro(true)
    } else {
      // Play Netflix "ta-dum" sound
      const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3')
      // Using a Netflix-like sound effect URL - replace with actual Netflix sound if available
      const netflixSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZizcIGWm98N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZizcIGWi88N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZizcIGWi88N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZizcIGWi88N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZizcIGWi88N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZizcIGWi88N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZizcIGWi88N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZizcIGWi88N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZizcIGWi88N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZizcIGWi88N2QQAoUXrTp66hVFApGn+Dyvm==')

      // Create a more authentic "ta-dum" using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

      const playTaDum = () => {
        const now = audioContext.currentTime

        // "TA" sound - lower frequency
        const oscillator1 = audioContext.createOscillator()
        const gainNode1 = audioContext.createGain()
        oscillator1.connect(gainNode1)
        gainNode1.connect(audioContext.destination)

        oscillator1.frequency.setValueAtTime(220, now) // A3
        oscillator1.type = 'sine'
        gainNode1.gain.setValueAtTime(0, now)
        gainNode1.gain.linearRampToValueAtTime(0.3, now + 0.01)
        gainNode1.gain.exponentialRampToValueAtTime(0.01, now + 0.5)

        oscillator1.start(now)
        oscillator1.stop(now + 0.5)

        // "DUM" sound - higher frequency, delayed
        const oscillator2 = audioContext.createOscillator()
        const gainNode2 = audioContext.createGain()
        oscillator2.connect(gainNode2)
        gainNode2.connect(audioContext.destination)

        oscillator2.frequency.setValueAtTime(440, now + 0.15) // A4
        oscillator2.type = 'sine'
        gainNode2.gain.setValueAtTime(0, now + 0.15)
        gainNode2.gain.linearRampToValueAtTime(0.35, now + 0.16)
        gainNode2.gain.exponentialRampToValueAtTime(0.01, now + 1.0)

        oscillator2.start(now + 0.15)
        oscillator2.stop(now + 1.0)
      }

      // Play sound after a brief delay
      setTimeout(playTaDum, 100)

      const timer = setTimeout(() => {
        setShowIntro(false)
        setHasShownIntro(true)
        sessionStorage.setItem('netflixIntroShown', 'true')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  const scrollToSection = (sectionId: SectionType) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      })
    }
    setActiveSection(sectionId)
  }

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections: SectionType[] = ['hero', 'experience', 'projects', 'education', 'skills']

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollExperience = (direction: 'left' | 'right') => {
    if (experienceScrollRef.current) {
      const scrollAmount = 400
      experienceScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const firstLetter = personalInfo.name.charAt(0).toUpperCase()

  return (
    <>
      {/* Netflix-style Intro Animation */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 2.8 }}
          >
            {/* Animated Letter with glow effect */}
            <motion.div
              className="text-[#E50914] font-black relative"
              style={{
                fontSize: '20rem',
                lineHeight: 1,
                textShadow: '0 0 40px rgba(229, 9, 20, 0.8), 0 0 80px rgba(229, 9, 20, 0.5), 0 0 120px rgba(229, 9, 20, 0.3)'
              }}
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{
                scale: [0.3, 1.1, 1, 3],
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 2.8,
                times: [0, 0.3, 0.7, 1],
                ease: [0.65, 0, 0.35, 1]
              }}
            >
              {firstLetter}
            </motion.div>

            {/* Black fade overlay for smooth transition */}
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.5 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-[#141414] text-white">
        <NavigationBar activeSection={activeSection} onNavigate={scrollToSection} name={personalInfo.name} />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#141414] to-[#141414]"></div>

        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
          {personalInfo.avatar && (
            <div className="mb-8 inline-block">
              <img
                src={personalInfo.avatar}
                alt={personalInfo.name}
                className="w-40 h-40 rounded-lg object-cover border-4 border-[#E50914] shadow-2xl"
              />
            </div>
          )}

          <h1 className="text-7xl md:text-8xl font-black mb-6 tracking-tight">
            {personalInfo.name}
          </h1>

          <p className="text-2xl md:text-3xl text-gray-300 mb-8 font-light">
            {personalInfo.title}
          </p>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            {personalInfo.bio}
          </p>

          {/* Contact Info */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400 mb-10">
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-2 hover:text-[#E50914] transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              {personalInfo.email}
            </a>
            {personalInfo.location && (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {personalInfo.location}
              </span>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-10 py-4 bg-[#E50914] hover:bg-[#f40612] text-white font-bold text-lg rounded transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              ▶ View Projects
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              className="px-10 py-4 bg-gray-700/50 hover:bg-gray-600/50 text-white font-bold text-lg rounded transition-all duration-200 border border-gray-600"
            >
              Experience
            </button>
          </div>

          {/* Social Links */}
          {personalInfo.links && (
            <div className="flex items-center justify-center gap-4 mt-12">
              {personalInfo.links.github && (
                <a
                  href={personalInfo.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-gray-800/50 hover:bg-[#E50914] rounded-full transition-all duration-200 border border-gray-700 hover:border-[#E50914] transform hover:scale-110 active:scale-95 active:bg-[#c40712] relative group overflow-hidden"
                  aria-label="GitHub"
                >
                  <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 group-hover:-top-14 transition-all duration-200 whitespace-nowrap pointer-events-none shadow-lg">
                    GitHub
                  </span>
                </a>
              )}
              {personalInfo.links.linkedin && (
                <a
                  href={personalInfo.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-gray-800/50 hover:bg-[#E50914] rounded-full transition-all duration-200 border border-gray-700 hover:border-[#E50914] transform hover:scale-110 active:scale-95 active:bg-[#c40712] relative group overflow-hidden"
                  aria-label="LinkedIn"
                >
                  <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 group-hover:-top-14 transition-all duration-200 whitespace-nowrap pointer-events-none shadow-lg">
                    LinkedIn
                  </span>
                </a>
              )}
              {personalInfo.links.twitter && (
                <a
                  href={personalInfo.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-gray-800/50 hover:bg-[#E50914] rounded-full transition-all duration-200 border border-gray-700 hover:border-[#E50914] transform hover:scale-110 active:scale-95 active:bg-[#c40712] relative group overflow-hidden"
                  aria-label="Twitter/X"
                >
                  <svg className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 group-hover:-top-14 transition-all duration-200 whitespace-nowrap pointer-events-none shadow-lg">
                    Twitter
                  </span>
                </a>
              )}
              {personalInfo.links.website && (
                <a
                  href={personalInfo.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-gray-800/50 hover:bg-[#E50914] rounded-full transition-all duration-200 border border-gray-700 hover:border-[#E50914] transform hover:scale-110 active:scale-95 active:bg-[#c40712] relative group overflow-hidden"
                  aria-label="Website"
                >
                  <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 group-hover:-top-14 transition-all duration-200 whitespace-nowrap pointer-events-none shadow-lg">
                    Website
                  </span>
                </a>
              )}
            </div>
          )}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-white">Experience</h2>

          <div className="relative group">
            {/* Scroll Buttons */}
            <button
              onClick={() => scrollExperience('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-full bg-gradient-to-r from-[#141414] to-transparent flex items-center justify-start pl-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Scroll left"
            >
              <svg className="w-8 h-8 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>

            <button
              onClick={() => scrollExperience('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-full bg-gradient-to-l from-[#141414] to-transparent flex items-center justify-end pr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Scroll right"
            >
              <svg className="w-8 h-8 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Scrollable Experience Cards */}
            <div
              ref={experienceScrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {experience.map((exp, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredExpIndex(idx)}
                  onMouseLeave={() => setHoveredExpIndex(null)}
                  className="flex-none w-96 snap-start"
                >
                  <div className={`bg-[#1f1f1f] rounded-lg overflow-hidden transition-all duration-300 transform h-full ${
                    hoveredExpIndex === idx ? 'scale-105 shadow-2xl' : 'shadow-lg'
                  }`}>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-1">{exp.position}</h3>
                          <p className="text-[#E50914] font-semibold">{exp.company}</p>
                        </div>
                      </div>

                      <p className="text-sm text-gray-400 mb-4">
                        {exp.startDate} - {exp.endDate || 'Present'}
                      </p>

                      <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                        {exp.description}
                      </p>

                      {hoveredExpIndex === idx && (
                        <div className="space-y-3 animate-fadeIn">
                          {exp.achievements && exp.achievements.length > 0 && (
                            <ul className="space-y-2">
                              {exp.achievements.slice(0, 3).map((achievement, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                                  <span className="text-[#E50914] mt-1">▸</span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {exp.technologies && exp.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-2">
                              {exp.technologies.slice(0, 5).map((tech, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs font-medium"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-8 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-white">Projects</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredProjIndex(idx)}
                onMouseLeave={() => setHoveredProjIndex(null)}
                className="group relative"
              >
                <div className={`bg-[#1f1f1f] rounded-lg overflow-hidden transition-all duration-300 transform ${
                  hoveredProjIndex === idx ? 'scale-105 shadow-2xl' : 'shadow-lg'
                } h-full`}>
                  {/* Project Image */}
                  {project.image && (
                    <div className="relative h-48 overflow-hidden bg-gray-800">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f1f] to-transparent opacity-60"></div>
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 bg-gray-800 text-gray-400 rounded text-xs">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Highlights - show on hover */}
                    {hoveredProjIndex === idx && project.highlights && project.highlights.length > 0 && (
                      <ul className="space-y-1 mb-4 animate-fadeIn">
                        {project.highlights.slice(0, 3).map((highlight, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                            <span className="text-[#E50914]">✓</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Links */}
                    {project.links && (
                      <div className="flex gap-3">
                        {Object.entries(project.links).map(([key, url]) =>
                          url ? (
                            <a
                              key={key}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#E50914] hover:text-[#f40612] font-medium text-sm capitalize transition flex items-center gap-1"
                            >
                              {key}
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </a>
                          ) : null
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-white">Education</h2>

          <div className="space-y-8">
            {education.map((edu, idx) => (
              <div key={idx} className="relative pl-8 border-l-4 border-[#E50914]">
                {/* Timeline Dot */}
                <div className="absolute left-[-10px] top-0 w-4 h-4 bg-[#E50914] rounded-full"></div>

                <div className="bg-[#1f1f1f] rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{edu.institution}</h3>
                      <p className="text-lg text-gray-300 mt-1">
                        {edu.degree} in {edu.field}
                      </p>
                      {edu.gpa && (
                        <p className="text-sm text-[#E50914] font-semibold mt-1">
                          GPA: {edu.gpa}
                        </p>
                      )}
                    </div>
                    <span className="text-sm text-gray-400 whitespace-nowrap">
                      {edu.startDate} - {edu.endDate || 'Present'}
                    </span>
                  </div>

                  {edu.achievements && edu.achievements.length > 0 && (
                    <ul className="space-y-2 mt-4">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-400">
                          <span className="text-[#E50914] mt-1">▸</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-8 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-white">Skills</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="bg-[#1f1f1f] rounded-lg p-6 shadow-lg hover:shadow-xl transition-all hover:border-[#E50914] border-2 border-transparent">
                <h3 className="text-xl font-bold text-[#E50914] mb-4">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-full text-sm font-medium transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          {personalInfo.links && (
            <div className="flex items-center justify-center gap-6 mt-4">
              {personalInfo.links.github && (
                <a
                  href={personalInfo.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-[#E50914] transition-colors duration-200 group relative"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    GitHub
                  </span>
                </a>
              )}
              {personalInfo.links.linkedin && (
                <a
                  href={personalInfo.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-[#E50914] transition-colors duration-200 group relative"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    LinkedIn
                  </span>
                </a>
              )}
              {personalInfo.links.twitter && (
                <a
                  href={personalInfo.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-[#E50914] transition-colors duration-200 group relative"
                  aria-label="Twitter/X"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Twitter
                  </span>
                </a>
              )}
              {personalInfo.links.website && (
                <a
                  href={personalInfo.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-[#E50914] transition-colors duration-200 group relative"
                  aria-label="Website"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Website
                  </span>
                </a>
              )}
            </div>
          )}
        </div>
      </footer>

      {/* Custom animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
    </>
  )
}
