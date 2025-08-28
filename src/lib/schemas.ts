import { z } from 'zod'

export const entrySchema = z.object({
  comment: z
    .string()
    .min(3, { message: 'A anotação precisa ter pelo menos 3 caracteres.' }),
  pageNumber: z
    .number()
    .min(1, { message: 'O número da página deve ser positivo.' }),
  emotion: z
    .string()
    .regex(/^[^0-9]*$/, { message: 'Emoção não pode conter números.' })
    .optional(),
})

export type EntryFormData = z.infer<typeof entrySchema>

const passwordSchema = z
  .string()
  .min(8, { message: 'Senha deve conter mais de 8 caracteres.' })
  .max(20, { message: 'Senha deve conter menos de 20 caracteres.' })
  .refine((password) => /[A-Z]/.test(password), {
    message: 'Senha deve conter pelo menos uma letra maiúscula.',
  })
  .refine((password) => /[a-z]/.test(password), {
    message: 'Senha deve conter pelo menos uma letra minúscula.',
  })
  .refine((password) => /[0-9]/.test(password), {
    message: 'Senha deve conter pelo menos um número.',
  })
  .refine((password) => /[^a-zA-Z0-9]/.test(password), {
    message: 'Senha deve conter pelo menos um caractere especial.',
  })

export const signupSchema = z
  .object({
    email: z.email({ message: 'Por favor, insira um e-mail válido.' }),
    password: passwordSchema,
    confirmPassword: z
      .string()
      .min(8, { message: 'A confirmação de senha é obrigatória.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'],
  })

export type SignupFormData = z.infer<typeof signupSchema>

export const loginSchema = z.object({
  email: z.email({ message: 'E-mail inválido.' }),
  password: z.string().min(1, { message: 'A senha é obrigatória.' }),
})

export type LoginFormData = z.infer<typeof loginSchema>
