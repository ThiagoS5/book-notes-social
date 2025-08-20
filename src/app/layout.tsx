import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils/twMerge'
import { ThemeProvider } from '@/components/theme-provider'
import { Lora, Source_Sans_3 } from 'next/font/google'

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  display: 'swap',
})

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
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn('font-sans', lora.variable, sourceSans.variable)}>
        <ThemeProvider  
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
            {children}
        </ThemeProvider>
      </body>
    </html>
  )
}