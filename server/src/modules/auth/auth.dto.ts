import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Schema
export const signInSchema = z.object({
  email: z
    .string()
    .email({ message: 'please enter a valid email address in the format' }),
  password: z
    .string()
    .min(8, { message: 'password must be at least 8 character' }),
});

export const registerSchema = z.object({
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
});

// Type
export type SignInSchema = z.infer<typeof signInSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;

// DTO
export class SignInDto extends createZodDto(signInSchema) {}
export class RegisterDto extends createZodDto(registerSchema) {}
