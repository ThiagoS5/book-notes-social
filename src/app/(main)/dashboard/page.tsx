'use client'

import { Button } from '@/components/atoms/Button'
import { EmptyState } from '@/components/molecules/EmptyState'
import { BookGrid } from '@/components/organisms/BookGrid'
import { SearchModal } from '@/components/organisms/SearchModal'
import { useBookshelf } from '@/context/BookshelfContext'
import { PlusCircle } from 'lucide-react'

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
      {books.length > 0 ? (
        <BookGrid books={books} />
      ) : (
        <EmptyState
          imageUrl="/estante-vazia.svg"
          title="Sua estante está vazia"
          description="Parece que você ainda não adicionou nenhum livro. Que tal começar sua jornada literária agora mesmo?"
        >
          <SearchModal>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Adicionar seu primeiro livro
            </Button>
          </SearchModal>
        </EmptyState>
      )}
    </div>
  )
}
