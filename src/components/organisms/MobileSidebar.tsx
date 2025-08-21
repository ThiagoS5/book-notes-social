'use client'

import Link from 'next/link'
import * as Dialog from '@radix-ui/react-dialog'
import { Button } from '@/components/atoms/Button'
import { Book, BookText, Home, BarChart3, User, X, Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/twMerge'
import { useState } from 'react'

const navLinks = [
  { href: '/dashboard', label: 'Minha Estante', icon: Home },
  { href: '/stats', label: 'Estatísticas', icon: BarChart3 },
  { href: '/notes', label: 'Anotações', icon: BookText },
  { href: '/profile', label: 'Perfil', icon: User },
]

export function MobileSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm" className="md:hidden"> {/* Só aparece em telas pequenas */}
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir Menu</span>
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0" />
        <Dialog.Content className="fixed left-0 top-0 h-full w-3/4 max-w-xs bg-card p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Book className="text-primary" />
              <Dialog.Title className="font-bold text-xl font-serif">Diário de Leitura</Dialog.Title>
            </div>
            <Dialog.Close asChild>
              <Button variant="outline" size="sm">
                <X className="h-4 w-4" />
                <span className="sr-only">Fechar</span>
              </Button>
            </Dialog.Close>
          </div>
          <nav className="flex flex-col gap-2">
            {navLinks.map(link => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)} // Fecha o menu ao clicar no link
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}