'use client'
import { BookCard } from '@/components/molecules/BookCard'
import { Book } from '@/types'

interface BookGridProps {
  books: Book[]
}

export function BookGrid({ books }: BookGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book, index) => (
        <BookCard key={book.id} book={book} priority={index === 0} />
      ))}
    </div>
  )
}
