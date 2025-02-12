import { Button } from '@/components/ui/button'
import { Stepper } from '@/components/ui/stepper'
import { useNavigate } from 'react-router'

export default function BookingSuccessPage() {
  const navigate = useNavigate()

  return (
    <section className='flex flex-col items-center max-w-3xl mx-auto space-y-6'>
      <Stepper currentIndex={3} />
      <h1 className='title-section'>Booking Completed</h1>
      <div className='relative w-[362px] h-[330px]'>
        <img
          src='/src/assets/booking-success.png'
          alt='booking-success'
          className='absolute w-full h-full'
        />
      </div>
      <div className='text-sm font-light text-center text-gray-400'>
        <p>Enjoy your vacation 🚀</p>
        <p>Thank you for trusting our service</p>
      </div>
      <Button className='w-56' onClick={() => navigate('/')}>
        Back to Home
      </Button>
    </section>
  )
}
