interface ActivityBarProps {
  activePanel: 'explorer' | 'search' | 'git' | 'extensions'
  onPanelChange: (panel: 'explorer' | 'search' | 'git' | 'extensions') => void
}

export const ActivityBar = ({ activePanel, onPanelChange }: ActivityBarProps) => {
  const items = [
    { id: 'explorer' as const, icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.5 0h-9L7 1.5V6H2.5L1 7.5v15.07L2.5 24h12.07L16 22.57V18h4.7l1.3-1.43V4.5L17.5 0zm0 2.12l2.38 2.38H17.5V2.12zm-3 20.38h-12v-15H7v9.07L8.5 18h6v4.5zm6-6h-12v-15H16V6h4.5v10.5z"/>
      </svg>
    )},
    { id: 'search' as const, icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M15.25 0a8.25 8.25 0 00-6.18 13.72L1 22.88l1.12 1.12 8.07-9.04A8.25 8.25 0 1015.25 0zm0 15a6.75 6.75 0 110-13.5 6.75 6.75 0 010 13.5z"/>
      </svg>
    )},
    { id: 'git' as const, icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21.007 8.222A3.738 3.738 0 0 0 15.045 5.2a3.737 3.737 0 0 0 1.156 6.583 2.988 2.988 0 0 1-2.668 1.67h-2.99a4.456 4.456 0 0 0-2.989 1.165V7.4a3.737 3.737 0 1 0-1.494 0v9.117a3.776 3.776 0 1 0 1.816.099 2.99 2.99 0 0 1 2.668-1.667h2.99a4.484 4.484 0 0 0 4.223-3.039 3.736 3.736 0 0 0 3.25-3.687zM4.565 3.738a2.242 2.242 0 1 1 4.484 0 2.242 2.242 0 0 1-4.484 0zm4.484 16.441a2.242 2.242 0 1 1-4.484 0 2.242 2.242 0 0 1 4.484 0zm8.221-9.715a2.242 2.242 0 1 1 0-4.485 2.242 2.242 0 0 1 0 4.485z"/>
      </svg>
    )},
    { id: 'extensions' as const, icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.5 1.5L15 0h7.5L24 1.5V9l-1.5 1.5H15L13.5 9V1.5zm1.5 0V9h7.5V1.5H15zM0 15l1.5-1.5H9L10.5 15v7.5L9 24H1.5L0 22.5V15zm1.5 0v7.5H9V15H1.5zm0-13.5L0 0h7.5L9 1.5V9L7.5 10.5H0V9h7.5V1.5H1.5zm12 12L12 12h7.5l1.5 1.5V21l-1.5 1.5H12V21h7.5v-7.5H13.5z"/>
      </svg>
    )},
  ]

  return (
    <div className="w-12 bg-[#333333] flex flex-col items-center py-2 border-r border-[#252526] flex-shrink-0">
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => onPanelChange(item.id)}
          className={`w-12 h-12 flex items-center justify-center transition ${
            activePanel === item.id 
              ? 'text-white border-l-2 border-white' 
              : 'text-[#858585] hover:text-white border-l-2 border-transparent'
          }`}
        >
          {item.icon}
        </button>
      ))}
    </div>
  )
}
