import { z } from 'zod'

export const entrySchema = z.object({
  comment: z.string().min(3, { message: 'A anotação precisa ter pelo menos 3 caracteres.' }),
  pageNumber: z.number().min(1,{ message: 'O número da página deve ser positivo.' }),
  emotion: z.string().regex(/^[^0-9]*$/, { message: 'Emoção não pode conter números.' }).optional(),
})

export type EntryFormData = z.infer<typeof entrySchema>