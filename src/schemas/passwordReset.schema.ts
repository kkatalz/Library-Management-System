import * as z from 'zod';

export const passwordResetRequestSchema = z.object({
  email: z.email(),
});

export type PasswordResetRequestDTO = z.infer<
  typeof passwordResetRequestSchema
>;
