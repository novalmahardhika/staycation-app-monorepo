import { cn } from '@/lib/utils'

type ImageSectionProps = {
  images: string[]
}

export default function ImageDetailSection({ images }: ImageSectionProps) {
  return (
    <section className='grid grid-cols-2 grid-rows-2 min-h-[500px] gap-3'>
      {images.map((image, index) => {
        const isFirstIndex = index === 0
        const options = { 'row-span-2': isFirstIndex }
        return (
          <div
            key={`detail-image-${index}`}
            className={cn(
              'bg-gray-200 relative overflow-hidden rounded-md',
              options
            )}
          >
            <img
              src={image}
              alt={`image-detail-${index}`}
              className='absolute object-cover w-full h-full'
            />
          </div>
        )
      })}
    </section>
  )
}
