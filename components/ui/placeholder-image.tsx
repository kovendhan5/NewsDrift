"use client"

import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface PlaceholderImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: number;
  height?: number;
}

const defaultImages = {
  Technology: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  Business: "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
  Environment: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
  Science: "https://images.unsplash.com/photo-1628595351029-c2bf17511435",
  News: "https://images.unsplash.com/photo-1495020689067-958852a7765e",
  Health: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528",
  Politics: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620",
  Entertainment: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
  Sports: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211",
  Culture: "https://images.unsplash.com/photo-1482245294234-b3f2f8d5f1a4",
  Food: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  Travel: "https://images.unsplash.com/photo-1488646953014-85cb44e25828",
  History: "https://images.unsplash.com/photo-1461360370896-922624d12aa1",
  Wellness: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
  Finance: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0",
  default: "https://images.unsplash.com/photo-1633613286991-611fe299c4be"
};

export function PlaceholderImage({ 
  width = 400, 
  height = 400, 
  alt = "Placeholder",
  className,
  ...props 
}: PlaceholderImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isRetrying, setIsRetrying] = useState(false)

  // Helper to determine image category from alt text or fallback to default
  const getImageUrlForCategory = () => {
    const category = Object.keys(defaultImages).find(cat => 
      alt.toLowerCase().includes(cat.toLowerCase())
    );
    return defaultImages[category as keyof typeof defaultImages] || defaultImages.default;
  };

  // Use the provided source, but have a reliable fallback chain
  const getImageSource = () => {
    if (hasError || isRetrying) {
      return getImageUrlForCategory() + `?w=${width}&h=${height}&fit=crop&q=80`;
    }
    return props.src || getImageUrlForCategory() + `?w=${width}&h=${height}&fit=crop&q=80`;
  };

  const handleImageError = () => {
    if (!isRetrying) {
      setIsRetrying(true);
      setHasError(true);
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative" style={{ width, height }}>
      {isLoading && (
        <Skeleton className="absolute inset-0 z-10" />
      )}
      <img
        src={getImageSource()}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}
        onLoad={() => {
          setIsLoading(false);
          setHasError(false);
        }}
        onError={handleImageError}
        {...props}
      />
      {hasError && !isRetrying && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <span className="text-muted-foreground text-sm">Image not available</span>
        </div>
      )}
    </div>
  );
}