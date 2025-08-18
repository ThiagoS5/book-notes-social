'use client'

import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import { searchBooks } from '@/services/googleBooksService'
import { Book } from '@/types'
import { LoaderCircle, PlusCircle, X } from 'lucide-react'
import Image from 'next/image'
import { useBookshelf } from '@/context/BookshelfContext'

export function SearchModal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { addBook } = useBookshelf()

  const handleSearch = async () => {
    if (!query.trim()) return

    setIsLoading(true)
    const books = await searchBooks(query)
    setResults(books)
    setIsLoading(false)
  }

  const handleAddBook = (book: Book) => {
    addBook(book)
      console.log('Adicionando o livro:', book.title)
    setIsOpen(false)
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        {children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-2xl max-h-[85vh] bg-background rounded-md p-6 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] flex flex-col">
          <Dialog.Title className="text-lg font-semibold">
            Adicionar Novo Livro
          </Dialog.Title>
          <Dialog.Description className="text-sm text-gray-500 mb-4">
            Busque por título ou autor para adicionar um livro à sua estante.
          </Dialog.Description>

          <div className="flex gap-2 mb-4">
            <Input
              type="text"
              placeholder="Ex: Duna, Frank Herbert..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-grow"
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? <LoaderCircle className="animate-spin" /> : 'Buscar'}
            </Button>
          </div>

          <div className="flex-grow overflow-y-auto -mr-6 pr-6">
            {results.length > 0 && (
              <ul className="space-y-4">
                {results.map((book) => (
                  <li key={book.id} className="flex items-center gap-4">
                    <div className="relative h-[75px] w-[50px] flex-shrink-0">
                      <Image
                        src={book.coverUrl || 'https://dummyimage.com/100x150/ccc/000.png&text=Capa'}
                        alt={`Capa de ${book.title}`}
                        sizes="50px"
                        fill
                        className="rounded object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold">{book.title}</p>
                      <p className="text-sm text-gray-500">{book.author}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleAddBook(book)}>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Adicionar
                    </Button>
                  </li>
                ))}
              </ul>
            )}
             {!isLoading && results.length === 0 && (
              <div className="text-center text-gray-500 py-10">
                <p>Nenhum resultado para exibir.</p>
                <p className="text-xs">Comece uma nova busca.</p>
              </div>
            )}
          </div>

          <Dialog.Close asChild>
            <button className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Fechar</span>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}