"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface BlogFiltersProps {
  categories: Category[];
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  dateRange: string;
  onDateRangeChange: (range: string) => void;
  readingTime: string[];
  onReadingTimeChange: (times: string[]) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  showFeaturedOnly: boolean;
  onFeaturedChange: (featured: boolean) => void;
}

export default function BlogFilters({
  categories,
  selectedCategories,
  onCategoryChange,
  dateRange,
  onDateRangeChange,
  readingTime,
  onReadingTimeChange,
  sortBy,
  onSortChange,
  showFeaturedOnly,
  onFeaturedChange,
}: BlogFiltersProps) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleCategory = (slug: string) => {
    if (selectedCategories.includes(slug)) {
      onCategoryChange(selectedCategories.filter((s) => s !== slug));
    } else {
      onCategoryChange([...selectedCategories, slug]);
    }
  };

  const toggleReadingTime = (time: string) => {
    if (readingTime.includes(time)) {
      onReadingTimeChange(readingTime.filter((t) => t !== time));
    } else {
      onReadingTimeChange([...readingTime, time]);
    }
  };

  return (
    <div className="card">
      {/* Filter Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between mb-4 lg:mb-0"
      >
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-5 h-5 text-github-accent-neon" />
          <span className="font-semibold text-github-text-primary">
            Filters
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-github-text-muted lg:hidden" />
        ) : (
          <ChevronDown className="w-5 h-5 text-github-text-muted lg:hidden" />
        )}
      </button>

      {/* Filter Content */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } lg:block space-y-6 mt-4 lg:mt-4`}
      >
        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-github-text-primary mb-2">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-github-bg-primary border border-github-border-default text-github-text-primary focus:border-github-accent-neon focus:ring-1 focus:ring-github-accent-neon outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
          </select>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-github-text-primary mb-2">
              Categories
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {categories.map((category) => (
                <label
                  key={category._id}
                  className="flex items-center space-x-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.slug)}
                    onChange={() => toggleCategory(category.slug)}
                    className="w-4 h-4 rounded border-github-border-default bg-github-bg-primary text-github-accent-neon focus:ring-github-accent-neon focus:ring-offset-0"
                  />
                  <span className="text-sm text-github-text-secondary group-hover:text-github-text-primary transition-colors duration-200">
                    {category.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-github-text-primary mb-2">
            Published
          </label>
          <select
            value={dateRange}
            onChange={(e) => onDateRangeChange(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-github-bg-primary border border-github-border-default text-github-text-primary focus:border-github-accent-neon focus:ring-1 focus:ring-github-accent-neon outline-none"
          >
            <option value="all">All Time</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
          </select>
        </div>

        {/* Reading Time */}
        <div>
          <label className="block text-sm font-medium text-github-text-primary mb-2">
            Reading Time
          </label>
          <div className="space-y-2">
            {[
              { value: "short", label: "Quick Read (< 5 min)" },
              { value: "medium", label: "Medium (5-10 min)" },
              { value: "long", label: "In-depth (10+ min)" },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center space-x-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={readingTime.includes(option.value)}
                  onChange={() => toggleReadingTime(option.value)}
                  className="w-4 h-4 rounded border-github-border-default bg-github-bg-primary text-github-accent-neon focus:ring-github-accent-neon focus:ring-offset-0"
                />
                <span className="text-sm text-github-text-secondary group-hover:text-github-text-primary transition-colors duration-200">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Featured Only */}
        <div>
          <label className="flex items-center space-x-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={showFeaturedOnly}
              onChange={(e) => onFeaturedChange(e.target.checked)}
              className="w-4 h-4 rounded border-github-border-default bg-github-bg-primary text-github-accent-neon focus:ring-github-accent-neon focus:ring-offset-0"
            />
            <span className="text-sm font-medium text-github-text-primary group-hover:text-github-accent-neon transition-colors duration-200">
              Featured Posts Only
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}