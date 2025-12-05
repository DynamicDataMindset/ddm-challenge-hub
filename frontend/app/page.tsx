// app/page.tsx - COMPLETE FIXED VERSION
import Hero from "@/components/Hero"
import BentoGrid from "@/components/BentoGrid"
import FeaturedGrid from "@/components/FeaturedGrid"
import MotivationTicker from "@/components/MotivationTicker"
import ActiveChallengesSlider from "@/components/ActiveChallengesSlider"
import { client } from "@/lib/sanity"
import { 
  categoriesQuery, 
  featuredPostsQuery, 
  resourcesQuery,
  sliderChallengesQuery 
} from "@/lib/queries"

export const revalidate = 60

export default async function Home() {
  try {
    // Fetch data in parallel
    const [categories, featuredPosts, resources, sliderChallenges] = await Promise.all([
      client.fetch(categoriesQuery),
      client.fetch(featuredPostsQuery),
      client.fetch(resourcesQuery),
      client.fetch(sliderChallengesQuery),
    ])

    // Ensure arrays exist
    const safeCategories = Array.isArray(categories) ? categories : []
    const safePosts = Array.isArray(featuredPosts) ? featuredPosts : []
    const safeResources = Array.isArray(resources) ? resources : []
    const safeChallenges = Array.isArray(sliderChallenges) ? sliderChallenges : []

    // Limit items
    const limitedCategories = safeCategories.slice(0, 6)
    const limitedPosts = safePosts.slice(0, 3)
    const limitedResources = safeResources.slice(0, 3)

    return (
      <main className="min-h-screen bg-github-bg-primary">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Active Challenges Slider */}
        {safeChallenges.length > 0 && (
          <ActiveChallengesSlider challenges={safeChallenges} />
        )}

        {/* 3. Categories (6 max with "View More") */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-github-text-primary">
                Browse by <span className="text-github-accent-neon">Category</span>
              </h2>
              {safeCategories.length > 6 && (
                <a
                  href="/categories"
                  className="text-github-accent-neon hover:text-github-accent-neon-hover font-semibold transition-colors flex items-center gap-2"
                >
                  View More Categories
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              )}
            </div>
            {limitedCategories.length > 0 ? (
              <BentoGrid categories={limitedCategories} />
            ) : (
              <p className="text-github-text-muted text-center py-12">No categories available</p>
            )}
          </div>
        </section>

        {/* 4. Featured Content - Posts + Resources */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-github-bg-secondary">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-github-text-primary mb-8">
              Featured <span className="text-github-accent-neon">Content</span>
            </h2>
            
            {(limitedPosts.length > 0 || limitedResources.length > 0) ? (
              <FeaturedGrid posts={limitedPosts} resources={limitedResources} />
            ) : (
              <div className="text-center py-12">
                <p className="text-github-text-muted mb-4">No featured content available yet</p>
                <p className="text-github-text-muted text-sm">
                  Create some posts or resources in Sanity Studio to see them here
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 5. Skills Ticker */}
        <MotivationTicker />

        {/* 6. Newsletter/Subscribe Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-github-bg-secondary to-github-bg-tertiary border-t border-github-border-default">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-github-text-primary mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-github-text-secondary mb-8">
              Get weekly data tips, career insights, and new challenges delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-github-bg-primary border border-github-border-default text-github-text-primary placeholder-github-text-muted focus:border-github-accent-neon focus:ring-1 focus:ring-github-accent-neon outline-none transition-colors"
              />
              <button className="bg-github-accent-neon text-github-bg-primary px-8 py-3 rounded-lg font-bold hover:bg-github-accent-neon-hover transition-all hover:shadow-lg hover:shadow-github-accent-neon/30">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-github-text-muted mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </section>
      </main>
    )
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    return (
      <main className="min-h-screen bg-github-bg-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-github-text-primary mb-4">
            Error Loading Page
          </h1>
          <p className="text-github-text-muted">
            Please check your Sanity connection and try again
          </p>
        </div>
      </main>
    )
  }
}