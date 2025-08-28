'use client'

import { ThemeToggle } from '@/components/atoms/ThemeToggle'
import { createClient } from '@/utils/supabase/client'
import type { User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { UserMenu } from '../molecules/UserMenu'
import { MobileSidebar } from './MobileSidebar'

export function Header() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [supabase.auth])

  if (loading) {
    return (
      <header className="flex items-center h-16 px-4 md:px-8 border-b w-full flex-shrink-0">
        <div className="flex justify-between items-center w-full">
          <MobileSidebar />
          <div className="flex-grow"></div>
          <div className="flex items-center gap-4">
            <div className="h-9 w-9 rounded-md bg-secondary animate-pulse" />
            <div className="h-9 w-24 rounded-md bg-secondary animate-pulse" />
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="flex items-center h-16 px-4 md:px-8 border-b w-full flex-shrink-0">
      <div className="flex justify-between items-center w-full">
        <MobileSidebar />
        <div className="flex-grow"></div>
        <nav
          className="flex items-center gap-4"
          aria-label="Menu do Usuário e tema"
        >
          <ThemeToggle />
          {/* 2. Substitua o <p> e o <Button> pelo UserMenu */}
          {user && <UserMenu user={user} />}
        </nav>
      </div>
    </header>
  )
}
