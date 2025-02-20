import { useAuth } from '@/hooks/use-auth'
import { BookingSchema } from '@/schemas/booking-schema'
import { BookingApi } from '@/types/booking-type'
import { api, ResponseApi } from '@/utils/api'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

type NewBookingSchema = Omit<BookingSchema, 'date'> & {
  startDate: Date
  endDate: Date
}

export function useBookingMutation(
  options: UseMutationOptions<
    ResponseApi<BookingApi>,
    unknown,
    NewBookingSchema
  >
) {
  const { token } = useAuth()
  const mutationFn = (payload: NewBookingSchema) => {
    return api<ResponseApi<BookingApi>>('/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
  }
  return useMutation<ResponseApi<BookingApi>, unknown, NewBookingSchema>({
    mutationFn,
    ...options,
  })
}
