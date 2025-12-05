import { client } from "@/lib/sanity";
import BlogClientWrapper from "@/components/BlogClientWrapper";

// Revalidate every 60 seconds
export const revalidate = 60;

// Metadata
export const metadata = {
  title: "Blog",
  description:
    "Explore our latest articles on SQL, Python, data analytics, career advice, and industry insights for data professionals.",
};

// Query all posts
const postsQuery = `
  *[_type == "post" && status == "published"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage {
      asset->,
      alt
    },
    categories[]-> {
      _id,
      name,
      "slug": slug.current,
      color {
        hex
      }
    },
    tags,
    publishedAt,
    readingTime,
    featured
  }
`;

// Query all categories
const categoriesQuery = `
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    "slug": slug.current
  }
`;

async function getAllPosts() {
  try {
    return await client.fetch(postsQuery);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

async function getCategories() {
  try {
    return await client.fetch(categoriesQuery);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getCategories(),
  ]);

  return <BlogClientWrapper initialPosts={posts} categories={categories} />;
}