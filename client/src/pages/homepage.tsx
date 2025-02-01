import ApartmentListSection from '@/components/homepage/section/apartment-list-section'
import HeroSection from '@/components/homepage/section/hero-section'
import HotelListSection from '@/components/homepage/section/hotel-list-section'
import HouseListSection from '@/components/homepage/section/house-list-section'
import MostPickedSection from '@/components/homepage/section/most-picked-section'

export default function Homepage() {
  return (
    <>
      <HeroSection />
      <MostPickedSection />
      <HouseListSection />
      <HotelListSection />
      <ApartmentListSection />
    </>
  )
}
