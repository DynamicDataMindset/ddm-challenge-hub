// components/FeaturedGrid.tsx - CORRECTED VERSION
"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, Clock, FileText, ExternalLink, Download, Sparkles } from "lucide-react"
import { urlFor } from "@/lib/sanity"
import type { Post, Resource } from "@/types/sanity"

interface FeaturedGridProps {
  posts: Post[]
  resources: Resource[]
}

export default function FeaturedGrid({ posts, resources }: FeaturedGridProps) {
  // Combine and limit to 3 total items
  const allItems = [
    ...posts.map((post) => ({ type: "post" as const, data: post })),
    ...resources.map((resource) => ({ type: "resource" as const, data: resource })),
  ].slice(0, 3)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {allItems.map((item, index) => (
        <motion.div
          key={item.data._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
        >
          {item.type === "post" ? (
            <PostCard post={item.data as Post} />
          ) : (
            <ResourceCard resource={item.data as Resource} />
          )}
        </motion.div>
      ))}
    </div>
  )
}

// Post Card Component
function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug.current}`}>
      <div className="group relative bg-github-bg-secondary border border-github-border-default rounded-xl overflow-hidden hover:border-github-accent-neon transition-all duration-300 h-full flex flex-col">
        {/* Featured Badge */}
        {post.featured && (
          <div className="absolute top-4 left-4 z-10 bg-github-accent-neon text-github-bg-primary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            FEATURED
          </div>
        )}

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative w-full h-48 bg-github-bg-tertiary overflow-hidden">
            <Image
              src={urlFor(post.coverImage).width(600).height(400).url()}
              alt={post.coverImage.alt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-github-bg-secondary via-transparent to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.categories.slice(0, 2).map((category) => (
                <span
                  key={category._id}
                  className="text-xs text-github-accent-neon bg-github-accent-neon/10 px-2 py-1 rounded-md border border-github-accent-neon/20"
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold text-github-text-primary mb-2 group-hover:text-github-accent-neon transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-github-text-secondary text-sm mb-4 line-clamp-2 flex-grow">
            {post.excerpt}
          </p>

          {/* Footer */}
          <div className="pt-4 border-t border-github-border-default">
            <div className="flex items-center justify-between text-xs text-github-text-muted">
              <div className="flex items-center gap-4">
                {/* Type Badge */}
                <div className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>Article</span>
                </div>

                {/* Reading Time */}
                {post.readingTime && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{post.readingTime} min</span>
                  </div>
                )}
              </div>

              {/* Date */}
              {post.publishedAt && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-github-accent-neon/20 rounded-xl pointer-events-none transition-all duration-300" />
      </div>
    </Link>
  )
}

// Resource Card Component
function ResourceCard({ resource }: { resource: Resource }) {
  const isExternal = !!resource.externalUrl
  const isPremium = resource.isPremium
  const isAffiliate = resource.isAffiliate

  return (
    <Link
      href={isExternal ? resource.externalUrl! : `/resources/${resource.slug.current}`}
      target={isExternal ? "_blank" : "_self"}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      <div className="group relative bg-github-bg-secondary border border-github-border-default rounded-xl overflow-hidden hover:border-github-accent-neon transition-all duration-300 h-full flex flex-col">
        {/* Premium Badge */}
        {isPremium && (
          <div className="absolute top-4 left-4 z-10 bg-github-accent-emphasis text-white px-3 py-1 rounded-full text-xs font-bold">
            PREMIUM
          </div>
        )}

        {/* Affiliate Badge */}
        {isAffiliate && (
          <div className="absolute top-4 right-4 z-10 bg-github-accent-subtle text-github-text-primary px-3 py-1 rounded-full text-xs font-bold">
            AFFILIATE
          </div>
        )}

        {/* Thumbnail */}
        {resource.thumbnail && (
          <div className="relative w-full h-48 bg-github-bg-tertiary overflow-hidden">
            <Image
              src={urlFor(resource.thumbnail).width(600).height(400).url()}
              alt={resource.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-github-bg-secondary via-transparent to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Categories */}
          {resource.categories && resource.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {resource.categories.slice(0, 2).map((category) => (
                <span
                  key={category._id}
                  className="text-xs text-github-accent-neon bg-github-accent-neon/10 px-2 py-1 rounded-md border border-github-accent-neon/20"
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold text-github-text-primary mb-2 group-hover:text-github-accent-neon transition-colors line-clamp-2">
            {resource.title}
          </h3>

          {/* Description */}
          {resource.description && (
            <p className="text-github-text-secondary text-sm mb-4 line-clamp-2 flex-grow">
              {resource.description}
            </p>
          )}

          {/* Footer */}
          <div className="pt-4 border-t border-github-border-default">
            <div className="flex items-center justify-between text-xs text-github-text-muted">
              {/* Resource Type */}
              <div className="flex items-center gap-1.5">
                {isExternal ? (
                  <ExternalLink className="w-4 h-4" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span className="capitalize">
                  {resource.resourceType ? resource.resourceType.toUpperCase() : 'RESOURCE'}
                </span>
              </div>

              {/* Featured */}
              {resource.featured && (
                <span className="text-github-accent-neon font-medium">Featured</span>
              )}
            </div>
          </div>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-github-accent-neon/20 rounded-xl pointer-events-none transition-all duration-300" />
      </div>
    </Link>
  )
}