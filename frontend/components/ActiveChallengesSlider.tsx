// components/ActiveChallengesSlider.tsx
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Clock, ArrowRight } from 'lucide-react'
import { urlFor } from '@/lib/sanity'
import ChallengeTypeBadge from './ChallengeTypeBadge'
import TrackBadge from './TrackBadge'
import type { SliderChallenge } from '@/types/sanity'

interface ActiveChallengesSliderProps {
  challenges: SliderChallenge[]
}

export default function ActiveChallengesSlider({ challenges }: ActiveChallengesSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: string }>({})
  const [isPaused, setIsPaused] = useState(false)

  // Calculate time left for each challenge
  useEffect(() => {
    const calculateTimeLeft = () => {
      const newTimeLeft: { [key: string]: string } = {}
      
      challenges.forEach((challenge) => {
        const deadline = new Date(challenge.deadline).getTime()
        const now = new Date().getTime()
        const difference = deadline - now

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24))
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
          const minutes = Math.floor((difference / 1000 / 60) % 60)
          const seconds = Math.floor((difference / 1000) % 60)

          newTimeLeft[challenge._id] = `${days}d ${hours}h ${minutes}m ${seconds}s`
        } else {
          newTimeLeft[challenge._id] = 'Expired'
        }
      })

      setTimeLeft(newTimeLeft)
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [challenges])

  // Auto-rotate slider every 7 seconds
  useEffect(() => {
    if (!isPaused && challenges.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % challenges.length)
      }, 7000)

      return () => clearInterval(interval)
    }
  }, [isPaused, challenges.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + challenges.length) % challenges.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % challenges.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const difficultyConfig = {
    beginner: { color: '#3fb950', icon: '🟢' },
    intermediate: { color: '#d29922', icon: '🟡' },
    advanced: { color: '#f85149', icon: '🔴' },
  }

  if (!challenges || challenges.length === 0) {
    return null
  }

  const currentChallenge = challenges[currentIndex]
  const config = difficultyConfig[currentChallenge.difficulty]

  return (
    <section 
      className="py-16 bg-gradient-to-b from-[#161b22] to-[#0d1117] border-y border-[#30363d]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-[#c9d1d9] mb-2"
          >
            🏆 <span className="text-[#39FF14]">Active Challenges</span> - Join Now!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#8b949e]"
          >
            Limited time • Build your portfolio • Get hired
          </motion.p>
        </div>

        {/* Slider Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Slide */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentChallenge._id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <Link href={`/challenges/${currentChallenge.slug.current}`}>
                  <div className="group relative bg-[#161b22] border-2 border-[#30363d] rounded-2xl overflow-hidden hover:border-[#39FF14] transition-all duration-300">
                    {/* Cover Image */}
                    <div className="relative w-full aspect-video overflow-hidden">
                      <Image
                        src={urlFor(currentChallenge.coverImage).width(1200).height(675).url()}
                        alt={currentChallenge.coverImage.alt || currentChallenge.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        priority
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-[#161b22]/50 to-transparent" />
                      
                      {/* Challenge Type Badge - Top Right */}
                      <ChallengeTypeBadge 
                        type={currentChallenge.challengeType} 
                        size="lg"
                        position="absolute"
                      />

                      {/* Countdown - Top Left */}
                      <div className="absolute top-3 left-3 bg-[#f85149]/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 z-10">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">
                          {timeLeft[currentChallenge._id] || 'Loading...'}
                        </span>
                      </div>

                      {/* Content Overlay - Bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        {/* Track & Difficulty */}
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <TrackBadge track={currentChallenge.track} size="md" />
                          <span
                            className="text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5"
                            style={{
                              backgroundColor: `${config.color}20`,
                              color: config.color,
                              border: `1px solid ${config.color}`,
                            }}
                          >
                            {config.icon} {currentChallenge.difficulty.charAt(0).toUpperCase() + currentChallenge.difficulty.slice(1)}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl md:text-3xl font-bold text-[#c9d1d9] mb-3 group-hover:text-[#39FF14] transition-colors">
                          {currentChallenge.title}
                        </h3>

                        {/* Description */}
                        <p className="text-[#8b949e] text-sm md:text-base mb-4 line-clamp-2">
                          {currentChallenge.description}
                        </p>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-[#8b949e] mb-6">
                          {currentChallenge.estimatedTime && (
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4" />
                              <span>{currentChallenge.estimatedTime}</span>
                            </div>
                          )}
                          {currentChallenge.featured && (
                            <span className="bg-[#39FF14] text-[#0d1117] px-3 py-1 rounded-full text-xs font-bold">
                              FEATURED
                            </span>
                          )}
                        </div>

                        {/* CTA Button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center gap-2 bg-[#39FF14] text-[#0d1117] px-6 py-3 rounded-lg font-bold hover:bg-[#2ee60f] transition-all hover:shadow-lg hover:shadow-[#39FF14]/30"
                        >
                          <span>
                            {currentChallenge.challengeType === 'certification' 
                              ? 'Take Challenge' 
                              : 'Start Challenge'}
                          </span>
                          <ArrowRight className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            {challenges.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#161b22]/90 backdrop-blur-sm border border-[#30363d] hover:border-[#39FF14] text-[#c9d1d9] p-3 rounded-full transition-all hover:bg-[#1f2937] z-10"
                  aria-label="Previous challenge"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#161b22]/90 backdrop-blur-sm border border-[#30363d] hover:border-[#39FF14] text-[#c9d1d9] p-3 rounded-full transition-all hover:bg-[#1f2937] z-10"
                  aria-label="Next challenge"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Slide Indicators */}
          {challenges.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {challenges.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-[#39FF14]'
                      : 'w-2 bg-[#30363d] hover:bg-[#8b949e]'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* View All Link */}
        <div className="text-center mt-8">
          <Link 
            href="/challenges"
            className="inline-flex items-center gap-2 text-[#39FF14] hover:text-[#2ee60f] font-semibold transition-colors group"
          >
            <span>View All Challenges</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
