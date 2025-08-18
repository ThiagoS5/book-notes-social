'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { Book } from '@/types'

const LOCAL_STORAGE_KEY = 'my-bookshelf'

interface BookshelfContextType {
  books: Book[]
  addBook: (newBook: Book) => void
}

export const BookshelfContext = createContext<BookshelfContextType | undefined>(
  undefined
)

export function BookshelfProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>([])
    
  useEffect(() => {
    try {
      const savedBooks = window.localStorage.getItem(LOCAL_STORAGE_KEY)
      if (savedBooks) {
        setBooks(JSON.parse(savedBooks))
      }
    } catch (error) {
       console.error("Erro ao carregar livros do localStorage:", error)
    }
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books))
    } catch (error) {
      console.error("Erro ao salvar livros no localStorage:", error)
    }
  }, [books])

  const addBook = (newBook: Book) => {
    if (!books.some(book => book.id === newBook.id)) {
      setBooks(prevBooks => [...prevBooks, newBook])
    } else {
      console.warn(`O livro "${newBook.title}" já está na estante.`)
    }
  }

  const value = {books, addBook}

  return (
    <BookshelfContext.Provider value={value}>
      {children}
    </BookshelfContext.Provider>
  )
}

export function useBookshelf() {
  const context = useContext(BookshelfContext)
  if (context === undefined) {
    throw new Error('useBookshelf deve ser usado dentro de um BookshelfProvider')
  }
  return context
}