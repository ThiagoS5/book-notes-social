'use client'

import { Entry } from '@/types'

interface EntryListProps {
  entries: Entry[]
}

export function EntryList({ entries }: EntryListProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center text-slate-500 py-10">
        <p>Nenhuma anotação ainda.</p>
        <p className="text-sm">Use o formulário acima para adicionar sua primeira anotação!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg mt-6">Suas Anotações</h3>
      {entries.map(entry => (
        <div key={entry.id} className="p-4 border rounded-lg bg-card text-card-foreground">
          <div className="flex items-center gap-4 text-sm text-slate-500 mb-2">
            {entry.pageNumber && <span>Página {entry.pageNumber}</span>}
            {entry.pageNumber && entry.emotion && <span>&bull;</span>}
            {entry.emotion && <span className="font-semibold">{entry.emotion}</span>}
          </div>
          <p className="whitespace-pre-wrap">{entry.comment}</p>
          <p className="text-xs text-slate-400 mt-2 text-right">
            {new Date(entry.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>
      ))}
    </div>
  )
}