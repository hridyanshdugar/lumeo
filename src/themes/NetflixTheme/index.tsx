import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { PortfolioManifest, Project } from '../../types/manifest'
import { HeroBanner } from './HeroBanner.tsx'
import { Carousel } from './Carousel.tsx'
import { PreviewCard } from './PreviewCard.tsx'
import { MiniModal } from './MiniModal.tsx'

interface NetflixThemeProps {
  manifest: PortfolioManifest
}

export const NetflixTheme = ({ manifest }: NetflixThemeProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    return () => { document.head.removeChild(link) }
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedIndex(prev => (prev + 1) % manifest.projects.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [manifest.projects.length])

  const featuredProject = manifest.projects[featuredIndex]

  const categories = [
    { title: `Popular on ${manifest.personalInfo.name.split(' ')[0]}'s Portfolio`, items: manifest.projects },
    { title: 'Continue Learning', items: manifest.experience.map((exp) => ({
      name: exp.position,
      description: `${exp.company} • ${exp.startDate} - ${exp.endDate || 'Present'}`,
      technologies: exp.technologies || [],
      image: undefined,
      progress: Math.floor(Math.random() * 60) + 40,
    }))},
    { title: 'Skills & Technologies', items: manifest.skills.flatMap(group => 
      group.items.map(skill => ({
        name: skill,
        description: group.category,
        technologies: [group.category],
        image: undefined,
      }))
    ).slice(0, 10)},
    { title: 'Education', items: manifest.education.map(edu => ({
      name: edu.degree,
      description: `${edu.institution} • ${edu.field}`,
      technologies: [],
      image: undefined,
    }))},
  ]

  return (
    <div 
      className="min-h-screen bg-[#141414] text-white"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      <nav className={`fixed top-0 left-0 right-0 z-40 px-4 md:px-12 py-4 flex items-center justify-between transition-all duration-300 ${
        scrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}>
        <div className="flex items-center gap-8">
          <h1 
            className="text-2xl md:text-3xl font-bold text-red-600"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}
          >
            {manifest.personalInfo.name.toUpperCase()}
          </h1>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <span className="font-semibold">Home</span>
            <span className="text-gray-300 hover:text-white cursor-pointer">Projects</span>
            <span className="text-gray-300 hover:text-white cursor-pointer">Experience</span>
            <span className="text-gray-300 hover:text-white cursor-pointer">My List</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:opacity-70 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="p-2 hover:opacity-70 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          {manifest.personalInfo.avatar ? (
            <img 
              src={manifest.personalInfo.avatar} 
              alt={manifest.personalInfo.name}
              className="w-8 h-8 rounded object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center font-bold">
              {manifest.personalInfo.name[0]}
            </div>
          )}
        </div>
      </nav>

      <HeroBanner
        project={featuredProject}
        onMoreInfo={() => setSelectedProject(featuredProject)}
      />

      <div className="relative z-10 -mt-32 pb-20">
        {categories.map((category, idx) => (
          <div key={idx} className="mb-8">
            <h2 className="text-lg md:text-xl font-semibold px-4 md:px-12 mb-2">{category.title}</h2>
            <Carousel>
              {category.items.map((item: any, itemIdx) => (
                <PreviewCard
                  key={itemIdx}
                  item={item}
                  index={itemIdx}
                  onSelect={() => {
                    if (item.technologies) {
                      setSelectedProject(item as Project)
                    }
                  }}
                  showTopBadge={idx === 0 && itemIdx < 3}
                  progress={item.progress}
                />
              ))}
            </Carousel>
          </div>
        ))}

        {/* Contact Footer */}
        <footer className="px-4 md:px-12 py-8 border-t border-gray-800">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <a href={`mailto:${manifest.personalInfo.email}`} className="hover:text-white transition flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {manifest.personalInfo.email}
              </a>
              {manifest.personalInfo.phone && (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {manifest.personalInfo.phone}
                </span>
              )}
              {manifest.personalInfo.location && (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {manifest.personalInfo.location}
                </span>
              )}
            </div>
            {manifest.personalInfo.links && (
              <div className="flex flex-wrap gap-4 mt-4">
                {manifest.personalInfo.links.github && (
                  <a href={manifest.personalInfo.links.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                    GitHub
                  </a>
                )}
                {manifest.personalInfo.links.linkedin && (
                  <a href={manifest.personalInfo.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                    LinkedIn
                  </a>
                )}
                {manifest.personalInfo.links.twitter && (
                  <a href={manifest.personalInfo.links.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                    Twitter
                  </a>
                )}
                {manifest.personalInfo.links.website && (
                  <a href={manifest.personalInfo.links.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                    Website
                  </a>
                )}
              </div>
            )}
          </div>
        </footer>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <MiniModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            manifest={manifest}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
