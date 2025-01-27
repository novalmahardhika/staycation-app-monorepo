import { BadRequestException } from '@nestjs/common';
import { createZodValidationPipe } from 'nestjs-zod';
import { ZodError } from 'zod';

export const CustomZodValidationPipe = createZodValidationPipe({
  createValidationException: (error: ZodError) => {
    const property = error.errors[0].path[0];
    let message = error.errors[0].message;
    if (message === 'Required') message = `${property} ${message}`;
    return new BadRequestException(message);
  },
});
