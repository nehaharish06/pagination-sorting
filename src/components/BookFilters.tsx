import { Search, Filter, X } from 'lucide-react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { BookFilters as BookFiltersType, SortParams } from '../types/book';

interface BookFiltersProps {
  filters: BookFiltersType;
  sort: SortParams;
  onFiltersChange: (filters: Partial<BookFiltersType>) => void;
  onSortChange: (sort: Partial<SortParams>) => void;
  onResetFilters: () => void;
  totalCount: number;
}

const genres = [
  'Classic Literature',
  'Science Fiction',
  'Fantasy',
  'Romance',
  'Dystopian',
  'Coming-of-age',
  'Gothic Romance',
  'Political Satire',
  'Gothic Fiction',
  'Philosophical Fiction',
  'Thriller',
  'Mystery'
];

export const BookFilters = ({
  filters,
  sort,
  onFiltersChange,
  onSortChange,
  onResetFilters,
  totalCount
}: BookFiltersProps) => {
  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Search and Controls Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search books, authors, or genres..."
            value={filters.search || ''}
            onChange={(e) => onFiltersChange({ search: e.target.value })}
            className="pl-10 bg-background/50 border-border/50 focus:bg-background transition-colors"
          />
        </div>

        {/* Sort Controls */}
        <div className="flex gap-2 shrink-0">
          <Select value={sort.sortBy} onValueChange={(value: any) => onSortChange({ sortBy: value })}>
            <SelectTrigger className="w-[140px] bg-background/50 border-border/50">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="author">Author</SelectItem>
              <SelectItem value="publicationYear">Year</SelectItem>
              <SelectItem value="genre">Genre</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sort.sortOrder} onValueChange={(value: any) => onSortChange({ sortOrder: value })}>
            <SelectTrigger className="w-[100px] bg-background/50 border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">A-Z</SelectItem>
              <SelectItem value="desc">Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Genre Filter and Results */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Genre Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={filters.genre || 'all'} onValueChange={(value) => onFiltersChange({ genre: value === 'all' ? undefined : value })}>
              <SelectTrigger className="w-[160px] bg-background/50 border-border/50">
                <SelectValue placeholder="All genres" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All genres</SelectItem>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={onResetFilters}
                className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
              >
                <X className="w-3 h-3 mr-1" />
                Clear
              </Button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground">
          {totalCount} book{totalCount !== 1 ? 's' : ''} found
        </div>
      </div>
    </div>
  );
};