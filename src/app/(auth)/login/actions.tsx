'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { loginSchema } from '@/lib/schemas'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const rawFormData = Object.fromEntries(formData.entries())
  const validatedFields = loginSchema.safeParse(rawFormData)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Dados inválidos.',
    }
  }

  const { email, password } = validatedFields.data

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return {
      message: 'E-mail ou senha inválidos.',
    }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}
