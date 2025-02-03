import { useHomestayQuery } from '@/hooks/useQuery/useHomestayQuery'
import { Homestay } from '@/types/homestay-type'
import CarouselListItem from '@/components/ui/carousel-list-item'

export default function HouseListSection() {
  const { data: items } = useHomestayQuery<Homestay[]>()
  const homestays = items?.data.slice(0, 10) || []

  return (
    <section className='grid gap-5'>
      <h2 className='title-section'>Houses with beauty backyard</h2>
      <CarouselListItem items={homestays} />
    </section>
  )
}
