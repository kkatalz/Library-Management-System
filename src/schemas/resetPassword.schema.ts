import * as z from 'zod';

export const resetPasswordSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(8),
});

export type ResetPasswordDTO = z.infer<typeof resetPasswordSchema>;
