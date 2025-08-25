'use client'

import { statusText } from '@/lib/utils/constants'
import { Book, BookStatus, Entry } from '@/types'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { toast } from 'sonner'

const LOCAL_STORAGE_KEY = 'my-bookshelf-data'

interface BookshelfContextType {
  books: Book[]
  entries: Entry[]
  addBook: (newBook: Book) => void
  removeBook: (bookId: string) => void
  updateBookStatus: (bookId: string, status: BookStatus) => void
  addEntry: (newEntry: Entry) => void
  getEntriesForBook: (bookId: string) => Entry[]
  removeEntry: (entryId: string) => void
  updateEntry: (entryId: string, updatedData: Partial<Entry>) => void
}

export const BookshelfContext = createContext<BookshelfContextType | undefined>(
  undefined,
)

export function BookshelfProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>([])
  const [entries, setEntries] = useState<Entry[]>([])

  const removeEntry = (entryId: string) => {
    setEntries((prevEntries) =>
      prevEntries.filter((entry) => entry.id !== entryId),
    )
    toast.error('Anotação removida.')
  }

  const updateEntry = (entryId: string, updatedData: Partial<Entry>) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === entryId
          ? { ...entry, ...updatedData, updatedAt: new Date().toISOString() }
          : entry,
      ),
    )
    toast.success('Anotação atualizada!')
  }

  useEffect(() => {
    try {
      const savedData = window.localStorage.getItem(LOCAL_STORAGE_KEY)
      if (savedData) {
        const { books: savedBooks, entries: savedEntries } =
          JSON.parse(savedData)

        const parsedEntries = savedEntries.map((entry: Entry) => ({
          ...entry,
          createdAt: new Date(entry.createdAt),
          updatedAt: new Date(entry.updatedAt),
        }))

        setBooks(savedBooks || [])
        setEntries(parsedEntries || [])
      }
    } catch (error) {
      console.error('Erro ao carregar dados do localStorage:', error)
    }
  }, [])

  useEffect(() => {
    try {
      const dataToSave = { books, entries }
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave))
    } catch (error) {
      console.error('Erro ao salvar dados no localStorage:', error)
    }
  }, [books, entries])

  const addBook = (newBook: Book) => {
    if (!books.some((book) => book.id === newBook.id)) {
      setBooks((prevBooks) => [...prevBooks, newBook])
      toast.success(`"${newBook.title}" adicionado à sua estante!`)
    } else {
      toast.warning(`O livro "${newBook.title}" já está na estante.`)
    }
  }

  const removeBook = (bookId: string) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId))
    setEntries((prevEntries) =>
      prevEntries.filter((entry) => entry.bookId !== bookId),
    )
  }

  const updateBookStatus = (bookId: string, status: BookStatus) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId ? { ...book, status } : book,
      ),
    )
    toast.success(`Status atualizado para "${statusText[status]}"!`)
  }

  const addEntry = (newEntry: Entry) => {
    setEntries((prevEntries) => [
      ...prevEntries,
      {
        ...newEntry,
        createdAt: new Date(newEntry.createdAt).toISOString(),
        updatedAt: new Date(newEntry.updatedAt).toISOString(),
      },
    ])
  }

  const getEntriesForBook = useCallback(
    (bookId: string) => {
      return entries
        .filter((entry) => entry.bookId === bookId)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
    },
    [entries],
  )

  const value = useMemo(
    () => ({
      books,
      entries,
      addBook,
      addEntry,
      getEntriesForBook,
      removeBook,
      updateBookStatus,
      removeEntry,
      updateEntry,
    }),
    [books, entries, getEntriesForBook],
  )

  return (
    <BookshelfContext.Provider value={value}>
      {children}
    </BookshelfContext.Provider>
  )
}

export function useBookshelf() {
  const context = useContext(BookshelfContext)
  if (context === undefined) {
    throw new Error(
      'useBookshelf deve ser usado dentro de um BookshelfProvider',
    )
  }
  return context
}
