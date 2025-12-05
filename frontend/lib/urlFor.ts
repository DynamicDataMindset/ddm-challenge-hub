// lib/urlFor.ts
// Utility for building Sanity image URLs with transformations

import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "./sanity";

// Initialize the image URL builder
const builder = imageUrlBuilder(client);

/**
 * Generate optimized image URLs from Sanity image assets
 * @param source - Sanity image source object
 * @returns Image URL builder instance
 * 
 * @example
 * // Basic usage
 * urlFor(post.coverImage).width(800).url()
 * 
 * // With quality and format
 * urlFor(post.coverImage).width(1200).height(630).quality(90).format('webp').url()
 * 
 * // Auto format based on browser support
 * urlFor(post.coverImage).width(800).auto('format').url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Get optimized image URL for blog post cards
 * @param source - Sanity image source
 * @returns Optimized image URL string
 */
export function getPostCardImageUrl(source: SanityImageSource): string {
  return urlFor(source)
    .width(800)
    .height(450)
    .fit("crop")
    .auto("format")
    .quality(85)
    .url();
}

/**
 * Get optimized image URL for hero/featured images
 * @param source - Sanity image source
 * @returns Optimized image URL string
 */
export function getHeroImageUrl(source: SanityImageSource): string {
  return urlFor(source)
    .width(1200)
    .height(630)
    .fit("crop")
    .auto("format")
    .quality(90)
    .url();
}

/**
 * Get optimized thumbnail image URL
 * @param source - Sanity image source
 * @returns Optimized image URL string
 */
export function getThumbnailUrl(source: SanityImageSource): string {
  return urlFor(source)
    .width(400)
    .height(300)
    .fit("crop")
    .auto("format")
    .quality(80)
    .url();
}