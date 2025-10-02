import { PortfolioManifest } from '../types/manifest'

interface ThemeProps {
  manifest: PortfolioManifest
}

export default function ModernTheme({ manifest }: ThemeProps) {
  const { personalInfo, experience, projects, education, skills } = manifest

  return (
    <div className="min-h-screen bg-gray-50 w-full max-w-full overflow-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-8">
            {personalInfo.avatar && (
              <img
                src={personalInfo.avatar}
                alt={personalInfo.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
            )}
            <div className="flex-1">
              <h1 className="text-5xl font-bold mb-3">{personalInfo.name}</h1>
              <p className="text-2xl text-slate-200 mb-4">{personalInfo.title}</p>
              <p className="text-slate-300 text-lg max-w-3xl">{personalInfo.bio}</p>

              <div className="flex gap-6 mt-6">
                {personalInfo.links &&
                  Object.entries(personalInfo.links).map(([key, url]) =>
                    url ? (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-white text-slate-900 rounded-lg hover:bg-slate-100 transition capitalize font-medium"
                      >
                        {key}
                      </a>
                    ) : null
                  )}
              </div>

              <div className="flex gap-6 mt-6 text-slate-300">
                <a href={`mailto:${personalInfo.email}`} className="hover:text-white transition">
                  {personalInfo.email}
                </a>
                {personalInfo.location && <span>{personalInfo.location}</span>}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Experience Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border border-gray-100"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{exp.position}</h3>
                    <p className="text-lg text-slate-600">{exp.company}</p>
                  </div>
                  <span className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </span>
                </div>
                <p className="text-slate-700 mb-4">{exp.description}</p>
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="space-y-2 mb-4">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-700">
                        <span className="text-blue-600 mt-1">▸</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {exp.technologies && (
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border border-gray-100 flex flex-col"
              >
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="text-xl font-bold text-slate-900 mb-2">{project.name}</h3>
                <p className="text-slate-700 mb-4 flex-1">{project.description}</p>
                {project.highlights && project.highlights.length > 0 && (
                  <ul className="space-y-1 mb-4">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="text-blue-600">✓</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
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
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm capitalize"
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
        </section>

        {/* Education & Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Education */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-slate-900">Education</h2>
            <div className="space-y-6">
              {education.map((edu, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                  <h3 className="text-xl font-bold text-slate-900">{edu.institution}</h3>
                  <p className="text-slate-700 mb-1">
                    {edu.degree} in {edu.field}
                  </p>
                  <p className="text-sm text-slate-500 mb-2">
                    {edu.startDate} - {edu.endDate || 'Present'}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                  {edu.achievements && edu.achievements.length > 0 && (
                    <ul className="space-y-1 mt-3">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className="text-blue-600">▸</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-slate-900">Skills</h2>
            <div className="space-y-6">
              {skills.map((skillGroup, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                  <h3 className="font-bold text-lg mb-3 text-slate-900">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg font-medium"
                      >
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
    </div>
  )
}
