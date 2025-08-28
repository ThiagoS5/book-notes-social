'use client'

import { Button } from '@/components/atoms/Button'
import { FormErrorMessage } from '@/components/atoms/FormErrorMessage'
import { Input } from '@/components/atoms/Input'
import { LoginFormData, loginSchema } from '@/lib/schemas'
import { createClient } from '@/utils/supabase/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const handleSignIn = async (data: LoginFormData) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      setError('root', {
        message: 'Credenciais inválidas. Verifique seu e-mail e senha.',
      })
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="w-full max-w-sm p-8 space-y-6 bg-card rounded-lg shadow-md">
      <h1 className="text-2xl font-bold font-serif text-center">Entrar</h1>
      <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
        {errors.root && (
          <FormErrorMessage>{errors.root.message}</FormErrorMessage>
        )}

        <div>
          <label htmlFor="email">E-mail</label>
          <Input
            type="email"
            id="email"
            placeholder="seu@email.com"
            error={errors.email}
            {...register('email')}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Mínimo 6 caracteres"
            error={errors.password}
            icon={
              showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )
            }
            onIconClick={() => setShowPassword(!showPassword)}
            {...register('password')}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </Button>
        <p className="text-sm text-center text-muted-foreground">
          Não tem uma conta?{' '}
          <Link
            href="/signup"
            className="font-semibold text-primary hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  )
}
