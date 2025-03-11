import { useAuth } from '@/hooks/use-auth'
import { CreatePaymentSchema } from '@/schemas/payment-schema'
import { api, ResponseApi } from '@/utils/api'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

type PaymentApi = {
  clientSecret: string
}

export function usePaymentMutation(
  options: UseMutationOptions<
    ResponseApi<PaymentApi>,
    unknown,
    CreatePaymentSchema
  >
) {
  const { token } = useAuth()
  const mutationFn = (payload: CreatePaymentSchema) => {
    return api<PaymentApi>('/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
  }
  return useMutation<ResponseApi<PaymentApi>, unknown, CreatePaymentSchema>({
    mutationFn,
    ...options,
  })
}
