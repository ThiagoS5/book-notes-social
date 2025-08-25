'use client'

import { Button } from '@/components/atoms/Button'
import { FormErrorMessage } from '@/components/atoms/FormErrorMessage'
import { Input } from '@/components/atoms/Input'
import { Textarea } from '@/components/atoms/Textarea'
import { EmotionSelector } from '@/components/molecules/EmotionSelector'
import { useBookshelf } from '@/context/BookshelfContext'
import { EntryFormData, entrySchema } from '@/lib/schemas'
import type { Entry } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

interface EntryFormProps {
  bookId: string
  entryToEdit?: Entry | null
  onFinishEditing: () => void
}

export function EntryForm({
  bookId,
  entryToEdit,
  onFinishEditing,
}: EntryFormProps) {
  const { addEntry, updateEntry } = useBookshelf()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<EntryFormData>({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      emotion: '',
    },
  })

  useEffect(() => {
    if (entryToEdit) {
      reset(entryToEdit)
    } else {
      reset({ comment: '', pageNumber: undefined, emotion: undefined })
    }
  }, [entryToEdit, reset])

  const onSubmit = (data: EntryFormData) => {
    if (entryToEdit) {
      updateEntry(entryToEdit.id, {
        comment: data.comment,
        pageNumber: data.pageNumber,
        emotion: data.emotion,
      })
    } else {
      const newEntry = {
        id: crypto.randomUUID(),
        bookId,
        comment: data.comment,
        pageNumber: data.pageNumber,
        emotion: data.emotion,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      addEntry(newEntry)
    }
    onFinishEditing()
  }

  useEffect(() => {
    if (entryToEdit) {
      reset(entryToEdit)
    } else {
      reset({ comment: '', pageNumber: undefined, emotion: '' })
    }
  }, [entryToEdit, reset])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 border rounded-lg bg-card text-card-foreground"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">
          {entryToEdit ? 'Editar Anotação' : 'Adicionar Anotação'}
        </h3>
        {entryToEdit && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onFinishEditing}
            type="button"
          >
            Cancelar
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="pageNumber" className="sr-only">
            Página
          </label>
          <Input
            id="pageNumber"
            type="number"
            placeholder="Página"
            {...register('pageNumber', { valueAsNumber: true })}
            error={errors.pageNumber}
          />
          <FormErrorMessage id="pageNumber-error">
            {errors.pageNumber?.message}
          </FormErrorMessage>
        </div>
        <div>
          <label htmlFor="emotion" className="sr-only">
            Emoção
          </label>
          <Controller
            control={control}
            name="emotion"
            render={({ field }) => (
              <EmotionSelector
                id="emotion"
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />
          <FormErrorMessage id="emotion-error">
            {errors.emotion?.message}
          </FormErrorMessage>
        </div>
      </div>
      <div>
        <label htmlFor="comment" className="sr-only">
          Comentário
        </label>
        <Textarea
          id="comment"
          placeholder="O que você está pensando sobre este livro?"
          {...register('comment')}
          error={errors.comment}
        />
        <FormErrorMessage id="comment-error">
          {errors.comment?.message}
        </FormErrorMessage>
      </div>
      <Button type="submit">
        {entryToEdit ? 'Salvar Alterações' : 'Salvar Anotação'}
      </Button>
    </form>
  )
}
