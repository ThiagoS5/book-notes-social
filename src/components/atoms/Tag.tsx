import { cn } from '@/lib/utils/twMerge'
import { BookStatus } from '@/types'

interface TagProps {
  status: BookStatus
  className?: string
}

const statusStyles: Record<BookStatus, string> = {
  'TO_READ': 'bg-blue-100 text-blue-800',
  'READING': 'bg-yellow-100 text-yellow-800 animate-pulse',
  'READ': 'bg-green-100 text-green-800',
}

const statusText: Record<BookStatus, string> = {
  'TO_READ': 'Para Ler',
  'READING': 'Lendo',
  'READ': 'Concluído',
}

export function Tag({ status, className }: TagProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
        statusStyles[status],
        className
      )}
    >
      {statusText[status]}
    </div>
  )
}