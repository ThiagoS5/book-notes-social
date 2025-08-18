'use client'

import { BookGrid } from '@/components/organisms/BookGrid'
import { Button } from '@/components/atoms/Button'
import { PlusCircle } from 'lucide-react'
import { SearchModal } from '@/components/organisms/SearchModal'
import { useBookshelf } from '@/context/BookshelfContext'

export default function DashboardPage() {
  const { books } = useBookshelf()
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Sua Estante</h2>
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
