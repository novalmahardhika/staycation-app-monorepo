import { Homestay, HomestayDetail } from '@/types/homestay-type'
import { api, ResponseApi } from '@/utils/api'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

type OptionType<T> = Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>

export function useHomestayQuery(
  options?: OptionType<ResponseApi<Homestay[]>>
) {
  return useQuery({
    queryKey: ['homestays'],
    queryFn: () => api<ResponseApi<Homestay[]>>('/homestays'),
    ...options,
  })
}

export function useHomestayIdQuery(
  id: string,
  options?: Omit<OptionType<ResponseApi<HomestayDetail>>, 'enabled'>
) {
  return useQuery({
    queryKey: ['homestays', id],
    queryFn: () => api<ResponseApi<HomestayDetail>>(`/homestays/${id}`),
    enabled: !!id,
    ...options,
  })
}
