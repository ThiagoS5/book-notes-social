import Link from 'next/link'
import Image from 'next/image'
import { Book } from '@/types'
import { Tag } from '@/components/atoms/Tag'

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Link href={`/book/${book.id}`} className="block group">
      <div className="p-4 border rounded-lg hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="relative w-full h-56 mb-4">
          <Image
            src={book.coverUrl || 'https://via.placeholder.com/150x220.png?text=Capa'}
            alt={`Capa do livro ${book.title}`}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="flex flex-col flex-grow">
          <h3 className="font-bold text-lg group-hover:text-indigo-600">{book.title}</h3>
          <p className="text-sm text-gray-600 mb-4">{book.author}</p>
          <div className="mt-auto">
            <Tag status={book.status} />
          </div>
        </div>
      </div>
    </Link>
  )
}