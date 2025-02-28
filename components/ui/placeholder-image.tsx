"use client"

import { cn } from "@/lib/utils"
import { ImageIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface PlaceholderImageProps extends React.ComponentProps<typeof Image> {
  fallbackClassName?: string
}

export function PlaceholderImage({
  alt,
  src,
  className,
  fallbackClassName,
  ...props
}: PlaceholderImageProps) {
  const [error, setError] = useState(false)

  return error || !src ? (
    <div 
      className={cn(
        "flex items-center justify-center bg-muted",
        className,
        fallbackClassName
      )}
      style={{ aspectRatio: props.width && props.height ? `${props.width}/${props.height}` : undefined }}
    >
      <ImageIcon className="h-10 w-10 text-muted-foreground/50" />
    </div>
  ) : (
    <Image
      alt={alt}
      src={src}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  )
}