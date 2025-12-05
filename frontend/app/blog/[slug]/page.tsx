import { client } from "@/lib/sanity";
import { postBySlugQuery } from "@/lib/queries";
import { Post } from "@/types/sanity";
import { getHeroImageUrl } from "@/lib/urlFor";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import { notFound } from "next/navigation";
import PortableText from "../../../components/PortableText";

// Revalidate every 60 seconds
export const revalidate = 60;

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
    const post: Post = await client.fetch(postBySlugQuery, { slug: params.slug });

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: post.coverImage
                ? [getHeroImageUrl(post.coverImage.asset)]
                : [],
        },
    };
}

async function getPost(slug: string): Promise<Post | null> {
    try {
        const post = await client.fetch(postBySlugQuery, { slug });
        return post;
    } catch (error) {
        console.error("Error fetching post:", error);
        return null;
    }
}

export default async function BlogPostPage({
    params,
}: {
    params: { slug: string };
}) {
    const post = await getPost(params.slug);

    if (!post) {
        notFound();
    }

    const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <article className="min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link
                    href="/blog"
                    className="inline-flex items-center space-x-2 text-github-text-secondary hover:text-github-accent-neon transition-colors duration-200 mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                    <span>Back to Blog</span>
                </Link>

                {/* Categories */}
                {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {post.categories.map((category) => (
                            <Link
                                key={category.slug.current}
                                href={`/categories/${category.slug.current}`}
                                className="badge hover:border-github-accent-neon transition-colors duration-200"
                                style={
                                    category.color?.hex
                                        ? {
                                            borderColor: category.color.hex,
                                            color: category.color.hex,
                                        }
                                        : undefined
                                }
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                )}

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl font-bold text-github-text-primary mb-6 leading-tight">
                    {post.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-github-text-muted mb-8">
                    <span className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={post.publishedAt}>{formattedDate}</time>
                    </span>
                    {post.readingTime && (
                        <span className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>{post.readingTime} min read</span>
                        </span>
                    )}
                </div>

                {/* Cover Image */}
                {post.coverImage && (
                    <div className="relative w-full h-96 mb-12 rounded-xl overflow-hidden bg-github-bg-secondary">
                        <Image
                            src={getHeroImageUrl(post.coverImage.asset)}
                            alt={post.coverImage.alt || post.title}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                        />
                    </div>
                )}

                {/* Excerpt */}
                <div className="text-xl text-github-text-secondary leading-relaxed mb-12 pb-8 border-b border-github-border-default">
                    {post.excerpt}
                </div>

                {/* Content */}
                <div className="prose-custom">
                    <PortableText content={post.content} />
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-github-border-default">
                        <div className="flex items-start space-x-3">
                            <Tag className="w-5 h-5 text-github-text-muted mt-1" />
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="badge bg-github-bg-tertiary text-github-text-secondary"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Share Section */}
                <div className="mt-12 p-6 bg-github-bg-secondary rounded-xl border border-github-border-default">
                    <h3 className="text-xl font-bold text-github-text-primary mb-4">
                        Found this helpful?
                    </h3>
                    <p className="text-github-text-secondary mb-4">
                        Share it with others who might benefit from this content.
                    </p>
                    <div className="flex gap-3">
                        <Link
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                post.title
                            )}&url=${encodeURIComponent(
                                `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${params.slug}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary text-sm"
                        >
                            Share on Twitter
                        </Link>
                        <Link
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                                `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${params.slug}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary text-sm"
                        >
                            Share on LinkedIn
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}