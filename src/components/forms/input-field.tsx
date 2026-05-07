import * as React from "react"
import { cn } from "@/lib/utils"

interface InputFieldProps {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  className?: string
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ 
    label, 
    name, 
    value, 
    onChange, 
    type = "text",
    placeholder,
    required = false,
    disabled = false,
    error,
    className 
  }, ref) => {
    return (
      <div className={cn("space-y-2", className)}>
        <label 
          htmlFor={name}
          className="text-sm font-medium text-foreground"
        >
          {label}
          {required && <span className="text-primary ml-1">*</span>}
        </label>
        
        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={cn(
            "w-full px-4 py-3 bg-background border border-input rounded-lg",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "transition-all duration-200",
            error && "border-destructive",
            "glass border-border/50"
          )}
        />
        
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    )
  }
)
InputField.displayName = "InputField"

export { InputField }
