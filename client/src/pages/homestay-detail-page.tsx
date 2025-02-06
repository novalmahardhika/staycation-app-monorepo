import DescriptionSection from '@/components/homestay-detail/description-section'
import HeaderDetailHomestay from '@/components/homestay-detail/header'
import ImageDetailSection from '@/components/homestay-detail/image-section'
import { useHomestayIdQuery } from '@/hooks/query/useQuery/use-homestay-query'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

export default function HomestayDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = useHomestayIdQuery(id as string)
  const navigate = useNavigate()

  useEffect(() => {
    const isDataExist = !data || !data.data
    if (isDataExist && !isLoading) {
      navigate('/')
    }
  }, [id, navigate, data, isLoading])

  if (!data) return

  const { name, address, detail } = data.data
  const { city, country } = address

  return (
    <section className='space-y-6'>
      <HeaderDetailHomestay name={name} city={city} country={country} />
      <ImageDetailSection images={detail.images} />
      <section className='grid grid-cols-2'>
        <DescriptionSection description={detail.description} />
        <section>{/* Form Booking */}</section>
      </section>
    </section>
  )
}
