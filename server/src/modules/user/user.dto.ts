import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { roleList } from 'src/database/entities/user.entity';

// Schema
export const createUserSchema = z.object({
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
  password: z
    .string()
    .min(8, { message: 'password must be at least 8 character' }),
  role: z.enum(roleList).optional().default('USER'),
  image: z.string().optional().nullable(),
  phone: z.union([
    z
      .string()
      .min(8, { message: 'phone number must be at least 8 character' })
      .trim(),
    ,
    z.string().optional().nullable(),
  ]),
  address: z.union([
    z.string().max(150, { message: 'address maximum 150 character' }),
    z.string().nullable().optional(),
  ]),
});
export const updateUserSchema = createUserSchema.partial();

// type
export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

// DTO
export class CreateUserDto extends createZodDto(createUserSchema) {}
export class UpdateUserDto extends createZodDto(updateUserSchema) {}
