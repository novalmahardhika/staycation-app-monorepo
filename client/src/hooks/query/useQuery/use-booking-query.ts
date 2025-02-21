import { api, ResponseApi } from '@/utils/api'
import { OptionType } from './use-homestay-query'
import { useQuery } from '@tanstack/react-query'
import { BookingDetail } from '@/types/booking-type'
import { useAuth } from '@/hooks/use-auth'

export function useBookingIdQuery(
  id: string,
  options?: Omit<OptionType<ResponseApi<BookingDetail>>, 'enabled'>
) {
  const { token } = useAuth()
  return useQuery({
    queryKey: ['bookings', id],
    queryFn: () =>
      api<ResponseApi<BookingDetail>>(`/bookings/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
    enabled: !!id,
    ...options,
  })
}
