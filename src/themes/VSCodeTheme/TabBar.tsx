interface TabFile {
  id: string
  name: string
  icon?: React.ReactNode
}

interface TabBarProps {
  files: TabFile[]
  activeFile: string
  onFileSelect: (id: string) => void
  onFileClose: (id: string) => void
}

export const TabBar = ({ files, activeFile, onFileSelect, onFileClose }: TabBarProps) => {
  const getFileIcon = (name: string) => {
    if (name.endsWith('.md')) return 'text-blue-400'
    if (name.endsWith('.json')) return 'text-yellow-400'
    if (name.endsWith('.yaml') || name.endsWith('.yml')) return 'text-red-400'
    if (name === 'contact.json') return 'text-green-400'
    return 'text-[#cccccc]'
  }

  return (
    <div className="h-9 bg-[#252526] flex items-center overflow-x-auto border-b border-[#1e1e1e]">
      {files.map(file => (
        <div
          key={file.id}
          className={`h-full flex items-center gap-2 px-3 cursor-pointer border-r border-[#1e1e1e] group ${
            activeFile === file.id 
              ? 'bg-[#1e1e1e] text-white' 
              : 'bg-[#2d2d2d] text-[#969696] hover:bg-[#2a2d2e]'
          }`}
          onClick={() => onFileSelect(file.id)}
        >
          <span className={`text-xs ${getFileIcon(file.name)}`}>●</span>
          <span className="text-xs whitespace-nowrap">{file.name}</span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onFileClose(file.id)
            }}
            className="w-4 h-4 flex items-center justify-center rounded hover:bg-[#3c3c3c] opacity-0 group-hover:opacity-100 transition"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
