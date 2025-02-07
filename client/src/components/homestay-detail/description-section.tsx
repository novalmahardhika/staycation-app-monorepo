import Facilities from '../facilities'

type DescriptionSectionProps = {
  description?: string
}

export default function DescriptionSection({
  description,
}: DescriptionSectionProps) {
  return (
    <section className='flex flex-col justify-between col-span-2 space-y-6'>
      <div className='space-y-3'>
        <h2 className='title-section'>About the place</h2>
        <p className='text-sm font-light text-gray-400 text-balance'>
          {description}
        </p>
      </div>
      <Facilities />
    </section>
  )
}
