/* eslint-disable camelcase */
import { type EmailOtpType } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'

import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null

  if (token_hash && type) {
    const supabase = await createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if (!error) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }
  console.error('Erro na confirmação de e-mail:', 'Token inválido ou expirado.')
  return NextResponse.redirect(new URL('/auth/auth-code-error', request.url))
}
