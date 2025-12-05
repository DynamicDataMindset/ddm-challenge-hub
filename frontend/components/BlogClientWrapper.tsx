"use client";

import { useState, useMemo } from "react";
import SearchBar from "@/components/search/SearchBar";
import BlogFilters from "@/components/search/BlogFilters";
import ActiveFilters from "@/components/search/ActiveFilters";
import PostCard from "@/components/PostCard";
import {
  searchPosts,
  filterPostsByCategories,
  filterPostsByDateRange,
  filterPostsByReadingTime,
  sortPosts,
  getActiveFilters,
} from "@/lib/searchUtils";

interface BlogClientWrapperProps {
  initialPosts: any[];
  categories: any[];
}

export default function BlogClientWrapper({
  initialPosts,
  categories,
}: BlogClientWrapperProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState("all");
  const [readingTime, setReadingTime] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // Filter posts
  const filteredPosts = useMemo(() => {
    let results = [...initialPosts];

    // Search
    results = searchPosts(results, searchQuery);

    // Category filter
    results = filterPostsByCategories(results, selectedCategories);

    // Date range filter
    results = filterPostsByDateRange(results, dateRange);

    // Reading time filter
    results = filterPostsByReadingTime(results, readingTime);

    // Featured filter
    if (showFeaturedOnly) {
      results = results.filter((post) => post.featured);
    }

    // Sort
    results = sortPosts(results, sortBy);

    return results;
  }, [
    initialPosts,
    searchQuery,
    selectedCategories,
    dateRange,
    readingTime,
    showFeaturedOnly,
    sortBy,
  ]);

  // Get active filters
  const activeFilters = getActiveFilters({
    selectedCategories,
    categories,
    dateRange,
    readingTime,
    showFeaturedOnly,
  });

  // Remove filter
  const removeFilter = (id: string, value: string) => {
    switch (id) {
      case "category":
        setSelectedCategories(
          selectedCategories.filter((slug) => slug !== value)
        );
        break;
      case "dateRange":
        setDateRange("all");
        break;
      case "readingTime":
        setReadingTime(readingTime.filter((time) => time !== value));
        break;
      case "featured":
        setShowFeaturedOnly(false);
        break;
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setDateRange("all");
    setReadingTime([]);
    setShowFeaturedOnly(false);
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-github-text-primary mb-4">
            All Blog Posts
          </h1>
          <p className="text-github-text-secondary text-lg">
            Practical tutorials, career guidance, and industry insights
          </p>
        </div>

        {/* Search and Filters Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <BlogFilters
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              readingTime={readingTime}
              onReadingTimeChange={setReadingTime}
              sortBy={sortBy}
              onSortChange={setSortBy}
              showFeaturedOnly={showFeaturedOnly}
              onFeaturedChange={setShowFeaturedOnly}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search Bar */}
            <SearchBar
              placeholder="Search articles by title, category, or keyword..."
              onSearch={setSearchQuery}
              resultCount={filteredPosts.length}
            />

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <ActiveFilters
                filters={activeFilters}
                onRemove={removeFilter}
                onClearAll={clearAllFilters}
              />
            )}

            {/* Results */}
            {filteredPosts.length > 0 ? (
              <>
                <p className="text-sm text-github-text-muted">
                  Showing {filteredPosts.length} of {initialPosts.length}{" "}
                  {initialPosts.length === 1 ? "article" : "articles"}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16 card">
                <p className="text-xl text-github-text-primary mb-2">
                  No articles found
                </p>
                <p className="text-github-text-secondary mb-4">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={clearAllFilters}
                  className="btn-secondary"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}