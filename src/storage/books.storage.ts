import type { Book } from '../types/book.type';
import { loadJson, saveJson } from './json-storage';

export const BOOKS: Book[] = loadJson<Book>('books.json');

export function saveBooks(): void {
  saveJson('books.json', BOOKS);
}
