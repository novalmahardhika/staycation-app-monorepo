import { useHomestayQuery } from '@/hooks/useQuery/useHomestayQuery'
import { Homestay } from '@/types/homestay-type'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../ui/carousel'
import { Card } from '../../ui/card'

export default function HotelListSection() {
  const { data: items } = useHomestayQuery<Homestay[]>()
  const homestays = items?.data.slice(0, 10) || []

  return (
    <section className='grid gap-5'>
      <h2 className='title-section'>Hotel with large living room</h2>
      <Carousel>
        <CarouselContent>
          {homestays.map((item) => {
            const props = {
              ...item,
              city: item.address.city,
              country: item.address.country,
            }
            return <CustomCarouselItem {...props} />
          })}
        </CarouselContent>
        <div className='absolute z-50 flex w-full mt-5 space-x-3 md:justify-end'>
          <CarouselPrevious className='static rounded-md' />
          <CarouselNext className='static rounded-md' />
        </div>
      </Carousel>
    </section>
  )
}

type CustomCarouselItemProps = {
  image: string
  name: string
  city: string
  country: string
  isPopular: boolean
}

// prettier-ignore
function CustomCarouselItem({
  image,
  name,
  city,
  country,
  isPopular,
}: CustomCarouselItemProps) {
  return (
    <CarouselItem className='md:basis-1/5'>
      <Card className='relative h-full overflow-hidden border-none rounded-md shadow-none'>
        <img src={image} className='object-cover w-full h-32 rounded-md' alt={name}/>
        <div className='p-1'>
          <h3>{name}</h3>
          <p className='text-sm font-light text-gray-400'>{`${city}, ${country}`}</p>
        </div>
        {isPopular && (
          <span className='absolute top-0 right-0 px-2.5 py-1 text-xs text-white bg-rose-500 rounded-bl-md'>
            Popular Choice
          </span>
        )}
      </Card>
    </CarouselItem>
  )
}
