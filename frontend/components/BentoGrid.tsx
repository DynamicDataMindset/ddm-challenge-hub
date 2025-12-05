"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategoryIcon } from "@/lib/categoryIcons";

interface Category {
    _id: string;
    name: string;
    slug: { current: string };
    description?: string;
    color?: { hex: string };
    postCount?: number;
}

interface BentoGridProps {
    categories: Category[];
}

export default function BentoGrid({ categories }: BentoGridProps) {
    // Take first 6 categories for the Bento Grid
    const displayCategories = categories.slice(0, 6);

    return (
        <section className="py-20 bg-github-bg-secondary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-github-text-primary mb-4">
                        Explore by <span className="text-github-accent-neon">Topic</span>
                    </h2>
                    <p className="text-lg text-github-text-secondary max-w-2xl mx-auto">
                        Dive into curated content across key data skills and career topics
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayCategories.map((category, index) => {
                        const icon = getCategoryIcon(category.slug.current);
                        const isLarge = index === 0 || index === 3; // Make first item in each row larger

                        return (
                            <motion.div
                                key={category._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={isLarge ? "md:col-span-2 lg:col-span-1" : ""}
                            >
                                <Link href={`/categories/${category.slug.current}`}>
                                    <motion.div
                                        whileHover={{
                                            scale: 1.03,
                                            borderColor: "#39FF14",
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                        className="group relative h-full min-h-[200px] p-6 rounded-2xl bg-github-bg-primary border-2 border-github-border-default overflow-hidden transition-all duration-300 cursor-pointer"
                                    >
                                        {/* Gradient Overlay on Hover */}
                                        <motion.div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                                            style={{
                                                background: `radial-gradient(circle at 50% 50%, ${category.color?.hex || "#39FF14"
                                                    } 0%, transparent 70%)`,
                                            }}
                                        />

                                        {/* Content */}
                                        <div className="relative z-10 h-full flex flex-col">
                                            {/* Icon */}
                                            <motion.div
                                                whileHover={{ rotate: 5 }}
                                                className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4"
                                                style={{
                                                    backgroundColor: category.color?.hex
                                                        ? `${category.color.hex}20`
                                                        : "rgba(57, 255, 20, 0.1)",
                                                }}
                                            >
                                                <div
                                                    className="text-github-accent-neon"
                                                    style={
                                                        category.color?.hex
                                                            ? { color: category.color.hex }
                                                            : undefined
                                                    }
                                                >
                                                    {icon}
                                                </div>
                                            </motion.div>

                                            {/* Title */}
                                            <h3 className="text-2xl font-bold text-github-text-primary mb-2 group-hover:text-github-accent-neon transition-colors duration-300">
                                                {category.name}
                                            </h3>

                                            {/* Description */}
                                            {category.description && (
                                                <p className="text-github-text-secondary mb-4 line-clamp-2 flex-grow">
                                                    {category.description}
                                                </p>
                                            )}

                                            {/* Footer */}
                                            <div className="flex items-center justify-between mt-auto">
                                                <span className="text-sm text-github-text-muted">
                                                    {category.postCount || 0} articles
                                                </span>
                                                <motion.div
                                                    className="flex items-center space-x-1 text-github-accent-neon"
                                                    whileHover={{ x: 5 }}
                                                >
                                                    <span className="text-sm font-medium">Explore</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </motion.div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <Link href="/categories">
                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                borderColor: "#39FF14",
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 rounded-lg border-2 border-github-border-default text-github-text-primary font-semibold hover:border-github-accent-neon transition-all duration-300"
                        >
                            View All Categories →
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}