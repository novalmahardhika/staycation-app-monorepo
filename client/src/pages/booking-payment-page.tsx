import FormPayment from '@/components/booking/form-payment'

import { Stepper } from '@/components/ui/stepper'
import { stripePromise } from '@/utils/stripe'
import { Elements } from '@stripe/react-stripe-js'
import { StripeElementsOptionsMode } from '@stripe/stripe-js'
import { useParams } from 'react-router'

export default function BookingPaymentPage() {
  const { id } = useParams<{ id: string }>()
  const options = {
    mode: 'payment',
    amount: 1099,
    currency: 'usd',
  } as StripeElementsOptionsMode

  return (
    <section className='flex flex-col items-center max-w-3xl mx-auto space-y-6'>
      <Stepper currentIndex={2} />
      <h1 className='title-section'>Booking Payment</h1>
      <Elements stripe={stripePromise} options={options}>
        <FormPayment amount={1099} currency='usd' bookingId={id as string} />
      </Elements>
    </section>
  )
}
