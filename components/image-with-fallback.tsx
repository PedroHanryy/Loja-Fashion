"use client"

import { useState } from "react"
import Image from "next/image"

interface ImageWithFallbackProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export default function ImageWithFallback({
  src,
  alt,
  width = 400,
  height = 400,
  className = "",
  priority = false,
}: ImageWithFallbackProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className={`bg-muted flex items-center justify-center ${className}`}>
        <span className="text-muted-foreground text-sm">Imagem não disponível</span>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      />
      {isLoading && <div className="absolute inset-0 bg-muted animate-pulse" />}
    </div>
  )
}
