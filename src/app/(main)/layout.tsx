import { Header } from '@/components/organisms/Header'
import { BookshelfProvider } from '@/context/BookshelfContext'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <BookshelfProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto p-8">{children}</main>
      </div>
    </BookshelfProvider>
  )
}