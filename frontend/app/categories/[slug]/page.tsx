import { client } from "@/lib/sanity";
import { postsByCategoryQuery, categoryBySlugQuery } from "@/lib/queries";
import { PostCard as PostCardType, Category } from "@/types/sanity";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import { ArrowLeft, Tag } from "lucide-react";
import { notFound } from "next/navigation";
import { getCategoryIcon } from "@/lib/categoryIcons";

// Revalidate every 60 seconds
export const revalidate = 60;

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const category: Category = await client.fetch(categoryBySlugQuery, {
    slug: params.slug,
  });

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} Articles`,
    description:
      category.description ||
      `Browse all articles about ${category.name} on Dynamic Data Mindset`,
  };
}

async function getCategory(slug: string): Promise<Category | null> {
  try {
    const category = await client.fetch(categoryBySlugQuery, { slug });
    return category;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

async function getCategoryPosts(
  categorySlug: string
): Promise<PostCardType[]> {
  try {
    const posts = await client.fetch(postsByCategoryQuery, {
      categorySlug,
    });
    return posts.map((post: any) => ({
      _id: post._id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      coverImage: post.coverImage?.asset,
      coverImageAlt: post.coverImage?.alt,
      categories: post.categories.map((cat: any) => ({
        name: cat.name,
        slug: cat.slug,
        color: cat.color?.hex,
      })),
      publishedAt: post.publishedAt,
      readingTime: post.readingTime,
      featured: post.featured,
    }));
  } catch (error) {
    console.error("Error fetching category posts:", error);
    return [];
  }
}

export default async function CategoryPostsPage({
  params,
}: {
  params: { slug: string };
}) {
  const [category, posts] = await Promise.all([
    getCategory(params.slug),
    getCategoryPosts(params.slug),
  ]);

  if (!category) {
    notFound();
  }

  const icon = getCategoryIcon(category.slug.current);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/categories"
          className="inline-flex items-center space-x-2 text-github-text-secondary hover:text-github-accent-neon transition-colors duration-200 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Back to Categories</span>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            {/* Professional SVG Icon */}
            <div className="p-3 rounded-xl bg-github-bg-secondary border border-github-border-default">
              <div className="text-github-accent-neon">
                {icon}
              </div>
            </div>
            <div>
              <h1
                className="text-4xl font-bold"
                style={
                  category.color?.hex
                    ? { color: category.color.hex }
                    : { color: "var(--github-text-primary)" }
                }
              >
                {category.name}
              </h1>
            </div>
          </div>
          {category.description && (
            <p className="text-github-text-secondary text-lg max-w-3xl">
              {category.description}
            </p>
          )}
          <div className="mt-4 flex items-center space-x-2 text-sm text-github-text-muted">
            <Tag className="w-4 h-4" />
            <span>
              {posts.length} {posts.length === 1 ? "article" : "articles"}
            </span>
          </div>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Tag className="w-16 h-16 text-github-text-muted mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-github-text-primary mb-2">
              No Posts in This Category Yet
            </h2>
            <p className="text-github-text-secondary mb-6">
              Check back soon for new content about {category.name}.
            </p>
            <Link href="/blog" className="btn-primary">
              Browse All Posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}