'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { signupSchema } from '@/lib/schemas'
import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'

export async function signup(formData: FormData) {
  const origin = (await headers()).get('origin')
  const supabase = await createClient()

  const rawFormData = Object.fromEntries(formData.entries())
  const validatedFields = signupSchema.safeParse(rawFormData)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Dados inválidos.',
    }
  }
  const { email, password } = validatedFields.data

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/confirm`,
    },
  })

  if (error) {
    return {
      message: 'Não foi possível criar a conta.',
    }
  }

  revalidatePath('/', 'layout')
  redirect('/signup/confirm') // Redirect to a page telling the user to check their email
}
