"use client"

interface PlaceholderImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: number;
  height?: number;
}

export function PlaceholderImage({ 
  width = 400, 
  height = 400, 
  alt = "Placeholder",
  className,
  ...props 
}: PlaceholderImageProps) {
  // Fallback to unsplash if src is not provided or is a placeholder
  const src = props.src && !props.src.includes('placeholder.svg') 
    ? props.src 
    : `https://source.unsplash.com/${width}x${height}/?abstract,minimal`;

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      {...props}
    />
  );
}