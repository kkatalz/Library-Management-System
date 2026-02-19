export type Book = {
  id: string;
  title: string;
  author: string;
  year: number;
  isbn: string;
  available: boolean;
};

export type BookParams = {
  id: string;
};
