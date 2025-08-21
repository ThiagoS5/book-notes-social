'use client'

import * as Select from '@radix-ui/react-select'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils/twMerge'

const emotions = [
  { value: '🤩 Animado', label: '🤩 Animado' },
  { value: '😊 Feliz', label: '😊 Feliz' },
  { value: '🤔 Curioso', label: '🤔 Curioso' },
  { value: '😮 Surpreso', label: '😮 Surpreso' },
  { value: '😬 Tenso', label: '😬 Tenso' },
  { value: '😂 Divertido', label: '😂 Divertido' },
  { value: '💡 Inspirado', label: '💡 Inspirado' },
  { value: '😢 Triste', label: '😢 Triste' },
  { value: '😠 Com Raiva', label: '😠 Com Raiva' },
  { value: '😨 Com Medo', label: '😨 Com Medo' },
  { value: '🥱 Entediado', label: '🥱 Entediado' },
]

interface EmotionSelectorProps {
  value?: string
  onValueChange: (value: string) => void
}

export function EmotionSelector({ value, onValueChange }: EmotionSelectorProps) {
  return (
    <div>
      <Select.Root value={value} onValueChange={onValueChange}>
        <Select.Trigger 
          className={cn(
            'flex w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background',
            'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50'
          )}
        >
          <Select.Value placeholder="Como você se sente neste capitulo?" />
          <Select.Icon>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content 
            className="relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-card text-card-foreground shadow-md animate-in fade-in-80"
            position="popper"
            sideOffset={4}
          >
            <Select.Viewport className="p-1">
              {emotions.map((emotion) => (
                <Select.Item
                  key={emotion.value}
                  value={emotion.value}
                  className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                >
                  <Select.ItemText>{emotion.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}