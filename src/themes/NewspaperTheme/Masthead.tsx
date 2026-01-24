interface MastheadProps {
  name: string
  title: string
  date: string
  onHover: () => void
}

export const Masthead = ({ name, title, date, onHover }: MastheadProps) => {
  const nameParts = name.split(' ')
  const lastName = nameParts[nameParts.length - 1]

  return (
    <header 
      className="text-center border-b-4 border-double border-black pb-4 mb-6"
      onMouseEnter={onHover}
    >
      <div className="flex justify-between items-center text-xs text-gray-600 mb-2">
        <span>Vol. CXXI No. 1</span>
        <span>{date}</span>
        <span className="flex items-center gap-1">Late Edition <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg></span>
      </div>

      <h1 
        className="text-6xl md:text-7xl font-black tracking-tight"
        style={{ 
          fontFamily: "'Playfair Display', Georgia, serif",
          textTransform: 'uppercase',
          letterSpacing: '-2px',
        }}
      >
        The {lastName} Times
      </h1>

      <p 
        className="text-sm mt-1 text-gray-600 italic"
        style={{ fontFamily: "'Source Serif Pro', Georgia, serif" }}
      >
        "{title}" — Est. 2024
      </p>

      <div className="flex justify-center gap-4 mt-3 text-xs border-t border-gray-300 pt-3">
        <span>Portfolio</span>
        <span>•</span>
        <span>Projects</span>
        <span>•</span>
        <span>Experience</span>
        <span>•</span>
        <span>Skills</span>
        <span>•</span>
        <span>Contact</span>
      </div>
    </header>
  )
}
