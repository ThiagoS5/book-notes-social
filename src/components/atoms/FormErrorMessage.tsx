import { AlertCircle } from 'lucide-react'
import { ReactNode } from 'react'

interface FormErrorMessageProps {
  children: ReactNode
}

export function FormErrorMessage({ children }: FormErrorMessageProps) {
  if (!children) return null

  return (
    <p className="flex items-center gap-1 text-xs font-medium text-red-500 mt-1">
      <AlertCircle className="h-3 w-3" />
      {children}
    </p>
  )
}