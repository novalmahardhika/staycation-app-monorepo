import { Button } from '../ui/button'
import { IconType } from '@/utils/types'
import { Camera, Luggage, MapPin } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className='grid grid-cols-2 gap-3'>
      <div className='flex flex-col justify-center max-w-xl space-y-6'>
        <h1 className='text-3xl font-bold text-blue-950'>
          Get Rid of Tiredness, Unwind in Paradise with Your Next Unforgettable
          Family Holiday Awaiting!
        </h1>
        <p className='text-sm font-light text-gray-400'>
          We provide everything you need to fully enjoy your holiday with your
          family, ensuring that you can create countless cherished and memorable
          moments together. Its time to embark on an adventure that will bring
          joy and lasting memories!
        </p>

        <span>
          <Button>Show Me Now</Button>
        </span>

        <div className='flex justify-between'>
          <ItemHeroSection Icon={Luggage} value='1.000' label='Travelers' />
          <ItemHeroSection Icon={Camera} value='1.000' label='Treasures' />
          <ItemHeroSection Icon={MapPin} value='1.000' label='Cities' />
        </div>
      </div>

      <div className='flex items-center justify-end'>
        <div className='flex justify-end max-w-[480px]'>
          <img src='/src/assets/hero-staycation.png' alt='hero-image' />
        </div>
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
      <label className='space-x-1 text-sm'>
        <span className='font-semibold text-blue-950'>{value}</span>
        <span className='font-light text-gray-400'>{label}</span>
      </label>
    </figure>
  )
}
