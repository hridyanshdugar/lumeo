import { ThemeName } from '../App'

interface ThemeSwitcherProps {
  currentTheme: ThemeName
  onThemeChange: (theme: ThemeName) => void
  themes: ThemeName[]
}

export default function ThemeSwitcher({ currentTheme, onThemeChange, themes }: ThemeSwitcherProps) {
  return (
    <div className="fixed top-4 right-4 z-50 bg-black border-2 border-cyan-400/50 shadow-[0_0_30px_rgba(0,243,255,0.2)] p-2">
      <div className="flex gap-2">
        {themes.map(theme => (
          <button
            key={theme}
            onClick={() => onThemeChange(theme)}
            className={`px-4 py-2 capitalize transition-colors font-mono tracking-wide ${
              currentTheme === theme
                ? 'bg-cyan-500/30 text-cyan-400 border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.4)]'
                : 'bg-black text-cyan-400/70 border border-cyan-400/30 hover:border-cyan-400/50 hover:text-cyan-400'
            }`}
          >
            {theme}
          </button>
        ))}
      </div>
    </div>
  )
}
