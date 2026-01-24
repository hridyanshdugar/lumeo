import { PortfolioManifest } from '../../types/manifest'

interface ProfileHeaderProps {
  manifest: PortfolioManifest
  darkMode: boolean
}

export const ProfileHeader = ({ manifest, darkMode }: ProfileHeaderProps) => {
  const secondaryText = darkMode ? 'text-gray-500' : 'text-gray-500'

  return (
    <div>
      <div className="h-48 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 relative">
        <div className="absolute -bottom-16 left-4">
          {manifest.personalInfo.avatar ? (
            <img
              src={manifest.personalInfo.avatar}
              alt={manifest.personalInfo.name}
              className={`w-32 h-32 rounded-full border-4 ${darkMode ? 'border-black' : 'border-white'} object-cover`}
            />
          ) : (
            <div className={`w-32 h-32 rounded-full border-4 ${darkMode ? 'border-black bg-gray-800' : 'border-white bg-gray-200'} flex items-center justify-center`}>
              <span className="text-4xl font-bold">{manifest.personalInfo.name[0]}</span>
            </div>
          )}
        </div>
      </div>

      <div className="pt-20 px-4 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-1">
              <h1 className="text-xl font-bold">{manifest.personalInfo.name}</h1>
              <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
              </svg>
            </div>
            <p className={secondaryText}>@{manifest.personalInfo.name.toLowerCase().replace(/\s+/g, '')}</p>
          </div>
          <button className={`px-4 py-1.5 rounded-full font-semibold border ${
            darkMode ? 'border-gray-600 hover:bg-gray-900' : 'border-gray-300 hover:bg-gray-50'
          }`}>
            Edit profile
          </button>
        </div>

        <p className="mb-3">{manifest.personalInfo.bio}</p>

        <div className={`flex flex-wrap gap-4 text-sm ${secondaryText} mb-3`}>
          <a href={`mailto:${manifest.personalInfo.email}`} className="flex items-center gap-1 text-blue-500 hover:underline">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {manifest.personalInfo.email}
          </a>
          {manifest.personalInfo.phone && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {manifest.personalInfo.phone}
            </span>
          )}
          {manifest.personalInfo.location && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {manifest.personalInfo.location}
            </span>
          )}
          {manifest.personalInfo.links?.website && (
            <a href={manifest.personalInfo.links.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-500 hover:underline">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              {manifest.personalInfo.links.website.replace(/https?:\/\//, '')}
            </a>
          )}
        </div>

        <div className={`flex gap-4 text-sm ${secondaryText}`}>
          <span>
            <strong className={darkMode ? 'text-white' : 'text-gray-900'}>{manifest.projects.length}</strong> Following
          </span>
          <span>
            <strong className={darkMode ? 'text-white' : 'text-gray-900'}>{manifest.skills.reduce((acc, s) => acc + s.items.length, 0)}</strong> Followers
          </span>
        </div>
      </div>
    </div>
  )
}
