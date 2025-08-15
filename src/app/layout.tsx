import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils/twMerge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Diário de Leitura',
  description: 'Acompanhe suas leituras como nunca antes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={cn(inter.className)}>{children}</body>
    </html>
  )
}