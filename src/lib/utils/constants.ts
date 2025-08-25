import { BookStatus } from '@/types'
import { BarChart3, BookText, Home, User } from 'lucide-react'

export const statusStyles: Record<BookStatus, string> = {
  TO_READ: 'bg-secondary text-secondary-foreground',
  READING: 'bg-primary/20 text-primary animate-pulse font-bold',
  READ: 'bg-green-500/20 text-green-500 font-bold',
}

export const statusText: Record<BookStatus, string> = {
  TO_READ: 'Para Ler',
  READING: 'Lendo',
  READ: 'Concluído',
}

export const navLinks = [
  { href: '/dashboard', label: 'Minha Estante', icon: Home },
  { href: '/stats', label: 'Estatísticas', icon: BarChart3 },
  { href: '/notes', label: 'Anotações', icon: BookText },
  { href: '/profile', label: 'Perfil', icon: User },
]
