import { ThemeName } from '../App'

type ThemeSelectorProps = {
  themes: { [key: string]: React.LazyExoticComponent<React.ComponentType<{ manifest: any }>> }
  currentTheme: ThemeName
  onThemeChange: (theme: ThemeName) => void
  onClose: () => void // This prop is still needed for consistency, but its usage will be external
}

export default function ThemeSelector({ themes, currentTheme, onThemeChange, onClose }: ThemeSelectorProps) {
  return (
    <div className="border-t-4 border-neutral-600 pt-4">
      <div className="flex border-b-4 border-neutral-600">
        <button className="px-6 py-2 bg-neutral-800 text-white font-mono tracking-wider uppercase border-r-4 border-neutral-600">
          CS
        </button>
      </div>
      <div className="p-4 bg-neutral-800">
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(themes).map((theme) => (
            <button
              key={theme}
              onClick={() => onThemeChange(theme as ThemeName)}
              className={`w-full px-4 py-3 text-left capitalize transition-all font-mono tracking-wide border-2 ${
                currentTheme === theme
                  ? 'bg-neutral-600 text-white border-neutral-400'
                  : 'bg-neutral-700 text-neutral-300 border-neutral-500 hover:bg-neutral-600'
              }`}
              style={{ imageRendering: 'pixelated' }}
            >
              <span className="mr-2">{currentTheme === theme ? '▶' : '◆'}</span>
              {theme}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
