import { useBookshelf } from '@/context/BookshelfContext'
import { useMemo } from 'react'
export function useBookStats() {
  const { books, entries } = useBookshelf()

  const stats = useMemo(() => {
    const totalBooks = books.length
    const booksRead = books.filter((book) => book.status === 'READ').length
    const actuallyReading = books.filter(
      (book) => book.status === 'READING',
    ).length
    const totalEntries = entries.length

    const emotionalCount = entries.reduce(
      (acc, entry) => {
        if (entry.emotion) {
          acc[entry.emotion] = (acc[entry.emotion] || 0) + 1
        }
        return acc
      },
      {} as Record<string, number>,
    )

    const emotionOrder = Object.keys(emotionalCount).sort(
      (a, b) => emotionalCount[b] - emotionalCount[a],
    )

    const emotionMain = emotionOrder[0] || 'Nenhuma'

    return {
      totalBooks,
      booksRead,
      actuallyReading,
      totalEntries,
      emotionMain,
    }
  }, [books, entries])

  return stats
}
