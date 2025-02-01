import { z } from 'zod'

export const addressSchema = z.object({
  city: z.string(),
  country: z.string(),
  zipCode: z.string(),
})

export const homestaySchema = z.object({
  name: z.string().min(3, { message: 'name must be at least 3 character' }),
  image: z.string(),
  price: z.coerce.number(),
  discount: z.union([
    z.coerce
      .number()
      .gte(1, { message: 'discount minimal from 1%' })
      .lte(100, { message: 'discount maximal from 100%' }),
    z.number().optional().nullable(),
  ]),
  isPopular: z.boolean().optional().default(false),
  address: addressSchema.optional().nullable(),
})
