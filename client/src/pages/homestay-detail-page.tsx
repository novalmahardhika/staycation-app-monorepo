import DescriptionSection from '@/components/homestay-detail/description-section'
import FormBookSection from '@/components/homestay-detail/form-book-section'
import HeaderDetailHomestay from '@/components/homestay-detail/header'
import ImageDetailSection from '@/components/homestay-detail/image-section'
import SimilarPlaceSection from '@/components/homestay-detail/similiar-place-section'
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

  const { name, address, detail, price } = data.data
  const { city, country } = address

  return (
    <section className='space-y-8'>
      <HeaderDetailHomestay name={name} city={city} country={country} />
      <ImageDetailSection images={detail.images} />
      <section className='grid grid-cols-3'>
        <DescriptionSection description={detail.description} />
        <FormBookSection price={price} />
      </section>
      <SimilarPlaceSection />
    </section>
  )
}
