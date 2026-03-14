import * as z from 'zod';

export const createLoanSchema = z.object({
  bookId: z.string().nonempty('Book ID is required'),
});

export type CreateLoanDto = z.infer<typeof createLoanSchema>;
