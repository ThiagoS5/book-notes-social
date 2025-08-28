import React from 'react'
import type { FieldError } from 'react-hook-form'
import { cn } from '../../utils/twMerge'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: FieldError
  icon?: React.ReactNode
  onIconClick?: () => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, icon, onIconClick, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
            'placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            icon && 'pr-10',
            error && 'border-red-500 focus-visible:ring-red-500',
            className,
          )}
          ref={ref}
          {...props}
        />
        {icon && (
          <button
            type="button"
            onClick={onIconClick}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            aria-label="Toggle password visibility"
          >
            {icon}
          </button>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
