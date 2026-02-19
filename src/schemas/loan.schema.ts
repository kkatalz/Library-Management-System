import * as z from 'zod';

export const createLoanSchema = z.object({
  userId: z.string().nonempty('User ID is required'),
  bookId: z.string().nonempty('Book ID is required'),
});

export type CreateLoanDto = z.infer<typeof createLoanSchema>;
