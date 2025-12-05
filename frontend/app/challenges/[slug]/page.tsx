// app/challenges/[slug]/page.tsx
import React from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import {
    Calendar,
    Clock,
    Download,
    Github,
    Youtube,
    Share2,
    CheckCircle2,
    Target,
    Wrench,
    FileText,
    Trophy,
    ArrowLeft,
    ExternalLink,
    Copy,
} from 'lucide-react'
import { client, urlFor } from '@/lib/sanity'
import { challengeBySlugQuery, relatedChallengesQuery } from '@/lib/queries'
import type { Challenge } from '@/types/sanity'
import TrackBadge from '@/components/TrackBadge'
import PortableText from '@/components/PortableText'
import ChallengeCard from '@/components/ChallengeCard'
import ChallengeCopyButton from './CopyButton'
import DeadlineCountdown from './DeadLineCountdown'

// Generate metadata for SEO
export async function generateMetadata({
    params,
}: {
    params: { slug: string }
}): Promise<Metadata> {
    const challenge: Challenge = await client.fetch(challengeBySlugQuery, { slug: params.slug })

    if (!challenge) {
        return {
            title: 'Challenge Not Found',
        }
    }

    return {
        title: challenge.seo?.metaTitle || `${challenge.title} | Dynamic Data Mindset`,
        description: challenge.seo?.metaDescription || challenge.description,
        keywords: [
            ...(challenge.learningObjectives || []),
            ...(challenge.requiredTools || []),
            challenge.track.name,
            challenge.difficulty,
            'data challenge',
            'portfolio project',
        ].join(', '),
        openGraph: {
            title: challenge.title,
            description: challenge.description,
            images: challenge.coverImage ? [urlFor(challenge.coverImage).width(1200).height(630).url()] : [],
        },
    }
}

