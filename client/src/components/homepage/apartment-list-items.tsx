import CarouselListItem from '../ui/carousel-list-item'
import { SkeletonListHomestay } from '../skeletons/skeleton-list-homestay'
import { useHomestayQuery } from '@/hooks/query/useQuery/use-homestay-query'
import { ErrorMessage } from '../error-message'
import { EmptyMessage } from '../empty-data-message'

export default function ApartmentListItems() {
  const { data: items, isLoading, isError } = useHomestayQuery()
  const homestays = items?.data.slice(21, 30) || []

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
