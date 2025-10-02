import { PortfolioManifest } from '../types/manifest'

interface ThemeProps {
  manifest: PortfolioManifest
}

const SocialIcon = ({ type }: { type: string }) => {
  const iconClass = "w-5 h-5 fill-current"

  switch (type.toLowerCase()) {
    case 'github':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    case 'linkedin':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    case 'twitter':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    case 'website':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm9.5 12c0 1.466-.332 2.853-.925 4.097l-2.588-7.088A4.48 4.48 0 0018.5 12zM12 19.5c-1.466 0-2.853-.332-4.097-.925l7.088-2.588A7.476 7.476 0 0012 19.5zm-7.5-7.5c0-1.466.332-2.853.925-4.097l2.588 7.088A4.48 4.48 0 005.5 12zM12 4.5c1.466 0 2.853.332 4.097.925l-7.088 2.588A7.476 7.476 0 0012 4.5z"/>
        </svg>
      )
    case 'email':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      )
    case 'phone':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      )
    case 'location':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      )
    case 'demo':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 5v14l11-7z"/>
        </svg>
      )
    default:
      return (
        <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
        </svg>
      )
  }
}

export default function MinimalTheme({ manifest }: ThemeProps) {
  const { personalInfo, experience, projects, education, skills } = manifest

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 w-full max-w-full overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-16 border-b border-gray-300 pb-8">
          <h1 className="text-5xl font-bold mb-2 text-gray-900">{personalInfo.name}</h1>
          <p className="text-xl text-gray-600 mb-4">{personalInfo.title}</p>
          <p className="text-gray-700 mb-6 leading-relaxed">{personalInfo.bio}</p>

          <div className="flex flex-wrap gap-4 text-sm mb-4">
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900">
              <SocialIcon type="email" />
              <span>{personalInfo.email}</span>
            </a>
            {personalInfo.phone && (
              <span className="flex items-center gap-1.5 text-gray-700">
                <SocialIcon type="phone" />
                <span>{personalInfo.phone}</span>
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1.5 text-gray-700">
                <SocialIcon type="location" />
                <span>{personalInfo.location}</span>
              </span>
            )}
          </div>

          {personalInfo.links && (
            <div className="flex gap-3 mt-4">
              {Object.entries(personalInfo.links).map(([key, url]) =>
                url ? (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded transition"
                    title={key}
                  >
                    <SocialIcon type={key} />
                  </a>
                ) : null
              )}
            </div>
          )}
        </header>

        {/* Experience */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-300 pb-2 text-gray-900">Experience</h2>
          <div className="space-y-8">
            {experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </p>
                </div>
                <p className="text-gray-700 mb-3">{exp.description}</p>
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                )}
                {exp.technologies && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-gray-200 text-gray-800 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-300 pb-2 text-gray-900">Projects</h2>
          <div className="space-y-8">
            {projects.map((project, idx) => (
              <div key={idx}>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{project.name}</h3>
                <p className="text-gray-700 mb-3">{project.description}</p>
                {project.highlights && project.highlights.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-gray-700 mb-3">
                    {project.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                )}
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-gray-200 text-gray-800 rounded">
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
                          className="p-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded transition"
                          title={key}
                        >
                          <SocialIcon type={key} />
                        </a>
                      ) : null
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-300 pb-2 text-gray-900">Education</h2>
          <div className="space-y-6">
            {education.map((edu, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{edu.institution}</h3>
                    <p className="text-gray-700">
                      {edu.degree} in {edu.field}
                    </p>
                    {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                  <p className="text-sm text-gray-500">
                    {edu.startDate} - {edu.endDate || 'Present'}
                  </p>
                </div>
                {edu.achievements && edu.achievements.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {edu.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-300 pb-2 text-gray-900">Skills</h2>
          <div className="space-y-4">
            {skills.map((skillGroup, idx) => (
              <div key={idx}>
                <h3 className="font-semibold mb-2 text-gray-900">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-200 text-gray-800 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
