'use client'

import { useState } from 'react'
import { useBookshelf } from '@/context/BookshelfContext'
import { Input } from '@/components/atoms/Input'
import { Textarea } from '@/components/atoms/Textarea'
import { Button } from '@/components/atoms/Button'

interface EntryFormProps {
  bookId: string
}

export function EntryForm({ bookId }: EntryFormProps) {
  const { addEntry } = useBookshelf()
  const [comment, setComment] = useState('')
  const [page, setPage] = useState('')
  const [emotion, setEmotion] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!comment.trim()) return

    const newEntry = {
      id: crypto.randomUUID(),
      bookId,
      comment: comment.trim(),
      pageNumber: Number(page) || undefined,
      emotion: emotion.trim() || undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    addEntry(newEntry)

    setComment('')
    setPage('')
    setEmotion('')
  }

  return (
     <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-card text-card-foreground">
      <h3 className="font-semibold text-lg">Adicionar anotação</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="number"
          placeholder="Página (opcional)"
          value={page}
          onChange={(e) => setPage(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Emoção (opcional)"
          value={emotion}
          onChange={(e) => setEmotion(e.target.value)}
        />
      </div>
      <Textarea
        placeholder="O que você está pensando sobre este livro? (obrigatório)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <Button type="submit">Salvar Anotação</Button>
    </form>
  )
}