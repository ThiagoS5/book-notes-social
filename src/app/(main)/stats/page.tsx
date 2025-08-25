'use client'

import { StatCard } from '@/components/molecules/StatCard'
import {
  BookUp,
  BookCheck,
  BookOpen,
  MessageSquare,
  BrainCircuit,
} from 'lucide-react'
import { useBookStats } from '@/hooks/useBookStats'

export default function StatsPage() {
  const stats = useBookStats()

  return (
    <div className="container mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold font-serif mb-8">Suas Estatísticas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total de Livros na Estante"
          value={stats.totalBooks}
          icon={BookUp}
        />
        <StatCard
          title="Livros Concluídos"
          value={stats.booksRead}
          icon={BookCheck}
        />
        <StatCard
          title="Lendo Atualmente"
          value={stats.actuallyReading}
          icon={BookOpen}
        />
        <StatCard
          title="Total de Anotações"
          value={stats.totalEntries}
          icon={MessageSquare}
        />
        <StatCard
          title="Emoção Principal"
          value={stats.emotionMain}
          icon={BrainCircuit}
        />
      </div>
    </div>
  )
}
