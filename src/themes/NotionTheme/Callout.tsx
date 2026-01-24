import { ReactNode } from 'react'

interface CalloutProps {
  icon: ReactNode
  darkMode: boolean
  children: ReactNode
}

export const Callout = ({ icon, darkMode, children }: CalloutProps) => {
  return (
    <div className={`flex gap-3 p-4 rounded-lg my-4 ${darkMode ? 'bg-neutral-800' : 'bg-neutral-100'}`}>
      <span className="flex-shrink-0">{icon}</span>
      <div className="flex-1">{children}</div>
    </div>
  )
}
