'use client'

import { useBookshelf } from '@/context/BookshelfContext'
import { Input } from '@/components/atoms/Input'
import { Textarea } from '@/components/atoms/Textarea'
import { Button } from '@/components/atoms/Button'
import { entrySchema, EntryFormData } from '@/lib/schemas'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormErrorMessage } from '@/components/atoms/FormErrorMessage'
import { toast } from 'sonner'
import { EmotionSelector } from '@/components/molecules/EmotionSelector'

interface EntryFormProps {
  bookId: string
}

export function EntryForm({ bookId }: EntryFormProps) {
  const { addEntry } = useBookshelf()
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset,
    control
  } = useForm<EntryFormData>({
    resolver: zodResolver(entrySchema),
  })

  const onSubmit = (data: EntryFormData) => {
    console.log('Submitting form with data:', data)
    const newEntry = {
      id: crypto.randomUUID(),
      bookId,
      comment: data.comment,
      pageNumber: data.pageNumber,
      emotion: data.emotion || undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    addEntry(newEntry)
    toast.success('Anotação salva com sucesso!')
    reset()
  }

  return (
     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 border rounded-lg bg-card text-card-foreground">
      <h3 className="font-semibold text-lg">Adicionar anotação</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div> 
          <Input
            type="number"
            placeholder="Página"
            {...register('pageNumber', { valueAsNumber: true })}
            error={errors.pageNumber}
          />
          <FormErrorMessage>{errors.pageNumber?.message}</FormErrorMessage>
        </div>
        <div> 
          <Controller
          control={control}
          name="emotion"
          render={({ field }) => (
            <EmotionSelector
              value={field.value}
              onValueChange={field.onChange}
            />
          )}
        />
          <FormErrorMessage>{errors.emotion?.message}</FormErrorMessage>
        </div>
        </div>
      <div>
        <Textarea
          placeholder="O que você está pensando sobre este livro?"
          {...register('comment')}
          error={errors.comment}
        />
        <FormErrorMessage>{errors.comment?.message}</FormErrorMessage>
      </div>
      <Button type="submit">Salvar Anotação</Button>
    </form>
  )
}