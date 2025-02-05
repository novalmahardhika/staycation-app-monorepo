import { SignInSchema, SignUpSchema } from '@/schemas/auth-schema'
import { AuthSignIn, User } from '@/types/auth-type'
import { api, ResponseApi } from '@/utils/api'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

export function useSignInMutation(
  options?: UseMutationOptions<ResponseApi<AuthSignIn>, unknown, SignInSchema>
) {
  const mutationFn = (payload: SignInSchema) => {
    return api<ResponseApi<AuthSignIn>>('/auth/signIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
  }

  return useMutation<ResponseApi<AuthSignIn>, unknown, SignInSchema>({
    mutationFn,
    ...options,
  })
}

export function useSignUpMutation(
  options?: UseMutationOptions<ResponseApi<User>, unknown, SignUpSchema>
) {
  const mutationFn = (payload: SignInSchema) => {
    return api<ResponseApi<User>>('/auth/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
  }

  return useMutation<ResponseApi<User>, unknown, SignUpSchema>({
    mutationFn,
    ...options,
  })
}
