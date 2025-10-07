export default function ManifestInfoPage() {
  return (
    <div className="min-h-screen bg-black text-cyan-400">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-12 border-b border-cyan-400/30 pb-6">
          <h1 className="text-4xl font-mono font-bold mb-3 text-cyan-400">
            &gt; MANIFEST FIELD GUIDE
          </h1>
          <p className="text-cyan-400/70 font-mono text-sm">
            Complete reference for creating your portfolio manifest
          </p>
        </div>

        {/* Personal Info Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-mono font-bold mb-4 text-cyan-400 border-l-4 border-cyan-400 pl-4">
            personalInfo
          </h2>
          <p className="text-cyan-400/80 mb-6 font-mono text-sm">
            Your basic profile information displayed at the top of your portfolio.
          </p>

          <div className="space-y-4 ml-4">
            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-mono font-bold text-cyan-400 mb-1">name <span className="text-red-400">*required</span></h3>
              <p className="text-cyan-400/70 text-sm mb-2">Your full name as you want it displayed.</p>
              <code className="text-xs bg-cyan-500/10 px-2 py-1 border border-cyan-400/30">
                "name": "Jane Doe"
              </code>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-mono font-bold text-cyan-400 mb-1">title <span className="text-red-400">*required</span></h3>
              <p className="text-cyan-400/70 text-sm mb-2">Your professional title or role.</p>
              <code className="text-xs bg-cyan-500/10 px-2 py-1 border border-cyan-400/30">
                "title": "Full Stack Developer"
              </code>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-mono font-bold text-cyan-400 mb-1">email <span className="text-red-400">*required</span></h3>
              <p className="text-cyan-400/70 text-sm mb-2">Your contact email address. Must be a valid email format.</p>
              <code className="text-xs bg-cyan-500/10 px-2 py-1 border border-cyan-400/30">
                "email": "jane@example.com"
              </code>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-mono font-bold text-cyan-400 mb-1">bio <span className="text-red-400">*required</span></h3>
              <p className="text-cyan-400/70 text-sm mb-2">A brief description about yourself and your professional background.</p>
              <code className="text-xs bg-cyan-500/10 px-2 py-1 border border-cyan-400/30">
                "bio": "Passionate developer with 5 years of experience..."
              </code>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-mono font-bold text-cyan-400 mb-1">phone <span className="text-cyan-400/50">optional</span></h3>
              <p className="text-cyan-400/70 text-sm mb-2">Your phone number for contact purposes.</p>
              <code className="text-xs bg-cyan-500/10 px-2 py-1 border border-cyan-400/30">
                "phone": "+1-555-123-4567"
              </code>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-mono font-bold text-cyan-400 mb-1">location <span className="text-cyan-400/50">optional</span></h3>
              <p className="text-cyan-400/70 text-sm mb-2">Your city, state, or general location.</p>
              <code className="text-xs bg-cyan-500/10 px-2 py-1 border border-cyan-400/30">
                "location": "San Francisco, CA"
              </code>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-mono font-bold text-cyan-400 mb-1">avatar <span className="text-cyan-400/50">optional</span></h3>
              <p className="text-cyan-400/70 text-sm mb-2">URL to your profile picture or avatar image.</p>
              <code className="text-xs bg-cyan-500/10 px-2 py-1 border border-cyan-400/30">
                "avatar": "https://example.com/avatar.jpg"
              </code>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-mono font-bold text-cyan-400 mb-1">links <span className="text-cyan-400/50">optional</span></h3>
              <p className="text-cyan-400/70 text-sm mb-2">Social media and professional profile links.</p>
              <pre className="text-xs bg-cyan-500/10 px-2 py-1 border border-cyan-400/30 overflow-x-auto">
{`"links": {
  "github": "https://github.com/janedoe",
  "linkedin": "https://linkedin.com/in/janedoe",
  "twitter": "https://twitter.com/janedoe",
  "website": "https://janedoe.com"
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-mono font-bold mb-4 text-cyan-400 border-l-4 border-cyan-400 pl-4">
            experience
          </h2>
          <p className="text-cyan-400/80 mb-6 font-mono text-sm">
            Array of your work experience entries. Each entry represents a job or position.
          </p>

          <div className="space-y-4 ml-4">
            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-mono font-bold text-cyan-400 mb-1">company <span className="text-red-400">*required</span></h3>
              <p className="text-cyan-400/70 text-sm mb-2">Name of the company or organization.</p>
              <code className="text-xs bg-cyan-500/10 px-2 py-1 border border-cyan-400/30">
                "company": "Tech Corp"
              </code>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-mono font-bold text-cyan-400 mb-1">position <span className="text-red-400">*required</span></h3>
              <p className="text-cyan-400/70 text-sm mb-2">Your job title or role.</p>
              <code className="text-xs bg-cyan-500/10 px-2 py-1 border border-cyan-400/30">
                "position": "Senior Developer"
              </code>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-mono font-bold text-cyan-400 mb-1">startDate <span className="text-red-400">*required</span></h3>
              <p className="text-cyan-400/70 text-sm mb-2">When you started this position.</p>
              <code className="text-xs bg-cyan-500/10 px-2 py-1 border border-cyan-400/30">
                "startDate": "2020-01"
              </code>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-mono font-bold text-cyan-400 mb-1">endDate <span className="text-cyan-400/50">optional</span></h3>
              <p className="text-cyan-400/70 text-sm mb-2">When you ended this position. Leave empty or use "Present" for current roles.</p>
              <code className="text-xs bg-cyan-500/10 px-2 py-1 border border-cyan-400/30">
                "endDate": "Present"
              </code>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-mono font-bold text-cyan-400 mb-1">description <span className="text-red-400">*required</span></h3>
              <p className="text-cyan-400/70 text-sm mb-2">Brief overview of your role and responsibilities.</p>
              <code className="text-xs bg-cyan-500/10 px-2 py-1 border border-cyan-400/30">
                "description": "Led development of core platform features..."
              </code>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-mono font-bold text-cyan-400 mb-1">achievements <span className="text-cyan-400/50">optional</span></h3>
              <p className="text-cyan-400/70 text-sm mb-2">Array of key accomplishments or achievements in this role.</p>
              <pre className="text-xs bg-cyan-500/10 px-2 py-1 border border-cyan-400/30 overflow-x-auto">
{`"achievements": [
  "Improved performance by 40%",
  "Mentored 5 junior developers"
]`}
              </pre>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-mono font-bold text-cyan-400 mb-1">technologies <span className="text-cyan-400/50">optional</span></h3>
              <p className="text-cyan-400/70 text-sm mb-2">Array of technologies, languages, or tools used in this role.</p>
              <pre className="text-xs bg-cyan-500/10 px-2 py-1 border border-cyan-400/30 overflow-x-auto">
{`"technologies": [
  "React",
  "Node.js",
  "PostgreSQL"
]`}
              </pre>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-mono font-bold mb-4 text-cyan-400 border-l-4 border-cyan-400 pl-4">
            projects
          </h2>
          <p className="text-cyan-400/80 mb-6 font-mono text-sm">
            Array of your personal or professional projects to showcase.
          </p>

          <div className="space-y-4 ml-4">
            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-mono font-bold text-cyan-400 mb-1">name <span className="text-red-400">*required</span></h3>
              <p className="text-cyan-400/70 text-sm mb-2">Name of the project.</p>
              <code className="text-xs bg-cyan-500/10 px-2 py-1 border border-cyan-400/30">
                "name": "Portfolio Generator"
              </code>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-mono font-bold text-cyan-400 mb-1">description <span className="text-red-400">*required</span></h3>
              <p className="text-cyan-400/70 text-sm mb-2">What the project does and its purpose.</p>
              <code className="text-xs bg-cyan-500/10 px-2 py-1 border border-cyan-400/30">
                "description": "A platform for creating custom portfolios..."
              </code>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-mono font-bold text-cyan-400 mb-1">technologies <span className="text-red-400">*required</span></h3>
              <p className="text-cyan-400/70 text-sm mb-2">Array of technologies used. Must have at least one.</p>
              <pre className="text-xs bg-cyan-500/10 px-2 py-1 border border-cyan-400/30 overflow-x-auto">
{`"technologies": [
  "React",
  "TypeScript",
  "Express"
]`}
              </pre>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-mono font-bold text-cyan-400 mb-1">image <span className="text-cyan-400/50">optional</span></h3>
              <p className="text-cyan-400/70 text-sm mb-2">URL to a screenshot or image of the project.</p>
              <code className="text-xs bg-cyan-500/10 px-2 py-1 border border-cyan-400/30">
                "image": "https://example.com/project-screenshot.png"
              </code>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-mono font-bold text-cyan-400 mb-1">links <span className="text-cyan-400/50">optional</span></h3>
              <p className="text-cyan-400/70 text-sm mb-2">Links to the project repository, live demo, etc.</p>
              <pre className="text-xs bg-cyan-500/10 px-2 py-1 border border-cyan-400/30 overflow-x-auto">
{`"links": {
  "github": "https://github.com/user/project",
  "demo": "https://project-demo.com"
}`}
              </pre>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-mono font-bold text-cyan-400 mb-1">highlights <span className="text-cyan-400/50">optional</span></h3>
              <p className="text-cyan-400/70 text-sm mb-2">Array of key features or highlights of the project.</p>
              <pre className="text-xs bg-cyan-500/10 px-2 py-1 border border-cyan-400/30 overflow-x-auto">
{`"highlights": [
  "Multi-user support",
  "Real-time updates",
  "Mobile responsive"
]`}
              </pre>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-mono font-bold mb-4 text-cyan-400 border-l-4 border-cyan-400 pl-4">
            education
          </h2>
          <p className="text-cyan-400/80 mb-6 font-mono text-sm">
            Array of your educational background entries.
          </p>

          <div className="space-y-4 ml-4">
            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-mono font-bold text-cyan-400 mb-1">institution <span className="text-red-400">*required</span></h3>
              <p className="text-cyan-400/70 text-sm mb-2">Name of the school, university, or institution.</p>
              <code className="text-xs bg-cyan-500/10 px-2 py-1 border border-cyan-400/30">
                "institution": "University of Technology"
              </code>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-mono font-bold text-cyan-400 mb-1">degree <span className="text-red-400">*required</span></h3>
              <p className="text-cyan-400/70 text-sm mb-2">Type of degree or certification.</p>
              <code className="text-xs bg-cyan-500/10 px-2 py-1 border border-cyan-400/30">
                "degree": "Bachelor of Science"
              </code>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-mono font-bold text-cyan-400 mb-1">field <span className="text-red-400">*required</span></h3>
              <p className="text-cyan-400/70 text-sm mb-2">Your major or field of study.</p>
              <code className="text-xs bg-cyan-500/10 px-2 py-1 border border-cyan-400/30">
                "field": "Computer Science"
              </code>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-mono font-bold text-cyan-400 mb-1">startDate <span className="text-red-400">*required</span></h3>
              <p className="text-cyan-400/70 text-sm mb-2">When you started this program.</p>
              <code className="text-xs bg-cyan-500/10 px-2 py-1 border border-cyan-400/30">
                "startDate": "2015-09"
              </code>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-mono font-bold text-cyan-400 mb-1">endDate <span className="text-cyan-400/50">optional</span></h3>
              <p className="text-cyan-400/70 text-sm mb-2">Graduation date or expected graduation. Use "Expected 2025" for in-progress.</p>
              <code className="text-xs bg-cyan-500/10 px-2 py-1 border border-cyan-400/30">
                "endDate": "2019-05"
              </code>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-mono font-bold text-cyan-400 mb-1">gpa <span className="text-cyan-400/50">optional</span></h3>
              <p className="text-cyan-400/70 text-sm mb-2">Your GPA or academic performance indicator.</p>
              <code className="text-xs bg-cyan-500/10 px-2 py-1 border border-cyan-400/30">
                "gpa": "3.8/4.0"
              </code>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-mono font-bold text-cyan-400 mb-1">achievements <span className="text-cyan-400/50">optional</span></h3>
              <p className="text-cyan-400/70 text-sm mb-2">Array of honors, awards, or notable achievements.</p>
              <pre className="text-xs bg-cyan-500/10 px-2 py-1 border border-cyan-400/30 overflow-x-auto">
{`"achievements": [
  "Dean's List all semesters",
  "Computer Science Award 2019"
]`}
              </pre>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-mono font-bold mb-4 text-cyan-400 border-l-4 border-cyan-400 pl-4">
            skills
          </h2>
          <p className="text-cyan-400/80 mb-6 font-mono text-sm">
            Array of skill categories with specific skills in each category.
          </p>

          <div className="space-y-4 ml-4">
            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-mono font-bold text-cyan-400 mb-1">category <span className="text-red-400">*required</span></h3>
              <p className="text-cyan-400/70 text-sm mb-2">Name of the skill category or grouping.</p>
              <code className="text-xs bg-cyan-500/10 px-2 py-1 border border-cyan-400/30">
                "category": "Frontend Development"
              </code>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-mono font-bold text-cyan-400 mb-1">items <span className="text-red-400">*required</span></h3>
              <p className="text-cyan-400/70 text-sm mb-2">Array of specific skills in this category. Must have at least one.</p>
              <pre className="text-xs bg-cyan-500/10 px-2 py-1 border border-cyan-400/30 overflow-x-auto">
{`"items": [
  "React",
  "Vue.js",
  "Tailwind CSS"
]`}
              </pre>
            </div>
          </div>

          <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-400/30">
            <h3 className="font-mono font-bold text-cyan-400 mb-2">Example Skills Structure:</h3>
            <pre className="text-xs text-cyan-400/80 overflow-x-auto">
{`"skills": [
  {
    "category": "Frontend Development",
    "items": ["React", "TypeScript", "Tailwind CSS"]
  },
  {
    "category": "Backend Development",
    "items": ["Node.js", "Express", "PostgreSQL"]
  },
  {
    "category": "Tools & DevOps",
    "items": ["Git", "Docker", "CI/CD"]
  }
]`}
            </pre>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-cyan-400/30 text-center">
          <p className="text-cyan-400/70 font-mono text-sm">
            &gt; For more help, check your manifest editor for real-time validation
          </p>
        </div>
      </div>
    </div>
  )
}
