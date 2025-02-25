import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Button } from '../ui/button'
import { usePaymentMutation } from '@/hooks/query/useMutation/use-payment-mutation'
import { toast } from 'sonner'

type FormPaymentProps = {
  amount: number
  currency: string
  bookingId: string
}

export default function FormPayment({ ...props }: FormPaymentProps) {
  const stripe = useStripe()
  const elements = useElements()

  const paymentMutation = usePaymentMutation({
    onSuccess: async (data) => {
      toast.success('Payment Success')
      const clientSecret = data.data.clientSecret

      if (!stripe || !elements) return

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `http://localhost:3000/bookings/${props.bookingId}/success`,
        },
      })

      if (error) {
        toast.error(error.message)
        return
      }
    },
    onError: () => {
      toast.error('Something went wrong...')
    },
  })

  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (!stripe || !elements) return
    const { error: submitError } = await elements.submit()
    if (submitError) {
      toast.error(submitError.message)
      return
    }
    paymentMutation.mutate(props)
  }

  return (
    <form className='grid w-full max-w-sm gap-3' onSubmit={submitHandler}>
      <PaymentElement />
      <Button>Submit</Button>
    </form>
  )
}
