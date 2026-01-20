import { useState, useEffect, useRef } from 'react'
import { PortfolioManifest } from '../types/manifest'

interface ThemeProps {
  manifest: PortfolioManifest
}

type CommandType = 'help' | 'about' | 'experience' | 'projects' | 'education' | 'skills' | 'contact' | 'clear' | 'theme' | 'slideshow'

interface CommandOutput {
  command: string
  output: JSX.Element | string
  timestamp: number
}

const TerminalPrompt = ({
  onCommand,
  onHistoryNavigate,
  containerRef
}: {
  onCommand: (cmd: string) => void
  onHistoryNavigate: (direction: 'up' | 'down') => string | null
  containerRef: React.RefObject<HTMLDivElement>
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

  // Refocus input when clicking within the terminal container only
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleClick = (e: MouseEvent) => {
      // Only focus if clicking within the terminal container
      if (container.contains(e.target as Node)) {
        inputRef.current?.focus()
      }
    }
    container.addEventListener('click', handleClick)
    return () => container.removeEventListener('click', handleClick)
  }, [containerRef])

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


export default function TerminalTheme({ manifest }: ThemeProps) {
  const [history, setHistory] = useState<CommandOutput[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [theme, setTheme] = useState<'green' | 'amber' | 'cyan'>('green')
  const terminalRef = useRef<HTMLDivElement>(null)
  const terminalWindowRef = useRef<HTMLDivElement>(null)
  const slideshowTimeoutRef = useRef<NodeJS.Timeout | null>(null)
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
            <TypewriterText text={`Type 'slideshow' for auto-tour or 'help' for commands`} delay={15} />
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

    // Stop slideshow if any command is typed
    if (slideshowTimeoutRef.current && trimmedCmd !== '') {
      clearTimeout(slideshowTimeoutRef.current)
      slideshowTimeoutRef.current = null
    }

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
              <div><span className="text-white">slideshow</span> - Auto-play through all sections</div>
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

      case 'slideshow':
        if (slideshowTimeoutRef.current) {
          clearTimeout(slideshowTimeoutRef.current)
          slideshowTimeoutRef.current = null
        }

        output = (
          <div className="text-gray-300">
            Starting slideshow... (Press Ctrl+C or type any command to stop)
          </div>
        )

        const sections = ['about', 'experience', 'projects', 'education', 'skills', 'contact']
        let currentSectionIndex = 0

        const runSlideshow = () => {
          if (currentSectionIndex < sections.length) {
            executeCommand(sections[currentSectionIndex])
            currentSectionIndex++
            slideshowTimeoutRef.current = setTimeout(runSlideshow, 5000)
          } else {
            slideshowTimeoutRef.current = null
            const endOutput: CommandOutput = {
              command: '',
              output: (
                <div className={`${currentTheme.primary} text-center py-4`}>
                  Slideshow complete! Type a command to continue.
                </div>
              ),
              timestamp: Date.now()
            }
            setHistory(prev => [...prev, endOutput])
          }
        }

        slideshowTimeoutRef.current = setTimeout(runSlideshow, 2000)
        break

      case 'clear':
        // Stop slideshow if running
        if (slideshowTimeoutRef.current) {
          clearTimeout(slideshowTimeoutRef.current)
          slideshowTimeoutRef.current = null
        }

        setHistory([])
        // Add welcome message after a brief delay to allow state to update
        setTimeout(() => {
          const welcomeOutput: CommandOutput = {
            command: '',
            output: (
              <div className="space-y-2">
                <div className={`${currentTheme.primary} text-xl font-bold`}>
                  <TypewriterText text={`Welcome to ${personalInfo.name}'s Portfolio Terminal`} />
                </div>
                <div className="text-gray-400">
                  <TypewriterText text={`Type 'slideshow' for auto-tour or 'help' for commands`} delay={15} />
                </div>
                <div className="text-gray-500 text-sm mt-2">
                  <TypewriterText text="─────────────────────────────────────────" delay={5} />
                </div>
              </div>
            ),
            timestamp: Date.now()
          }
          setHistory([welcomeOutput])
        }, 50)
        return

      default:
        // Stop slideshow on any command
        if (slideshowTimeoutRef.current) {
          clearTimeout(slideshowTimeoutRef.current)
          slideshowTimeoutRef.current = null
        }

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

    if (trimmedCmd !== 'slideshow') {
      const newOutput: CommandOutput = {
        command: cmd,
        output,
        timestamp: Date.now()
      }

      setHistory(prev => [...prev, newOutput])
    } else {
      // For slideshow, add initial message
      const newOutput: CommandOutput = {
        command: cmd,
        output,
        timestamp: Date.now()
      }
      setHistory(prev => [...prev, newOutput])
    }
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (slideshowTimeoutRef.current) {
        clearTimeout(slideshowTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white font-mono p-4 overflow-hidden">
      <div className="flex gap-4 max-w-7xl mx-auto h-[calc(100vh-2rem)]">
        {/* Help Commands Sidebar */}
        <div className={`w-64 flex-shrink-0 border-2 ${currentTheme.border} rounded-lg shadow-2xl ${currentTheme.shadow} bg-gray-950 p-4 overflow-y-auto`}>
          <div className={`${currentTheme.primary} font-bold mb-4 text-lg`}>Commands</div>
          <div className="space-y-3 text-sm">
            <div className="space-y-1">
              <div className={`text-white font-semibold ${currentTheme.secondary}`}>help</div>
              <div className="text-gray-400 text-xs">Show all commands</div>
            </div>
            <div className="space-y-1">
              <div className={`text-white font-semibold ${currentTheme.secondary}`}>about</div>
              <div className="text-gray-400 text-xs">Personal info</div>
            </div>
            <div className="space-y-1">
              <div className={`text-white font-semibold ${currentTheme.secondary}`}>experience</div>
              <div className="text-gray-400 text-xs">Work history</div>
            </div>
            <div className="space-y-1">
              <div className={`text-white font-semibold ${currentTheme.secondary}`}>projects</div>
              <div className="text-gray-400 text-xs">Project portfolio</div>
            </div>
            <div className="space-y-1">
              <div className={`text-white font-semibold ${currentTheme.secondary}`}>education</div>
              <div className="text-gray-400 text-xs">Education history</div>
            </div>
            <div className="space-y-1">
              <div className={`text-white font-semibold ${currentTheme.secondary}`}>skills</div>
              <div className="text-gray-400 text-xs">Technical skills</div>
            </div>
            <div className="space-y-1">
              <div className={`text-white font-semibold ${currentTheme.secondary}`}>contact</div>
              <div className="text-gray-400 text-xs">Contact info</div>
            </div>
            <div className="space-y-1">
              <div className={`text-white font-semibold ${currentTheme.secondary}`}>slideshow</div>
              <div className="text-gray-400 text-xs">Auto-play sections</div>
            </div>
            <div className="space-y-1">
              <div className={`text-white font-semibold ${currentTheme.secondary}`}>theme [green|amber|cyan]</div>
              <div className="text-gray-400 text-xs">Change color theme</div>
            </div>
            <div className="space-y-1">
              <div className={`text-white font-semibold ${currentTheme.secondary}`}>clear</div>
              <div className="text-gray-400 text-xs">Clear terminal</div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-800">
            <div className="text-gray-500 text-xs space-y-2">
              <div className={`${currentTheme.primary} font-semibold mb-2`}>Shortcuts</div>
              <div><span className="text-gray-400">↑/↓</span> History</div>
              <div><span className="text-gray-400">Ctrl+L</span> Clear</div>
              <div><span className="text-gray-400">Ctrl+C</span> Cancel</div>
            </div>
          </div>
        </div>

        {/* Terminal Window */}
        <div ref={terminalWindowRef} className={`flex-1 flex flex-col border-2 ${currentTheme.border} rounded-lg shadow-2xl ${currentTheme.shadow} bg-gray-950`}>
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
              onHistoryNavigate={handleHistoryNavigate}
              containerRef={terminalWindowRef}
            />
          </div>
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
