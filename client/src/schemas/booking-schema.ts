import { z } from 'zod'

export const statusBooking = [
  'NEW',
  'PROGRESS',
  'PENDING',
  'FINISH',
  'EXPIRED',
  'CANCEL',
] as const

// booking date schema
export const bookingSchema = z.object({
  bookedById: z.string().uuid(),
  homestayId: z.string().uuid(),
  status: z.enum(statusBooking),
  date: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
  }),
  totalPrice: z.number(),
  totalDuration: z.string(),
})

export type BookingSchema = z.infer<typeof bookingSchema>

export const bookingDefaultValue: BookingSchema = {
  bookedById: '',
  homestayId: '',
  status: 'NEW',
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
  lastName: z
    .string()
    .max(50, { message: 'lastName max 50 character' })
    .trim()
    .optional(),
  email: z
    .string()
    .email({ message: 'please enter a valid email address in the format' }),
  phone: z
    .string()
    .min(12, { message: 'Please input your phone number' })
    .trim(),
})

export type BookingBiodataSchema = z.infer<typeof bookingBiodataSchema>

// booking update schema
export const updateBookingSchema = z.object({
  ...bookingSchema.partial().shape,
  detail: bookingBiodataSchema.partial(),
})

export type UpdateBookingSchema = z.infer<typeof updateBookingSchema>
