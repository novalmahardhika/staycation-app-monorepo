import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const paymentSchema = z.object({
  amount: z.number().min(1),
  currency: z.string(),
  bookingId: z.string().uuid(),
});

export type PaymentSchema = z.infer<typeof paymentSchema>;

export class PaymentSchemaDto extends createZodDto(paymentSchema) {}
