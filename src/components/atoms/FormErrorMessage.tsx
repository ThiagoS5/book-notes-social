import { AlertCircle } from 'lucide-react'
import { ReactNode } from 'react'

interface FormErrorMessageProps {
  children: ReactNode
  id?: string
}

export function FormErrorMessage({ children, id }: FormErrorMessageProps) {
  if (!children) return null

  return (
    <p
      id={id}
      className="flex items-center gap-1 text-xs font-medium text-red-500 mt-1"
    >
      <AlertCircle className="h-3 w-3" />
      {children}
    </p>
  )
}
