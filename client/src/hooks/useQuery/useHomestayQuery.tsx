import { api, ResponseApi } from '@/utils/api'
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

export function useHomestayQuery<T>(options?: UseQueryOptions<ResponseApi<T>>) {
  return useQuery<ResponseApi<T>>({
    queryKey: ['homestays'],
    queryFn: () => api<ResponseApi<T>>(`/homestays`),
    ...options,
  })
}

export function useHomestayQueryId<T>(
  id: string,
  options?: UseQueryOptions<ResponseApi<T>>
) {
  return useQuery<ResponseApi<T>>({
    queryKey: ['homestays', id],
    queryFn: () => api<ResponseApi<T>>(`/homestays/${id}`),
    enabled: !!id,
    ...options,
  })
}
