// lib/queries.ts - COMPLETE REPLACEMENT FILE
// This file replaces your entire existing queries.ts

// ==========================================
// BLOG POSTS QUERIES
// ==========================================

export const postsQuery = `*[_type == "post" && status == "published"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  coverImage {
    asset-> {
      _id,
      url
    },
    alt
  },
  publishedAt,
  readingTime,
  categories[]-> {
    name,
    slug
  },
  featured
}`

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug && status == "published"][0] {
  _id,
  title,
  slug,
  excerpt,
  coverImage {
    asset-> {
      _id,
      url
    },
    alt
  },
  content,
  publishedAt,
  readingTime,
  categories[]-> {
    _id,
    name,
    slug,
    description
  },
  tags,
  featured,
  seo {
    metaTitle,
    metaDescription,
    focusKeyword
  }
}`

export const featuredPostsQuery = `*[_type == "post" && status == "published" && featured == true] | order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  excerpt,
  coverImage {
    asset-> {
      _id,
      url
    },
    alt
  },
  publishedAt,
  readingTime,
  categories[]-> {
    name,
    slug
  }
}`

export const recentPostsQuery = `*[_type == "post" && status == "published"] | order(publishedAt desc) [0...$limit] {
  _id,
  title,
  slug,
  excerpt,
  coverImage {
    asset-> {
      _id,
      url
    },
    alt
  },
  publishedAt,
  readingTime
}`

export const postsByCategoryQuery = `*[_type == "post" && status == "published" && $categoryId in categories[]._ref] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  coverImage {
    asset-> {
      _id,
      url
    },
    alt
  },
  publishedAt,
  readingTime,
  categories[]-> {
    name,
    slug
  }
}`

// ==========================================
// CATEGORIES QUERIES
// ==========================================

export const categoriesQuery = `*[_type == "category"] | order(order asc) {
  _id,
  name,
  slug,
  description,
  icon,
  color,
  order
}`

export const categoryBySlugQuery = `*[_type == "category" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  description,
  icon,
  color,
  order
}`

// ==========================================
// RESOURCES QUERIES
// ==========================================

export const resourcesQuery = `*[_type == "resource"] | order(order asc) {
  _id,
  title,
  slug,
  description,
  thumbnail {
    asset-> {
      _id,
      url
    }
  },
  resourceType,
  file {
    asset-> {
      _id,
      url
    }
  },
  externalUrl,
  isAffiliate,
  affiliateProgram,
  isPremium,
  featured,
  categories[]-> {
    name,
    slug
  },
  tags
}`

// ==========================================
// PAGES QUERIES
// ==========================================

export const pageBySlugQuery = `*[_type == "page" && slug.current == $slug && status == "published"][0] {
  _id,
  title,
  slug,
  heroTitle,
  heroSubtitle,
  heroImage {
    asset-> {
      _id,
      url
    }
  },
  contentBlocks,
  seo {
    metaTitle,
    metaDescription
  }
}`

export const navPagesQuery = `*[_type == "page" && status == "published"] {
  _id,
  title,
  slug
}`

// ==========================================
// CAREER TRACKS QUERIES
// ==========================================

export const tracksQuery = `*[_type == "track"] | order(order asc) {
  _id,
  name,
  slug,
  description,
  icon,
  color,
  order
}`

export const trackBySlugQuery = `*[_type == "track" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  description,
  icon,
  color,
  order
}`

// ==========================================
// CHALLENGES QUERIES (WITH CERTIFICATION SUPPORT)
// ==========================================

// Homepage slider query
export const sliderChallengesQuery = `*[_type == "challenge" 
  && status == "published" 
  && showInSlider == true 
  && deadline > now()
] | order(deadline asc) [0...10] {
  _id,
  title,
  slug,
  description,
  challengeType,
  coverImage {
    asset-> {
      _id,
      url
    },
    alt
  },
  track-> {
    name,
    slug,
    icon,
    color
  },
  difficulty,
  deadline,
  estimatedTime,
  featured
}`

// All published challenges
export const challengesQuery = `*[_type == "challenge" && status == "published"] | order(deadline desc) {
  _id,
  title,
  slug,
  description,
  challengeType,
  coverImage {
    asset-> {
      _id,
      url
    },
    alt
  },
  track-> {
    name,
    slug,
    icon,
    color
  },
  difficulty,
  learningObjectives,
  requiredTools,
  deadline,
  estimatedTime,
  featured,
  certification {
    provider,
    courseName,
    pricingTier,
    originalPrice,
    discountedPrice,
    platformRating,
    totalEnrolled
  }
}`

// Single challenge by slug
export const challengeBySlugQuery = `*[_type == "challenge" && slug.current == $slug && status == "published"][0] {
  _id,
  title,
  slug,
  description,
  challengeType,
  coverImage {
    asset-> {
      _id,
      url
    },
    alt
  },
  track-> {
    _id,
    name,
    slug,
    icon,
    color
  },
  difficulty,
  dataset,
  instructions,
  learningObjectives,
  requiredTools,
  publishedAt,
  deadline,
  estimatedTime,
  socialPrompt,
  hashtags,
  solutionBlogPost-> {
    _id,
    title,
    slug,
    excerpt
  },
  solutionGithub,
  solutionVideo,
  certification {
    provider,
    courseName,
    affiliateLink,
    pricingTier,
    originalPrice,
    discountedPrice,
    certificateBadge {
      asset-> {
        _id,
        url
      }
    },
    coursePreviewImage {
      asset-> {
        _id,
        url
      }
    },
    benefits,
    hiringStats,
    hiringCompanies,
    platformRating,
    totalEnrolled,
    completionTime
  },
  completionRequirement,
  featuredSubmissions[] {
    userName,
    socialPostUrl,
    projectUrl,
    screenshot {
      asset-> {
        _id,
        url
      }
    },
    feedback
  },
  recycleDate,
  featured,
  showInSlider,
  status,
  seo {
    metaTitle,
    metaDescription,
    focusKeyword
  }
}`

// Featured challenges
export const featuredChallengesQuery = `*[_type == "challenge" && status == "published" && featured == true] | order(deadline desc) [0...3] {
  _id,
  title,
  slug,
  description,
  challengeType,
  coverImage {
    asset-> {
      _id,
      url
    },
    alt
  },
  track-> {
    name,
    slug,
    icon,
    color
  },
  difficulty,
  learningObjectives,
  requiredTools,
  deadline,
  estimatedTime,
  certification {
    provider,
    pricingTier,
    originalPrice,
    discountedPrice
  }
}`

// Active challenges (deadline hasn't passed)
export const activeChallengesQuery = `*[_type == "challenge" && status == "published" && deadline > now()] | order(deadline asc) {
  _id,
  title,
  slug,
  description,
  challengeType,
  coverImage {
    asset-> {
      _id,
      url
    },
    alt
  },
  track-> {
    name,
    slug,
    icon,
    color
  },
  difficulty,
  learningObjectives,
  requiredTools,
  deadline,
  estimatedTime,
  featured,
  certification {
    provider,
    pricingTier,
    originalPrice,
    discountedPrice
  }
}`

// Challenges by track
export const challengesByTrackQuery = `*[_type == "challenge" && status == "published" && track->slug.current == $trackSlug] | order(deadline desc) {
  _id,
  title,
  slug,
  description,
  challengeType,
  coverImage {
    asset-> {
      _id,
      url
    },
    alt
  },
  track-> {
    name,
    slug,
    icon,
    color
  },
  difficulty,
  learningObjectives,
  requiredTools,
  deadline,
  estimatedTime,
  featured,
  certification {
    provider,
    pricingTier
  }
}`

// Challenges by difficulty
export const challengesByDifficultyQuery = `*[_type == "challenge" && status == "published" && difficulty == $difficulty] | order(deadline desc) {
  _id,
  title,
  slug,
  description,
  challengeType,
  coverImage {
    asset-> {
      _id,
      url
    },
    alt
  },
  track-> {
    name,
    slug,
    icon,
    color
  },
  difficulty,
  learningObjectives,
  requiredTools,
  deadline,
  estimatedTime,
  featured
}`

// Challenges by type (project or certification)
export const challengesByTypeQuery = `*[_type == "challenge" && status == "published" && challengeType == $type] | order(deadline desc) {
  _id,
  title,
  slug,
  description,
  challengeType,
  coverImage {
    asset-> {
      _id,
      url
    },
    alt
  },
  track-> {
    name,
    slug,
    icon,
    color
  },
  difficulty,
  learningObjectives,
  requiredTools,
  deadline,
  estimatedTime,
  featured,
  certification {
    provider,
    pricingTier,
    originalPrice,
    discountedPrice
  }
}`

// Search challenges
export const searchChallengesQuery = `*[_type == "challenge" && status == "published" && (
  title match $searchTerm + "*" ||
  description match $searchTerm + "*" ||
  $searchTerm in learningObjectives[] ||
  $searchTerm in requiredTools[]
)] | order(deadline desc) {
  _id,
  title,
  slug,
  description,
  challengeType,
  coverImage {
    asset-> {
      _id,
      url
    },
    alt
  },
  track-> {
    name,
    slug,
    icon,
    color
  },
  difficulty,
  learningObjectives,
  requiredTools,
  deadline,
  estimatedTime,
  featured
}`

// Related challenges
export const relatedChallengesQuery = `*[_type == "challenge" && status == "published" && track._ref == $trackId && _id != $currentId] | order(deadline desc) [0...3] {
  _id,
  title,
  slug,
  description,
  challengeType,
  coverImage {
    asset-> {
      _id,
      url
    },
    alt
  },
  track-> {
    name,
    slug,
    icon,
    color
  },
  difficulty,
  deadline,
  estimatedTime
}`