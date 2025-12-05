import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { PostCard as PostCardType } from "@/types/sanity";
import { getPostCardImageUrl } from "@/lib/urlFor";

interface PostCardProps {
  post: PostCardType;
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article
      className={`card group cursor-pointer ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Image */}
        {post.coverImage && (
          <div className="relative w-full h-48 sm:h-64 mb-4 overflow-hidden rounded-lg bg-github-bg-tertiary">
            <Image
              src={getPostCardImageUrl(post.coverImage)}
              alt={post.coverImageAlt || post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
            />
            {/* Overlay gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-github-bg-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        )}

        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.map((category) => (
              <span
                key={category.slug}
                className="badge hover:border-github-accent-neon transition-colors duration-200"
                style={
                  category.color
                    ? {
                        borderColor: category.color,
                        color: category.color,
                      }
                    : undefined
                }
              >
                {category.name}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2
          className={`font-bold text-github-text-primary mb-3 group-hover:text-github-accent-neon transition-colors duration-200 ${
            featured ? "text-2xl sm:text-3xl" : "text-xl"
          }`}
        >
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-github-text-secondary mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-github-text-muted">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.publishedAt}>{formattedDate}</time>
            </span>
            {post.readingTime && (
              <span className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} min read</span>
              </span>
            )}
          </div>

          {/* Read More Arrow */}
          <span className="flex items-center space-x-1 text-github-accent-neon group-hover:translate-x-1 transition-transform duration-200">
            <span>Read more</span>
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </article>
  );
}