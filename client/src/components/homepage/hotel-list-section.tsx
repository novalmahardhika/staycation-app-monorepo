import { useHomestayQuery } from '@/hooks/useQuery/useHomestayQuery'
import { Homestay } from '@/types/homestay-type'
import CarouselListItem from '@/components/ui/carousel-list-item'

export default function HotelListSection() {
  const { data: items } = useHomestayQuery<Homestay[]>()
  const homestays = items?.data.slice(0, 10) || []

  return (
    <section className='grid gap-5'>
      <h2 className='title-section'>Hotel with large living room</h2>
      <CarouselListItem items={homestays} />
    </section>
  )
}
