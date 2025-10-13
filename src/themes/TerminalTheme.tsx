import { useState, useEffect, useRef } from 'react'
import { PortfolioManifest } from '../types/manifest'

interface ThemeProps {
  manifest: PortfolioManifest
}

type CommandType = 'help' | 'about' | 'experience' | 'projects' | 'education' | 'skills' | 'contact' | 'clear' | 'theme'

interface CommandOutput {
  command: string
  output: JSX.Element | string
  timestamp: number
}

const TerminalPrompt = ({
  onCommand,
  commandHistory,
  onHistoryNavigate
}: {
  onCommand: (cmd: string) => void
  commandHistory: string[]
  onHistoryNavigate: (direction: 'up' | 'down') => string | null
}) => {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onCommand(input.trim())
      setInput('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const historyCmd = onHistoryNavigate('up')
      if (historyCmd !== null) {
        setInput(historyCmd)
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const historyCmd = onHistoryNavigate('down')
      if (historyCmd !== null) {
        setInput(historyCmd)
      } else {
        setInput('')
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      onCommand('clear')
      setInput('')
    } else if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault()
      setInput('')
    }
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Refocus input when clicking anywhere in terminal
  useEffect(() => {
    const handleClick = () => {
      inputRef.current?.focus()
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 font-mono">
      <span className="text-green-400">guest@portfolio</span>
      <span className="text-white">:</span>
      <span className="text-blue-400">~</span>
      <span className="text-white">$</span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent border-none outline-none text-white caret-white"
        autoComplete="off"
        spellCheck="false"
      />
    </form>
  )
}

const TypewriterText = ({ text, delay = 20 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, delay)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, delay])

  return <span>{displayText}</span>
}

const BlinkingCursor = () => (
  <span className="animate-blink inline-block w-2 h-4 bg-green-400 ml-1"></span>
)

export default function TerminalTheme({ manifest }: ThemeProps) {
  const [history, setHistory] = useState<CommandOutput[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [theme, setTheme] = useState<'green' | 'amber' | 'cyan'>('green')
  const terminalRef = useRef<HTMLDivElement>(null)
  const { personalInfo, experience, projects, education, skills } = manifest

  const themeColors = {
    green: {
      primary: 'text-green-400',
      secondary: 'text-green-300',
      border: 'border-green-400',
      shadow: 'shadow-green-400/50'
    },
    amber: {
      primary: 'text-amber-400',
      secondary: 'text-amber-300',
      border: 'border-amber-400',
      shadow: 'shadow-amber-400/50'
    },
    cyan: {
      primary: 'text-cyan-400',
      secondary: 'text-cyan-300',
      border: 'border-cyan-400',
      shadow: 'shadow-cyan-400/50'
    }
  }

  const currentTheme = themeColors[theme]

  useEffect(() => {
    // Show welcome message on mount
    const welcomeOutput: CommandOutput = {
      command: '',
      output: (
        <div className="space-y-2">
          <div className={`${currentTheme.primary} text-xl font-bold`}>
            <TypewriterText text={`Welcome to ${personalInfo.name}'s Portfolio Terminal`} />
          </div>
          <div className="text-gray-400">
            <TypewriterText text={`Type 'help' to see available commands`} delay={15} />
          </div>
          <div className="text-gray-500 text-sm mt-2">
            <TypewriterText text="─────────────────────────────────────────" delay={5} />
          </div>
        </div>
      ),
      timestamp: Date.now()
    }
    setHistory([welcomeOutput])
  }, [])

  useEffect(() => {
    // Auto-scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleHistoryNavigate = (direction: 'up' | 'down'): string | null => {
    if (commandHistory.length === 0) return null

    if (direction === 'up') {
      const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(newIndex)
      return commandHistory[newIndex]
    } else {
      if (historyIndex === -1) return null
      const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1)
      setHistoryIndex(newIndex)
      if (newIndex === commandHistory.length - 1 && historyIndex === newIndex) {
        setHistoryIndex(-1)
        return null
      }
      return commandHistory[newIndex]
    }
  }

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.toLowerCase().trim()
    setCommandHistory(prev => [...prev, cmd])
    setHistoryIndex(-1)

    let output: JSX.Element | string = ''

    switch (trimmedCmd as CommandType) {
      case 'help':
        output = (
          <div className="space-y-1 text-sm">
            <div className={currentTheme.primary}>Available commands:</div>
            <div className="pl-4 space-y-1 text-gray-300">
              <div><span className="text-white">help</span> - Show this help message</div>
              <div><span className="text-white">about</span> - Display personal information</div>
              <div><span className="text-white">experience</span> - Show work experience</div>
              <div><span className="text-white">projects</span> - List projects</div>
              <div><span className="text-white">education</span> - Display education history</div>
              <div><span className="text-white">skills</span> - Show technical skills</div>
              <div><span className="text-white">contact</span> - Get contact information</div>
              <div><span className="text-white">theme [green|amber|cyan]</span> - Change terminal theme</div>
              <div><span className="text-white">clear</span> - Clear terminal screen</div>
            </div>
          </div>
        )
        break

      case 'about':
        output = (
          <div className="space-y-3">
            <div className={`${currentTheme.primary} text-lg font-bold`}>{personalInfo.name}</div>
            <div className={currentTheme.secondary}>{personalInfo.title}</div>
            <div className="text-gray-300 max-w-3xl leading-relaxed">{personalInfo.bio}</div>
            {personalInfo.location && (
              <div className="text-gray-400">
                <span className={currentTheme.primary}>Location:</span> {personalInfo.location}
              </div>
            )}
          </div>
        )
        break

      case 'experience':
        output = (
          <div className="space-y-4">
            <div className={`${currentTheme.primary} font-bold`}>Work Experience:</div>
            {experience.map((exp, idx) => (
              <div key={idx} className="pl-4 space-y-2 border-l-2 border-gray-700">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                  <div>
                    <div className="text-white font-semibold">{exp.position}</div>
                    <div className={currentTheme.secondary}>{exp.company}</div>
                  </div>
                  <div className="text-gray-500 text-sm">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </div>
                </div>
                <div className="text-gray-400 text-sm">{exp.description}</div>
                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="space-y-1">
                    {exp.achievements.map((achievement, i) => (
                      <div key={i} className="text-gray-300 text-sm flex items-start gap-2">
                        <span className={currentTheme.primary}>▸</span>
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                )}
                {exp.technologies && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {exp.technologies.map((tech, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-gray-800 text-gray-300 border border-gray-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )
        break

      case 'projects':
        output = (
          <div className="space-y-4">
            <div className={`${currentTheme.primary} font-bold`}>Projects:</div>
            {projects.map((project, idx) => (
              <div key={idx} className="pl-4 space-y-2 border-l-2 border-gray-700">
                <div className="text-white font-semibold">{project.name}</div>
                <div className="text-gray-400 text-sm">{project.description}</div>
                {project.highlights && project.highlights.length > 0 && (
                  <div className="space-y-1">
                    {project.highlights.map((highlight, i) => (
                      <div key={i} className="text-gray-300 text-sm flex items-start gap-2">
                        <span className={currentTheme.primary}>•</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-gray-800 text-gray-300 border border-gray-700">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.links && (
                  <div className="flex gap-3 text-sm">
                    {Object.entries(project.links).map(([key, url]) =>
                      url ? (
                        <a
                          key={key}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${currentTheme.secondary} hover:underline`}
                        >
                          [{key}]
                        </a>
                      ) : null
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )
        break

      case 'education':
        output = (
          <div className="space-y-4">
            <div className={`${currentTheme.primary} font-bold`}>Education:</div>
            {education.map((edu, idx) => (
              <div key={idx} className="pl-4 space-y-2 border-l-2 border-gray-700">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                  <div>
                    <div className="text-white font-semibold">{edu.institution}</div>
                    <div className={currentTheme.secondary}>
                      {edu.degree} in {edu.field}
                    </div>
                    {edu.gpa && <div className="text-gray-400 text-sm">GPA: {edu.gpa}</div>}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {edu.startDate} - {edu.endDate || 'Present'}
                  </div>
                </div>
                {edu.achievements && edu.achievements.length > 0 && (
                  <div className="space-y-1">
                    {edu.achievements.map((achievement, i) => (
                      <div key={i} className="text-gray-300 text-sm flex items-start gap-2">
                        <span className={currentTheme.primary}>▸</span>
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )
        break

      case 'skills':
        output = (
          <div className="space-y-4">
            <div className={`${currentTheme.primary} font-bold`}>Technical Skills:</div>
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="pl-4">
                <div className="text-white font-semibold mb-2">{skillGroup.category}:</div>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, i) => (
                    <span key={i} className="text-sm px-3 py-1 bg-gray-800 text-gray-300 border border-gray-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
        break

      case 'contact':
        output = (
          <div className="space-y-2">
            <div className={`${currentTheme.primary} font-bold`}>Contact Information:</div>
            <div className="pl-4 space-y-1 text-gray-300">
              <div>
                <span className="text-white">Email:</span> {personalInfo.email}
              </div>
              {personalInfo.phone && (
                <div>
                  <span className="text-white">Phone:</span> {personalInfo.phone}
                </div>
              )}
              {personalInfo.links && (
                <div className="mt-2">
                  <div className="text-white mb-1">Links:</div>
                  <div className="space-y-1">
                    {Object.entries(personalInfo.links).map(([key, url]) =>
                      url ? (
                        <div key={key}>
                          <span className={currentTheme.secondary}>{key}:</span>{' '}
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            {url}
                          </a>
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )
        break

      case 'clear':
        setHistory([])
        return

      default:
        if (trimmedCmd.startsWith('theme ')) {
          const newTheme = trimmedCmd.split(' ')[1] as 'green' | 'amber' | 'cyan'
          if (['green', 'amber', 'cyan'].includes(newTheme)) {
            setTheme(newTheme)
            output = (
              <div className="text-gray-300">
                Theme changed to <span className={themeColors[newTheme].primary}>{newTheme}</span>
              </div>
            )
          } else {
            output = (
              <div className="text-red-400">
                Invalid theme. Available themes: green, amber, cyan
              </div>
            )
          }
        } else {
          output = (
            <div className="text-red-400">
              Command not found: {cmd}. Type 'help' for available commands.
            </div>
          )
        }
    }

    const newOutput: CommandOutput = {
      command: cmd,
      output,
      timestamp: Date.now()
    }

    setHistory(prev => [...prev, newOutput])
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono p-4 overflow-hidden">
      {/* Terminal Window */}
      <div className={`max-w-6xl mx-auto h-[calc(100vh-2rem)] flex flex-col border-2 ${currentTheme.border} rounded-lg shadow-2xl ${currentTheme.shadow} bg-gray-950`}>
        {/* Terminal Header */}
        <div className={`flex items-center justify-between px-4 py-2 bg-gray-900 border-b ${currentTheme.border} rounded-t-lg`}>
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 cursor-pointer"></div>
            </div>
            <span className="text-gray-400 text-sm ml-4">portfolio@terminal</span>
          </div>
          <div className={`${currentTheme.primary} text-sm flex items-center gap-2`}>
            <span className="animate-pulse">●</span>
            <span>ONLINE</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div
          ref={terminalRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
        >
          {history.map((item, idx) => (
            <div key={idx} className="space-y-2">
              {item.command && (
                <div className="flex items-center gap-2">
                  <span className={currentTheme.primary}>guest@portfolio</span>
                  <span className="text-white">:</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-white">$</span>
                  <span className="text-white">{item.command}</span>
                </div>
              )}
              <div className="pl-0 text-sm">{item.output}</div>
            </div>
          ))}
        </div>

        {/* Terminal Input */}
        <div className={`px-4 py-3 bg-gray-900 border-t ${currentTheme.border} rounded-b-lg`}>
          <TerminalPrompt
            onCommand={executeCommand}
            commandHistory={commandHistory}
            onHistoryNavigate={handleHistoryNavigate}
          />
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        .animate-blink {
          animation: blink 1s infinite;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }

        .scrollbar-thumb-gray-700::-webkit-scrollbar-thumb {
          background-color: #374151;
          border-radius: 4px;
        }

        .scrollbar-track-gray-900::-webkit-scrollbar-track {
          background-color: #111827;
        }
      `}</style>
    </div>
  )
}
