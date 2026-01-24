import { useState } from 'react'
import { motion } from 'framer-motion'
import { PortfolioManifest } from '../../types/manifest'

interface NowPlayingBarProps {
  currentItem: string
  isPlaying: boolean
  onPlayPause: () => void
  progress: number
  manifest: PortfolioManifest
}

export const NowPlayingBar = ({ currentItem, isPlaying, onPlayPause, progress, manifest }: NowPlayingBarProps) => {
  const [volume, setVolume] = useState(75)
  const [isMuted, setIsMuted] = useState(false)
  const [repeat, setRepeat] = useState<'off' | 'all' | 'one'>('off')
  const [shuffle, setShuffle] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [hoverProgress, setHoverProgress] = useState<number | null>(null)

  const cycleRepeat = () => {
    setRepeat(prev => prev === 'off' ? 'all' : prev === 'all' ? 'one' : 'off')
  }

  const formatTime = (percent: number) => {
    const totalSeconds = Math.floor((percent / 100) * 225)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-zinc-900 border-t border-zinc-800 px-4 py-3 flex-shrink-0">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <motion.div 
            className="w-14 h-14 bg-zinc-800 rounded flex-shrink-0 flex items-center justify-center overflow-hidden"
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={isPlaying ? { duration: 3, repeat: Infinity, ease: 'linear' } : {}}
          >
            {manifest.personalInfo.avatar ? (
              <img 
                src={manifest.personalInfo.avatar} 
                alt="" 
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <span className="text-xl font-bold text-green-500">{manifest.personalInfo.name[0]}</span>
            )}
          </motion.div>
          <div className="min-w-0">
            <p className="font-medium truncate hover:underline cursor-pointer">{currentItem}</p>
            <p className="text-sm text-zinc-400 truncate hover:underline cursor-pointer">{manifest.personalInfo.name}</p>
          </div>
          <motion.button 
            className={`flex-shrink-0 ${isLiked ? 'text-green-500' : 'text-zinc-400 hover:text-white'} transition`}
            onClick={() => setIsLiked(!isLiked)}
            whileTap={{ scale: 1.2 }}
          >
            <motion.svg 
              className="w-5 h-5" 
              fill={isLiked ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </motion.svg>
          </motion.button>
        </div>

        <div className="flex flex-col items-center gap-2 flex-1 max-w-xl">
          <div className="flex items-center gap-4">
            <button 
              className={`transition ${shuffle ? 'text-green-500' : 'text-zinc-400 hover:text-white'}`}
              onClick={() => setShuffle(!shuffle)}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
              </svg>
            </button>
            <button className="text-zinc-400 hover:text-white transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>
            <motion.button
              onClick={onPlayPause}
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-105 transition"
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? (
                <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </motion.button>
            <button className="text-zinc-400 hover:text-white transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>
            <button 
              className={`transition relative ${repeat !== 'off' ? 'text-green-500' : 'text-zinc-400 hover:text-white'}`}
              onClick={cycleRepeat}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
              </svg>
              {repeat === 'one' && (
                <span className="absolute -top-1 -right-1 text-[8px] font-bold">1</span>
              )}
            </button>
          </div>
          <div className="w-full flex items-center gap-2 group">
            <span className="text-xs text-zinc-400 w-10 text-right">{formatTime(progress)}</span>
            <div 
              className="flex-1 h-1 bg-zinc-600 rounded-full overflow-hidden cursor-pointer relative"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const percent = ((e.clientX - rect.left) / rect.width) * 100
                setHoverProgress(percent)
              }}
              onMouseLeave={() => setHoverProgress(null)}
            >
              <motion.div 
                className="h-full bg-white group-hover:bg-green-500 transition-colors relative"
                style={{ width: `${progress}%` }}
              >
                <motion.div 
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-lg"
                  whileHover={{ scale: 1.2 }}
                />
              </motion.div>
              {hoverProgress !== null && (
                <div 
                  className="absolute top-0 h-full bg-white/30"
                  style={{ width: `${hoverProgress}%` }}
                />
              )}
            </div>
            <span className="text-xs text-zinc-400 w-10">3:45</span>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-1 justify-end">
          <button className="text-zinc-400 hover:text-white transition hidden md:block">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z" />
            </svg>
          </button>
          <button className="text-zinc-400 hover:text-white transition hidden md:block">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM9 8h2v8H9zm4 2h2v6h-2z" />
            </svg>
          </button>
          <button 
            className={`transition ${isMuted ? 'text-red-500' : 'text-zinc-400 hover:text-white'}`}
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted || volume === 0 ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </svg>
            ) : volume < 50 ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            )}
          </button>
          <div className="w-24 group flex items-center">
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(Number(e.target.value))
                setIsMuted(false)
              }}
              className="w-full h-1 bg-zinc-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:opacity-0 [&::-webkit-slider-thumb]:group-hover:opacity-100 [&::-webkit-slider-thumb]:transition"
              style={{
                background: `linear-gradient(to right, white ${isMuted ? 0 : volume}%, rgb(82 82 91) ${isMuted ? 0 : volume}%)`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
