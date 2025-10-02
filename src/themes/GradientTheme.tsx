import { PortfolioManifest } from '../types/manifest'

interface ThemeProps {
  manifest: PortfolioManifest
}

export default function GradientTheme({ manifest }: ThemeProps) {
  const { personalInfo, experience, projects, education, skills } = manifest

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 w-full max-w-full overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-full overflow-hidden">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl text-center">
            {personalInfo.avatar && (
              <img
                src={personalInfo.avatar}
                alt={personalInfo.name}
                className="w-40 h-40 rounded-full mx-auto mb-8 border-4 border-white shadow-2xl"
              />
            )}
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              {personalInfo.name}
            </h1>
            <p className="text-3xl font-semibold text-gray-700 mb-6">{personalInfo.title}</p>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              {personalInfo.bio}
            </p>

            <div className="flex justify-center gap-4 mb-8">
              {personalInfo.links &&
                Object.entries(personalInfo.links).map(([key, url]) =>
                  url ? (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg transition transform hover:scale-105 capitalize font-medium"
                    >
                      {key}
                    </a>
                  ) : null
                )}
            </div>

            <div className="flex justify-center gap-6 text-gray-600">
              <a href={`mailto:${personalInfo.email}`} className="hover:text-purple-600 transition">
                {personalInfo.email}
              </a>
              {personalInfo.location && <span>{personalInfo.location}</span>}
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 pb-20">
          {/* Experience Section */}
          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Experience
            </h2>
            <div className="space-y-8">
              {experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition p-8 border border-white/50"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {exp.position}
                      </h3>
                      <p className="text-xl text-gray-700 font-medium">{exp.company}</p>
                    </div>
                    <span className="mt-2 md:mt-0 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-semibold">
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 text-lg">{exp.description}</p>
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-2 mb-4">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-700">
                          <span className="text-purple-600 font-bold text-lg">✦</span>
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
                          className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-full text-sm font-medium border border-purple-200"
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
          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
              Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition p-8 border border-white/50 flex flex-col group hover:scale-105 transform duration-300"
                >
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-52 object-cover rounded-xl mb-6 group-hover:scale-105 transition"
                    />
                  )}
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent mb-3">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-1">{project.description}</p>
                  {project.highlights && project.highlights.length > 0 && (
                    <ul className="space-y-1 mb-4">
                      {project.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-pink-600 font-bold">✓</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gradient-to-r from-pink-50 to-blue-50 text-pink-700 rounded-lg text-xs font-medium border border-pink-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.links && (
                    <div className="flex gap-4">
                      {Object.entries(project.links).map(([key, url]) =>
                        url ? (
                          <a
                            key={key}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-600 hover:text-blue-600 font-semibold capitalize transition"
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
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Education
              </h2>
              <div className="space-y-6">
                {education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50"
                  >
                    <h3 className="text-xl font-bold text-gray-800">{edu.institution}</h3>
                    <p className="text-gray-700 font-medium">
                      {edu.degree} in {edu.field}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {edu.startDate} - {edu.endDate || 'Present'}
                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </p>
                    {edu.achievements && edu.achievements.length > 0 && (
                      <ul className="space-y-1 mt-3">
                        {edu.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
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
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Skills
              </h2>
              <div className="space-y-6">
                {skills.map((skillGroup, idx) => (
                  <div
                    key={idx}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50"
                  >
                    <h3 className="font-bold text-lg mb-4 text-gray-800">{skillGroup.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-xl font-medium border border-purple-200"
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
    </div>
  )
}
