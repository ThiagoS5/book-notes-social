import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { ThemeToggle } from '@/components/atoms/ThemeToggle'

export function Header() {
  return (
    <header className="py-4 px-8 border-b bg-card">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-2">
          <BookOpen className="text-primary" />
          <h1 className="font-bold text-xl">Diário de Leitura</h1>
        </Link>
        <nav className="flex items-center gap-4">
            <ThemeToggle />
            <p>Olá, Thi!</p>
            <Button variant="outline" size="sm">Sair</Button>
        </nav>
      </div>
    </header>
  )
}