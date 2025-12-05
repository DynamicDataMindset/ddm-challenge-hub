// components/TrackBadge.tsx
import React from 'react'

interface TrackBadgeProps {
  track: {
    name: string
    icon?: string
    color?: string
  }
  size?: 'sm' | 'md' | 'lg'
}

export default function TrackBadge({ track, size = 'md' }: TrackBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  }

  // Use track color if provided, otherwise default to neon green
  const backgroundColor = track.color || '#39FF14'
  
  // Calculate if color is light or dark for text contrast
  const isLightColor = (hexColor: string) => {
    const hex = hexColor.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 155
  }

  const textColor = isLightColor(backgroundColor) ? '#0d1117' : '#ffffff'

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full ${sizeClasses[size]} transition-all duration-200`}
      style={{
        backgroundColor: `${backgroundColor}20`, // 20% opacity
        border: `1px solid ${backgroundColor}`,
        color: backgroundColor,
      }}
    >
      {track.icon && <span>{track.icon}</span>}
      <span>{track.name}</span>
    </span>
  )
}