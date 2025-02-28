import { cn } from '@/lib/utils'
import { Skeleton } from '../ui/skeleton'

type SkeletonListHomestayProps = {
  length: number
  className?: string
}

export function SkeletonListHomestay({
  length = 5,
  className,
}: SkeletonListHomestayProps) {
  return (
    <div className='grid gap-4 lg:grid-cols-5 '>
      {Array.from({ length }).map((_, index) => (
        <div
          key={`skeleton-list-homestay-${index}`}
          className={cn('grid w-full gap-1.5', {
            'hidden lg:grid': index > 0,
          })}
        >
          <Skeleton
            key={`skeleton-most-picked-${index}`}
            className={cn('w-full h-32', className)}
          />
          <Skeleton className='w-2/4 h-6' />
          <Skeleton className='w-4/5 h-6' />
        </div>
      ))}
    </div>
  )
}
