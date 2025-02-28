import CarouselListItem from '@/components/ui/carousel-list-item'
import { useHomestayQuery } from '@/hooks/query/useQuery/use-homestay-query'

export default function HotelListSection() {
  const { data: items, isLoading, isError } = useHomestayQuery()
  const homestays = items?.data.slice(11, 20) || []

  return (
    <section className='grid gap-5'>
      <h2 className='title-section'>Hotel with large living room</h2>
      <CarouselListItem
        items={homestays}
        isLoading={isLoading}
        isError={isError}
      />
    </section>
  )
}
