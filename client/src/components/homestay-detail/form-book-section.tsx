import { formatCurrency } from '@/utils/helper'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Form } from '../ui/form'
import { useZodForm } from '@/hooks/use-zod-form'
import {
  bookingDefaultValue,
  BookingSchema,
  bookingSchema,
} from '@/schemas/booking-schema'
import { DateRangePickerField, InputField } from '../ui/custom-field'
import { Button } from '../ui/button'
import { Minus, Plus } from 'lucide-react'
import { add, differenceInDays, sub } from 'date-fns'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router'
import { useAuth } from '@/hooks/use-auth'
import { useBookingMutation } from '@/hooks/query/useMutation/use-booking-mutation'
import { useLocalStorage } from '@/hooks/use-local-storage'

type FormBookSectionProps = {
  price: number
}

export default function FormBookSection({ price }: FormBookSectionProps) {
  const form = useZodForm(bookingSchema, bookingDefaultValue)
  const { user } = useAuth()
  const { setItem } = useLocalStorage()
  const { id: homestayId } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const date = form.watch('date')
  const startDate = form.watch('date')?.from
  const endDate = form.watch('date')?.to
  const totalPrice = form.watch('totalPrice')
  const totalDuration = form.watch('totalDuration')

  useEffect(() => {
    form.reset({
      ...bookingDefaultValue,
      bookedById: user?.id,
      homestayId: homestayId,
    })
  }, [form, homestayId, user?.id])

  useEffect(() => {
    if (!startDate || !endDate) {
      form.setValue('totalPrice', 0)
      form.setValue('totalDuration', '0 nights')
      return
    }
    const differenceDay = differenceInDays(endDate, startDate)
    form.setValue('totalPrice', price * differenceDay)
    form.setValue('totalDuration', `${differenceDay} nights`)
  }, [startDate, endDate, form, price])

  const onMinusDuration = () => {
    if (!startDate || !endDate) {
      return
    }

    if (differenceInDays(endDate, startDate) <= 1) {
      form.setValue('date', { from: undefined, to: undefined })
      return
    }

    form.setValue('date', { ...date, to: sub(endDate, { days: 1 }) })
  }

  const onAddDuration = () => {
    const now = new Date()
    if (!startDate) {
      form.setValue('date', { from: now, to: add(now, { days: 1 }) })
      return
    }
    if ((startDate && !endDate) || !endDate) {
      form.setValue('date', { ...date, to: add(startDate, { days: 1 }) })
      return
    }
    form.setValue('date', { ...date, to: add(endDate, { days: 1 }) })
  }

  const createBookingMutation = useBookingMutation({
    onSuccess: (data) => {
      toast.success('Booking Success')
      setItem('clientSecret', data.data.clientSecret)
      navigate(`/bookings/${data.data.id}`)
    },
    onError: () => {
      toast.error('Booking Fail, something went wrong')
    },
  })

  const onSubmitHandler = (value: BookingSchema) => {
    const { date, ...rest } = value
    if (!date.from || !date.to) {
      toast.error('Please pick your booking date')
      return
    }
    const payload = {
      ...rest,
      startDate: date.from,
      endDate: date.to,
    }
    createBookingMutation.mutate(payload)
  }

  return (
    <Card className='max-w-[400px] w-full mx-auto p-6 shadow-sm'>
      <CardHeader>
        <h3 className='font-semibold text-blue-950'>Start Booking</h3>
        <h1 className='text-2xl font-medium text-emerald-500'>
          {formatCurrency(price)}{' '}
          <span className='font-light text-gray-400'>per night</span>
        </h1>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitHandler)}
            className='space-y-3'
          >
            <div className='relative'>
              <InputField
                label='How long you will stay ?'
                control={form.control}
                name='totalDuration'
                className='text-center'
              />
              <div className='absolute bottom-0 flex justify-between w-full '>
                <Button
                  onClick={onMinusDuration}
                  type='button'
                  className='bg-red-500 rounded-none rounded-l-md hover:bg-red-600'
                >
                  <Minus />
                </Button>
                <Button
                  onClick={onAddDuration}
                  type='button'
                  className='rounded-none bg-emerald-500 rounded-r-md hover:bg-emerald-600'
                >
                  <Plus />
                </Button>
              </div>
            </div>

            <DateRangePickerField
              control={form.control}
              name='date'
              label='Pick a date'
              valueClassName='text-center'
            />

            <span className='text-sm font-light text-gray-400'>
              You will pay{' '}
              <span className='font-semibold text-blue-950'>
                {formatCurrency(totalPrice)}
              </span>{' '}
              per{' '}
              <span className='font-semibold text-blue-950'>
                {totalDuration}
              </span>
            </span>

            <Button className='w-full'>Continue to Book</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
