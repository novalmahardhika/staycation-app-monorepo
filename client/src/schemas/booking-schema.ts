import { z } from 'zod'

export const bookingSchema = z.object({
  date: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
  }),
  totalPrice: z.number(),
  totalDuration: z.string(),
})

export type BookingSchema = z.infer<typeof bookingSchema>

export const bookingDefaultValue: BookingSchema = {
  date: {
    from: undefined,
    to: undefined,
  },
  totalPrice: 0,
  totalDuration: '0 nights',
}
