import Image from 'next/image'

interface EmptyStateProps {
  imageUrl: string
  title: string
  description: string
  children?: React.ReactNode
}

export function EmptyState({
  imageUrl,
  title,
  description,
  children,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full py-16">
      <div className="relative w-64 h-64 mb-4">
        <Image src={imageUrl} alt={title} fill className="object-contain" />
      </div>
      <h2 className="text-2xl font-bold font-serif mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6 max-w-sm">{description}</p>
      {children}
    </div>
  )
}
