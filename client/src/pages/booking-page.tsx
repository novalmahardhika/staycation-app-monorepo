import { FormBookingBiodata } from '@/components/booking/form-booking-biodata'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Stepper } from '@/components/ui/stepper'
import { useAuth } from '@/hooks/use-auth'
import { useZodForm } from '@/hooks/use-zod-form'
import {
  BookingBiodataSchema,
  bookingBiodataSchema,
} from '@/schemas/booking-schema'
import { useEffect } from 'react'

export default function BookingPage() {
  const { user } = useAuth()
  const form = useZodForm(bookingBiodataSchema, {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })

  useEffect(() => {
    form.reset({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
    })
  }, [form, user])

  const onSubmitHandler = (value: BookingBiodataSchema) => {
    console.log(value)
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
