// app/challenges/[slug]/DeadlineCountdown.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

interface DeadlineCountdownProps {
  deadline: string
}

export default function DeadlineCountdown({ deadline }: DeadlineCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  } | null>(null)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const deadlineDate = new Date(deadline).getTime()
      const now = new Date().getTime()
      const difference = deadlineDate - now

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }

      return null
    }

    // Set initial time
    setTimeLeft(calculateTimeLeft())

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [deadline])

  if (!timeLeft) {
    return null
  }

  return (
    <div className="bg-gradient-to-r from-[#3fb950]/10 to-[#39FF14]/5 border border-[#3fb950]/20 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-5 h-5 text-[#3fb950]" />
        <p className="text-sm font-semibold text-[#3fb950]">Time Remaining</p>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <div className="text-center">
          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg py-3 mb-1">
            <p className="text-2xl font-bold text-[#39FF14]">{timeLeft.days}</p>
          </div>
          <p className="text-xs text-[#8b949e]">Days</p>
        </div>
        <div className="text-center">
          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg py-3 mb-1">
            <p className="text-2xl font-bold text-[#39FF14]">{String(timeLeft.hours).padStart(2, '0')}</p>
          </div>
          <p className="text-xs text-[#8b949e]">Hours</p>
        </div>
        <div className="text-center">
          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg py-3 mb-1">
            <p className="text-2xl font-bold text-[#39FF14]">{String(timeLeft.minutes).padStart(2, '0')}</p>
          </div>
          <p className="text-xs text-[#8b949e]">Minutes</p>
        </div>
        <div className="text-center">
          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg py-3 mb-1">
            <p className="text-2xl font-bold text-[#39FF14]">{String(timeLeft.seconds).padStart(2, '0')}</p>
          </div>
          <p className="text-xs text-[#8b949e]">Seconds</p>
        </div>
      </div>
    </div>
  )
}