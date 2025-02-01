import { useHomestayQuery } from '@/hooks/useQuery/useHomestayQuery'
import { cn } from '@/lib/utils'
import { Homestay } from '@/types/homestay-type'
import { formatCurrency } from '@/utils/helper'
import { Link } from 'react-router'

export default function MostPickedSection() {
  const { data: items } = useHomestayQuery<Homestay[]>()
  const homestays = items?.data.slice(0, 5) || []

  return (
    <section className='grid gap-5'>
      <h2 className='title-section'>Most Picked</h2>
      <div className='grid grid-cols-3 gap-6'>
        {homestays.map((item, index) => {
          const props = {
            ...item,
            href: '/',
            city: item.address.city,
            country: item.address.country,
          }
          return (
            <CardItem
              {...props}
              key={`most-picked-${index}`}
              className={cn({
                'h-full row-span-2': index === 0,
                'h-44': index !== 0,
              })}
            />
          )
        })}
      </div>
    </section>
  )
}

type CardItemProps = {
  image: string
  name: string
  price: number
  country: string
  city: string
  className?: string
  href: string
}

// prettier-ignore
function CardItem({image, className,  name, country, city, price, href }: CardItemProps) {
  return (
    <article className={cn('relative overflow-hidden rounded-md h-52 shadow-md group', className)}>
      <img
        src={image}
        alt={name}
        className='absolute object-cover w-full h-full duration-200 -z-50 group-hover:scale-110'
      />
      <span className='absolute right-0 p-1.5 px-3 text-sm bg-rose-500 rounded-bl-md text-white'>
        <span className='font-semibold'>
          {formatCurrency(price)} 
        </span> per Night 
      </span>
      <Link to={href} className='flex flex-col justify-end h-full p-4 text-white'>
        <h3>{name}</h3>
        <span className='text-sm'>{`${city}, ${country}`}</span>
      </Link>
      <span className='absolute inset-0 w-full h-full bottom-full bg-black/25 -z-40'></span>
    </article>
  )
}
