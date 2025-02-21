import { FormBookingBiodata } from '@/components/booking/form-booking-biodata'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Stepper } from '@/components/ui/stepper'
import { useUpdateBookingMutation } from '@/hooks/query/useMutation/use-booking-mutation'
import { useBookingIdQuery } from '@/hooks/query/useQuery/use-booking-query'
import { useZodForm } from '@/hooks/use-zod-form'
import {
  BookingBiodataSchema,
  bookingBiodataSchema,
} from '@/schemas/booking-schema'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'

export default function BookingPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const form = useZodForm(bookingBiodataSchema, {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })

  const currentBooking = useBookingIdQuery(id as string).data?.data

  const currentBiodata = currentBooking?.detail

  useEffect(() => {
    form.reset({
      firstName: currentBiodata?.firstName || '',
      lastName: currentBiodata?.lastName || '',
      email: currentBiodata?.email || '',
      phone: currentBiodata?.phone || '',
    })
  }, [
    currentBiodata?.email,
    currentBiodata?.firstName,
    currentBiodata?.lastName,
    currentBiodata?.phone,
    form,
  ])

  const updateBookingMutation = useUpdateBookingMutation(id as string, {
    onSuccess: () => {
      toast.success('Fill biodata success')
      navigate(`/bookings/${id}/payments`)
    },
    onError: () => {
      toast.error('Something went wrong')
    },
  })

  const onSubmitHandler = (value: BookingBiodataSchema) => {
    const payload = {
      detail: value,
    }
    updateBookingMutation.mutate(payload)
  }

  return (
    <section className='flex flex-col items-center max-w-3xl mx-auto space-y-6'>
      <Stepper currentIndex={1} />
      <div className='text-center'>
        <h1 className='title-section'>Booking Information</h1>
        <p className='text-sm font-light text-gray-400'>
          Please fill out the form field below
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitHandler)}
          className='w-full space-y-6'
        >
          <div className='grid w-full grid-cols-2 gap-4'>
            <div className='bg-gray-100'></div>
            <FormBookingBiodata form={form} />
          </div>

          <div className='grid w-56 gap-3 mx-auto'>
            <Button>Continue to book</Button>
            <Button variant='secondary' type='button'>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </section>
  )
}
