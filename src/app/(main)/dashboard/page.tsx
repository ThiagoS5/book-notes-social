import { mockBooks } from '@/lib/mock-data'
import { BookGrid } from '@/components/organisms/BookGrid'
import { Button } from '@/components/atoms/Button'
import { PlusCircle } from 'lucide-react'

export default function DashboardPage() {
  const books = mockBooks
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Sua Estante</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Livro
        </Button>
      </div>
      <BookGrid books={books} />
    </div>
  )
}
