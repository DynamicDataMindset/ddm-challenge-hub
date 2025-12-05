// types/sanity.ts
// TypeScript interfaces for Sanity CMS data models

import { PortableTextBlock } from "@portabletext/types";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Base Sanity Document
export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

// SEO Type
export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
  keywords?: string[];
}

// Sanity Image with Alt Text
export interface SanityImage {
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

// Category Type
export interface Category extends SanityDocument {
  _type: "category";
  name: string;
  slug: {
    current: string;
    _type: "slug";
  };
  description?: string;
  icon?: string;
  color?: {
    hex: string;
  };
  order?: number;
}

// Post Type
export interface Post extends SanityDocument {
  _type: "post";
  title: string;
  slug: {
    current: string;
    _type: "slug";
  };
  excerpt: string;
  coverImage?: SanityImage;
  content: PortableTextBlock[];
  categories: Category[];
  tags?: string[];
  publishedAt: string;
  readingTime?: number;
  featured?: boolean;
  status: "draft" | "published";
  seo?: SEO;
}

// Resource Type
export interface Resource extends SanityDocument {
  _type: "resource";
  title: string;
  slug: {
    current: string;
    _type: "slug";
  };
  description: string;
  priceTier: "free" | "freemium" | "paid";
  provider: "youtube" | "datacamp" | "coursera" | "udemy" | "linkedin" | "udacity" |
  "pluralsight" | "khanacademy" | "freecodecamp" | "kaggle" | "googlecloud" |
  "aws" | "microsoft" | "self-hosted" | "other";
  hasCertificate?: boolean;
  resourceType: "course" | "video" | "pdf" | "template" | "cheatsheet" | "guide" | "external" | "learning-path";
  file?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  externalUrl?: string;
  isAffiliate?: boolean;
  affiliateProgram?: "datacamp" | "coursera" | "udemy" | "linkedin" | "pluralsight" | "amazon" | "other";
  affiliateLink?: string;
  isPremium?: boolean;
  duration?: string;
  difficulty?: "beginner" | "intermediate" | "advanced" | "all-levels";
  thumbnail?: SanityImage;
  categories: Category[];
  tags?: string[];
  featured?: boolean;
  order?: number;
  publishedAt: string;
}

// Page Type
export interface Page extends SanityDocument {
  _type: "page";
  title: string;
  slug: {
    current: string;
    _type: "slug";
  };
  content: PortableTextBlock[];
  showInNav?: boolean;
  navOrder?: number;
  seo?: SEO;
}

// Simplified Post for Card Display
export interface PostCard {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: SanityImageSource;
  coverImageAlt?: string;
  categories: Array<{
    name: string;
    slug: string;
    color?: string;
  }>;
  publishedAt: string;
  readingTime?: number;
  featured?: boolean;
}

// ==========================================
// CAREER TRACKS & CHALLENGES
// ==========================================

export interface Track {
  _id: string
  _type: 'track'
  name: string
  slug: {
    current: string
  }
  description?: string
  icon?: string
  color?: string
  order?: number
}

export interface CertificationDetails {
  provider?: string
  courseName?: string
  affiliateLink?: string
  pricingTier?: 'free' | 'paid'
  originalPrice?: number
  discountedPrice?: number
  certificateBadge?: SanityImage
  coursePreviewImage?: SanityImage
  benefits?: string[]
  hiringStats?: string
  hiringCompanies?: string[]
  platformRating?: number
  totalEnrolled?: number
  completionTime?: string
}

export interface FeaturedSubmission {
  userName: string
  socialPostUrl?: string
  projectUrl?: string
  screenshot?: SanityImage
  feedback?: string
}

export interface Challenge {
  _id: string
  _type: 'challenge'
  title: string
  slug: {
    current: string
  }
  description: string
  challengeType: 'project' | 'certification'
  coverImage?: SanityImage
  track: Track
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  dataset?: {
    title?: string
    url?: string
    size?: string
    format?: string
  }
  instructions?: any[] // PortableText content
  learningObjectives?: string[]
  requiredTools?: string[]
  publishedAt?: string
  deadline: string
  estimatedTime?: string
  socialPrompt: string
  hashtags?: string[]
  solutionBlogPost?: Post
  solutionGithub?: string
  solutionVideo?: string
  certification?: CertificationDetails
  completionRequirement?: string
  featuredSubmissions?: FeaturedSubmission[]
  recycleDate?: string
  featured?: boolean
  showInSlider?: boolean
  status: 'draft' | 'published' | 'archived'
  seo?: SEO
}

// Simplified version for card displays
export interface ChallengeCard {
  _id: string
  title: string
  slug: {
    current: string
  }
  description: string
  challengeType: 'project' | 'certification'
  coverImage?: SanityImage
  track: {
    name: string
    slug: {
      current: string
    }
    icon?: string
    color?: string
  }
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  learningObjectives?: string[]
  requiredTools?: string[]
  deadline: string
  estimatedTime?: string
  featured?: boolean
  certification?: {
    provider?: string
    pricingTier?: 'free' | 'paid'
    originalPrice?: number
    discountedPrice?: number
    platformRating?: number
    totalEnrolled?: number
  }
}

// Slider-specific type (minimal fields)
export interface SliderChallenge {
  _id: string
  title: string
  slug: {
    current: string
  }
  description: string
  challengeType: 'project' | 'certification'
  coverImage: SanityImage
  track: {
    name: string
    slug: {
      current: string
    }
    icon?: string
    color?: string
  }
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  deadline: string
  estimatedTime?: string
  featured?: boolean
}