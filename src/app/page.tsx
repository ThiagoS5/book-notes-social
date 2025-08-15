import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { BookOpen } from 'lucide-react'

export default function RootPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <div className="flex items-center gap-4 mb-4">
        <BookOpen className="h-12 w-12 text-indigo-600" />
        <h1 className="text-5xl font-bold">Diário de Leitura</h1>
      </div>
      <p className="mb-8 text-lg text-gray-700 max-w-md">
        Acompanhe suas leituras, registre seus pensamentos e veja sua jornada literária ganhar vida.
      </p>
      <Button asChild size="lg">
        <Link href="/dashboard">Entrar na minha estante</Link>
      </Button>
    </main>
  )
}