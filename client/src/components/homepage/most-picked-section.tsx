import { useHomestayQuery } from '@/hooks/query/useQuery/use-homestay-query'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/utils/helper'
import { Link } from 'react-router'
import { WrapperComponent } from '../wrapper-component'
import { SkeletonMostPicked } from '../skeletons/skeleton-most-picked'

export default function MostPickedSection() {
  const { data: items, isLoading, isError } = useHomestayQuery()
  const homestays = items?.data.slice(0, 5) || []

  return (
    <section className='grid gap-5'>
      <h2 className='title-section'>Most Picked</h2>
      <div className='grid gap-6 md:grid-cols-3'>
        <WrapperComponent
          isLoading={isLoading}
          isError={isError}
          dataLength={homestays.length}
          LoadingComponent={SkeletonMostPicked}
        >
          {homestays.map((item, index) => {
            return (
              <CardItem
                {...item}
                key={`most-picked-${index}`}
                className={cn({
                  'h-44 md:h-full md:row-span-1 md:col-span-2 lg:row-span-2 lg:col-span-1':
                    index === 0,
                  'h-44': index !== 0,
                })}
              />
            )
          })}
        </WrapperComponent>
      </div>
    </section>
  )
}

type CardItemProps = {
  id: string
  images: string[]
  name: string
  price: number
  country: string
  city: string
  className?: string
}

// prettier-ignore
function CardItem({images, className,  name, country, city, price, id }: CardItemProps) {
  return (
    <article className={cn('relative overflow-hidden rounded-md h-52 shadow-md group', className)}>
      <img
        src={images[0]}
        alt={name}
        className='absolute object-cover w-full h-full duration-200 -z-50 group-hover:scale-110'
      />
      <span className='absolute right-0 p-1.5 px-3 text-xs md:text-sm bg-rose-500 rounded-bl-md text-white'>
        <span className='font-semibold'>
          {formatCurrency(price)} 
        </span> per Night 
      </span>
      <Link to={`/homestays/${id}`} className='flex flex-col justify-end h-full p-4 text-white'>
        <h3 className='text-sm md:text-base'>{name}</h3>
        <span className='text-xs md:text-sm'>{`${city}, ${country}`}</span>
      </Link>
      <span className='absolute inset-0 w-full h-full bottom-full bg-black/25 -z-40'></span>
    </article>
  )
}
