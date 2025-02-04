import { cn } from '@/lib/utils'
import { LoaderCircle } from 'lucide-react'

type LoadingProps = {
  className?: string
  strokeWidth?: number
}

export default function LoadingSpinner({
  className,
  strokeWidth,
}: LoadingProps) {
  return (
    <div className={cn('w-10 h-10 text-blue-500 rounded-full', className)}>
      <LoaderCircle
        className='w-full h-full animate-spin'
        strokeWidth={strokeWidth}
      />
    </div>
  )
}
