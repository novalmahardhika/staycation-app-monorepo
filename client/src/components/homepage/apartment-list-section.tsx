import CarouselListItem from '@/components/ui/carousel-list-item'
import { useHomestayQuery } from '@/hooks/query/useQuery/use-homestay-query'

export default function ApartmentListSection() {
  const { data: items } = useHomestayQuery()
  const homestays = items?.data.slice(21, 30) || []

  return (
    <section className='grid gap-5'>
      <h2 className='title-section'>Apartments with kitchen set</h2>
      <CarouselListItem items={homestays} />
    </section>
  )
}
