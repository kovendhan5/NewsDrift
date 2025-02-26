"use client"

import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("animate-spin", className)}
      {...props}
    >
      <Loader2 className="h-4 w-4" />
      <span className="sr-only">Loading...</span>
    </div>
  )
}