import { Book, Entry
} from '@/types'

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'A Guerra dos Tronos',
    author: 'George R. R. Martin',
    status: 'READING',
    coverUrl: 'https://via.placeholder.com/150x220.png?text=GOT', 
  },
  {
    id: '2',
    title: 'Duna',
    author: 'Frank Herbert',
    status: 'READ',
    coverUrl: 'https://via.placeholder.com/150x220.png?text=Duna',
  },
  {
    id: '3',
    title: 'O Problema dos 3 Corpos',
    author: 'Cixin Liu',
    status: 'TO_READ',
  },
]

export const mockEntries: Entry[] = [
  {
    id: 'e1',
    bookId: '1',
    pageNumber: 62,
    emotion: 'Chocado',
    comment: 'Não acredito que o Ned Stark já...',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]