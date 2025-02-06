import { IconType } from '@/types/base-type'
import {
  AirVent,
  Bath,
  BedDouble,
  CookingPot,
  Lamp,
  Refrigerator,
  Tv,
  Wifi,
} from 'lucide-react'

export default function Facilities() {
  return (
    <section className='grid grid-cols-4 gap-4'>
      {items.map((item, index) => (
        <FacilityItem key={`item-facility-${index}`} {...item} />
      ))}
    </section>
  )
}

type FacilityItemProps = {
  label: string
  value: number
  Icon: IconType
}

function FacilityItem({ label, value, Icon }: FacilityItemProps) {
  return (
    <div className='flex flex-col space-y-1 text-sm'>
      <Icon color='#172554' />
      <span className='font-semibold text-blue-950'>
        {value} <span className='ml-0.5 font-light text-gray-400'>{label}</span>
      </span>
    </div>
  )
}

const items = [
  {
    label: 'Bedroom',
    value: 5,
    Icon: BedDouble,
  },
  {
    label: 'Living Room',
    value: 3,
    Icon: Lamp,
  },
  {
    label: 'Bathroom',
    value: 2,
    Icon: Bath,
  },
  {
    label: 'Kitchen',
    value: 1,
    Icon: CookingPot,
  },
  {
    label: 'AC',
    value: 6,
    Icon: AirVent,
  },
  {
    label: 'Refrigerator',
    value: 2,
    Icon: Refrigerator,
  },
  {
    label: 'TV',
    value: 4,
    Icon: Tv,
  },
  {
    label: 'Wifi',
    value: 6,
    Icon: Wifi,
  },
]
