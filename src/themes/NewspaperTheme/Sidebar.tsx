import { Education } from '../../types/manifest'

interface SidebarProps {
  education: Education[]
  links?: {
    github?: string
    linkedin?: string
    twitter?: string
    website?: string
    [key: string]: string | undefined
  }
  email: string
  phone?: string
  location?: string
}

export const Sidebar = ({ education, links, email, phone, location }: SidebarProps) => {
  return (
    <aside className="lg:col-span-1">
      <div className="border-2 border-black p-4 mb-6">
        <h3 
          className="text-lg font-bold mb-3 text-center border-b border-black pb-2"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Education Background
        </h3>
        {education.map((edu, idx) => (
          <div key={idx} className={`${idx > 0 ? 'mt-4 pt-4 border-t border-gray-300' : ''}`}>
            <h4 className="font-bold text-sm">{edu.degree}</h4>
            <p className="text-sm text-gray-700">{edu.field}</p>
            <p className="text-xs text-gray-600 italic">{edu.institution}</p>
            <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate || 'Present'}</p>
            {edu.gpa && <p className="text-xs mt-1">GPA: {edu.gpa}</p>}
          </div>
        ))}
      </div>

      <div className="border-2 border-black p-4 mb-6">
        <h3 
          className="text-lg font-bold mb-3 text-center border-b border-black pb-2"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Contact Directory
        </h3>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-bold">Email:</span><br />
            <a href={`mailto:${email}`} className="underline hover:no-underline text-xs">
              {email}
            </a>
          </p>
          {phone && (
            <p>
              <span className="font-bold">Phone:</span><br />
              <span className="text-xs">{phone}</span>
            </p>
          )}
          {location && (
            <p>
              <span className="font-bold">Location:</span><br />
              <span className="text-xs">{location}</span>
            </p>
          )}
          {links?.github && (
            <p>
              <span className="font-bold">GitHub:</span><br />
              <a href={links.github} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline text-xs break-all">
                {links.github.replace('https://', '')}
              </a>
            </p>
          )}
          {links?.linkedin && (
            <p>
              <span className="font-bold">LinkedIn:</span><br />
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline text-xs break-all">
                {links.linkedin.replace('https://', '')}
              </a>
            </p>
          )}
          {links?.twitter && (
            <p>
              <span className="font-bold">Twitter:</span><br />
              <a href={links.twitter} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline text-xs">
                {links.twitter.replace('https://', '')}
              </a>
            </p>
          )}
          {links?.website && (
            <p>
              <span className="font-bold">Website:</span><br />
              <a href={links.website} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline text-xs break-all">
                {links.website.replace('https://', '')}
              </a>
            </p>
          )}
        </div>
      </div>

      <div className="border border-gray-400 p-3 text-center text-xs">
        <p className="font-bold uppercase mb-1">Subscribe Today!</p>
        <p className="italic">Get the latest updates delivered to your inbox.</p>
      </div>

      <div className="mt-6 border border-gray-300 p-3">
        <h4 className="font-bold text-xs uppercase text-center mb-2">Today's Puzzle</h4>
        <div className="grid grid-cols-5 gap-0.5">
          {[...Array(25)].map((_, i) => (
            <div 
              key={i} 
              className={`aspect-square border border-gray-400 ${Math.random() > 0.7 ? 'bg-black' : 'bg-white'}`}
            />
          ))}
        </div>
        <p className="text-xs text-center mt-2 text-gray-500">Answers on Page D4</p>
      </div>
    </aside>
  )
}
