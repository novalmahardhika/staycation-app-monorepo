import { statusBooking } from 'src/database/entities/booking.entity';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const detailBookingSchema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
  })
  .strict();

export const createBookingSchema = z.object({
  bookedById: z.string().uuid(),
  homestayId: z.string().uuid(),
  status: z.enum(statusBooking),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  totalPrice: z.number(),
  totalDuration: z.string(),
  detail: detailBookingSchema.optional().nullable(),
});

export const updateBookingSchema = createBookingSchema.partial();

// Type
export type CreateBookingSchema = z.infer<typeof createBookingSchema>;
export type UpdateBookingSchema = z.infer<typeof updateBookingSchema>;

// DTO
export class CreateBookingDto extends createZodDto(createBookingSchema) {}
export class UpdateBookingDto extends createZodDto(updateBookingSchema) {}
