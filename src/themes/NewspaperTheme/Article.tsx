import { motion } from 'framer-motion'

interface ArticleProps {
  title: string
  content: string
  byline: string
  date?: string
  technologies?: string[]
  links?: {
    github?: string
    demo?: string
    [key: string]: string | undefined
  }
  isLarge?: boolean
  index: number
}

export const Article = ({ title, content, byline, date, technologies, links, isLarge, index }: ArticleProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`${isLarge ? 'md:col-span-2' : ''} overflow-hidden`}
    >
      <h3 
        className="font-bold mb-2 leading-tight break-words"
        style={{ 
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: isLarge ? '1.5em' : '1.125em'
        }}
      >
        {title}
      </h3>

      <div className="flex flex-wrap gap-2 mb-2 text-gray-600" style={{ fontSize: '0.75em' }}>
        <span>By {byline.toUpperCase()}</span>
        {date && (
          <>
            <span>|</span>
            <span>{date}</span>
          </>
        )}
      </div>

      <div 
        className="leading-relaxed mb-3 break-words"
        style={{ 
          textAlign: 'justify',
          hyphens: 'auto',
          wordBreak: 'break-word',
          overflowWrap: 'break-word'
        }}
      >
        {isLarge && <span className="font-bold float-left mr-2 mt-1" style={{ fontSize: '2em' }}>{content[0]}</span>}
        {isLarge ? content.slice(1) : content}
      </div>

      {technologies && technologies.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {technologies.map((tech, i) => (
            <span key={i} className="bg-gray-100 px-1.5 py-0.5 border border-gray-300" style={{ fontSize: '0.75em' }}>
              {tech}
            </span>
          ))}
        </div>
      )}

      {links && (links.github || links.demo) && (
        <div className="text-gray-600 mt-2" style={{ fontSize: '0.75em' }}>
          <span className="italic">References: </span>
          {links.github && (
            <a 
              href={links.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:no-underline mr-2"
            >
              GitHub
            </a>
          )}
          {links.demo && (
            <a 
              href={links.demo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              Demo
            </a>
          )}
        </div>
      )}

      <hr className="mt-4 border-gray-300" />
    </motion.article>
  )
}
