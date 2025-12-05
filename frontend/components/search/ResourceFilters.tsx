"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface ResourceFiltersProps {
  categories: Category[];
  providers: string[];
  selectedPriceTiers: string[];
  onPriceTierChange: (tiers: string[]) => void;
  selectedProviders: string[];
  onProviderChange: (providers: string[]) => void;
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  selectedDifficulties: string[];
  onDifficultyChange: (difficulties: string[]) => void;
  showCertificateOnly: boolean;
  onCertificateChange: (certificate: boolean) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function ResourceFilters({
  categories,
  providers,
  selectedPriceTiers,
  onPriceTierChange,
  selectedProviders,
  onProviderChange,
  selectedCategories,
  onCategoryChange,
  selectedDifficulties,
  onDifficultyChange,
  showCertificateOnly,
  onCertificateChange,
  sortBy,
  onSortChange,
}: ResourceFiltersProps) {
  const [isOpen, setIsOpen] = useState(true);

  const togglePriceTier = (tier: string) => {
    if (selectedPriceTiers.includes(tier)) {
      onPriceTierChange(selectedPriceTiers.filter((t) => t !== tier));
    } else {
      onPriceTierChange([...selectedPriceTiers, tier]);
    }
  };

  const toggleProvider = (provider: string) => {
    if (selectedProviders.includes(provider)) {
      onProviderChange(selectedProviders.filter((p) => p !== provider));
    } else {
      onProviderChange([...selectedProviders, provider]);
    }
  };

  const toggleCategory = (slug: string) => {
    if (selectedCategories.includes(slug)) {
      onCategoryChange(selectedCategories.filter((s) => s !== slug));
    } else {
      onCategoryChange([...selectedCategories, slug]);
    }
  };

  const toggleDifficulty = (difficulty: string) => {
    if (selectedDifficulties.includes(difficulty)) {
      onDifficultyChange(selectedDifficulties.filter((d) => d !== difficulty));
    } else {
      onDifficultyChange([...selectedDifficulties, difficulty]);
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
            <option value="price-free">Free First</option>
            <option value="price-paid">Paid First</option>
          </select>
        </div>

        {/* Price Tier */}
        <div>
          <label className="block text-sm font-medium text-github-text-primary mb-2">
            Price
          </label>
          <div className="space-y-2">
            {[
              { value: "free", label: "Free", color: "text-green-400" },
              { value: "freemium", label: "Freemium", color: "text-yellow-400" },
              { value: "paid", label: "Paid", color: "text-red-400" },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center space-x-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedPriceTiers.includes(option.value)}
                  onChange={() => togglePriceTier(option.value)}
                  className="w-4 h-4 rounded border-github-border-default bg-github-bg-primary text-github-accent-neon focus:ring-github-accent-neon focus:ring-offset-0"
                />
                <span
                  className={`text-sm ${option.color} group-hover:brightness-125 transition-all duration-200`}
                >
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Certificate */}
        <div>
          <label className="flex items-center space-x-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={showCertificateOnly}
              onChange={(e) => onCertificateChange(e.target.checked)}
              className="w-4 h-4 rounded border-github-border-default bg-github-bg-primary text-github-accent-neon focus:ring-github-accent-neon focus:ring-offset-0"
            />
            <span className="text-sm font-medium text-github-text-primary group-hover:text-github-accent-neon transition-colors duration-200">
              Certificate Available
            </span>
          </label>
        </div>

        {/* Providers */}
        {providers.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-github-text-primary mb-2">
              Provider
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {providers.map((provider) => (
                <label
                  key={provider}
                  className="flex items-center space-x-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedProviders.includes(provider)}
                    onChange={() => toggleProvider(provider)}
                    className="w-4 h-4 rounded border-github-border-default bg-github-bg-primary text-github-accent-neon focus:ring-github-accent-neon focus:ring-offset-0"
                  />
                  <span className="text-sm text-github-text-secondary group-hover:text-github-text-primary transition-colors duration-200 capitalize">
                    {provider}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-medium text-github-text-primary mb-2">
            Difficulty
          </label>
          <div className="space-y-2">
            {["beginner", "intermediate", "advanced"].map((difficulty) => (
              <label
                key={difficulty}
                className="flex items-center space-x-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedDifficulties.includes(difficulty)}
                  onChange={() => toggleDifficulty(difficulty)}
                  className="w-4 h-4 rounded border-github-border-default bg-github-bg-primary text-github-accent-neon focus:ring-github-accent-neon focus:ring-offset-0"
                />
                <span className="text-sm text-github-text-secondary group-hover:text-github-text-primary transition-colors duration-200 capitalize">
                  {difficulty}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-github-text-primary mb-2">
              Topics
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
      </div>
    </div>
  );
}