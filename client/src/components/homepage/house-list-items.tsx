import CarouselListItem from '../ui/carousel-list-item'
import { useHomestayQuery } from '@/hooks/query/useQuery/use-homestay-query'
import { SkeletonListHomestay } from '../skeletons/skeleton-list-homestay'
import { ErrorMessage } from '../error-message'
import { EmptyMessage } from '../empty-data-message'

export default function HouseListItems() {
  const { data: items, isLoading, isError } = useHomestayQuery()
  const homestays = items?.data.slice(0, 10) || []

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
