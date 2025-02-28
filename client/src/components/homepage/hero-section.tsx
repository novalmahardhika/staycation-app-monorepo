import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { IconType } from '@/types/base-type'
import { Camera, Luggage, MapPin } from 'lucide-react'
import { useState } from 'react'
import { Skeleton } from '../ui/skeleton'

export default function HeroSection() {
  const [loadImage, setLoadImage] = useState<boolean>(true)
  console.log(loadImage)

  return (
    <section className='grid gap-6 lg:gap-10 md:grid-cols-2'>
      <div className='flex flex-col justify-center order-last space-y-6 md:max-w-xl md:space-y-2.5 lg:space-y-6 md:order-first'>
        <h1 className='text-xl font-bold text-center md:text-start lg:text-2xl xl:text-3xl text-blue-950'>
          Get Rid of Tiredness, Unwind in Paradise with Your Next Unforgettable
          Family Holiday Awaiting!
        </h1>
        <p className='text-xs font-light text-center text-gray-400 lg:text-sm md:text-start'>
          We provide everything you need to fully enjoy your holiday with your
          family, ensuring that you can create countless cherished and memorable
          moments together. Its time to embark on an adventure that will bring
          joy and lasting memories!
        </p>

        <span>
          <Button className='w-full text-xs md:w-auto lg:text-base'>
            Show Me Now
          </Button>
        </span>

        <div className='flex justify-between'>
          <ItemHeroSection Icon={Luggage} value='1.000' label='Travelers' />
          <ItemHeroSection Icon={Camera} value='1.000' label='Treasures' />
          <ItemHeroSection Icon={MapPin} value='1.000' label='Cities' />
        </div>
      </div>

      <div className='flex items-center justify-center md:justify-end'>
        <div className='flex md:justify-end max-w-[480px]'>
          <img
            src='/src/assets/hero-staycation.png'
            alt='hero-image'
            className={cn({
              hidden: loadImage === true,
            })}
            onLoad={() => setLoadImage(false)}
          />
        </div>
        <Skeleton
          className={cn('w-full h-full max-w-[480px] rounded-md', {
            hidden: loadImage === false,
          })}
        />
      </div>
    </section>
  )
}

type ItemHeroSectionProps = {
  label: string
  value: string
  Icon: IconType
}

function ItemHeroSection({ label, value, Icon }: ItemHeroSectionProps) {
  return (
    <figure className='grid gap-1'>
      <Icon className='' />
      <label className='space-x-1 text-xs lg:text-sm'>
        <span className='font-semibold text-blue-950'>{value}</span>
        <span className='font-light text-gray-400'>{label}</span>
      </label>
    </figure>
  )
}
