import CarouselListItem from '@/components/ui/carousel-list-item'
import { useHomestayQuery } from '@/hooks/query/useQuery/use-homestay-query'

export default function HouseListSection() {
  const { data: items, isLoading, isError } = useHomestayQuery()
  const homestays = items?.data.slice(0, 10) || []

  return (
    <section className='grid gap-5'>
      <h2 className='title-section'>Houses with beauty backyard</h2>
      <CarouselListItem
        items={homestays}
        isLoading={isLoading}
        isError={isError}
      />
    </section>
  )
}
