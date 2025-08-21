'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Book, BookText, Home, BarChart3, User, ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils/twMerge'
import { Button } from '../atoms/Button'
import { useEffect, useRef } from 'react'

const navLinks = [
  { href: '/dashboard', label: 'Minha Estante', icon: Home },
  { href: '/stats', label: 'Estatísticas', icon: BarChart3 },
  { href: '/notes', label: 'Anotações', icon: BookText },
  { href: '/profile', label: 'Perfil', icon: User },
]

interface SidebarProps {
  isCollapsed: boolean
  setCollapsed: (isCollapsed: boolean) => void
}

export function Sidebar({isCollapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname()
  const sidebarRef = useRef<HTMLElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        !isCollapsed &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setCollapsed(true)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isCollapsed, setCollapsed])

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        'bg-card border-r p-4 hidden md:flex flex-col row-span-2 transition-all duration-300 ease-in-out',
      )}
    >
      <div
        onClick={() => setCollapsed(!isCollapsed)}
        className={cn(
          "flex items-center gap-2 mb-8 cursor-pointer px-3 pl-5",
           isCollapsed ? 'h-10 w-10 justify-center' : 'gap-3 px-2 py-2'
        )}>
        <Book className="text-primary h-6 w-6 flex-shrink-0" />
        <span className={cn("font-bold text-xl font-serif whitespace-nowrap overflow-hidden", isCollapsed && "opacity-0")}>
          Diário de Leitura
        </span>
      </div>
      <nav className="flex flex-col gap-2">
        {navLinks.map(link => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                'flex items-center rounded-md text-sm font-medium transition-colors',
                isCollapsed ? 'h-10 w-10 justify-center' : 'gap-3 px-3 py-2',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <link.icon className="h-5 w-5 flex-shrink-0" />
              <span className={cn("whitespace-nowrap overflow-hidden transition-opacity duration-200", isCollapsed && "opacity-0 w-0")}>
                {link.label}
              </span>
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto">
        <Button variant="outline" size="sm" className="w-full" onClick={() => setCollapsed(!isCollapsed)}>
           <ChevronLeft className={cn("h-4 w-4 transition-transform", isCollapsed && "rotate-180")} />
           <span className={cn("sr-only", !isCollapsed && "ml-2")}>
             {isCollapsed ? "Expandir" : "Recolher"}
           </span>
        </Button>
      </div>
    </aside>
  )
}