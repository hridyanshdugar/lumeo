import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PortfolioManifest } from '../../types/manifest'
import { ActivityBar } from './ActivityBar.tsx'
import { FileExplorer } from './FileExplorer.tsx'
import { TabBar } from './TabBar.tsx'
import { EditorPane } from './EditorPane.tsx'
import { StatusBar } from './StatusBar.tsx'

interface VSCodeThemeProps {
  manifest: PortfolioManifest
}

type FileType = 'readme' | 'experience' | 'skills' | 'education' | 'contact' | string

export const VSCodeTheme = ({ manifest }: VSCodeThemeProps) => {
  const [activePanel, setActivePanel] = useState<'explorer' | 'search' | 'git' | 'extensions'>('explorer')
  const [openFiles, setOpenFiles] = useState<FileType[]>(['readme'])
  const [activeFile, setActiveFile] = useState<FileType>('readme')
  const [sidebarWidth, setSidebarWidth] = useState(250)
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  const [commandSearch, setCommandSearch] = useState('')

  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    return () => { document.head.removeChild(link) }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'p') {
        e.preventDefault()
        setShowCommandPalette(true)
      }
      if (e.key === 'Escape') {
        setShowCommandPalette(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const openFile = (file: FileType) => {
    if (!openFiles.includes(file)) {
      setOpenFiles([...openFiles, file])
    }
    setActiveFile(file)
  }

  const closeFile = (file: FileType) => {
    const newFiles = openFiles.filter(f => f !== file)
    setOpenFiles(newFiles)
    if (activeFile === file && newFiles.length > 0) {
      setActiveFile(newFiles[newFiles.length - 1])
    }
  }

  const projectFiles = manifest.projects.map((p, idx) => ({
    id: `project-${idx}`,
    name: `${p.name.toLowerCase().replace(/\s+/g, '-')}.json`,
    data: p
  }))

  const fileIcons: Record<string, JSX.Element> = {
    md: <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M20.56 18H3.44C2.65 18 2 17.37 2 16.59V7.41C2 6.63 2.65 6 3.44 6h17.12c.79 0 1.44.63 1.44 1.41v9.18c0 .78-.65 1.41-1.44 1.41zM6.81 15.19v-3.66l1.92 2.35 1.92-2.35v3.66h1.93V8.81h-1.93l-1.92 2.35-1.92-2.35H4.89v6.38h1.92zM19.69 12h-1.92V8.81h-1.92V12h-1.93l2.89 3.28L19.69 12z"/></svg>,
    json: <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M5 3h2v2H5v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5h2v2H5c-1.07-.27-2-.9-2-2v-4a2 2 0 0 0-2-2H0v-2h1a2 2 0 0 0 2-2V5a2 2 0 0 1 2-2m14 0a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1v2h-1a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-2v-2h2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5h-2V3h2z"/></svg>,
    yaml: <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58z"/></svg>,
    env: <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>,
    pkg: <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 24 24"><path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18s-.41-.06-.57-.18l-7.9-4.44A.991.991 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18s.41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9zM12 4.15L6.04 7.5 12 10.85l5.96-3.35L12 4.15zM5 15.91l6 3.38v-6.71L5 9.21v6.7zm14 0v-6.7l-6 3.37v6.71l6-3.38z"/></svg>,
  }

  const allFiles = [
    { id: 'readme', name: 'README.md', icon: fileIcons.md },
    { id: 'experience', name: 'experience.json', icon: fileIcons.json },
    { id: 'skills', name: 'skills.yaml', icon: fileIcons.yaml },
    { id: 'education', name: 'education.md', icon: fileIcons.md },
    { id: 'contact', name: 'contact.json', icon: fileIcons.json },
    ...projectFiles.map(p => ({ id: p.id, name: p.name, icon: fileIcons.pkg }))
  ]

  const commands = [
    { label: 'Go to File', action: () => {} },
    { label: 'Toggle Sidebar', action: () => setSidebarWidth(sidebarWidth > 0 ? 0 : 250) },
    { label: 'Open README.md', action: () => openFile('readme') },
    { label: 'Open experience.json', action: () => openFile('experience') },
    { label: 'Open skills.yaml', action: () => openFile('skills') },
  ]

  const filteredCommands = commands.filter(c => 
    c.label.toLowerCase().includes(commandSearch.toLowerCase())
  )

  return (
    <div 
      className="min-h-screen bg-[#1e1e1e] text-[#cccccc] flex flex-col"
      style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace" }}
    >
      <div className="h-8 bg-[#323233] flex items-center px-4 text-xs border-b border-[#252526]">
        <div className="flex items-center gap-4">
          <span className="text-[#cccccc]">File</span>
          <span className="text-[#cccccc]">Edit</span>
          <span className="text-[#cccccc]">View</span>
          <span className="text-[#cccccc]">Go</span>
          <span className="text-[#cccccc]">Help</span>
        </div>
        <div className="flex-1 text-center text-[#cccccc]">
          {manifest.personalInfo.name} - Portfolio - Visual Studio Code
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <ActivityBar activePanel={activePanel} onPanelChange={setActivePanel} />

        <AnimatePresence>
          {sidebarWidth > 0 && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: sidebarWidth }}
              exit={{ width: 0 }}
              className="bg-[#252526] border-r border-[#1e1e1e] overflow-hidden flex-shrink-0"
            >
              {activePanel === 'explorer' && (
                <FileExplorer
                  files={allFiles}
                  projectFiles={projectFiles}
                  activeFile={activeFile}
                  onFileOpen={openFile}
                />
              )}
              {activePanel === 'search' && (
                <div className="p-3">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full bg-[#3c3c3c] border border-[#3c3c3c] rounded px-3 py-1 text-sm focus:border-[#007acc] outline-none"
                  />
                </div>
              )}
              {activePanel === 'git' && (
                <div className="p-3">
                  <p className="text-xs text-[#cccccc] mb-2">SOURCE CONTROL</p>
                  <p className="text-xs text-[#858585]">No changes detected</p>
                </div>
              )}
              {activePanel === 'extensions' && (
                <div className="p-3">
                  <p className="text-xs text-[#cccccc] mb-2">EXTENSIONS</p>
                  <p className="text-xs text-[#858585]">Theme by {manifest.personalInfo.name}</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 flex flex-col min-w-0">
          <TabBar
            files={openFiles.map(f => allFiles.find(af => af.id === f)!).filter(Boolean)}
            activeFile={activeFile}
            onFileSelect={(id) => setActiveFile(id)}
            onFileClose={closeFile}
          />

          <EditorPane
            activeFile={activeFile}
            manifest={manifest}
            projectFiles={projectFiles}
          />
        </div>
      </div>

      <StatusBar activeFile={activeFile} />

      <AnimatePresence>
        {showCommandPalette && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex justify-center pt-20"
            onClick={() => setShowCommandPalette(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="bg-[#252526] rounded-lg shadow-2xl w-[600px] max-h-80 overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <input
                type="text"
                value={commandSearch}
                onChange={(e) => setCommandSearch(e.target.value)}
                placeholder="> Type a command"
                className="w-full bg-[#3c3c3c] px-4 py-3 text-sm outline-none border-b border-[#1e1e1e]"
                autoFocus
              />
              <div className="max-h-60 overflow-auto">
                {filteredCommands.map((cmd, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 hover:bg-[#094771] cursor-pointer text-sm"
                    onClick={() => {
                      cmd.action()
                      setShowCommandPalette(false)
                    }}
                  >
                    {cmd.label}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
