import { BookGrid } from '../components/BookGrid';
import { BookFilters } from '../components/BookFilters';
import { BookPagination } from '../components/BookPagination';
import { useBooks } from '../hooks/useBooks';
import { Library, BookOpen } from 'lucide-react';

const Index = () => {
  const {
    books,
    totalCount,
    totalPages,
    pagination,
    sort,
    filters,
    updatePagination,
    updateSort,
    updateFilters,
    resetFilters
  } = useBooks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-book-neutral/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-[var(--shadow-book)]">
              <Library className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold font-serif bg-gradient-to-r from-primary via-book-accent to-primary bg-clip-text text-transparent">
              BookVault
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover your next great read with our comprehensive book management system featuring advanced pagination and sorting capabilities.
          </p>
        </div>

        {/* Stats Banner */}
        <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 p-6 mb-8 shadow-[var(--shadow-elegant)]">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <div>
                <div className="text-2xl font-bold text-foreground">20</div>
                <div className="text-sm text-muted-foreground">Total Books</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Library className="w-5 h-5 text-book-accent" />
              <div>
                <div className="text-2xl font-bold text-foreground">12</div>
                <div className="text-sm text-muted-foreground">Genres</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">★</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">4.3</div>
                <div className="text-sm text-muted-foreground">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 p-6 mb-8 shadow-[var(--shadow-elegant)]">
          <BookFilters
            filters={filters}
            sort={sort}
            onFiltersChange={updateFilters}
            onSortChange={updateSort}
            onResetFilters={resetFilters}
            totalCount={totalCount}
          />
        </div>

        {/* Book Grid */}
        <BookGrid books={books} />

        {/* Pagination */}
        <BookPagination
          pagination={pagination}
          totalPages={totalPages}
          totalCount={totalCount}
          onPaginationChange={updatePagination}
        />
      </div>
    </div>
  );
};

export default Index;
