import { cn } from '@/lib/utils/twMerge'
import * as React from 'react'
import type { FieldError } from 'react-hook-form'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: FieldError
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    const errorId = error?.message ? `${props.name}-error` : undefined
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background',
          'placeholder:text-muted-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-red-500 focus-visible:ring-red-500',
          className,
        )}
        ref={ref}
        aria-invalid={!!error}
        aria-describedby={errorId}
        {...props}
      />
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea }
