import * as z from 'zod';

export const createUserSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .email('Invalid email address')
    .max(100, 'Email must be less than 100 characters'),
  passwordHash: z
    .string()
    .min(8, 'Password must be between 8 and 16 characters')
    .max(16, 'Password must be between 8 and 16 characters'),
});

export const replaceUserSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .email('Invalid email address')
    .max(100, 'Email must be less than 100 characters'),
  passwordHash: z
    .string()
    .min(8, 'Password must be between 8 and 16 characters')
    .max(16, 'Password must be between 8 and 16 characters'),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type ReplaceUserDto = z.infer<typeof replaceUserSchema>;
