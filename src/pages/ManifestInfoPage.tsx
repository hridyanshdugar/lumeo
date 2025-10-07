export default function ManifestInfoPage() {
  return (
    <div className="min-h-screen bg-neutral-100" style={{ imageRendering: 'pixelated' }}>
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-12 border-4 border-neutral-600 bg-neutral-800 p-6 shadow-md">
          <h1 className="text-4xl font-bold mb-3 text-neutral-300 tracking-wider uppercase">
            Manifest Field Guide
          </h1>
          <p className="text-neutral-400 font-mono text-sm">
            &gt; Complete reference for creating your portfolio manifest
          </p>
        </div>

        {/* Personal Info Section */}
        <section className="mb-8 bg-white border-4 border-neutral-300 p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-neutral-800 border-l-4 border-neutral-600 pl-4 tracking-wide uppercase">
            personalInfo
          </h2>
          <p className="text-neutral-600 mb-6 font-mono text-sm">
            &gt; Your basic profile information displayed at the top of your portfolio.
          </p>

          <div className="space-y-4 ml-4">
            <div className="border-l-3 border-neutral-400 pl-4" style={{ borderLeftWidth: '3px' }}>
              <h3 className="font-mono font-bold text-neutral-800 mb-1">name <span className="text-red-700 font-bold">*required</span></h3>
              <p className="text-neutral-600 text-sm mb-2">Your full name as you want it displayed.</p>
              <code className="text-xs bg-neutral-100 px-3 py-1.5 border-3 border-neutral-300 text-neutral-700 inline-block" style={{ borderWidth: '3px' }}>
                "name": "Jane Doe"
              </code>
            </div>

            <div className="border-l-3 border-neutral-400 pl-4" style={{ borderLeftWidth: '3px' }}>
              <h3 className="font-mono font-bold text-neutral-800 mb-1">title <span className="text-red-700 font-bold">*required</span></h3>
              <p className="text-neutral-600 text-sm mb-2">Your professional title or role.</p>
              <code className="text-xs bg-neutral-100 px-3 py-1.5 border-3 border-neutral-300 text-neutral-700 inline-block" style={{ borderWidth: '3px' }}>
                "title": "Full Stack Developer"
              </code>
            </div>

            <div className="border-l-3 border-neutral-400 pl-4" style={{ borderLeftWidth: '3px' }}>
              <h3 className="font-mono font-bold text-neutral-800 mb-1">email <span className="text-red-700 font-bold">*required</span></h3>
              <p className="text-neutral-600 text-sm mb-2">Your contact email address. Must be a valid email format.</p>
              <code className="text-xs bg-neutral-100 px-3 py-1.5 border-3 border-neutral-300 text-neutral-700 inline-block" style={{ borderWidth: '3px' }}>
                "email": "jane@example.com"
              </code>
            </div>

            <div className="border-l-3 border-neutral-400 pl-4" style={{ borderLeftWidth: '3px' }}>
              <h3 className="font-mono font-bold text-neutral-800 mb-1">bio <span className="text-red-700 font-bold">*required</span></h3>
              <p className="text-neutral-600 text-sm mb-2">A brief description about yourself and your professional background.</p>
              <code className="text-xs bg-neutral-100 px-3 py-1.5 border-3 border-neutral-300 text-neutral-700 inline-block" style={{ borderWidth: '3px' }}>
                "bio": "Passionate developer with 5 years of experience..."
              </code>
            </div>

            <div className="border-l-3 border-neutral-400 pl-4" style={{ borderLeftWidth: '3px' }}>
              <h3 className="font-mono font-bold text-neutral-800 mb-1">phone <span className="text-neutral-500">optional</span></h3>
              <p className="text-neutral-600 text-sm mb-2">Your phone number for contact purposes.</p>
              <code className="text-xs bg-neutral-100 px-3 py-1.5 border-3 border-neutral-300 text-neutral-700 inline-block" style={{ borderWidth: '3px' }}>
                "phone": "+1-555-123-4567"
              </code>
            </div>

            <div className="border-l-3 border-neutral-400 pl-4" style={{ borderLeftWidth: '3px' }}>
              <h3 className="font-mono font-bold text-neutral-800 mb-1">location <span className="text-neutral-500">optional</span></h3>
              <p className="text-neutral-600 text-sm mb-2">Your city, state, or general location.</p>
              <code className="text-xs bg-neutral-100 px-3 py-1.5 border-3 border-neutral-300 text-neutral-700 inline-block" style={{ borderWidth: '3px' }}>
                "location": "San Francisco, CA"
              </code>
            </div>

            <div className="border-l-3 border-neutral-400 pl-4" style={{ borderLeftWidth: '3px' }}>
              <h3 className="font-mono font-bold text-neutral-800 mb-1">avatar <span className="text-neutral-500">optional</span></h3>
              <p className="text-neutral-600 text-sm mb-2">URL to your profile picture or avatar image.</p>
              <code className="text-xs bg-neutral-100 px-3 py-1.5 border-3 border-neutral-300 text-neutral-700 inline-block" style={{ borderWidth: '3px' }}>
                "avatar": "https://example.com/avatar.jpg"
              </code>
            </div>

            <div className="border-l-3 border-neutral-400 pl-4" style={{ borderLeftWidth: '3px' }}>
              <h3 className="font-mono font-bold text-neutral-800 mb-1">links <span className="text-neutral-500">optional</span></h3>
              <p className="text-neutral-600 text-sm mb-2">Social media and professional profile links.</p>
              <pre className="text-xs bg-neutral-100 px-3 py-2 border-3 border-neutral-300 overflow-x-auto text-neutral-700" style={{ borderWidth: '3px' }}>
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
        <section className="mb-8 bg-white border-4 border-neutral-300 p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-neutral-800 border-l-4 border-neutral-600 pl-4 tracking-wide uppercase">
            experience
          </h2>
          <p className="text-neutral-600 mb-6 font-mono text-sm">
            &gt; Array of your work experience entries. Each entry represents a job or position.
          </p>

          <div className="space-y-4 ml-4">
            <div className="border-l-3 border-neutral-400 pl-4" style={{ borderLeftWidth: '3px' }}>
              <h3 className="font-mono font-bold text-neutral-800 mb-1">company <span className="text-red-700 font-bold">*required</span></h3>
              <p className="text-neutral-600 text-sm mb-2">Name of the company or organization.</p>
              <code className="text-xs bg-neutral-100 px-3 py-1.5 border-3 border-neutral-300 text-neutral-700 inline-block" style={{ borderWidth: '3px' }}>
                "company": "Tech Corp"
              </code>
            </div>

            <div className="border-l-3 border-neutral-400 pl-4" style={{ borderLeftWidth: '3px' }}>
              <h3 className="font-mono font-bold text-neutral-800 mb-1">position <span className="text-red-700 font-bold">*required</span></h3>
              <p className="text-neutral-600 text-sm mb-2">Your job title or role.</p>
              <code className="text-xs bg-neutral-100 px-3 py-1.5 border-3 border-neutral-300 text-neutral-700 inline-block" style={{ borderWidth: '3px' }}>
                "position": "Senior Developer"
              </code>
            </div>

            <div className="border-l-3 border-neutral-400 pl-4" style={{ borderLeftWidth: '3px' }}>
              <h3 className="font-mono font-bold text-neutral-800 mb-1">startDate <span className="text-red-700 font-bold">*required</span></h3>
              <p className="text-neutral-600 text-sm mb-2">When you started this position.</p>
              <code className="text-xs bg-neutral-100 px-3 py-1.5 border-3 border-neutral-300 text-neutral-700 inline-block" style={{ borderWidth: '3px' }}>
                "startDate": "2020-01"
              </code>
            </div>

            <div className="border-l-3 border-neutral-400 pl-4" style={{ borderLeftWidth: '3px' }}>
              <h3 className="font-mono font-bold text-neutral-800 mb-1">endDate <span className="text-neutral-500">optional</span></h3>
              <p className="text-neutral-600 text-sm mb-2">When you ended this position. Leave empty or use "Present" for current roles.</p>
              <code className="text-xs bg-neutral-100 px-3 py-1.5 border-3 border-neutral-300 text-neutral-700 inline-block" style={{ borderWidth: '3px' }}>
                "endDate": "Present"
              </code>
            </div>

            <div className="border-l-3 border-neutral-400 pl-4" style={{ borderLeftWidth: '3px' }}>
              <h3 className="font-mono font-bold text-neutral-800 mb-1">description <span className="text-red-700 font-bold">*required</span></h3>
              <p className="text-neutral-600 text-sm mb-2">Brief overview of your role and responsibilities.</p>
              <code className="text-xs bg-neutral-100 px-3 py-1.5 border-3 border-neutral-300 text-neutral-700 inline-block" style={{ borderWidth: '3px' }}>
                "description": "Led development of core platform features..."
              </code>
            </div>

            <div className="border-l-3 border-neutral-400 pl-4" style={{ borderLeftWidth: '3px' }}>
              <h3 className="font-mono font-bold text-neutral-800 mb-1">achievements <span className="text-neutral-500">optional</span></h3>
              <p className="text-neutral-600 text-sm mb-2">Array of key accomplishments or achievements in this role.</p>
              <pre className="text-xs bg-neutral-100 px-3 py-2 border-3 border-neutral-300 overflow-x-auto text-neutral-700" style={{ borderWidth: '3px' }}>
{`"achievements": [
  "Improved performance by 40%",
  "Mentored 5 junior developers"
]`}
              </pre>
            </div>

            <div className="border-l-3 border-neutral-400 pl-4" style={{ borderLeftWidth: '3px' }}>
              <h3 className="font-mono font-bold text-neutral-800 mb-1">technologies <span className="text-neutral-500">optional</span></h3>
              <p className="text-neutral-600 text-sm mb-2">Array of technologies, languages, or tools used in this role.</p>
              <pre className="text-xs bg-neutral-100 px-3 py-2 border-3 border-neutral-300 overflow-x-auto text-neutral-700" style={{ borderWidth: '3px' }}>
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
        <section className="mb-8 bg-white border-4 border-neutral-300 p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-neutral-800 border-l-4 border-neutral-600 pl-4 tracking-wide uppercase">
            projects
          </h2>
          <p className="text-neutral-600 mb-6 font-mono text-sm">
            &gt; Array of your personal or professional projects to showcase.
          </p>

          <div className="space-y-4 ml-4">
            <div className="border-l-3 border-neutral-400 pl-4" style={{ borderLeftWidth: '3px' }}>
              <h3 className="font-mono font-bold text-neutral-800 mb-1">name <span className="text-red-700 font-bold">*required</span></h3>
              <p className="text-neutral-600 text-sm mb-2">Name of the project.</p>
              <code className="text-xs bg-neutral-100 px-3 py-1.5 border-3 border-neutral-300 text-neutral-700 inline-block" style={{ borderWidth: '3px' }}>
                "name": "Portfolio Generator"
              </code>
            </div>

            <div className="border-l-3 border-neutral-400 pl-4" style={{ borderLeftWidth: '3px' }}>
              <h3 className="font-mono font-bold text-neutral-800 mb-1">description <span className="text-red-700 font-bold">*required</span></h3>
              <p className="text-neutral-600 text-sm mb-2">What the project does and its purpose.</p>
              <code className="text-xs bg-neutral-100 px-3 py-1.5 border-3 border-neutral-300 text-neutral-700 inline-block" style={{ borderWidth: '3px' }}>
                "description": "A platform for creating custom portfolios..."
              </code>
            </div>

            <div className="border-l-3 border-neutral-400 pl-4" style={{ borderLeftWidth: '3px' }}>
              <h3 className="font-mono font-bold text-neutral-800 mb-1">technologies <span className="text-red-700 font-bold">*required</span></h3>
              <p className="text-neutral-600 text-sm mb-2">Array of technologies used. Must have at least one.</p>
              <pre className="text-xs bg-neutral-100 px-3 py-2 border-3 border-neutral-300 overflow-x-auto text-neutral-700" style={{ borderWidth: '3px' }}>
{`"technologies": [
  "React",
  "TypeScript",
  "Express"
]`}
              </pre>
            </div>

            <div className="border-l-3 border-neutral-400 pl-4" style={{ borderLeftWidth: '3px' }}>
              <h3 className="font-mono font-bold text-neutral-800 mb-1">image <span className="text-neutral-500">optional</span></h3>
              <p className="text-neutral-600 text-sm mb-2">URL to a screenshot or image of the project.</p>
              <code className="text-xs bg-neutral-100 px-3 py-1.5 border-3 border-neutral-300 text-neutral-700 inline-block" style={{ borderWidth: '3px' }}>
                "image": "https://example.com/project-screenshot.png"
              </code>
            </div>

            <div className="border-l-3 border-neutral-400 pl-4" style={{ borderLeftWidth: '3px' }}>
              <h3 className="font-mono font-bold text-neutral-800 mb-1">links <span className="text-neutral-500">optional</span></h3>
              <p className="text-neutral-600 text-sm mb-2">Links to the project repository, live demo, etc.</p>
              <pre className="text-xs bg-neutral-100 px-3 py-2 border-3 border-neutral-300 overflow-x-auto text-neutral-700" style={{ borderWidth: '3px' }}>
{`"links": {
  "github": "https://github.com/user/project",
  "demo": "https://project-demo.com"
}`}
              </pre>
            </div>

            <div className="border-l-3 border-neutral-400 pl-4" style={{ borderLeftWidth: '3px' }}>
              <h3 className="font-mono font-bold text-neutral-800 mb-1">highlights <span className="text-neutral-500">optional</span></h3>
              <p className="text-neutral-600 text-sm mb-2">Array of key features or highlights of the project.</p>
              <pre className="text-xs bg-neutral-100 px-3 py-2 border-3 border-neutral-300 overflow-x-auto text-neutral-700" style={{ borderWidth: '3px' }}>
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
        <section className="mb-8 bg-white border-4 border-neutral-300 p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-neutral-800 border-l-4 border-neutral-600 pl-4 tracking-wide uppercase">
            education
          </h2>
          <p className="text-neutral-600 mb-6 font-mono text-sm">
            &gt; Array of your educational background entries.
          </p>

          <div className="space-y-4 ml-4">
            <div className="border-l-3 border-neutral-400 pl-4" style={{ borderLeftWidth: '3px' }}>
              <h3 className="font-mono font-bold text-neutral-800 mb-1">institution <span className="text-red-700 font-bold">*required</span></h3>
              <p className="text-neutral-600 text-sm mb-2">Name of the school, university, or institution.</p>
              <code className="text-xs bg-neutral-100 px-3 py-1.5 border-3 border-neutral-300 text-neutral-700 inline-block" style={{ borderWidth: '3px' }}>
                "institution": "University of Technology"
              </code>
            </div>

            <div className="border-l-3 border-neutral-400 pl-4" style={{ borderLeftWidth: '3px' }}>
              <h3 className="font-mono font-bold text-neutral-800 mb-1">degree <span className="text-red-700 font-bold">*required</span></h3>
              <p className="text-neutral-600 text-sm mb-2">Type of degree or certification.</p>
              <code className="text-xs bg-neutral-100 px-3 py-1.5 border-3 border-neutral-300 text-neutral-700 inline-block" style={{ borderWidth: '3px' }}>
                "degree": "Bachelor of Science"
              </code>
            </div>

            <div className="border-l-3 border-neutral-400 pl-4" style={{ borderLeftWidth: '3px' }}>
              <h3 className="font-mono font-bold text-neutral-800 mb-1">field <span className="text-red-700 font-bold">*required</span></h3>
              <p className="text-neutral-600 text-sm mb-2">Your major or field of study.</p>
              <code className="text-xs bg-neutral-100 px-3 py-1.5 border-3 border-neutral-300 text-neutral-700 inline-block" style={{ borderWidth: '3px' }}>
                "field": "Computer Science"
              </code>
            </div>

            <div className="border-l-3 border-neutral-400 pl-4" style={{ borderLeftWidth: '3px' }}>
              <h3 className="font-mono font-bold text-neutral-800 mb-1">startDate <span className="text-red-700 font-bold">*required</span></h3>
              <p className="text-neutral-600 text-sm mb-2">When you started this program.</p>
              <code className="text-xs bg-neutral-100 px-3 py-1.5 border-3 border-neutral-300 text-neutral-700 inline-block" style={{ borderWidth: '3px' }}>
                "startDate": "2015-09"
              </code>
            </div>

            <div className="border-l-3 border-neutral-400 pl-4" style={{ borderLeftWidth: '3px' }}>
              <h3 className="font-mono font-bold text-neutral-800 mb-1">endDate <span className="text-neutral-500">optional</span></h3>
              <p className="text-neutral-600 text-sm mb-2">Graduation date or expected graduation. Use "Expected 2025" for in-progress.</p>
              <code className="text-xs bg-neutral-100 px-3 py-1.5 border-3 border-neutral-300 text-neutral-700 inline-block" style={{ borderWidth: '3px' }}>
                "endDate": "2019-05"
              </code>
            </div>

            <div className="border-l-3 border-neutral-400 pl-4" style={{ borderLeftWidth: '3px' }}>
              <h3 className="font-mono font-bold text-neutral-800 mb-1">gpa <span className="text-neutral-500">optional</span></h3>
              <p className="text-neutral-600 text-sm mb-2">Your GPA or academic performance indicator.</p>
              <code className="text-xs bg-neutral-100 px-3 py-1.5 border-3 border-neutral-300 text-neutral-700 inline-block" style={{ borderWidth: '3px' }}>
                "gpa": "3.8/4.0"
              </code>
            </div>

            <div className="border-l-3 border-neutral-400 pl-4" style={{ borderLeftWidth: '3px' }}>
              <h3 className="font-mono font-bold text-neutral-800 mb-1">achievements <span className="text-neutral-500">optional</span></h3>
              <p className="text-neutral-600 text-sm mb-2">Array of honors, awards, or notable achievements.</p>
              <pre className="text-xs bg-neutral-100 px-3 py-2 border-3 border-neutral-300 overflow-x-auto text-neutral-700" style={{ borderWidth: '3px' }}>
{`"achievements": [
  "Dean's List all semesters",
  "Computer Science Award 2019"
]`}
              </pre>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-8 bg-white border-4 border-neutral-300 p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-neutral-800 border-l-4 border-neutral-600 pl-4 tracking-wide uppercase">
            skills
          </h2>
          <p className="text-neutral-600 mb-6 font-mono text-sm">
            &gt; Array of skill categories with specific skills in each category.
          </p>

          <div className="space-y-4 ml-4">
            <div className="border-l-3 border-neutral-400 pl-4" style={{ borderLeftWidth: '3px' }}>
              <h3 className="font-mono font-bold text-neutral-800 mb-1">category <span className="text-red-700 font-bold">*required</span></h3>
              <p className="text-neutral-600 text-sm mb-2">Name of the skill category or grouping.</p>
              <code className="text-xs bg-neutral-100 px-3 py-1.5 border-3 border-neutral-300 text-neutral-700 inline-block" style={{ borderWidth: '3px' }}>
                "category": "Frontend Development"
              </code>
            </div>

            <div className="border-l-3 border-neutral-400 pl-4" style={{ borderLeftWidth: '3px' }}>
              <h3 className="font-mono font-bold text-neutral-800 mb-1">items <span className="text-red-700 font-bold">*required</span></h3>
              <p className="text-neutral-600 text-sm mb-2">Array of specific skills in this category. Must have at least one.</p>
              <pre className="text-xs bg-neutral-100 px-3 py-2 border-3 border-neutral-300 overflow-x-auto text-neutral-700" style={{ borderWidth: '3px' }}>
{`"items": [
  "React",
  "Vue.js",
  "Tailwind CSS"
]`}
              </pre>
            </div>
          </div>

          <div className="mt-6 p-4 bg-neutral-100 border-4 border-neutral-400">
            <h3 className="font-mono font-bold text-neutral-800 mb-2 uppercase tracking-wide">Example Skills Structure:</h3>
            <pre className="text-xs text-neutral-700 overflow-x-auto">
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
        <div className="mt-16 pt-8 border-t-4 border-neutral-600 text-center bg-neutral-800 p-6 shadow-md">
          <p className="text-neutral-400 font-mono text-sm">
            &gt; For more help, check your manifest editor for real-time validation
          </p>
        </div>
      </div>
    </div>
  )
}
