// components/ChallengeCard.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Calendar, Clock, TrendingUp, CheckCircle2, XCircle, DollarSign, Star, Users } from 'lucide-react'
import TrackBadge from './TrackBadge'
import ChallengeTypeBadge from './ChallengeTypeBadge'
import type { ChallengeCard as ChallengeCardType } from '@/types/sanity'
import { urlFor } from '@/lib/sanity'

interface ChallengeCardProps {
  challenge: ChallengeCardType
  index?: number
}

export default function ChallengeCard({ challenge, index = 0 }: ChallengeCardProps) {
  const isActive = new Date(challenge.deadline) > new Date()
  const deadline = new Date(challenge.deadline)
  const daysUntilDeadline = Math.ceil((deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  // Difficulty colors
  const difficultyConfig = {
    beginner: {
      color: '#3fb950',
      label: 'Beginner',
      icon: '🟢',
    },
    intermediate: {
      color: '#d29922',
      label: 'Intermediate',
      icon: '🟡',
    },
    advanced: {
      color: '#f85149',
      label: 'Advanced',
      icon: '🔴',
    },
  }

  const config = difficultyConfig[challenge.difficulty]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link href={`/challenges/${challenge.slug.current}`}>
        <div className="group relative bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden hover:border-[#39FF14] transition-all duration-300 h-full flex flex-col">
          {/* Featured Badge */}
          {challenge.featured && (
            <div className="absolute top-4 left-4 z-10 bg-[#39FF14] text-[#0d1117] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              FEATURED
            </div>
          )}

          {/* Cover Image */}
          {challenge.coverImage && (
            <div className="relative w-full h-48 bg-[#1f2937] overflow-hidden">
              <Image
                src={urlFor(challenge.coverImage).width(600).height(400).url()}
                alt={challenge.coverImage.alt || challenge.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-transparent to-transparent" />
              
              {/* Challenge Type Badge - Top Right */}
              <ChallengeTypeBadge 
                type={challenge.challengeType} 
                size="sm"
                position="absolute"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6 flex flex-col flex-grow">
            {/* Track & Difficulty */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <TrackBadge track={challenge.track} size="sm" />
              <span
                className="text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1"
                style={{
                  backgroundColor: `${config.color}20`,
                  color: config.color,
                  border: `1px solid ${config.color}`,
                }}
              >
                {config.icon} {config.label}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-[#c9d1d9] mb-2 group-hover:text-[#39FF14] transition-colors line-clamp-2">
              {challenge.title}
            </h3>

            {/* Description */}
            <p className="text-[#8b949e] text-sm mb-4 line-clamp-2 flex-grow">
              {challenge.description}
            </p>

            {/* Certification-specific Info */}
            {challenge.challengeType === 'certification' && challenge.certification && (
              <div className="mb-4 space-y-2">
                {/* Pricing */}
                {challenge.certification.pricingTier === 'paid' && (
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-[#3fb950]" />
                    {challenge.certification.discountedPrice ? (
                      <div className="flex items-center gap-2">
                        <span className="text-[#6e7681] line-through">
                          ${challenge.certification.originalPrice}
                        </span>
                        <span className="text-[#3fb950] font-bold">
                          ${challenge.certification.discountedPrice}
                        </span>
                        <span className="bg-[#3fb950]/20 text-[#3fb950] px-2 py-0.5 rounded text-xs font-bold">
                          {Math.round((1 - challenge.certification.discountedPrice / challenge.certification.originalPrice!) * 100)}% OFF
                        </span>
                      </div>
                    ) : (
                      <span className="text-[#c9d1d9] font-semibold">
                        ${challenge.certification.originalPrice}
                      </span>
                    )}
                  </div>
                )}

                {challenge.certification.pricingTier === 'free' && (
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-[#3fb950]" />
                    <span className="text-[#3fb950] font-bold">FREE</span>
                  </div>
                )}

                {/* Platform Rating & Enrollment */}
                <div className="flex items-center gap-4 text-sm text-[#8b949e]">
                  {challenge.certification.platformRating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-[#d29922] fill-[#d29922]" />
                      <span>{challenge.certification.platformRating}/5</span>
                    </div>
                  )}
                  {challenge.certification.totalEnrolled && (
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{(challenge.certification.totalEnrolled / 1000).toFixed(0)}K enrolled</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Project-specific Info - Learning Objectives */}
            {challenge.challengeType === 'project' && challenge.learningObjectives && challenge.learningObjectives.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {challenge.learningObjectives.slice(0, 3).map((objective, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-[#58a6ff] bg-[#58a6ff]/10 px-2 py-1 rounded-md border border-[#58a6ff]/20"
                    >
                      {objective}
                    </span>
                  ))}
                  {challenge.learningObjectives.length > 3 && (
                    <span className="text-xs text-[#6e7681] bg-[#1f2937] px-2 py-1 rounded-md">
                      +{challenge.learningObjectives.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Required Tools (for projects) */}
            {challenge.challengeType === 'project' && challenge.requiredTools && challenge.requiredTools.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-[#6e7681] mb-2 font-medium">Required Tools:</p>
                <div className="flex flex-wrap gap-1.5">
                  {challenge.requiredTools.slice(0, 4).map((tool, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-[#c9d1d9] bg-[#1f2937] px-2 py-1 rounded border border-[#30363d]"
                    >
                      {tool}
                    </span>
                  ))}
                  {challenge.requiredTools.length > 4 && (
                    <span className="text-xs text-[#6e7681] px-2 py-1">
                      +{challenge.requiredTools.length - 4}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="pt-4 border-t border-[#30363d] mt-auto">
              <div className="flex items-center justify-between text-xs text-[#8b949e]">
                <div className="flex items-center gap-4">
                  {/* Deadline Status */}
                  <div className="flex items-center gap-1.5">
                    {isActive ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-[#3fb950]" />
                        <span className="text-[#3fb950] font-medium">
                          {daysUntilDeadline > 0 ? `${daysUntilDeadline}d left` : 'Ends today'}
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-[#6e7681]" />
                        <span className="text-[#6e7681]">Expired</span>
                      </>
                    )}
                  </div>

                  {/* Estimated Time */}
                  {challenge.estimatedTime && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{challenge.estimatedTime}</span>
                    </div>
                  )}
                </div>

                {/* Deadline Date */}
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{deadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hover Effect */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#39FF14]/20 rounded-xl pointer-events-none transition-all duration-300" />
        </div>
      </Link>
    </motion.div>
  )
}