import { cn } from '@/lib/utils'
import { formatCurrency } from '@/utils/format'
import { mostPickedItems } from '@/utils/mock-data'
import { Link } from 'react-router'

export default function MostPickedSection() {
  return (
    <section className='grid gap-5'>
      <h2 className='text-xl font-medium text-blue-950'>Most Picked</h2>
      <div className='grid grid-cols-3 gap-6'>
        {mostPickedItems.map((item, index) => (
          <CardItem
            href='#'
            src={item.image}
            alt={`most-picked-${index}`}
            key={`most-picker-${index}`}
            title={item.name}
            price={item.price}
            city={item.address.city}
            country={item.address.country}
            className={cn({
              'h-full row-span-2': index === 0,
              'h-44': index !== 0,
            })}
          />
        ))}
      </div>
    </section>
  )
}

type CardItemProps = {
  src: string
  alt?: string
  title: string
  price: number
  country: string
  city: string
  className?: string
  href: string
}

// prettier-ignore
function CardItem({src, className, alt, title, country, city, price, href }: CardItemProps) {
  return (
    <article className={cn('relative overflow-hidden rounded-md h-52 shadow-md group', className)}>
      <img
        src={src}
        alt={alt}
        className='absolute object-cover w-full h-full duration-200 -z-50 group-hover:scale-110'
      />
      <span className='absolute right-0 p-1.5 px-3 text-sm bg-rose-500 rounded-bl-md text-white'>
        <span className='font-semibold'>
          {formatCurrency(price)} 
        </span> per Night 
      </span>
      <Link to={href} className='flex flex-col justify-end h-full p-4 text-white'>
        <h3>{title}</h3>
        <span className='text-sm'>{`${city}, ${country}`}</span>
      </Link>
      <span className='absolute inset-0 w-full h-full bottom-full bg-black/25 -z-40'></span>
    </article>
  )
}
