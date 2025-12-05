// components/ChallengeTypeBadge.tsx
import React from 'react'
import { Trophy, GraduationCap } from 'lucide-react'

interface ChallengeTypeBadgeProps {
  type: 'project' | 'certification'
  size?: 'sm' | 'md' | 'lg'
  position?: 'inline' | 'absolute'
}

export default function ChallengeTypeBadge({ 
  type, 
  size = 'md',
  position = 'inline' 
}: ChallengeTypeBadgeProps) {
  const config = {
    project: {
      icon: Trophy,
      label: 'PROJECT',
      color: '#58a6ff',
      bgColor: '#58a6ff',
    },
    certification: {
      icon: GraduationCap,
      label: 'CERTIFICATION',
      color: '#d29922',
      bgColor: '#d29922',
    },
  }

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  }

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  }

  const positionClasses = position === 'absolute' 
    ? 'absolute top-3 right-3 z-10' 
    : 'inline-flex'

  const Icon = config[type].icon

  return (
    <span
      className={`${positionClasses} items-center font-bold rounded-md ${sizeClasses[size]} transition-all duration-200`}
      style={{
        backgroundColor: `${config[type].bgColor}20`,
        border: `1.5px solid ${config[type].color}`,
        color: config[type].color,
      }}
    >
      <Icon className={iconSizes[size]} />
      <span>{config[type].label}</span>
    </span>
  )
}