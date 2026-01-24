import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { PortfolioManifest } from '../../types/manifest'
import { Masthead } from './Masthead.tsx'
import { FrontPage } from './FrontPage.tsx'
import { Article } from './Article.tsx'
import { Sidebar } from './Sidebar.tsx'

interface NewspaperThemeProps {
  manifest: PortfolioManifest
}

export const NewspaperTheme = ({ manifest }: NewspaperThemeProps) => {
  const [showCorrection, setShowCorrection] = useState(false)
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium')
  const [showBackToTop, setShowBackToTop] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })

  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Source+Serif+Pro:wght@400;600&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    return () => { document.head.removeChild(link) }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setShowBackToTop(containerRef.current.scrollTop > 500)
      }
    }
    containerRef.current?.addEventListener('scroll', handleScroll)
    return () => containerRef.current?.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Font size multipliers for dynamic sizing
  const fontSizes = {
    small: { body: '14px', heading: '1.25rem', large: '1.5rem' },
    medium: { body: '16px', heading: '1.5rem', large: '2rem' },
    large: { body: '18px', heading: '1.75rem', large: '2.25rem' }
  }[fontSize]

  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-amber-50 overflow-y-auto h-screen"
      style={{ fontFamily: "'Source Serif Pro', Georgia, serif", fontSize: fontSizes.body }}
    >
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-red-700 z-50"
        style={{ width: progressWidth }}
      />

      <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
        <div className="bg-white/90 backdrop-blur border border-gray-300 rounded-lg shadow-lg flex">
          <button
            onClick={() => setFontSize('small')}
            className={`px-3 py-2 border-r border-gray-300 transition ${fontSize === 'small' ? 'bg-gray-200 font-bold' : 'hover:bg-gray-100'}`}
            style={{ fontSize: '12px' }}
          >
            A
          </button>
          <button
            onClick={() => setFontSize('medium')}
            className={`px-3 py-2 border-r border-gray-300 transition ${fontSize === 'medium' ? 'bg-gray-200 font-bold' : 'hover:bg-gray-100'}`}
            style={{ fontSize: '16px' }}
          >
            A
          </button>
          <button
            onClick={() => setFontSize('large')}
            className={`px-3 py-2 transition ${fontSize === 'large' ? 'bg-gray-200 font-bold' : 'hover:bg-gray-100'}`}
            style={{ fontSize: '20px' }}
          >
            A
          </button>
        </div>
        <button
          onClick={() => window.print()}
          className="bg-white/90 backdrop-blur border border-gray-300 rounded-lg shadow-lg px-3 py-2 hover:bg-gray-100"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Masthead
          name={manifest.personalInfo.name}
          title={manifest.personalInfo.title}
          date={today}
          onHover={() => setShowCorrection(true)}
        />

        {manifest.experience.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-700 text-white text-center py-2 px-4 text-sm font-semibold mb-4"
          >
            BREAKING: {manifest.experience[0].position} joins {manifest.experience[0].company}
          </motion.div>
        )}

        <FrontPage
          featuredProject={manifest.projects[0]}
          bio={manifest.personalInfo.bio}
          name={manifest.personalInfo.name}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
          <div className="lg:col-span-3">
            <section className="border-t-2 border-black pt-4 mb-8">
              <h2 
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Section A: Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {manifest.projects.slice(1).map((project, idx) => (
                  <Article
                    key={idx}
                    title={project.name}
                    content={project.description}
                    byline={manifest.personalInfo.name}
                    technologies={project.technologies}
                    links={project.links}
                    index={idx}
                  />
                ))}
              </div>
            </section>

            <section className="border-t-2 border-black pt-4 mb-8">
              <h2 
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Section B: Career & Business
              </h2>
              <div className="space-y-6">
                {manifest.experience.map((exp, idx) => (
                  <Article
                    key={idx}
                    title={`${exp.position} at ${exp.company}`}
                    content={exp.description}
                    byline={manifest.personalInfo.name}
                    date={`${exp.startDate} - ${exp.endDate || 'Present'}`}
                    technologies={exp.technologies}
                    isLarge={idx === 0}
                    index={idx}
                  />
                ))}
              </div>
            </section>

            <section className="border-t-2 border-black pt-4 mb-8">
              <h2 
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Classifieds
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {manifest.skills.map((group, idx) => (
                  <div key={idx} className="border border-gray-400 p-3">
                    <h4 className="font-bold text-sm uppercase mb-2">{group.category}</h4>
                    <p className="text-xs leading-tight">
                      {group.items.join(' • ')}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <Sidebar
            education={manifest.education}
            links={manifest.personalInfo.links}
            email={manifest.personalInfo.email}
            phone={manifest.personalInfo.phone}
            location={manifest.personalInfo.location}
          />
        </div>

        {showCorrection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border-t border-gray-300 pt-4 mt-8"
          >
            <p className="text-sm italic text-gray-600">
              <strong>Correction:</strong> In yesterday's edition, we stated that {manifest.personalInfo.name} was "just another developer." 
              We regret the error. {manifest.personalInfo.name} is, in fact, an exceptional {manifest.personalInfo.title.toLowerCase()}.
            </p>
          </motion.div>
        )}

        <footer className="border-t-2 border-black mt-8 pt-4 text-center text-sm text-gray-600">
          <p>Copyright © {new Date().getFullYear()} The {manifest.personalInfo.name.split(' ')[0]} Times. All Rights Reserved.</p>
          <p className="mt-2">
            "All the portfolio that's fit to print"
          </p>
        </footer>
      </div>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <style>{`
        @media print {
          body { background: white; }
          .no-print { display: none; }
          .fixed { display: none !important; }
        }
      `}</style>
    </div>
  )
}
