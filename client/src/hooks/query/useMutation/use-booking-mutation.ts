import { useAuth } from '@/hooks/use-auth'
import { BookingSchema, UpdateBookingSchema } from '@/schemas/booking-schema'
import { BookingApi, BookingDetail } from '@/types/booking-type'
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
    return api<BookingApi>('/bookings', {
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

export function useUpdateBookingMutation(
  id: string,
  options: UseMutationOptions<
    ResponseApi<BookingDetail>,
    unknown,
    UpdateBookingSchema
  >
) {
  const { token } = useAuth()
  const mutationFn = (payload: UpdateBookingSchema) => {
    return api<BookingDetail>(`/bookings/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
  }

  return useMutation<ResponseApi<BookingDetail>, unknown, UpdateBookingSchema>({
    mutationFn,
    ...options,
  })
}
