import { zodResolver } from '@hookform/resolvers/zod'
import {
  AsyncDefaultValues,
  DefaultValues,
  FieldValues,
  useForm,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form'
import { ZodSchema, ZodTypeDef } from 'zod'

export function useZodForm<T extends FieldValues>(
  schema: ZodSchema<T, ZodTypeDef, T>,
  defaultValues?: DefaultValues<T> | AsyncDefaultValues<T>,
  options?: Omit<UseFormProps<T>, 'defaultValues' | 'resolver'>
): UseFormReturn<T> {
  return useForm({
    resolver: zodResolver(schema),
    defaultValues,
    ...options,
  })
}
