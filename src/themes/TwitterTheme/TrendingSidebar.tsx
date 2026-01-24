import { PortfolioManifest } from '../../types/manifest'

interface TrendingSidebarProps {
  manifest: PortfolioManifest
  darkMode: boolean
}

export const TrendingSidebar = ({ manifest, darkMode }: TrendingSidebarProps) => {
  const bgColor = darkMode ? 'bg-gray-900' : 'bg-gray-50'
  const secondaryText = darkMode ? 'text-gray-500' : 'text-gray-500'

  const skillsAsTrends = manifest.skills.flatMap(group => 
    group.items.slice(0, 2).map(skill => ({
      category: group.category,
      topic: skill,
      posts: Math.floor(Math.random() * 50) + 10
    }))
  ).slice(0, 5)

  return (
    <aside className="w-80 h-screen sticky top-0 p-4 hidden lg:block">
      <div className={`${bgColor} rounded-2xl p-4 mb-4`}>
        <input
          type="text"
          placeholder="Search"
          className={`w-full px-4 py-2 rounded-full border-none outline-none ${
            darkMode ? 'bg-gray-800 text-white placeholder-gray-500' : 'bg-gray-200 text-gray-900 placeholder-gray-500'
          }`}
        />
      </div>

      <div className={`${bgColor} rounded-2xl overflow-hidden mb-4`}>
        <h2 className="font-bold text-xl p-4">What's happening</h2>
        {skillsAsTrends.map((trend, idx) => (
          <div 
            key={idx} 
            className={`px-4 py-3 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} cursor-pointer transition`}
          >
            <p className={`text-xs ${secondaryText}`}>{trend.category} · Trending</p>
            <p className="font-semibold">{trend.topic}</p>
            <p className={`text-xs ${secondaryText}`}>{trend.posts}K posts</p>
          </div>
        ))}
        <button className="w-full px-4 py-3 text-blue-500 text-left hover:bg-gray-800/50 transition">
          Show more
        </button>
      </div>

      <div className={`${bgColor} rounded-2xl overflow-hidden`}>
        <h2 className="font-bold text-xl p-4">Who to follow</h2>
        {manifest.personalInfo.links && Object.entries(manifest.personalInfo.links).filter(([_, value]) => value).slice(0, 3).map(([key, value], idx) => (
          <a
            key={idx}
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>
              {key === 'github' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>}
              {key === 'linkedin' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>}
              {key === 'twitter' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>}
              {!['github', 'linkedin', 'twitter'].includes(key) && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold capitalize truncate">{key}</p>
              <p className={`text-sm ${secondaryText} truncate`}>{value?.replace(/https?:\/\/(www\.)?/, '')}</p>
            </div>
            <button 
              className={`px-4 py-1.5 rounded-full font-semibold text-sm ${
                darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'
              } transition`}
              onClick={e => e.preventDefault()}
            >
              Follow
            </button>
          </a>
        ))}
        <button className="w-full px-4 py-3 text-blue-500 text-left hover:bg-gray-800/50 transition">
          Show more
        </button>
      </div>

      <p className={`mt-4 text-xs ${secondaryText}`}>
        Terms of Service · Privacy Policy · Cookie Policy · Accessibility · Ads info · More · © 2024 X Corp.
      </p>
    </aside>
  )
}
