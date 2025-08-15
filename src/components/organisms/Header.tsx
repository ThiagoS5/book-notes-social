import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { Button } from '@/components/atoms/Button'

export function Header() {
  return (
    <header className="py-4 px-8 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-2">
          <BookOpen className="text-indigo-600" />
          <h1 className="font-bold text-xl">Diário de Leitura</h1>
        </Link>
        <nav className="flex items-center gap-4">
            <p>Olá, Thi!</p>
            <Button variant="outline" size="sm">Sair</Button>
        </nav>
      </div>
    </header>
  )
}