import { useState, useMemo } from 'react';
import { Book, PaginationParams, SortParams, BookFilters, BookListResponse } from '../types/book';
import { mockBooks } from '../data/mockBooks';

export const useBooks = () => {
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    pageSize: 6
  });

  const [sort, setSort] = useState<SortParams>({
    sortBy: 'title',
    sortOrder: 'asc'
  });

  const [filters, setFilters] = useState<BookFilters>({});

  const bookListResponse = useMemo((): BookListResponse => {
    let filteredBooks = [...mockBooks];

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredBooks = filteredBooks.filter(book =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.genre.toLowerCase().includes(searchTerm)
      );
    }

    // Apply genre filter
    if (filters.genre) {
      filteredBooks = filteredBooks.filter(book => book.genre === filters.genre);
    }

    // Apply sorting
    filteredBooks.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sort.sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'author':
          aValue = a.author.toLowerCase();
          bValue = b.author.toLowerCase();
          break;
        case 'publicationYear':
          aValue = a.publicationYear;
          bValue = b.publicationYear;
          break;
        case 'genre':
          aValue = a.genre.toLowerCase();
          bValue = b.genre.toLowerCase();
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        default:
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sort.sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sort.sortOrder === 'asc' 
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }
    });

    const totalCount = filteredBooks.length;
    const totalPages = Math.ceil(totalCount / pagination.pageSize);
    
    // Apply pagination
    const startIndex = (pagination.page - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

    return {
      books: paginatedBooks,
      totalCount,
      totalPages,
      currentPage: pagination.page,
      pageSize: pagination.pageSize
    };
  }, [pagination, sort, filters]);

  const updatePagination = (newPagination: Partial<PaginationParams>) => {
    setPagination(prev => ({ ...prev, ...newPagination }));
  };

  const updateSort = (newSort: Partial<SortParams>) => {
    setSort(prev => ({ ...prev, ...newSort }));
    // Reset to first page when sorting changes
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const updateFilters = (newFilters: Partial<BookFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    // Reset to first page when filters change
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const resetFilters = () => {
    setFilters({});
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  return {
    ...bookListResponse,
    pagination,
    sort,
    filters,
    updatePagination,
    updateSort,
    updateFilters,
    resetFilters
  };
};