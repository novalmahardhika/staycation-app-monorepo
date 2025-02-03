import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './carousel'
import { Card } from './card'
import { Homestay } from '@/types/homestay-type'
import { useNavigate } from 'react-router'

type CarouselListItemProps = {
  items: Homestay[]
}

export default function CarouselListItem({ items }: CarouselListItemProps) {
  return (
    <Carousel className='min-w-0'>
      <CarouselContent>
        {items.map((item, index) => {
          const props = {
            ...item,
            city: item.address.city,
            country: item.address.country,
          }
          return <CustomCarouselItem {...props} key={`${item.id}-${index}`} />
        })}
      </CarouselContent>
      <div className='absolute flex justify-end w-full mt-5 space-x-3'>
        <CarouselPrevious className='static rounded-md' />
        <CarouselNext className='static rounded-md' />
      </div>
    </Carousel>
  )
}

type CustomCarouselItemProps = {
  id: string
  image: string
  name: string
  city: string
  country: string
  isPopular: boolean
}

function CustomCarouselItem({
  id,
  name,
  image,
  city,
  country,
  isPopular,
}: CustomCarouselItemProps) {
  const navigate = useNavigate()
  return (
    <CarouselItem
      onClick={() => navigate(`/homestays/${id}`)}
      className='cursor-pointer md:basis-1/3 lg:basis-1/5'
    >
      <Card className='h-full overflow-hidden border-none rounded-md shadow-none group'>
        <div className='relative w-full h-32 overflow-hidden rounded-md'>
          <img
            src={image}
            className='absolute object-cover w-full h-full duration-200 group-hover:scale-105'
            alt={name}
          />
        </div>
        <div className='p-1'>
          <h3 className='text-sm md:text-base'>{name}</h3>
          <p className='text-xs font-light text-gray-400 md:text-sm'>{`${city}, ${country}`}</p>
        </div>
        {isPopular && (
          <span className='absolute top-0 right-0 px-2.5 py-1 text-xs text-white bg-rose-500 rounded-bl-md rounded-tr-md'>
            Popular Choice
          </span>
        )}
      </Card>
    </CarouselItem>
  )
}
