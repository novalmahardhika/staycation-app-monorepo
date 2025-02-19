import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// schema
export const createNotificationSchema = z.object({
  userId: z.string(),
  title: z.string(),
  description: z.string(),
  isRead: z.boolean().optional(),
});
export const updateNotificationSchema = createNotificationSchema.partial();

// type
export type CreateNotificationSchema = z.infer<typeof createNotificationSchema>;
export type UpdateNotificationSchema = z.infer<typeof updateNotificationSchema>;

// dto
export class CreateNotificationDto extends createZodDto(
  createNotificationSchema,
) {}
export class UpdateNotificationDto extends createZodDto(
  updateNotificationSchema,
) {}
