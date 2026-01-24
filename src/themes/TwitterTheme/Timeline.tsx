import { ReactNode } from 'react'

interface TimelineProps {
  children: ReactNode
}

export const Timeline = ({ children }: TimelineProps) => {
  return <div>{children}</div>
}
