'use client'

import { BookGrid } from '@/components/organisms/BookGrid'
import { Button } from '@/components/atoms/Button'
import { PlusCircle } from 'lucide-react'
import { SearchModal } from '@/components/organisms/SearchModal'
import { useBookshelf } from '@/context/BookshelfContext'

export default function DashboardPage() {
  const { books } = useBookshelf()
  return (
    <div className="container mx-auto max-w-7xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold font-serif">Sua Estante</h1>
          <SearchModal>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Livro
          </Button>
        </SearchModal>
      </div>
      <BookGrid books={books} />
    </div>
  )
}
