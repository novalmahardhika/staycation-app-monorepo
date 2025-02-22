import { z } from 'zod'

export const createPaymentSchema = z.object({
  amount: z.number(),
  currency: z.string(),
  bookingId: z.string().uuid(),
})

export type CreatePaymentSchema = z.infer<typeof createPaymentSchema>
