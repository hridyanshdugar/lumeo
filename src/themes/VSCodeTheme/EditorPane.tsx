import { PortfolioManifest, Project } from '../../types/manifest'

interface ProjectFile {
  id: string
  name: string
  data: Project
}

interface EditorPaneProps {
  activeFile: string
  manifest: PortfolioManifest
  projectFiles: ProjectFile[]
}

export const EditorPane = ({ activeFile, manifest, projectFiles }: EditorPaneProps) => {
  const renderContent = () => {
    if (activeFile === 'readme') {
      return renderMarkdown()
    }
    if (activeFile === 'experience') {
      return renderJson(manifest.experience)
    }
    if (activeFile === 'skills') {
      return renderYaml()
    }
    if (activeFile === 'education') {
      return renderEducationMarkdown()
    }
    if (activeFile === 'contact') {
      return renderEnv()
    }
    
    const projectFile = projectFiles.find(p => p.id === activeFile)
    if (projectFile) {
      return renderJson(projectFile.data)
    }

    return <div className="text-[#858585]">No file selected</div>
  }

  const renderMarkdown = () => {
    const lines = [
      `# ${manifest.personalInfo.name}`,
      '',
      `## ${manifest.personalInfo.title}`,
      '',
      manifest.personalInfo.bio,
      '',
      '## Quick Stats',
      '',
      `- **Projects:** ${manifest.projects.length}`,
      `- **Experience:** ${manifest.experience.length} positions`,
      `- **Skills:** ${manifest.skills.reduce((acc, s) => acc + s.items.length, 0)} technologies`,
      '',
      '## Connect',
      '',
      `- Email: ${manifest.personalInfo.email}`,
      manifest.personalInfo.links?.github ? `- GitHub: ${manifest.personalInfo.links.github}` : null,
      manifest.personalInfo.links?.linkedin ? `- LinkedIn: ${manifest.personalInfo.links.linkedin}` : null,
    ].filter(Boolean)

    return (
      <div>
        {lines.map((line, idx) => (
          <div key={idx} className="flex">
            <span className="w-12 text-right pr-4 text-[#858585] select-none">{idx + 1}</span>
            <span className={getMarkdownClass(line as string)}>{line}</span>
          </div>
        ))}
      </div>
    )
  }

  const renderEducationMarkdown = () => {
    const lines: string[] = ['# Education', '']
    manifest.education.forEach(edu => {
      lines.push(`## ${edu.degree} in ${edu.field}`)
      lines.push('')
      lines.push(`**${edu.institution}**`)
      lines.push(`*${edu.startDate} - ${edu.endDate || 'Present'}*`)
      if (edu.gpa) lines.push(`GPA: ${edu.gpa}`)
      lines.push('')
    })

    return (
      <div>
        {lines.map((line, idx) => (
          <div key={idx} className="flex">
            <span className="w-12 text-right pr-4 text-[#858585] select-none">{idx + 1}</span>
            <span className={getMarkdownClass(line)}>{line}</span>
          </div>
        ))}
      </div>
    )
  }

  const renderJson = (data: any) => {
    const jsonString = JSON.stringify(data, null, 2)
    const lines = jsonString.split('\n')

    return (
      <div>
        {lines.map((line, idx) => (
          <div key={idx} className="flex">
            <span className="w-12 text-right pr-4 text-[#858585] select-none">{idx + 1}</span>
            <span dangerouslySetInnerHTML={{ __html: syntaxHighlightJson(line) }} />
          </div>
        ))}
      </div>
    )
  }

  const renderYaml = () => {
    const lines: string[] = ['skills:']
    manifest.skills.forEach(skillGroup => {
      lines.push(`  - category: "${skillGroup.category}"`)
      lines.push('    items:')
      skillGroup.items.forEach(item => {
        lines.push(`      - "${item}"`)
      })
    })

    return (
      <div>
        {lines.map((line, idx) => (
          <div key={idx} className="flex">
            <span className="w-12 text-right pr-4 text-[#858585] select-none">{idx + 1}</span>
            <span dangerouslySetInnerHTML={{ __html: syntaxHighlightYaml(line) }} />
          </div>
        ))}
      </div>
    )
  }

  const renderEnv = () => {
    const lines = [
      '# Contact Information',
      '',
      `EMAIL=${manifest.personalInfo.email}`,
      manifest.personalInfo.phone ? `PHONE=${manifest.personalInfo.phone}` : null,
      manifest.personalInfo.location ? `LOCATION=${manifest.personalInfo.location}` : null,
      '',
      '# Social Links',
      manifest.personalInfo.links?.github ? `GITHUB_URL=${manifest.personalInfo.links.github}` : null,
      manifest.personalInfo.links?.linkedin ? `LINKEDIN_URL=${manifest.personalInfo.links.linkedin}` : null,
      manifest.personalInfo.links?.twitter ? `TWITTER_URL=${manifest.personalInfo.links.twitter}` : null,
      manifest.personalInfo.links?.website ? `WEBSITE_URL=${manifest.personalInfo.links.website}` : null,
    ].filter(Boolean)

    return (
      <div>
        {lines.map((line, idx) => (
          <div key={idx} className="flex">
            <span className="w-12 text-right pr-4 text-[#858585] select-none">{idx + 1}</span>
            <span dangerouslySetInnerHTML={{ __html: syntaxHighlightEnv(line as string) }} />
          </div>
        ))}
      </div>
    )
  }

  const getMarkdownClass = (line: string) => {
    if (line.startsWith('# ')) return 'text-[#569cd6] text-xl font-bold'
    if (line.startsWith('## ')) return 'text-[#569cd6] text-lg font-semibold'
    if (line.startsWith('- ')) return 'text-[#ce9178]'
    if (line.startsWith('**')) return 'text-[#4ec9b0]'
    return 'text-[#cccccc]'
  }

  const syntaxHighlightJson = (line: string) => {
    // Handle brackets and braces
    if (line.trim() === '[' || line.trim() === ']' || line.trim() === '{' || line.trim() === '}' || line.trim() === '[,' || line.trim() === '],' || line.trim() === '{,' || line.trim() === '},') {
      return `<span class="text-[#ffd700]">${line}</span>`
    }
    
    // Handle key-value pairs with string values
    const keyValueMatch = line.match(/^(\s*)"([^"]+)":\s*"([^"]*)"(,?)$/)
    if (keyValueMatch) {
      const [, indent, key, value, comma] = keyValueMatch
      return `${indent}<span class="text-[#9cdcfe]">"${key}"</span>: <span class="text-[#ce9178]">"${value}"</span>${comma}`
    }
    
    // Handle key-value pairs with number values
    const keyNumMatch = line.match(/^(\s*)"([^"]+)":\s*(\d+)(,?)$/)
    if (keyNumMatch) {
      const [, indent, key, value, comma] = keyNumMatch
      return `${indent}<span class="text-[#9cdcfe]">"${key}"</span>: <span class="text-[#b5cea8]">${value}</span>${comma}`
    }
    
    // Handle key-value pairs with boolean/null values
    const keyBoolMatch = line.match(/^(\s*)"([^"]+)":\s*(true|false|null)(,?)$/)
    if (keyBoolMatch) {
      const [, indent, key, value, comma] = keyBoolMatch
      return `${indent}<span class="text-[#9cdcfe]">"${key}"</span>: <span class="text-[#569cd6]">${value}</span>${comma}`
    }
    
    // Handle key with array/object start
    const keyArrayMatch = line.match(/^(\s*)"([^"]+)":\s*([\[{])$/)
    if (keyArrayMatch) {
      const [, indent, key, bracket] = keyArrayMatch
      return `${indent}<span class="text-[#9cdcfe]">"${key}"</span>: <span class="text-[#ffd700]">${bracket}</span>`
    }
    
    // Handle array string items
    const arrayItemMatch = line.match(/^(\s*)"([^"]*)"(,?)$/)
    if (arrayItemMatch) {
      const [, indent, value, comma] = arrayItemMatch
      return `${indent}<span class="text-[#ce9178]">"${value}"</span>${comma}`
    }
    
    return `<span class="text-[#d4d4d4]">${line}</span>`
  }

  const syntaxHighlightYaml = (line: string) => {
    // Handle root key
    const rootKeyMatch = line.match(/^(\w+):$/)
    if (rootKeyMatch) {
      return `<span class="text-[#9cdcfe]">${rootKeyMatch[1]}</span>:`
    }
    
    // Handle key-value with string
    const keyValueMatch = line.match(/^(\s*)(\w+):\s*"([^"]*)"$/)
    if (keyValueMatch) {
      const [, indent, key, value] = keyValueMatch
      return `${indent}<span class="text-[#9cdcfe]">${key}</span>: <span class="text-[#ce9178]">"${value}"</span>`
    }
    
    // Handle nested key
    const nestedKeyMatch = line.match(/^(\s*)(\w+):$/)
    if (nestedKeyMatch) {
      const [, indent, key] = nestedKeyMatch
      return `${indent}<span class="text-[#9cdcfe]">${key}</span>:`
    }
    
    // Handle list item with string
    const listItemMatch = line.match(/^(\s*)-\s*"([^"]*)"$/)
    if (listItemMatch) {
      const [, indent, value] = listItemMatch
      return `${indent}<span class="text-[#d4d4d4]">-</span> <span class="text-[#ce9178]">"${value}"</span>`
    }
    
    // Handle list item with key-value
    const listKeyValueMatch = line.match(/^(\s*)-\s*(\w+):\s*"([^"]*)"$/)
    if (listKeyValueMatch) {
      const [, indent, key, value] = listKeyValueMatch
      return `${indent}<span class="text-[#d4d4d4]">-</span> <span class="text-[#9cdcfe]">${key}</span>: <span class="text-[#ce9178]">"${value}"</span>`
    }
    
    return `<span class="text-[#d4d4d4]">${line}</span>`
  }

  const syntaxHighlightEnv = (line: string) => {
    if (line.startsWith('#')) return `<span class="text-[#6a9955]">${line}</span>`
    const match = line.match(/^(\w+)=(.*)$/)
    if (match) {
      return `<span class="text-[#9cdcfe]">${match[1]}</span>=<span class="text-[#ce9178]">${match[2]}</span>`
    }
    return line
  }

  return (
    <div className="flex-1 overflow-auto bg-[#1e1e1e] p-4">
      <div className="text-xs leading-6 font-mono break-words" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
        {renderContent()}
      </div>
    </div>
  )
}
