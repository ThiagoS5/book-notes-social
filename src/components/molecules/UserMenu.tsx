'use-client'

import { Button } from '@/components/atoms/Button'
import { createClient } from '@/utils/supabase/client'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import type { User } from '@supabase/supabase-js'
import { LifeBuoy, LogOut, User as UserIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function UserMenu({ user }: { user: User }) {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  // Usar o user_metadata é mais seguro e flexível no futuro
  const userName =
    user?.user_metadata?.name || user?.email?.split('@')[0] || 'Usuário'

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="ghost" className="pl-2 pr-3">
          <UserIcon className="h-5 w-5 mr-2" />
          <span className="capitalize">{userName}</span>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-50 min-w-[12rem] overflow-hidden rounded-md border bg-card p-1 text-card-foreground shadow-md"
          sideOffset={5}
          align="end"
        >
          <DropdownMenu.Label className="px-2 py-1.5 text-sm font-semibold">
            Minha Conta
          </DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item asChild className="cursor-pointer">
            <Link
              href="/profile"
              className="relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground"
            >
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild className="cursor-pointer">
            <Link
              href="/support" // Link para uma futura página de suporte
              className="relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground"
            >
              <LifeBuoy className="mr-2 h-4 w-4" />
              <span>Suporte</span>
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item
            onClick={handleSignOut}
            className="group/item text-red-500 cursor-pointer relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-destructive/10 focus:text-destructive"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
