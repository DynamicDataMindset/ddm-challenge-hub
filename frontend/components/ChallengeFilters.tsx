// components/ChallengeFilters.tsx
'use client'

import React, { useState } from 'react'
import { Search, Filter, X } from 'lucide-react'
import type { Track } from '@/types/sanity'

interface ChallengeFiltersProps {
  tracks: Track[]
  selectedTrack: string | null
  selectedDifficulty: string | null
  searchTerm: string
  onTrackChange: (track: string | null) => void
  onDifficultyChange: (difficulty: string | null) => void
  onSearchChange: (term: string) => void
  resultsCount: number
}

export default function ChallengeFilters({
  tracks,
  selectedTrack,
  selectedDifficulty,
  searchTerm,
  onTrackChange,
  onDifficultyChange,
  onSearchChange,
  resultsCount,
}: ChallengeFiltersProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const difficulties = [
    { value: 'beginner', label: 'Beginner', icon: '🟢', color: '#3fb950' },
    { value: 'intermediate', label: 'Intermediate', icon: '🟡', color: '#d29922' },
    { value: 'advanced', label: 'Advanced', icon: '🔴', color: '#f85149' },
  ]

  const hasActiveFilters = selectedTrack || selectedDifficulty || searchTerm

  const clearAllFilters = () => {
    onTrackChange(null)
    onDifficultyChange(null)
    onSearchChange('')
  }

  return (
    <div className="mb-8">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full flex items-center justify-between bg-[#161b22] border border-[#30363d] rounded-lg px-4 py-3 text-[#c9d1d9] hover:border-[#39FF14] transition-colors"
        >
          <span className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filters</span>
            {hasActiveFilters && (
              <span className="bg-[#39FF14] text-[#0d1117] text-xs px-2 py-0.5 rounded-full font-bold">
                Active
              </span>
            )}
          </span>
          <span className="text-sm text-[#8b949e]">{resultsCount} challenges</span>
        </button>
      </div>

      {/* Filters Container */}
      <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block`}>
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
          {/* Search Bar */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#c9d1d9] mb-2">
              Search by skills or tools
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6e7681]" />
              <input
                type="text"
                placeholder="e.g., SQL, Python, Excel, Power BI..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg pl-10 pr-4 py-3 text-[#c9d1d9] placeholder-[#6e7681] focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14] outline-none transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6e7681] hover:text-[#c9d1d9] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Career Track Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#c9d1d9] mb-3">
              Career Track
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onTrackChange(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  !selectedTrack
                    ? 'bg-[#39FF14] text-[#0d1117] border-2 border-[#39FF14]'
                    : 'bg-[#1f2937] text-[#8b949e] border-2 border-[#30363d] hover:border-[#39FF14]/50'
                }`}
              >
                All Tracks
              </button>
              {tracks.map((track) => (
                <button
                  key={track._id}
                  onClick={() => onTrackChange(track.slug.current)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    selectedTrack === track.slug.current
                      ? 'border-2'
                      : 'bg-[#1f2937] border-2 border-[#30363d] hover:border-[#39FF14]/50'
                  }`}
                  style={{
                    backgroundColor: selectedTrack === track.slug.current ? `${track.color || '#39FF14'}20` : undefined,
                    borderColor: selectedTrack === track.slug.current ? track.color || '#39FF14' : undefined,
                    color: selectedTrack === track.slug.current ? track.color || '#39FF14' : undefined,
                  }}
                >
                  {track.icon && <span>{track.icon}</span>}
                  <span>{track.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#c9d1d9] mb-3">
              Difficulty Level
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onDifficultyChange(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  !selectedDifficulty
                    ? 'bg-[#39FF14] text-[#0d1117] border-2 border-[#39FF14]'
                    : 'bg-[#1f2937] text-[#8b949e] border-2 border-[#30363d] hover:border-[#39FF14]/50'
                }`}
              >
                All Levels
              </button>
              {difficulties.map((diff) => (
                <button
                  key={diff.value}
                  onClick={() => onDifficultyChange(diff.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    selectedDifficulty === diff.value
                      ? 'border-2'
                      : 'bg-[#1f2937] border-2 border-[#30363d] hover:border-[#39FF14]/50'
                  }`}
                  style={{
                    backgroundColor: selectedDifficulty === diff.value ? `${diff.color}20` : undefined,
                    borderColor: selectedDifficulty === diff.value ? diff.color : undefined,
                    color: selectedDifficulty === diff.value ? diff.color : undefined,
                  }}
                >
                  <span>{diff.icon}</span>
                  <span>{diff.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters Summary & Clear */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-6 border-t border-[#30363d]">
              <div className="text-sm text-[#8b949e]">
                <span className="font-semibold text-[#39FF14]">{resultsCount}</span> challenges found
              </div>
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-2 text-sm text-[#f85149] hover:text-[#ff6b6b] font-medium transition-colors"
              >
                <X className="w-4 h-4" />
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Results Count (Desktop) */}
      <div className="hidden lg:block mt-4 text-sm text-[#8b949e]">
        Showing <span className="font-semibold text-[#39FF14]">{resultsCount}</span> challenges
      </div>
    </div>
  )
}