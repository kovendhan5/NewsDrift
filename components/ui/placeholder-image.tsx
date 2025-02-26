"use client"

import Image from "next/image"
import { useState } from "react"
import { Newspaper } from "lucide-react"

interface PlaceholderImageProps extends React.ComponentProps<typeof Image> {
  fallback?: React.ReactNode
}

export function PlaceholderImage({
  alt,
  fallback,
  src,
  ...props
}: PlaceholderImageProps) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div 
        className="flex items-center justify-center w-full h-full bg-muted/10"
        {...props}
      >
        {fallback || (
          <Newspaper className="h-6 w-6 text-muted-foreground/50" aria-label={alt} />
        )}
      </div>
    )
  }

  return (
    <Image
      alt={alt}
      src={src}
      onError={() => setError(true)}
      {...props}
    />
  )
}