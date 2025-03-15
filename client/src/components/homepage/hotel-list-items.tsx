import CarouselListItem from '../ui/carousel-list-item'
import { useHomestayQuery } from '@/hooks/query/useQuery/use-homestay-query'
import { SkeletonListHomestay } from '../skeletons/skeleton-list-homestay'
import { EmptyMessage } from '../empty-data-message'
import { ErrorMessage } from '../error-message'

export default function HotelListItems() {
  const { data: items, isLoading, isError } = useHomestayQuery()
  const homestays = items?.data.slice(11, 20) || []

  if (isLoading) {
    return <SkeletonListHomestay length={5} />
  }

  if (isError) {
    return <ErrorMessage>Something went wrong</ErrorMessage>
  }

  if (homestays.length === 0) {
    return <EmptyMessage>Data is Empty</EmptyMessage>
  }

  return <CarouselListItem items={homestays} />
}
