import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PreviewCardProps {
  item: {
    name: string
    description: string
    technologies?: string[]
    image?: string
  }
  index: number
  onSelect: () => void
  showTopBadge?: boolean
  progress?: number
}

export const PreviewCard = ({ item, index, onSelect, showTopBadge, progress }: PreviewCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isInList, setIsInList] = useState(false)
  const [isLiked, setIsLiked] = useState<boolean | null>(null)

  const gradients = [
    'from-red-600 to-orange-600',
    'from-blue-600 to-purple-600',
    'from-green-600 to-teal-600',
    'from-pink-600 to-rose-600',
    'from-yellow-600 to-orange-600',
    'from-indigo-600 to-blue-600',
  ]

  return (
    <div 
      className="flex-shrink-0 w-[200px] md:w-[250px] relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showTopBadge && (
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <span 
            className="text-7xl font-bold text-transparent"
            style={{ 
              WebkitTextStroke: '2px rgba(255,255,255,0.5)',
              fontFamily: "'Bebas Neue', sans-serif"
            }}
          >
            {index + 1}
          </span>
        </div>
      )}

      {/* Base card - always visible */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.05 }}
        className={`aspect-video rounded overflow-hidden relative cursor-pointer ${showTopBadge ? 'ml-8' : ''}`}
        onClick={onSelect}
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center p-4`}>
            <span className="text-lg font-bold text-center line-clamp-2">{item.name}</span>
          </div>
        )}

        {progress && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
            <div 
              className="h-full bg-red-600"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </motion.div>

      {/* Expanded hover card */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: -20 }}
            exit={{ opacity: 0, scale: 0.9, y: 0 }}
            transition={{ type: 'tween', duration: 0.2 }}
            className={`absolute top-0 ${showTopBadge ? 'left-8' : 'left-0'} right-0 z-30 cursor-pointer`}
            style={{ 
              width: showTopBadge ? 'calc(100% - 32px)' : '100%',
              transformOrigin: 'center top'
            }}
          >
            <div className="bg-[#181818] rounded-lg overflow-hidden shadow-2xl shadow-black/80">
              {/* Image section */}
              <div className="aspect-video relative" onClick={onSelect}>
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center p-4`}>
                    <span className="text-lg font-bold text-center line-clamp-2">{item.name}</span>
                  </div>
                )}
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:bg-white transition"
                  >
                    <svg className="w-6 h-6 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.div>
                </div>

                {progress && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
                    <div 
                      className="h-full bg-red-600"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Info section */}
              <div className="p-3">
                {/* Action buttons */}
                <div className="flex items-center gap-2 mb-3">
                  <motion.button 
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onSelect}
                  >
                    <svg className="w-4 h-4 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.button>
                  <motion.button 
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition ${
                      isInList ? 'border-white bg-white/20' : 'border-gray-400 hover:border-white'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsInList(!isInList)
                    }}
                  >
                    {isInList ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    )}
                  </motion.button>
                  <motion.button 
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition ${
                      isLiked === true ? 'border-white bg-white/20' : 'border-gray-400 hover:border-white'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsLiked(isLiked === true ? null : true)
                    }}
                  >
                    <svg className="w-4 h-4" fill={isLiked === true ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                  </motion.button>
                  <motion.button 
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition ${
                      isLiked === false ? 'border-white bg-white/20' : 'border-gray-400 hover:border-white'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsLiked(isLiked === false ? null : false)
                    }}
                  >
                    <svg className="w-4 h-4 rotate-180" fill={isLiked === false ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                  </motion.button>
                  <motion.button 
                    className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white ml-auto"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onSelect}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.button>
                </div>

                {/* Meta info */}
                <div className="flex items-center gap-2 text-xs mb-2">
                  <span className="text-green-500 font-semibold">98% Match</span>
                  <span className="border border-gray-500 px-1 text-[10px]">HD</span>
                  <span className="border border-gray-500 px-1 text-[10px]">5.1</span>
                </div>

                {/* Technologies */}
                {item.technologies && item.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-xs text-gray-400">
                        {tech}{i < Math.min(item.technologies!.length, 3) - 1 ? ' •' : ''}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
