import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PortfolioManifest } from '../../types/manifest'
import { ProfileHeader } from './ProfileHeader.tsx'
import { Tweet } from './Tweet.tsx'
import { Timeline } from './Timeline.tsx'
import { TrendingSidebar } from './TrendingSidebar.tsx'

interface TwitterThemeProps {
  manifest: PortfolioManifest
}

export const TwitterTheme = ({ manifest }: TwitterThemeProps) => {
  const [darkMode, setDarkMode] = useState(true)
  const [activeTab, setActiveTab] = useState<'tweets' | 'replies' | 'media' | 'likes'>('tweets')
  const [likedTweets, setLikedTweets] = useState<Set<number>>(new Set())
  const [showHearts, setShowHearts] = useState(false)

  useEffect(() => {
    const handleDoubleClick = () => {
      setShowHearts(true)
      setTimeout(() => setShowHearts(false), 1000)
    }
    document.addEventListener('dblclick', handleDoubleClick)
    return () => document.removeEventListener('dblclick', handleDoubleClick)
  }, [])

  const bgColor = darkMode ? 'bg-black' : 'bg-white'
  const textColor = darkMode ? 'text-white' : 'text-gray-900'
  const borderColor = darkMode ? 'border-gray-800' : 'border-gray-200'

  const tweets = [
    ...manifest.experience.map((exp, idx) => ({
      id: idx,
      type: 'experience' as const,
      content: `🚀 Started a new role as ${exp.position} at ${exp.company}!\n\n${exp.description}`,
      date: exp.startDate,
      likes: Math.floor(Math.random() * 500) + 50,
      retweets: Math.floor(Math.random() * 100) + 10,
      views: Math.floor(Math.random() * 10000) + 1000,
    })),
    ...manifest.projects.map((project, idx) => ({
      id: 100 + idx,
      type: 'project' as const,
      content: `Just shipped: ${project.name}\n\n${project.description}\n\n${project.technologies.slice(0, 4).map(t => `#${t.replace(/\s+/g, '')}`).join(' ')}`,
      date: 'Recently',
      likes: Math.floor(Math.random() * 800) + 100,
      retweets: Math.floor(Math.random() * 200) + 20,
      views: Math.floor(Math.random() * 20000) + 2000,
      image: project.image,
      links: project.links,
    })),
  ]

  const handleLike = (tweetId: number) => {
    setLikedTweets(prev => {
      const newSet = new Set(prev)
      if (newSet.has(tweetId)) {
        newSet.delete(tweetId)
      } else {
        newSet.add(tweetId)
      }
      return newSet
    })
  }

  return (
    <div 
      className={`min-h-screen ${bgColor} ${textColor}`}
      style={{ fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto flex">
        <aside className={`w-20 xl:w-64 h-screen sticky top-0 border-r ${borderColor} p-2 xl:p-4 flex flex-col`}>
          <div className="mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
              <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            <button className={`w-full flex items-center gap-4 p-3 rounded-full transition ${darkMode ? 'hover:bg-gray-900' : 'hover:bg-gray-100'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              <span className="hidden xl:block text-lg">Home</span>
            </button>
            <button className={`w-full flex items-center gap-4 p-3 rounded-full transition ${darkMode ? 'hover:bg-gray-900' : 'hover:bg-gray-100'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <span className="hidden xl:block text-lg">Explore</span>
            </button>
            <button className={`w-full flex items-center gap-4 p-3 rounded-full transition ${darkMode ? 'hover:bg-gray-900' : 'hover:bg-gray-100'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="hidden xl:block text-lg">Notifications</span>
            </button>
            <button className={`w-full flex items-center gap-4 p-3 rounded-full transition ${darkMode ? 'hover:bg-gray-900' : 'hover:bg-gray-100'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <span className="hidden xl:block text-lg">Messages</span>
            </button>
            <button className={`w-full flex items-center gap-4 p-3 rounded-full transition ${darkMode ? 'hover:bg-gray-900' : 'hover:bg-gray-100'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              <span className="hidden xl:block text-lg">Profile</span>
            </button>
          </nav>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-full flex items-center gap-4 p-3 rounded-full transition mb-4 ${
              darkMode ? 'hover:bg-gray-900' : 'hover:bg-gray-100'
            }`}
          >
            {darkMode ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
            <span className="hidden xl:block text-lg">{darkMode ? 'Light' : 'Dark'}</span>
          </button>

          <button className="w-full xl:w-auto bg-blue-500 text-white py-3 px-4 rounded-full font-semibold hover:bg-blue-600 transition">
            <svg className="w-5 h-5 xl:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            <span className="hidden xl:block">Post</span>
          </button>
        </aside>

        <main className={`flex-1 border-r ${borderColor} min-h-screen`}>
          <ProfileHeader
            manifest={manifest}
            darkMode={darkMode}
          />

          <div className={`flex border-b ${borderColor}`}>
            {(['tweets', 'replies', 'media', 'likes'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-sm font-medium capitalize transition relative ${
                  activeTab === tab 
                    ? 'text-white' 
                    : darkMode ? 'text-gray-500 hover:bg-gray-900' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-blue-500 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          <Timeline>
            {activeTab === 'tweets' && tweets.map((tweet, idx) => (
              <Tweet
                key={tweet.id}
                tweet={tweet}
                manifest={manifest}
                darkMode={darkMode}
                isLiked={likedTweets.has(tweet.id)}
                onLike={() => handleLike(tweet.id)}
                index={idx}
              />
            ))}
            {activeTab === 'media' && manifest.projects.filter(p => p.image).map((project, idx) => (
              <Tweet
                key={idx}
                tweet={{
                  id: 200 + idx,
                  type: 'project',
                  content: project.name,
                  date: 'Recently',
                  likes: Math.floor(Math.random() * 500),
                  retweets: Math.floor(Math.random() * 100),
                  views: Math.floor(Math.random() * 10000),
                  image: project.image,
                }}
                manifest={manifest}
                darkMode={darkMode}
                isLiked={likedTweets.has(200 + idx)}
                onLike={() => handleLike(200 + idx)}
                index={idx}
              />
            ))}
            {(activeTab === 'replies' || activeTab === 'likes') && (
              <div className={`p-8 text-center ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                No {activeTab} to display
              </div>
            )}
          </Timeline>
        </main>

        <TrendingSidebar
          manifest={manifest}
          darkMode={darkMode}
        />
      </div>

      <AnimatePresence>
        {showHearts && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight,
                  scale: 0,
                  opacity: 1
                }}
                animate={{ 
                  y: -100,
                  scale: [0, 1.5, 1],
                  opacity: [1, 1, 0]
                }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
                className="absolute"
              >
                <svg className="w-10 h-10 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
