export type BookStatus = 'TO_READ' | 'READING' | 'READ'

export interface Book {
  id: string
  title: string
  author: string
  status: BookStatus
  coverUrl?: string
}

export interface Entry {
  id: string
  bookId: string
  createdAt: string
  updatedAt: string
  pageNumber?: number
  emotion?: string
  comment: string
}
