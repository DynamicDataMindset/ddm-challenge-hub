import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Award, DollarSign, Check } from "lucide-react";

// Simple type definition
interface Resource {
    _id: string;
    title: string;
    slug: string;
    description: string;
    priceTier: "free" | "freemium" | "paid";
    provider: string;
    hasCertificate?: boolean;
    resourceType: string;
    externalUrl?: string;
    thumbnail?: {
        asset: any;
        alt?: string;
    };
    isAffiliate?: boolean;
    affiliateLink?: string;
    duration?: string;
    difficulty?: string;
    categories?: Array<{
        name: string;
        slug: string;
    }>;
}

interface ResourceCardProps {
    resource: Resource;
}

// Provider logo/name mapping
const providerNames: Record<string, string> = {
    youtube: "YouTube",
    datacamp: "DataCamp",
    coursera: "Coursera",
    udemy: "Udemy",
    linkedin: "LinkedIn Learning",
    udacity: "Udacity",
    pluralsight: "Pluralsight",
    khanacademy: "Khan Academy",
    freecodecamp: "freeCodeCamp",
    kaggle: "Kaggle",
    googlecloud: "Google Cloud",
    aws: "AWS",
    microsoft: "Microsoft Learn",
    "self-hosted": "Download",
    other: "External",
};

// Helper function to get thumbnail URL
function getThumbnailUrl(asset: any): string {
    if (!asset) return "";
    if (typeof asset === "string") return asset;
    if (asset._ref) {
        const ref = asset._ref;
        const [, id, dimensions, format] = ref.split("-");
        return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${id}-${dimensions}.${format}`;
    }
    return "";
}

export default function ResourceCard({ resource }: ResourceCardProps) {
    const providerName = providerNames[resource.provider] || resource.provider;
    const isAffiliate = resource.isAffiliate;
    const url = isAffiliate ? resource.affiliateLink : resource.externalUrl;

    return (
        <article className="card group">
            {/* Thumbnail */}
            {resource.thumbnail && (
                <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg bg-github-bg-tertiary">
                    <Image
                        src={getThumbnailUrl(resource.thumbnail.asset)}
                        alt={resource.thumbnail.alt || resource.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                </div>
            )}

            {/* Badges Row */}
            <div className="flex flex-wrap gap-2 mb-3">
                {/* Price Tier Badge */}
                {resource.priceTier === "free" && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
                        <Check className="w-3 h-3" />
                        FREE
                    </span>
                )}
                {resource.priceTier === "freemium" && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                        <Check className="w-3 h-3" />
                        FREEMIUM
                    </span>
                )}
                {resource.priceTier === "paid" && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
                        <DollarSign className="w-3 h-3" />
                        PAID
                    </span>
                )}

                {/* Certificate Badge */}
                {resource.hasCertificate && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <Award className="w-3 h-3" />
                        Certificate
                    </span>
                )}

                {/* Affiliate Badge */}
                {isAffiliate && (
                    <span className="px-2 py-1 rounded-md text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        Affiliate
                    </span>
                )}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-github-text-primary mb-2 group-hover:text-github-accent-neon transition-colors duration-200 line-clamp-2">
                {resource.title}
            </h3>

            {/* Provider */}
            <p className="text-sm text-github-text-muted mb-3">
                {providerName}
                {resource.duration && ` • ${resource.duration}`}
                {resource.difficulty && ` • ${resource.difficulty}`}
            </p>

            {/* Description */}
            <p className="text-github-text-secondary mb-4 line-clamp-3">
                {resource.description}
            </p>

            {/* Categories */}
            {resource.categories && resource.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {resource.categories.slice(0, 2).map((category) => (
                        <span
                            key={category.slug}
                            className="badge text-xs"
                        >
                            {category.name}
                        </span>
                    ))}
                </div>
            )}

            {/* CTA Button */}
            {url && (
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full justify-center inline-flex items-center space-x-2 mt-auto"
                >
                    <span>
                        {resource.priceTier === "free" ? "Access Free" : "View Course"}
                    </span>
                    <ExternalLink className="w-4 h-4" />
                </a>
            )}

            {/* Affiliate Disclosure */}
            {isAffiliate && (
                <p className="text-xs text-github-text-muted mt-2 text-center">
                    This is an affiliate link. We may earn a commission.
                </p>
            )}
        </article>
    );
}
