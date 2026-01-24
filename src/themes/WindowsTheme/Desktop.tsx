import { motion } from 'framer-motion'

interface App {
  id: string
  title: string
  icon: React.ReactNode
  content: string
}

interface DesktopProps {
  apps: App[]
  onOpenApp: (app: App) => void
}

export const Desktop = ({ apps, onOpenApp }: DesktopProps) => {
  return (
    <div className="absolute inset-0 pb-12 overflow-hidden">
      {/* Bliss wallpaper recreation */}
      <div className="absolute inset-0">
        {/* Sky */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #245EDC 0%, #4A90E2 25%, #87CEEB 50%, #B0E2FF 70%, #E8F4FF 100%)'
          }}
        />
        
        {/* Clouds */}
        <div 
          className="absolute top-[8%] left-[10%] w-32 h-12 rounded-full opacity-90"
          style={{ background: 'radial-gradient(ellipse, white 0%, rgba(255,255,255,0.8) 50%, transparent 70%)' }}
        />
        <div 
          className="absolute top-[5%] left-[15%] w-24 h-10 rounded-full opacity-80"
          style={{ background: 'radial-gradient(ellipse, white 0%, rgba(255,255,255,0.7) 50%, transparent 70%)' }}
        />
        <div 
          className="absolute top-[12%] right-[20%] w-40 h-14 rounded-full opacity-85"
          style={{ background: 'radial-gradient(ellipse, white 0%, rgba(255,255,255,0.8) 50%, transparent 70%)' }}
        />
        <div 
          className="absolute top-[6%] right-[25%] w-28 h-10 rounded-full opacity-75"
          style={{ background: 'radial-gradient(ellipse, white 0%, rgba(255,255,255,0.7) 50%, transparent 70%)' }}
        />
        <div 
          className="absolute top-[15%] left-[40%] w-36 h-12 rounded-full opacity-70"
          style={{ background: 'radial-gradient(ellipse, white 0%, rgba(255,255,255,0.6) 50%, transparent 70%)' }}
        />
        
        {/* Rolling hills */}
        <svg className="absolute bottom-0 left-0 w-full h-[60%]" preserveAspectRatio="none" viewBox="0 0 1440 600">
          <defs>
            <linearGradient id="hillGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7CB342" />
              <stop offset="50%" stopColor="#558B2F" />
              <stop offset="100%" stopColor="#33691E" />
            </linearGradient>
            <linearGradient id="hillGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8BC34A" />
              <stop offset="50%" stopColor="#689F38" />
              <stop offset="100%" stopColor="#33691E" />
            </linearGradient>
            <linearGradient id="hillGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9CCC65" />
              <stop offset="50%" stopColor="#7CB342" />
              <stop offset="100%" stopColor="#558B2F" />
            </linearGradient>
          </defs>
          
          {/* Background hill */}
          <path 
            d="M0,250 Q200,150 400,200 T800,180 T1200,220 T1440,200 L1440,600 L0,600 Z" 
            fill="url(#hillGradient1)"
          />
          
          {/* Middle hill */}
          <path 
            d="M0,350 Q150,250 350,300 T700,270 T1100,320 T1440,280 L1440,600 L0,600 Z" 
            fill="url(#hillGradient2)"
          />
          
          {/* Foreground hill */}
          <path 
            d="M0,450 Q250,350 500,400 T900,380 T1300,420 T1440,400 L1440,600 L0,600 Z" 
            fill="url(#hillGradient3)"
          />
        </svg>
      </div>
      
      <div className="relative p-2 grid grid-cols-1 gap-1 w-20">
        {apps.map((app, idx) => (
          <motion.button
            key={app.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onDoubleClick={() => onOpenApp(app)}
            className="flex flex-col items-center gap-0.5 p-1.5 rounded-sm transition text-white text-center group
              hover:bg-[#316AC5]/60 focus:bg-[#316AC5]/60
              hover:outline hover:outline-1 hover:outline-[#7DA2CE] hover:outline-dotted
              focus:outline focus:outline-1 focus:outline-[#7DA2CE] focus:outline-dotted"
          >
            <div className="w-12 h-12 flex items-center justify-center drop-shadow-md group-hover:drop-shadow-lg transition-all">
              {app.icon}
            </div>
            <span 
              className="text-[11px] leading-tight px-0.5 max-w-[72px] break-words group-hover:bg-[#316AC5] group-focus:bg-[#316AC5]"
              style={{ 
                textShadow: '1px 1px 1px rgba(0,0,0,0.9), -1px -1px 1px rgba(0,0,0,0.9), 1px -1px 1px rgba(0,0,0,0.9), -1px 1px 1px rgba(0,0,0,0.9)'
              }}
            >
              {app.title}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
