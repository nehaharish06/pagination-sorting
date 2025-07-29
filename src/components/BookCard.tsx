import { Book } from '../types/book';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Star, Calendar, User, BookOpen } from 'lucide-react';

interface BookCardProps {
  book: Book;
}

export const BookCard = ({ book }: BookCardProps) => {
  return (
    <Card className="group hover:shadow-[var(--shadow-book)] transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/95 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="font-serif text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {book.title}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <User className="w-3 h-3" />
              <span className="text-sm">{book.author}</span>
            </CardDescription>
          </div>
          <div className="flex items-center gap-1 text-amber-500 shrink-0">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">{book.rating}</span>
          </div>
        </div>
        <Badge variant="secondary" className="w-fit bg-book-neutral text-book-primary">
          {book.genre}
        </Badge>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {book.description}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{book.publicationYear}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            <span>{book.pages} pages</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};