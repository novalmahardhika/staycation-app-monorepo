import { useHomestayQuery } from '@/hooks/query/useQuery/use-homestay-query'
import { SkeletonListHomestay } from '../skeletons/skeleton-list-homestay'
import CarouselListItem from '../ui/carousel-list-item'

export default function HouseListItems() {
  const { data: items, isLoading, isError } = useHomestayQuery()
  const homestays = items?.data.slice(0, 10) || []

  if (isLoading) {
    return <SkeletonListHomestay length={5} />
  }

  if (isError) {
    return (
      <div className='p-3 font-medium text-center text-red-500 bg-red-100 rounded-md col-span-full'>
        <h3>Something went wrong</h3>
      </div>
    )
  }

  if (homestays.length === 0) {
    return (
      <div className='flex items-center justify-center p-3 font-medium text-center bg-gray-100 rounded-md '>
        <h3>Data is Empty</h3>
      </div>
    )
  }

  return <CarouselListItem items={homestays} />
}
