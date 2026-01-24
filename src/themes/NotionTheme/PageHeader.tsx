interface PageHeaderProps {
  name: string
  title: string
  avatar?: string
  darkMode: boolean
}

export const PageHeader = ({ name, title, avatar, darkMode }: PageHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="h-40 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 -mx-6 -mt-8 mb-4" />
      <div className="flex items-end gap-4 -mt-16 ml-4">
        {avatar ? (
          <img 
            src={avatar} 
            alt={name}
            className="w-24 h-24 rounded-lg object-cover border-4 border-white dark:border-neutral-900 shadow-lg"
          />
        ) : (
          <div className={`w-24 h-24 rounded-lg ${darkMode ? 'bg-neutral-700' : 'bg-neutral-200'} flex items-center justify-center text-4xl border-4 ${darkMode ? 'border-neutral-900' : 'border-white'} shadow-lg`}>
            👤
          </div>
        )}
      </div>
      <div className="mt-4">
        <h1 className="text-4xl font-bold">{name}</h1>
        <p className={`text-lg mt-1 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>{title}</p>
      </div>
    </div>
  )
}
