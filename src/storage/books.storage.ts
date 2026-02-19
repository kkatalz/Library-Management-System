import type { Book } from '../types/book.type';

export const BOOKS: Book[] = [
  {
    id: '1',
    title: 'Book 1',
    author: 'Author 1',
    year: 2020,
    isbn: '1234567890',
    available: true,
  },
  {
    id: '2',
    title: 'Book 2',
    author: 'Author 2',
    year: 2021,
    isbn: '0987654321',
    available: false,
  },
  {
    id: '3',
    title: 'Book 3',
    author: 'Author 3',
    year: 2022,
    isbn: '1111111111',
    available: true,
  },

  {
    id: '4',
    title: 'Book 4',
    author: 'Author 4',
    year: 2023,
    isbn: '2222222222',
    available: false,
  },
];
