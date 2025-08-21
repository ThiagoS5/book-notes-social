'use client'

import { useParams, useRouter } from 'next/navigation'
import { useBookshelf } from '@/context/BookshelfContext'
import Image from 'next/image'
import { Tag } from '@/components/atoms/Tag'
import { EntryForm } from '@/components/organisms/EntryForm'
import { EntryList } from '@/components/organisms/EntryList'
import { Button } from '@/components/atoms/Button'
import { Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function BookDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { books, getEntriesForBook, removeBook } = useBookshelf()
  const bookId = Array.isArray(params.id) ? params.id[0] : params.id
  const book = books.find(b => b.id === bookId)
  
  const handleRemove = () => {
    if (!book) return
    if (window.confirm(`Tem certeza que deseja remover "${book.title}" da sua estante?`)) {
      removeBook(book.id)
      router.push('/dashboard')
    }
  }

  if (!book) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Livro não encontrado!</h2>
        <p>Este livro não está na sua estante.</p>
        <Link href="/dashboard" className="text-indigo-600 hover:underline mt-4 inline-block">
          Voltar para a estante
        </Link>
      </div>
    )
  }
  const entries = getEntriesForBook(book.id)

  return (
    
    <div className="space-y-8">
       <div className="flex flex-col items-center md:items-start md:flex-row gap-8">
        <div className="relative h-[330px] w-[220px] flex-shrink-0 mx-auto md:mx-0">
          <Image
            src={book.coverUrl || 'https://dummyimage.com/220x330/ccc/000.png&text=Capa'}
            alt={`Capa de ${book.title}`}
            fill
            sizes="220px"
            className="rounded-md object-cover shadow-lg"
            priority
          />
        </div>
        <div className="flex-grow text-center md:text-left">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">{book.title}</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-4">{book.author}</p>
          <Tag status={book.status} />
          <div className="mt-6">
            <Button variant="destructive" onClick={handleRemove}>
              <Trash2 className="mr-2 h-4 w-4" />
              Remover Livro
            </Button>
          </div>
        </div>
      </div>
      <div>
        <EntryForm bookId={book.id} />
        <EntryList entries={entries} />
      </div>
    </div>
  )
}