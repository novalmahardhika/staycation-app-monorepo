import { Stepper } from '@/components/ui/stepper'

export default function BookingPaymentPage() {
  return (
    <section className='flex flex-col items-center max-w-3xl mx-auto space-y-6'>
      <Stepper currentIndex={2} />
      <h1 className='title-section'>Booking Payment</h1>
    </section>
  )
}
