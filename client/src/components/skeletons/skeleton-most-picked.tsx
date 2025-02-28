import { cn } from '@/lib/utils'
import { Skeleton } from '../ui/skeleton'

export function SkeletonMostPicked() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton
          key={`skeleton-most-picked-${index}`}
          className={cn('w-full h-44 rounded-md', {
            ' md:h-full md:row-span-1 md:col-span-2 lg:row-span-2 lg:col-span-1':
              index === 0,
          })}
        />
      ))}
    </>
  )
}
