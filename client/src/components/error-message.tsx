import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

type EmptyMessageProps = {
  children: ReactNode
  className?: string
}

export function ErrorMessage({ children, className }: EmptyMessageProps) {
  return (
    <div
      className={cn(
        'flex justify-center items-center font-medium p-3 text-center text-red-500 bg-red-100 rounded-md ',
        className
      )}
    >
      {children}
    </div>
  )
}
