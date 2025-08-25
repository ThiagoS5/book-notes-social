'use client'

import { Button } from '@/components/atoms/Button'
import { useBookshelf } from '@/context/BookshelfContext'
import { Entry } from '@/types'
import { FilePenLine, Trash2 } from 'lucide-react'

interface EntryListProps {
  entries: Entry[]
  onEdit: (entry: Entry) => void
}

export function EntryList({ entries, onEdit }: EntryListProps) {
  const { removeEntry } = useBookshelf()

  const handleRemove = (entryId: string, entryComment: string) => {
    const confirmationMessage =
      entryComment.length > 30
        ? `"${entryComment.substring(0, 30)}..."`
        : `"${entryComment}"`

    if (
      window.confirm(
        `Tem certeza que deseja apagar a anotação: ${confirmationMessage}?`,
      )
    ) {
      removeEntry(entryId)
    }
  }

  if (entries.length === 0) {
    return (
      <div className="text-center text-slate-500 py-10">
        <p>Nenhuma anotação ainda.</p>
        <p className="text-sm">
          Use o formulário acima para adicionar sua primeira anotação!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg mt-6">Suas Anotações</h3>
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="p-4 border rounded-lg bg-card text-card-foreground"
        >
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {entry.pageNumber && <span>Página {entry.pageNumber}</span>}
                {entry.pageNumber && entry.emotion && (
                  <span className="mx-1">&bull;</span>
                )}
                {entry.emotion && (
                  <span className="font-semibold text-foreground">
                    {entry.emotion}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center -mt-1 -mr-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(entry)}
                className="h-8 w-8 text-muted-foreground hover:text-primary"
              >
                <FilePenLine className="h-4 w-4" />
                <span className="sr-only">Editar anotação</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemove(entry.id, entry.comment)}
                className="h-8 w-8 text-muted-foreground hover:bg-red-500/10 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remover anotação</span>
              </Button>
            </div>
          </div>
          <p className="whitespace-pre-wrap mt-3 text-foreground/90">
            {entry.comment}
          </p>
          <p className="text-xs text-muted-foreground mt-1 text-right">
            {new Date(entry.createdAt).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
      ))}
    </div>
  )
}
