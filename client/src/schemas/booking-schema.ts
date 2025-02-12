import { z } from 'zod'

// booking date schema
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

// booking biodata schema
export const bookingBiodataSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: 'firstName must be at least 3 character' })
    .max(50, { message: 'firstName max 50 character' }),
  lastName: z.union([
    z
      .string()
      .min(3, { message: 'lastName must be at least 3 character' })
      .max(50, { message: 'lastName max 50 character' }),
    z.string().nullable().optional(),
  ]),
  email: z
    .string()
    .email({ message: 'please enter a valid email address in the format' }),
  phone: z.string(),
})

export type BookingBiodataSchema = z.infer<typeof bookingBiodataSchema>
