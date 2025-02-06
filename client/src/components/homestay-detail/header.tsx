import { BREADCRUMB_DETAIL_HOMESTAY } from '@/utils/constants'
import { BreadcrumbArrow } from '../ui/custom-breadcrumb'

type HeaderDetailHomestayProps = {
  name: string
  city: string
  country: string
}

export default function HeaderDetailHomestay({
  name,
  city,
  country,
}: HeaderDetailHomestayProps) {
  return (
    <header>
      <BreadcrumbArrow items={BREADCRUMB_DETAIL_HOMESTAY} />
      <div className='text-center '>
        <h1 className='text-2xl font-bold text-blue-900'>{name}</h1>
        <p className='text-gray-400'>{`${city}, ${country}`}</p>
      </div>
    </header>
  )
}
