import { Button } from '@/components/atoms/Button'
import { ThemeToggle } from '@/components/atoms/ThemeToggle'
import { MobileSidebar } from './MobileSidebar'

export function Header() {
  return (
    <header className=" flex items-center h-16 px-4 md:px-8 border-b w-full flex-shrink-0">
      <div className="flex justify-between items-center w-full">
        <MobileSidebar />
        <div className="flex-grow"></div>
        <nav className="flex items-center gap-4" aria-label="Menu do Usuário">
          <ThemeToggle />
          <p>Olá, Thi!</p>
          <Button variant="outline" size="sm">
            Sair
          </Button>
        </nav>
      </div>
    </header>
  )
}
