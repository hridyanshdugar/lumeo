import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PortfolioManifest } from '../../types/manifest'

interface TweetData {
  id: number
  type: 'experience' | 'project'
  content: string
  date: string
  likes: number
  retweets: number
  views: number
  image?: string
  links?: {
    github?: string
    demo?: string
    [key: string]: string | undefined
  }
}

interface TweetProps {
  tweet: TweetData
  manifest: PortfolioManifest
  darkMode: boolean
  isLiked: boolean
  onLike: () => void
  index: number
}

export const Tweet = ({ tweet, manifest, darkMode, isLiked, onLike, index }: TweetProps) => {
  const [isRetweeted, setIsRetweeted] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showRetweetMenu, setShowRetweetMenu] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [copied, setCopied] = useState(false)

  const borderColor = darkMode ? 'border-gray-800' : 'border-gray-200'
  const secondaryText = darkMode ? 'text-gray-500' : 'text-gray-500'

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const handleRetweet = () => {
    setIsRetweeted(!isRetweeted)
    setShowRetweetMenu(false)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
      setShowShareMenu(false)
    }, 1500)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`p-4 border-b ${borderColor} ${darkMode ? 'hover:bg-gray-900/50' : 'hover:bg-gray-50'} transition cursor-pointer`}
    >
      <div className="flex gap-3">
        {manifest.personalInfo.avatar ? (
          <img
            src={manifest.personalInfo.avatar}
            alt={manifest.personalInfo.name}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
            <span className="font-bold">{manifest.personalInfo.name[0]}</span>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-1">
            <span className="font-bold truncate">{manifest.personalInfo.name}</span>
            <svg className="w-4 h-4 text-blue-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484z" />
            </svg>
            <span className={`${secondaryText} truncate`}>@{manifest.personalInfo.name.toLowerCase().replace(/\s+/g, '')}</span>
            <span className={secondaryText}>·</span>
            <span className={secondaryText}>{tweet.date}</span>
          </div>

          <p className="whitespace-pre-wrap mb-3 break-words" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{tweet.content}</p>

          {tweet.image && (
            <motion.div 
              className="mb-3 rounded-2xl overflow-hidden cursor-pointer relative group"
              onClick={(e) => {
                e.stopPropagation()
                setShowImageModal(true)
              }}
              whileHover={{ scale: 1.02 }}
            >
              <img src={tweet.image} alt="" className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="opacity-0 group-hover:opacity-100"
                >
                  <svg className="w-8 h-8 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {showImageModal && tweet.image && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                onClick={() => setShowImageModal(false)}
              >
                <motion.img
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                  src={tweet.image}
                  alt=""
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
                <button
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gray-700"
                  onClick={() => setShowImageModal(false)}
                >
                  ✕
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {tweet.links && (tweet.links.github || tweet.links.demo) && (
            <div className={`mb-3 p-3 rounded-xl border ${borderColor}`}>
              <div className="flex items-center gap-2">
                <span className="text-sm">🔗</span>
                {tweet.links.github && (
                  <a 
                    href={tweet.links.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 text-sm hover:underline"
                    onClick={e => e.stopPropagation()}
                  >
                    View on GitHub
                  </a>
                )}
                {tweet.links.demo && (
                  <a 
                    href={tweet.links.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 text-sm hover:underline"
                    onClick={e => e.stopPropagation()}
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          )}

          <div className={`flex justify-between max-w-md ${secondaryText}`}>
            <button className="flex items-center gap-2 group">
              <span className="p-2 rounded-full group-hover:bg-blue-500/10 group-hover:text-blue-500 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </span>
              <span className="text-sm group-hover:text-blue-500">{Math.floor(tweet.retweets / 3)}</span>
            </button>

            <div className="relative">
              <button 
                className={`flex items-center gap-2 group ${isRetweeted ? 'text-green-500' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setShowRetweetMenu(!showRetweetMenu)
                }}
              >
                <motion.span 
                  className={`p-2 rounded-full transition ${isRetweeted ? 'text-green-500 bg-green-500/10' : 'group-hover:bg-green-500/10 group-hover:text-green-500'}`}
                  animate={isRetweeted ? { rotate: [0, 360] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </motion.span>
                <span className={`text-sm ${isRetweeted ? 'text-green-500' : 'group-hover:text-green-500'}`}>
                  {formatNumber(tweet.retweets + (isRetweeted ? 1 : 0))}
                </span>
              </button>
              <AnimatePresence>
                {showRetweetMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className={`absolute bottom-full left-0 mb-2 rounded-xl shadow-xl overflow-hidden z-10 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button 
                      className={`w-full px-4 py-3 text-left text-sm flex items-center gap-3 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                      onClick={handleRetweet}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      {isRetweeted ? 'Undo Repost' : 'Repost'}
                    </button>
                    <button 
                      className={`w-full px-4 py-3 text-left text-sm flex items-center gap-3 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                      onClick={() => setShowRetweetMenu(false)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Quote
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              className="flex items-center gap-2 group"
              onClick={(e) => {
                e.stopPropagation()
                onLike()
              }}
            >
              <motion.span 
                className={`p-2 rounded-full transition ${isLiked ? 'text-pink-500' : 'group-hover:bg-pink-500/10 group-hover:text-pink-500'}`}
                animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
              >
                <svg className="w-4 h-4" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </motion.span>
              <span className={`text-sm ${isLiked ? 'text-pink-500' : 'group-hover:text-pink-500'}`}>
                {formatNumber(tweet.likes + (isLiked ? 1 : 0))}
              </span>
            </button>

            <button className="flex items-center gap-2 group">
              <span className="p-2 rounded-full group-hover:bg-blue-500/10 group-hover:text-blue-500 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </span>
              <span className="text-sm group-hover:text-blue-500">{formatNumber(tweet.views)}</span>
            </button>

            <div className="relative">
              <button 
                className="p-2 rounded-full hover:bg-blue-500/10 hover:text-blue-500 transition"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowShareMenu(!showShareMenu)
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </button>
              <AnimatePresence>
                {showShareMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className={`absolute bottom-full right-0 mb-2 rounded-xl shadow-xl overflow-hidden z-10 min-w-[200px] ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button 
                      className={`w-full px-4 py-3 text-left text-sm flex items-center gap-3 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                      onClick={handleCopyLink}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      {copied ? 'Copied!' : 'Copy link'}
                    </button>
                    <button 
                      className={`w-full px-4 py-3 text-left text-sm flex items-center gap-3 ${
                        isBookmarked ? 'text-blue-500' : ''
                      } ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                      onClick={() => {
                        setIsBookmarked(!isBookmarked)
                        setShowShareMenu(false)
                      }}
                    >
                      <svg className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                      {isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
                    </button>
                    <button 
                      className={`w-full px-4 py-3 text-left text-sm flex items-center gap-3 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                      onClick={() => setShowShareMenu(false)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      Share via...
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button 
              className={`p-2 rounded-full transition ${isBookmarked ? 'text-blue-500' : 'hover:bg-blue-500/10 hover:text-blue-500'}`}
              onClick={(e) => {
                e.stopPropagation()
                setIsBookmarked(!isBookmarked)
              }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.svg 
                className="w-4 h-4" 
                fill={isBookmarked ? 'currentColor' : 'none'} 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={isBookmarked ? { scale: [1, 1.3, 1] } : {}}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </motion.svg>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
