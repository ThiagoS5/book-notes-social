'use client'

import { useState } from 'react'
import { Header } from '@/components/organisms/Header'
import { Sidebar } from '@/components/organisms/Sidebar'
import { BookshelfProvider } from '@/context/BookshelfContext'
import { cn } from '@/lib/utils/twMerge'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <BookshelfProvider>
      <div
        className={cn(
          'grid min-h-screen w-full transition-[grid-template-columns] duration-300 ease-in-out',
          isSidebarCollapsed ? 'md:grid-cols-[80px_1fr]' : 'md:grid-cols-[256px_1fr]'
        )}
      >
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
        <div
          className={cn(
            'flex flex-col flex-grow transition-all duration-300 ease-in-out'
          )}
        >
          <Header />
          <main className="flex-grow p-4 md:p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </BookshelfProvider>
  )
}