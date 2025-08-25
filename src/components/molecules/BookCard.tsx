import { Tag } from '@/components/atoms/Tag'
import { Book } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

interface BookCardProps {
  book: Book
  priority?: boolean
}

export function BookCard({ book, priority = false }: BookCardProps) {
  return (
    <Link href={`/book/${book.id}`} className="block group">
      <div className="bg-card text-card-foreground p-4 border rounded-lg hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="relative w-full mb-4 aspect-w-2 aspect-h-3">
          <Image
            src={
              book.coverUrl ||
              'https://dummyimage.com/400x600/ccc/000.png&text=Capa'
            }
            alt={`Capa do livro ${book.title}`}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 23vw"
            fill
            className="object-contain rounded-md"
            priority={priority}
          />
        </div>
        <div className="flex flex-col flex-grow">
          <h3 className="font-bold text-lg group-hover:text-primary">
            {book.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">{book.author}</p>
          <div className="mt-auto">
            <Tag status={book.status} />
          </div>
        </div>
      </div>
    </Link>
  )
}
