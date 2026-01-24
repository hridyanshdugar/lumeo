import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FileItem {
  id: string
  name: string
  icon?: React.ReactNode
}

interface ProjectFile {
  id: string
  name: string
  data: any
}

interface FileExplorerProps {
  files: FileItem[]
  projectFiles: ProjectFile[]
  activeFile: string
  onFileOpen: (id: string) => void
}

export const FileExplorer = ({ files, projectFiles, activeFile, onFileOpen }: FileExplorerProps) => {
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['portfolio', 'projects'])

  const toggleFolder = (folder: string) => {
    setExpandedFolders(prev => 
      prev.includes(folder) ? prev.filter(f => f !== folder) : [...prev, folder]
    )
  }

  const rootFiles = files.filter(f => !f.id.startsWith('project-'))

  return (
    <div className="text-sm">
      <div className="px-3 py-2 text-xs text-[#cccccc] uppercase tracking-wider">Explorer</div>
      
      <div className="px-1">
        <button
          onClick={() => toggleFolder('portfolio')}
          className="w-full flex items-center gap-1 px-2 py-1 hover:bg-[#2a2d2e] rounded text-left"
        >
          <span className={`transform transition ${expandedFolders.includes('portfolio') ? 'rotate-90' : ''}`}>▶</span>
          <span className="text-[#cccccc] font-semibold">PORTFOLIO</span>
        </button>

        <AnimatePresence>
          {expandedFolders.includes('portfolio') && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="overflow-hidden"
            >
              <div className="pl-4">
                {rootFiles.map(file => (
                  <button
                    key={file.id}
                    onClick={() => onFileOpen(file.id)}
                    className={`w-full flex items-center gap-2 px-2 py-1 rounded text-left ${
                      activeFile === file.id ? 'bg-[#094771]' : 'hover:bg-[#2a2d2e]'
                    }`}
                  >
                    <FileIcon name={file.name} />
                    <span className={activeFile === file.id ? 'text-white' : 'text-[#cccccc]'}>{file.name}</span>
                  </button>
                ))}

                <button
                  onClick={() => toggleFolder('projects')}
                  className="w-full flex items-center gap-1 px-2 py-1 hover:bg-[#2a2d2e] rounded text-left"
                >
                  <span className={`transform transition ${expandedFolders.includes('projects') ? 'rotate-90' : ''}`}>▶</span>
                  <span className="text-yellow-400">📁</span>
                  <span className="text-[#cccccc]">projects</span>
                </button>

                <AnimatePresence>
                  {expandedFolders.includes('projects') && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden pl-4"
                    >
                      {projectFiles.map(file => (
                        <button
                          key={file.id}
                          onClick={() => onFileOpen(file.id)}
                          className={`w-full flex items-center gap-2 px-2 py-1 rounded text-left ${
                            activeFile === file.id ? 'bg-[#094771]' : 'hover:bg-[#2a2d2e]'
                          }`}
                        >
                          <FileIcon name={file.name} />
                          <span className={activeFile === file.id ? 'text-white' : 'text-[#cccccc]'}>{file.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

const FileIcon = ({ name }: { name: string }) => {
  if (name.endsWith('.md')) return <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M20.56 18H3.44C2.65 18 2 17.37 2 16.59V7.41C2 6.63 2.65 6 3.44 6h17.12c.79 0 1.44.63 1.44 1.41v9.18c0 .78-.65 1.41-1.44 1.41zM6.81 15.19v-3.66l1.92 2.35 1.92-2.35v3.66h1.93V8.81h-1.93l-1.92 2.35-1.92-2.35H4.89v6.38h1.92zM19.69 12h-1.92V8.81h-1.92V12h-1.93l2.89 3.28L19.69 12z"/></svg>
  if (name.endsWith('.json')) return <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M5 3h2v2H5v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5h2v2H5c-1.07-.27-2-.9-2-2v-4a2 2 0 0 0-2-2H0v-2h1a2 2 0 0 0 2-2V5a2 2 0 0 1 2-2m14 0a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1v2h-1a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-2v-2h2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5h-2V3h2z"/></svg>
  if (name.endsWith('.yaml') || name.endsWith('.yml')) return <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58z"/></svg>
  if (name === 'contact.json') return <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
  return <svg className="w-4 h-4 text-[#cccccc]" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>
}
