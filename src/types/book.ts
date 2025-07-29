export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
  isbn: string;
  pages: number;
  description: string;
  coverUrl?: string;
  rating: number;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface SortParams {
  sortBy: 'title' | 'author' | 'publicationYear' | 'genre' | 'rating';
  sortOrder: 'asc' | 'desc';
}

export interface BookFilters {
  search?: string;
  genre?: string;
}

export interface BookListResponse {
  books: Book[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}