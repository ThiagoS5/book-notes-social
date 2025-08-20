'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { Book, Entry, BookStatus } from '@/types'

const LOCAL_STORAGE_KEY = 'my-bookshelf-data'

interface BookshelfContextType {
  books: Book[]
  entries: Entry[]
  addBook: (newBook: Book) => void
  removeBook: (bookId: string) => void
  updateBookStatus: (bookId: string, status: BookStatus) => void
  addEntry: (newEntry: Entry) => void
  getEntriesForBook: (bookId: string) => Entry[]
}

export const BookshelfContext = createContext<BookshelfContextType | undefined>(
  undefined
)

export function BookshelfProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>([])
  const [entries, setEntries] = useState<Entry[]>([])
    
  useEffect(() => {
    try {
      const savedData = window.localStorage.getItem(LOCAL_STORAGE_KEY)
      if (savedData) {
        const { books: savedBooks, entries: savedEntries } = JSON.parse(savedData)
        setBooks(savedBooks || [])
        setEntries(savedEntries || [])
      }
    } catch (error) {
       console.error("Erro ao carregar dados do localStorage:", error)
    }
  }, [])

  useEffect(() => {
    try {
      const dataToSave = { books, entries }
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave))
    } catch (error) {
      console.error("Erro ao salvar dados no localStorage:", error)
    }
  }, [books, entries])

  const addBook = (newBook: Book) => {
    if (!books.some(book => book.id === newBook.id)) {
      setBooks(prevBooks => [...prevBooks, newBook])
    } else {
      console.warn(`O livro "${newBook.title}" já está na estante.`)
    }
  }

  const removeBook = (bookId: string) => {
    setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
    setEntries(prevEntries => prevEntries.filter(entry => entry.bookId !== bookId));
  }

  const updateBookStatus = (bookId: string, status: BookStatus) => {
    setBooks(prevBooks => 
      prevBooks.map(book => 
        book.id === bookId ? { ...book, status } : book
      )
    );
  };

  const addEntry = (newEntry: Entry) => {
    setEntries(prevEntries => [...prevEntries, newEntry])
  }

  const getEntriesForBook = (bookId: string) => {
    return entries.filter(entry => entry.bookId === bookId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  const value = {
    books,
    entries,
    addBook,
    addEntry,
    getEntriesForBook,
    removeBook,
    updateBookStatus,
  }
  
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