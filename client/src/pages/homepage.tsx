import HeroSection from '@/components/homepage/hero-section'
import MostPickedSection from '@/components/homepage/most-picked-section'
import HouseListSection from '@/components/homepage/house-list-section'
import HotelListSection from '@/components/homepage/hotel-list-section'
import ApartmentListSection from '@/components/homepage/apartment-list-section'

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
