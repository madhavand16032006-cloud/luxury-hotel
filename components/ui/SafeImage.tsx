"use client";

import React, { useState } from "react";
import Image from "next/image";

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  fallbackCategory?: string;
}

export function SafeImage({
  src,
  alt,
  className = "",
  fill = false,
  width,
  height,
  priority = false,
  fallbackCategory = "Grocery",
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-linear-to-br from-emerald-50 to-green-100/60 text-emerald-800 p-4 select-none ${className}`}
      >
        <span className="text-3xl mb-1">🥬</span>
        <span className="text-xs font-medium text-emerald-700/80 text-center line-clamp-1">{alt || fallbackCategory}</span>
      </div>
    );
  }

  // Use unoptimized img tag for remote Unsplash images to guarantee zero external host configuration errors in Next.js
  if (fill) {
    return (
      <div className="relative w-full h-full overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-emerald-50/70 animate-pulse flex items-center justify-center text-emerald-400">
            <span className="text-xs tracking-wider uppercase font-medium">Loading...</span>
          </div>
        )}
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          } ${className}`}
        />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}

