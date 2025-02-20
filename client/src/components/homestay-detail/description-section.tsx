import { Facility } from '@/types/homestay-type'
import Facilities from '../facilities'

type DescriptionSectionProps = {
  description?: string
  facilities: Facility[]
}

export default function DescriptionSection({
  description,
  facilities,
}: DescriptionSectionProps) {
  const arrayDesc = description?.split('/n') || []
  return (
    <section className='flex flex-col justify-between col-span-2 space-y-6'>
      <div className='space-y-3'>
        <h2 className='title-section'>About the place</h2>
        {arrayDesc?.map((desc, index) => (
          <p
            key={index}
            className='text-sm font-light text-gray-400 md:max-w-[80%]'
          >
            {desc}
          </p>
        ))}
      </div>
      <Facilities items={facilities} />
    </section>
  )
}
