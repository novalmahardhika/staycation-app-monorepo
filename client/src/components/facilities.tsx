import { IconType } from '@/types/base-type'
import { Facility } from '@/types/homestay-type'
import {
  AirVent,
  Bath,
  BedDouble,
  Feather,
  Lamp,
  Refrigerator,
  Tv,
  Wifi,
  HandPlatter,
} from 'lucide-react'

type FacilitiesProps = {
  items: Facility[]
}

export default function Facilities({ items }: FacilitiesProps) {
  const modifiedItems = items.map((item) => generateIcon(item))
  return (
    <section className='grid grid-cols-4 gap-4'>
      {modifiedItems.map((item, index) => (
        <FacilityItem key={`item-facility-${index}`} {...item} />
      ))}
    </section>
  )
}

type FacilityItemProps = {
  type: string
  label: string
  qty: number
  Icon: IconType
}

function FacilityItem({ label, qty, Icon }: FacilityItemProps) {
  return (
    <div className='flex flex-col space-y-1 text-sm'>
      <Icon color='#172554' />
      <span className='font-semibold text-blue-950'>
        {qty} <span className='ml-0.5 font-light text-gray-400'>{label}</span>
      </span>
    </div>
  )
}

function generateIcon(item: Facility) {
  switch (item.type) {
    case 'bedroom':
      return { ...item, Icon: BedDouble }
    case 'living-room':
      return { ...item, Icon: Lamp }
    case 'bathroom':
      return { ...item, Icon: Bath }
    case 'dining-room':
      return { ...item, Icon: HandPlatter }
    case 'wifi':
      return { ...item, Icon: Wifi }
    case 'ac':
      return { ...item, Icon: AirVent }
    case 'refrigerator':
      return { ...item, Icon: Refrigerator }
    case 'tv':
      return { ...item, Icon: Tv }
    default:
      return { ...item, Icon: Feather }
  }
}
