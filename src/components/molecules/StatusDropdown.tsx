'use client'

import { Tag } from '@/components/atoms/Tag'
import { useBookshelf } from '@/context/BookshelfContext'
import { statusText } from '@/lib/utils/constants'
import { Book, BookStatus } from '@/types'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Check, ChevronDown } from 'lucide-react'

interface StatusDropdownProps {
  book: Book
}

const statuses: BookStatus[] = ['TO_READ', 'READING', 'READ']

export function StatusDropdown({ book }: StatusDropdownProps) {
  const { updateBookStatus } = useBookshelf()
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="flex items-center gap-1 transition-transform hover:scale-105 active:scale-95"
          aria-label="Mudar status do livro"
        >
          <Tag status={book.status} />
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-card p-1 text-card-foreground shadow-md animate-in fade-in-80"
          sideOffset={5}
          align="start"
        >
          <DropdownMenu.Label className="px-2 py-1.5 text-sm font-semibold">
            Mudar status
          </DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.RadioGroup
            value={book.status}
            onValueChange={(status) =>
              updateBookStatus(book.id, status as BookStatus)
            }
          >
            {statuses.map((status) => (
              <DropdownMenu.RadioItem
                key={status}
                value={status}
                className="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              >
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                  <DropdownMenu.ItemIndicator>
                    <Check className="h-4 w-4" />
                  </DropdownMenu.ItemIndicator>
                </span>
                {statusText[status]}
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
