import * as z from 'zod';

export const createBookSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters')
    .nonempty('Title is required'),
  author: z
    .string()
    .min(1, 'Author is required')
    .max(100, 'Author must be less than 100 characters')
    .nonempty('Author is required'),
  year: z
    .number()
    .min(0, 'Year must be a positive number')
    .max(new Date().getFullYear(), 'Year cannot be in the future')
    .nonoptional('Year is required'),
  isbn: z
    .string()
    .nonempty('ISBN is required')
    .min(10, 'ISBN must be at least 10 characters')
    .max(20, 'ISBN must be less than 20 characters'),
  available: z.boolean().nonoptional('Available status is required'),
});

export const replaceBookSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  author: z
    .string()
    .min(1, 'Author is required')
    .max(100, 'Author must be less than 100 characters'),
  year: z
    .number()
    .min(0, 'Year must be a positive number')
    .max(new Date().getFullYear(), 'Year cannot be in the future'),
  isbn: z
    .string()
    .min(10, 'ISBN must be at least 10 characters')
    .max(20, 'ISBN must be less than 20 characters'),
  available: z.boolean(),
});

export type CreateBookDto = z.infer<typeof createBookSchema>;
export type ReplaceBookDto = z.infer<typeof replaceBookSchema>;
