import { useHomestayQuery } from '@/hooks/query/useQuery/use-homestay-query'
import CarouselListItem from '../ui/carousel-list-item'

export default function SimilarPlaceSection() {
  const { data: items, isLoading, isError } = useHomestayQuery()
  const homestays = items?.data.slice(0, 10) || []

  return (
    <section className='grid gap-5'>
      <h2 className='title-section'>Similiar Place</h2>
      <CarouselListItem
        items={homestays}
        isLoading={isLoading}
        isError={isError}
      />
    </section>
  )
}
