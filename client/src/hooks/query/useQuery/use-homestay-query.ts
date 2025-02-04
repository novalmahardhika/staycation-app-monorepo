import { Homestay } from '@/types/homestay-type'
import { api, ResponseApi } from '@/utils/api'
import { QueryOptions, useQuery } from '@tanstack/react-query'

export function useHomestayQuery(
  options?: QueryOptions<ResponseApi<Homestay[]>>
) {
  return useQuery({
    queryKey: ['homestays'],
    queryFn: () => api<ResponseApi<Homestay[]>>('/homestays'),
    ...options,
  })
}

export function useHomestayIdQuery(
  id: string,
  options: QueryOptions<ResponseApi<unknown>>
) {
  return useQuery({
    queryKey: ['homestays', id],
    queryFn: () => api<ResponseApi<unknown>>(`/homestays/${id}`),
    ...options,
  })
}
