// lib/sanity.ts
// Sanity client configuration for fetching data in Next.js

import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url'

// Sanity project configuration
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

// Check if required environment variables are set
if (!projectId) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Please add it to your .env.local file."
  );
}

// Create the Sanity client
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production", // Use CDN in production for faster responses
  perspective: "published", // Only fetch published documents
});

// Helper function to create Sanity client with specific options
export function getClient(preview?: { token?: string }) {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: preview ? false : process.env.NODE_ENV === "production",
    perspective: preview ? "previewDrafts" : "published",
    token: preview?.token,
  });
  return client;
}

// Image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}