export default async function ChallengePage({ params }: { params: { slug: string } }) {
    const challenge: Challenge = await client.fetch(challengeBySlugQuery, { slug: params.slug })

    if (!challenge) {
        notFound()
    }

    const relatedChallenges = await client.fetch(relatedChallengesQuery, {
        trackId: challenge.track._id,
        currentId: challenge._id,
    })

    const isActive = new Date(challenge.deadline) > new Date()
    const deadline = new Date(challenge.deadline)

    const difficultyConfig = {
        beginner: { color: '#3fb950', label: 'Beginner', icon: '🟢' },
        intermediate: { color: '#d29922', label: 'Intermediate', icon: '🟡' },
        advanced: { color: '#f85149', label: 'Advanced', icon: '🔴' },
    }

    const config = difficultyConfig[challenge.difficulty]

    return (
        <div className="min-h-screen bg-[#0d1117]">
            {/* Hero Section */}
            <section className="bg-gradient-to-b from-[#161b22] to-[#0d1117] border-b border-[#30363d]">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Back Button */}
                    <Link
                        href="/challenges"
                        className="inline-flex items-center gap-2 text-[#8b949e] hover:text-[#39FF14] transition-colors mb-6"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Challenges</span>
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        {/* Left: Cover Image */}
                        {challenge.coverImage && (
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[#30363d]">
                                <Image
                                    src={urlFor(challenge.coverImage).width(800).height(450).url()}
                                    alt={challenge.coverImage.alt || challenge.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}

                        {/* Right: Challenge Info */}
                        <div className={challenge.coverImage ? '' : 'lg:col-span-2'}>
                            {/* Featured Badge */}
                            {challenge.featured && (
                                <div className="inline-flex items-center gap-2 bg-[#39FF14]/10 border border-[#39FF14] rounded-full px-4 py-1.5 mb-4">
                                    <Trophy className="w-4 h-4 text-[#39FF14]" />
                                    <span className="text-[#39FF14] font-semibold text-sm">FEATURED CHALLENGE</span>
                                </div>
                            )}

                            {/* Track & Difficulty */}
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <TrackBadge track={challenge.track} size="lg" />
                                <span
                                    className="text-sm font-medium px-3 py-1.5 rounded-full flex items-center gap-2"
                                    style={{
                                        backgroundColor: `${config.color}20`,
                                        color: config.color,
                                        border: `1px solid ${config.color}`,
                                    }}
                                >
                                    {config.icon} {config.label}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl font-bold text-[#c9d1d9] mb-4">{challenge.title}</h1>

                            {/* Description */}
                            <p className="text-lg text-[#8b949e] mb-6 leading-relaxed">{challenge.description}</p>

                            {/* Meta Info */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center gap-3 bg-[#161b22] border border-[#30363d] rounded-lg p-4">
                                    <Calendar className="w-5 h-5 text-[#8b949e]" />
                                    <div>
                                        <p className="text-xs text-[#6e7681] mb-0.5">Deadline</p>
                                        <p className="text-sm font-semibold text-[#c9d1d9]">
                                            {deadline.toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                </div>

                                {challenge.estimatedTime && (
                                    <div className="flex items-center gap-3 bg-[#161b22] border border-[#30363d] rounded-lg p-4">
                                        <Clock className="w-5 h-5 text-[#8b949e]" />
                                        <div>
                                            <p className="text-xs text-[#6e7681] mb-0.5">Est. Time</p>
                                            <p className="text-sm font-semibold text-[#c9d1d9]">{challenge.estimatedTime}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Deadline Countdown */}
                            {isActive && <DeadlineCountdown deadline={challenge.deadline} />}

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                {challenge.dataset?.url && (
                                    <a
                                        href={challenge.dataset.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 bg-[#39FF14] text-[#0d1117] px-6 py-3 rounded-lg font-bold hover:bg-[#2ee60f] transition-all hover:shadow-lg hover:shadow-[#39FF14]/20"
                                    >
                                        <Download className="w-5 h-5" />
                                        Download Dataset
                                    </a>
                                )}
                                <button className="flex items-center justify-center gap-2 bg-[#161b22] text-[#c9d1d9] px-6 py-3 rounded-lg font-bold border-2 border-[#30363d] hover:border-[#39FF14] transition-all">
                                    <Share2 className="w-5 h-5" />
                                    Share Challenge
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Dataset Info */}
                            {challenge.dataset && (
                                <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <FileText className="w-6 h-6 text-[#39FF14]" />
                                        <h2 className="text-2xl font-bold text-[#c9d1d9]">Dataset</h2>
                                    </div>
                                    <div className="space-y-3">
                                        {challenge.dataset.title && (
                                            <div>
                                                <p className="text-sm text-[#6e7681] mb-1">Name</p>
                                                <p className="text-[#c9d1d9] font-medium">{challenge.dataset.title}</p>
                                            </div>
                                        )}
                                        <div className="grid grid-cols-2 gap-4">
                                            {challenge.dataset.format && (
                                                <div>
                                                    <p className="text-sm text-[#6e7681] mb-1">Format</p>
                                                    <p className="text-[#c9d1d9]">{challenge.dataset.format}</p>
                                                </div>
                                            )}
                                            {challenge.dataset.size && (
                                                <div>
                                                    <p className="text-sm text-[#6e7681] mb-1">Size</p>
                                                    <p className="text-[#c9d1d9]">{challenge.dataset.size}</p>
                                                </div>
                                            )}
                                        </div>
                                        {challenge.dataset.url && (
                                            <a
                                                href={challenge.dataset.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-[#39FF14] hover:text-[#2ee60f] font-medium transition-colors"
                                            >
                                                <Download className="w-4 h-4" />
                                                Download Dataset
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Challenge Instructions */}
                            {challenge.instructions && (
                                <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Target className="w-6 h-6 text-[#39FF14]" />
                                        <h2 className="text-2xl font-bold text-[#c9d1d9]">Challenge Instructions</h2>
                                    </div>
                                    <div className="prose prose-invert prose-headings:text-[#c9d1d9] prose-p:text-[#8b949e] prose-a:text-[#39FF14] prose-strong:text-[#c9d1d9] prose-code:text-[#39FF14] prose-code:bg-[#1f2937] max-w-none">
                                        <PortableText content={challenge.instructions} />
                                    </div>
                                </div>
                            )}

                            {/* Social Sharing Prompt */}
                            <div className="bg-gradient-to-r from-[#39FF14]/10 to-[#2ee60f]/5 border border-[#39FF14]/20 rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Share2 className="w-6 h-6 text-[#39FF14]" />
                                    <h2 className="text-2xl font-bold text-[#c9d1d9]">Share Your Solution</h2>
                                </div>
                                <p className="text-[#8b949e] mb-4">
                                    When you complete this challenge, copy this template and share it on LinkedIn to showcase your
                                    skills:
                                </p>
                                <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-4 mb-4 relative">
                                    <pre className="text-sm text-[#c9d1d9] whitespace-pre-wrap font-mono">{challenge.socialPrompt}</pre>
                                    <ChallengeCopyButton text={challenge.socialPrompt} />
                                </div>
                                {challenge.hashtags && challenge.hashtags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {challenge.hashtags.map((tag, idx) => (
                                            <span key={idx} className="text-[#58a6ff] text-sm">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* My Solution Links */}
                            {(challenge.solutionBlogPost || challenge.solutionGithub || challenge.solutionVideo) && (
                                <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
                                    <h2 className="text-2xl font-bold text-[#c9d1d9] mb-4">My Solution</h2>
                                    <div className="space-y-3">
                                        {challenge.solutionBlogPost && (
                                            <Link
                                                href={`/blog/${challenge.solutionBlogPost.slug.current}`}
                                                className="flex items-center gap-3 bg-[#1f2937] hover:bg-[#30363d] border border-[#30363d] rounded-lg p-4 transition-colors group"
                                            >
                                                <FileText className="w-5 h-5 text-[#39FF14]" />
                                                <div className="flex-1">
                                                    <p className="font-semibold text-[#c9d1d9] group-hover:text-[#39FF14] transition-colors">
                                                        {challenge.solutionBlogPost.title}
                                                    </p>
                                                    <p className="text-sm text-[#8b949e]">{challenge.solutionBlogPost.excerpt}</p>
                                                </div>
                                                <ExternalLink className="w-5 h-5 text-[#8b949e]" />
                                            </Link>
                                        )}

                                        {challenge.solutionGithub && (
                                            <a
                                                href={challenge.solutionGithub}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 bg-[#1f2937] hover:bg-[#30363d] border border-[#30363d] rounded-lg p-4 transition-colors group"
                                            >
                                                <Github className="w-5 h-5 text-[#8b949e]" />
                                                <div className="flex-1">
                                                    <p className="font-semibold text-[#c9d1d9] group-hover:text-[#39FF14] transition-colors">
                                                        View Code on GitHub
                                                    </p>
                                                    <p className="text-sm text-[#8b949e]">Check out the complete solution code</p>
                                                </div>
                                                <ExternalLink className="w-5 h-5 text-[#8b949e]" />
                                            </a>
                                        )}

                                        {challenge.solutionVideo && (
                                            <a
                                                href={challenge.solutionVideo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 bg-[#1f2937] hover:bg-[#30363d] border border-[#30363d] rounded-lg p-4 transition-colors group"
                                            >
                                                <Youtube className="w-5 h-5 text-[#f85149]" />
                                                <div className="flex-1">
                                                    <p className="font-semibold text-[#c9d1d9] group-hover:text-[#39FF14] transition-colors">
                                                        Watch Video Walkthrough
                                                    </p>
                                                    <p className="text-sm text-[#8b949e]">Step-by-step solution explanation</p>
                                                </div>
                                                <ExternalLink className="w-5 h-5 text-[#8b949e]" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Featured Submissions */}
                            {challenge.featuredSubmissions && challenge.featuredSubmissions.length > 0 && (
                                <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Trophy className="w-6 h-6 text-[#d29922]" />
                                        <h2 className="text-2xl font-bold text-[#c9d1d9]">Featured Community Submissions</h2>
                                    </div>
                                    <div className="space-y-6">
                                        {challenge.featuredSubmissions.map((submission, idx) => (
                                            <div key={idx} className="bg-[#1f2937] border border-[#30363d] rounded-lg p-4">
                                                <div className="flex items-start gap-4">
                                                    {submission.screenshot && (
                                                        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                                            <Image
                                                                src={urlFor(submission.screenshot).width(200).height(200).url()}
                                                                alt={`${submission.userName}'s submission`}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-[#c9d1d9] mb-1">{submission.userName}</p>
                                                        {submission.feedback && (
                                                            <p className="text-sm text-[#8b949e] mb-3">{submission.feedback}</p>
                                                        )}
                                                        <div className="flex flex-wrap gap-2">
                                                            {submission.socialPostUrl && (
                                                                <a
                                                                    href={submission.socialPostUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-xs text-[#58a6ff] hover:text-[#79c0ff] flex items-center gap-1"
                                                                >
                                                                    View Post <ExternalLink className="w-3 h-3" />
                                                                </a>
                                                            )}
                                                            {submission.projectUrl && (
                                                                <a
                                                                    href={submission.projectUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-xs text-[#39FF14] hover:text-[#2ee60f] flex items-center gap-1"
                                                                >
                                                                    View Project <ExternalLink className="w-3 h-3" />
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Sidebar */}
                        <div className="space-y-6">
                            {/* Learning Objectives */}
                            {challenge.learningObjectives && challenge.learningObjectives.length > 0 && (
                                <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <CheckCircle2 className="w-5 h-5 text-[#39FF14]" />
                                        <h3 className="text-lg font-bold text-[#c9d1d9]">What You'll Learn</h3>
                                    </div>
                                    <ul className="space-y-2">
                                        {challenge.learningObjectives.map((objective, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-[#8b949e]">
                                                <span className="text-[#39FF14] mt-1">✓</span>
                                                <span>{objective}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Required Tools */}
                            {challenge.requiredTools && challenge.requiredTools.length > 0 && (
                                <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Wrench className="w-5 h-5 text-[#58a6ff]" />
                                        <h3 className="text-lg font-bold text-[#c9d1d9]">Required Tools</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {challenge.requiredTools.map((tool, idx) => (
                                            <span
                                                key={idx}
                                                className="text-sm text-[#c9d1d9] bg-[#1f2937] px-3 py-1.5 rounded-lg border border-[#30363d]"
                                            >
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Status Card */}
                            <div
                                className={`border rounded-xl p-6 ${isActive
                                    ? 'bg-[#3fb950]/10 border-[#3fb950]/20'
                                    : 'bg-[#6e7681]/10 border-[#6e7681]/20'
                                    }`}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    {isActive ? (
                                        <>
                                            <CheckCircle2 className="w-5 h-5 text-[#3fb950]" />
                                            <h3 className="text-lg font-bold text-[#3fb950]">Active Challenge</h3>
                                        </>
                                    ) : (
                                        <>
                                            <Calendar className="w-5 h-5 text-[#6e7681]" />
                                            <h3 className="text-lg font-bold text-[#6e7681]">Challenge Expired</h3>
                                        </>
                                    )}
                                </div>
                                <p className="text-sm text-[#8b949e]">
                                    {isActive
                                        ? 'Submissions are open! Start working on your solution.'
                                        : 'This challenge has ended. Check out active challenges.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Challenges */}
            {relatedChallenges.length > 0 && (
                <section className="bg-[#161b22] border-t border-[#30363d] py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#c9d1d9] mb-8">More from {challenge.track.name}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedChallenges.map((relatedChallenge: any, index: number) => (
                                <ChallengeCard key={relatedChallenge._id} challenge={relatedChallenge} index={index} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}