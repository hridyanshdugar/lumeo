import { motion } from 'framer-motion'
import { Project } from '../../types/manifest'

interface FrontPageProps {
  featuredProject?: Project
  bio: string
  name: string
}

export const FrontPage = ({ featuredProject, bio, name }: FrontPageProps) => {
  if (!featuredProject) return null

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b-2 border-black pb-6"
    >
      <div className="md:col-span-2">
        <h2 
          className="text-4xl md:text-5xl font-bold leading-tight mb-4"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {featuredProject.name}: A New Standard in {featuredProject.technologies[0] || 'Technology'}
        </h2>

        <div className="flex gap-2 mb-4 text-xs text-gray-600">
          <span>By {name.toUpperCase()}</span>
          <span>|</span>
          <span>Staff Writer</span>
        </div>

        {featuredProject.image && (
          <div className="relative mb-4">
            <img
              src={featuredProject.image}
              alt={featuredProject.name}
              className="w-full h-64 object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
            <p className="text-xs text-gray-500 mt-1 italic">
              {featuredProject.name} in action. Photo by {name}.
            </p>
          </div>
        )}

        <p className="text-lg leading-relaxed break-words first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:mt-1" style={{ fontFamily: "'Playfair Display', Georgia, serif", wordBreak: 'break-word', overflowWrap: 'break-word' }}>
          {featuredProject.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {featuredProject.technologies.map((tech, i) => (
            <span key={i} className="text-xs bg-gray-200 px-2 py-1">
              {tech}
            </span>
          ))}
        </div>

        {featuredProject.links && (
          <div className="mt-4 text-sm">
            <span className="italic">See also: </span>
            {featuredProject.links.github && (
              <a href={featuredProject.links.github} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline mr-2">
                View Source Code
              </a>
            )}
            {featuredProject.links.demo && (
              <a href={featuredProject.links.demo} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>

      <div className="border-l-2 border-black pl-4">
        <h3 
          className="text-xl font-bold mb-3"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          About the Author
        </h3>
        <p 
          className="text-sm leading-relaxed first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:mr-1"
          style={{ textAlign: 'justify' }}
        >
          {bio}
        </p>

        <div className="mt-6 pt-4 border-t border-gray-300">
          <h4 className="font-bold text-sm uppercase mb-2">Weather</h4>
          <p className="text-sm">
            Outlook: Sunny with a high chance of productivity. 
            Temperatures ranging from caffeinated to highly motivated.
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-300">
          <p className="text-xs italic text-gray-600">
            "Continued on Page A3"
          </p>
        </div>
      </div>
    </motion.section>
  )
}
