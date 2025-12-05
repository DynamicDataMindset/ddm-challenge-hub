// app/challenges/page.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Zap, Target } from 'lucide-react'
import ChallengeCard from '@/components/ChallengeCard'
import ChallengeFilters from '@/components/ChallengeFilters'
import { client } from '@/lib/sanity'
import { tracksQuery, challengesQuery, activeChallengesQuery, featuredChallengesQuery } from '@/lib/queries'
import type { Track, ChallengeCard as ChallengeCardType } from '@/types/sanity'

export default function ChallengesPage() {
  const [tracks, setTracks] = useState<Track[]>([])
  const [allChallenges, setAllChallenges] = useState<ChallengeCardType[]>([])
  const [filteredChallenges, setFilteredChallenges] = useState<ChallengeCardType[]>([])
  const [featuredChallenges, setFeaturedChallenges] = useState<ChallengeCardType[]>([])
  const [activeChallenges, setActiveChallenges] = useState<ChallengeCardType[]>([])
  
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  
  const [loading, setLoading] = useState(true)

  // Fetch data on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const [tracksData, challengesData, activeData, featuredData] = await Promise.all([
          client.fetch(tracksQuery),
          client.fetch(challengesQuery),
          client.fetch(activeChallengesQuery),
          client.fetch(featuredChallengesQuery),
        ])

        setTracks(tracksData)
        setAllChallenges(challengesData)
        setFilteredChallenges(challengesData)
        setActiveChallenges(activeData)
        setFeaturedChallenges(featuredData)
      } catch (error) {
        console.error('Error fetching challenges:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter challenges when filters change
  useEffect(() => {
    let filtered = [...allChallenges]

    // Filter by track
    if (selectedTrack) {
      filtered = filtered.filter((challenge) => challenge.track.slug.current === selectedTrack)
    }

    // Filter by difficulty
    if (selectedDifficulty) {
      filtered = filtered.filter((challenge) => challenge.difficulty === selectedDifficulty)
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (challenge) =>
          challenge.title.toLowerCase().includes(term) ||
          challenge.description.toLowerCase().includes(term) ||
          challenge.learningObjectives?.some((obj) => obj.toLowerCase().includes(term)) ||
          challenge.requiredTools?.some((tool) => tool.toLowerCase().includes(term))
      )
    }

    setFilteredChallenges(filtered)
  }, [selectedTrack, selectedDifficulty, searchTerm, allChallenges])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#39FF14] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#8b949e]">Loading challenges...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0d1117]">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#161b22] to-[#0d1117] border-b border-[#30363d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-full px-4 py-2 mb-6">
              <Trophy className="w-5 h-5 text-[#39FF14]" />
              <span className="text-[#39FF14] font-semibold text-sm">WEEKLY DATA CHALLENGES</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#c9d1d9] mb-6">
              Build Your Portfolio.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-[#2ee60f]">
                Get Hired.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[#8b949e] mb-8 leading-relaxed">
              Real-world data challenges to sharpen your skills, showcase your work on LinkedIn, and stand out to
              employers. New challenges every week.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
                <div className="flex items-center justify-center gap-2 text-[#39FF14] mb-2">
                  <Zap className="w-5 h-5" />
                  <span className="text-2xl font-bold">{activeChallenges.length}</span>
                </div>
                <p className="text-sm text-[#8b949e]">Active Challenges</p>
              </div>

              <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
                <div className="flex items-center justify-center gap-2 text-[#58a6ff] mb-2">
                  <Target className="w-5 h-5" />
                  <span className="text-2xl font-bold">{tracks.length}</span>
                </div>
                <p className="text-sm text-[#8b949e]">Career Tracks</p>
              </div>

              <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
                <div className="flex items-center justify-center gap-2 text-[#d29922] mb-2">
                  <Trophy className="w-5 h-5" />
                  <span className="text-2xl font-bold">{allChallenges.length}</span>
                </div>
                <p className="text-sm text-[#8b949e]">Total Challenges</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Challenges */}
          {featuredChallenges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-6 h-6 text-[#39FF14]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#c9d1d9]">Featured Challenges</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredChallenges.map((challenge, index) => (
                  <ChallengeCard key={challenge._id} challenge={challenge} index={index} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Filters */}
          <ChallengeFilters
            tracks={tracks}
            selectedTrack={selectedTrack}
            selectedDifficulty={selectedDifficulty}
            searchTerm={searchTerm}
            onTrackChange={setSelectedTrack}
            onDifficultyChange={setSelectedDifficulty}
            onSearchChange={setSearchTerm}
            resultsCount={filteredChallenges.length}
          />

          {/* All Challenges Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {filteredChallenges.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredChallenges.map((challenge, index) => (
                  <ChallengeCard key={challenge._id} challenge={challenge} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-[#c9d1d9] mb-2">No challenges found</h3>
                <p className="text-[#8b949e] mb-6">
                  Try adjusting your filters or search term
                </p>
                <button
                  onClick={() => {
                    setSelectedTrack(null)
                    setSelectedDifficulty(null)
                    setSearchTerm('')
                  }}
                  className="bg-[#39FF14] text-[#0d1117] px-6 py-3 rounded-lg font-semibold hover:bg-[#2ee60f] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#161b22] to-[#1f2937] border-t border-[#30363d] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#c9d1d9] mb-4">
            Ready to Level Up Your Data Skills?
          </h2>
          <p className="text-lg text-[#8b949e] mb-8">
            Pick a challenge, build your project, and share it on LinkedIn to get noticed by employers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="bg-[#39FF14] text-[#0d1117] px-8 py-4 rounded-lg font-bold hover:bg-[#2ee60f] transition-all hover:shadow-lg hover:shadow-[#39FF14]/20"
            >
              Browse Challenges
            </a>
            <a
              href="/about"
              className="bg-[#161b22] text-[#c9d1d9] px-8 py-4 rounded-lg font-bold border-2 border-[#30363d] hover:border-[#39FF14] transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}