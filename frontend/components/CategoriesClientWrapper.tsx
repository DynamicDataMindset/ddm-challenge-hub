"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Tag } from "lucide-react";
import SearchBar from "@/components/search/SearchBar";
import { getCategoryIcon } from "@/lib/categoryIcons";
import { searchCategories, sortCategories } from "@/lib/searchUtils";

interface CategoriesClientWrapperProps {
  initialCategories: any[];
}

export default function CategoriesClientWrapper({
  initialCategories,
}: CategoriesClientWrapperProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");

  // Filter and sort categories
  const filteredCategories = useMemo(() => {
    let results = searchCategories(initialCategories, searchQuery);
    results = sortCategories(results, sortBy);
    return results;
  }, [initialCategories, searchQuery, sortBy]);

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-github-text-primary mb-4">
            Browse by Category
          </h1>
          <p className="text-github-text-secondary text-lg">
            Explore our content organized by topic
          </p>
        </div>

        {/* Search and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-grow">
            <SearchBar
              placeholder="Search categories..."
              onSearch={setSearchQuery}
              resultCount={filteredCategories.length}
            />
          </div>
          <div className="sm:w-48">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-github-bg-secondary border border-github-border-default text-github-text-primary focus:border-github-accent-neon focus:ring-1 focus:ring-github-accent-neon outline-none"
            >
              <option value="name-asc">A-Z</option>
              <option value="name-desc">Z-A</option>
              <option value="count-desc">Most Articles</option>
              <option value="count-asc">Least Articles</option>
            </select>
          </div>
        </div>

        {/* Results */}
        {filteredCategories.length > 0 ? (
          <>
            <p className="text-sm text-github-text-muted mb-6">
              Showing {filteredCategories.length} of{" "}
              {initialCategories.length}{" "}
              {initialCategories.length === 1 ? "category" : "categories"}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category) => {
                const icon = getCategoryIcon(category.slug.current);

                return (
                  <Link
                    key={category._id}
                    href={`/categories/${category.slug.current}`}
                    className="card group cursor-pointer h-full"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {/* Icon */}
                        <div
                          className="p-2 rounded-lg bg-github-bg-tertiary text-github-accent-neon"
                          style={
                            category.color?.hex
                              ? {
                                  backgroundColor: `${category.color.hex}20`,
                                  color: category.color.hex,
                                }
                              : undefined
                          }
                        >
                          {icon}
                        </div>
                        <h2
                          className="text-2xl font-bold text-github-text-primary group-hover:text-github-accent-neon transition-colors duration-200"
                          style={
                            category.color?.hex
                              ? { color: category.color.hex }
                              : undefined
                          }
                        >
                          {category.name}
                        </h2>
                      </div>
                      <ArrowRight className="w-5 h-5 text-github-text-muted group-hover:text-github-accent-neon group-hover:translate-x-1 transition-all duration-200" />
                    </div>

                    {category.description && (
                      <p className="text-github-text-secondary mb-4 line-clamp-2">
                        {category.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-github-border-default">
                      <span className="text-sm text-github-text-muted">
                        {category.postCount || 0}{" "}
                        {category.postCount === 1 ? "article" : "articles"}
                      </span>
                      <span className="text-sm text-github-accent-neon group-hover:underline">
                        Explore →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        ) : (
          <div className="text-center py-16 card">
            <Tag className="w-16 h-16 text-github-text-muted mx-auto mb-4" />
            <p className="text-xl text-github-text-primary mb-2">
              No categories found
            </p>
            <p className="text-github-text-secondary mb-4">
              Try adjusting your search query
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="btn-secondary"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}