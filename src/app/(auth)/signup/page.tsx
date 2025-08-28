'use client'

import { Button } from '@/components/atoms/Button'
import { FormErrorMessage } from '@/components/atoms/FormErrorMessage'
import { Input } from '@/components/atoms/Input'
import { signup } from '@/app/(auth)/signup/actions'
import { SignupFormData, signupSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const processForm = async (data: SignupFormData) => {
    const formData = new FormData()
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('confirmPassword', data.confirmPassword)

    const result = await signup(formData)

    if (result && result.message) {
      setError('root', { type: 'server', message: result.message })
    }

    if (result && result.errors) {
      if (result.errors.email) {
        setError('email', { type: 'server', message: result.errors.email[0] })
      }
      if (result.errors.password) {
        setError('password', {
          type: 'server',
          message: result.errors.password[0],
        })
      }
      if (result.errors.confirmPassword) {
        setError('confirmPassword', {
          type: 'server',
          message: result.errors.confirmPassword[0],
        })
      }
    }
  }

  return (
    <div className="w-full max-w-sm p-8 space-y-6 bg-card rounded-lg shadow-md">
      <h1 className="text-2xl font-bold font-serif text-center">Criar Conta</h1>
      <form onSubmit={handleSubmit(processForm)} className="space-y-4">
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
            placeholder="Mínimo 8 caracteres"
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
        <div>
          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Repita a senha"
            error={errors.confirmPassword}
            icon={
              showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )
            }
            onIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
            {...register('confirmPassword')}
          />
          <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </Button>
        <p className="text-sm text-center text-muted-foreground">
          Já tem uma conta?{' '}
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            Entrar
          </Link>
        </p>
      </form>
    </div>
  )
}