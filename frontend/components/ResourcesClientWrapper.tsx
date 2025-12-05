"use client";

import { useState, useMemo } from "react";
import SearchBar from "@/components/search/SearchBar";
import ResourceFilters from "@/components/search/ResourceFilters";
import ActiveFilters from "@/components/search/ActiveFilters";
import ResourceCard from "@/components/ResourceCard";
import {
  searchResources,
  filterResourcesByPriceTier,
  filterResourcesByProvider,
  filterResourcesByCategories,
  filterResourcesByDifficulty,
  sortResources,
  getActiveFilters,
} from "@/lib/searchUtils";

interface ResourcesClientWrapperProps {
  initialResources: any[];
  categories: any[];
}

export default function ResourcesClientWrapper({
  initialResources,
  categories,
}: ResourcesClientWrapperProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriceTiers, setSelectedPriceTiers] = useState<string[]>([]);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(
    []
  );
  const [showCertificateOnly, setShowCertificateOnly] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  // Get unique providers
  const providers = useMemo(() => {
    const unique = new Set(
      initialResources.map((r) => r.provider?.toLowerCase()).filter(Boolean)
    );
    return Array.from(unique).sort();
  }, [initialResources]);

  // Filter resources
  const filteredResources = useMemo(() => {
    let results = [...initialResources];

    // Search
    results = searchResources(results, searchQuery);

    // Price tier filter
    results = filterResourcesByPriceTier(results, selectedPriceTiers);

    // Provider filter
    results = filterResourcesByProvider(results, selectedProviders);

    // Category filter
    results = filterResourcesByCategories(results, selectedCategories);

    // Difficulty filter
    results = filterResourcesByDifficulty(results, selectedDifficulties);

    // Certificate filter
    if (showCertificateOnly) {
      results = results.filter((resource) => resource.hasCertificate);
    }

    // Sort
    results = sortResources(results, sortBy);

    return results;
  }, [
    initialResources,
    searchQuery,
    selectedPriceTiers,
    selectedProviders,
    selectedCategories,
    selectedDifficulties,
    showCertificateOnly,
    sortBy,
  ]);

  // Get active filters
  const activeFilters = getActiveFilters({
    selectedPriceTiers,
    selectedProviders,
    selectedCategories,
    categories,
    selectedDifficulties,
    showCertificateOnly,
  });

  // Remove filter
  const removeFilter = (id: string, value: string) => {
    switch (id) {
      case "priceTier":
        setSelectedPriceTiers(
          selectedPriceTiers.filter((tier) => tier !== value)
        );
        break;
      case "provider":
        setSelectedProviders(
          selectedProviders.filter((prov) => prov !== value)
        );
        break;
      case "category":
        setSelectedCategories(
          selectedCategories.filter((slug) => slug !== value)
        );
        break;
      case "difficulty":
        setSelectedDifficulties(
          selectedDifficulties.filter((diff) => diff !== value)
        );
        break;
      case "certificate":
        setShowCertificateOnly(false);
        break;
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedPriceTiers([]);
    setSelectedProviders([]);
    setSelectedCategories([]);
    setSelectedDifficulties([]);
    setShowCertificateOnly(false);
  };

  // Group by price tier for display
  const freeResources = filteredResources.filter((r) => r.priceTier === "free");
  const freemiumResources = filteredResources.filter(
    (r) => r.priceTier === "freemium"
  );
  const paidResources = filteredResources.filter((r) => r.priceTier === "paid");

  const hasFilters = activeFilters.length > 0 || searchQuery;

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-github-text-primary mb-4">
            Learning Resources
          </h1>
          <p className="text-github-text-secondary text-lg">
            Curated courses, tutorials, and learning materials
          </p>
        </div>

        {/* Search and Filters Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ResourceFilters
              categories={categories}
              providers={providers}
              selectedPriceTiers={selectedPriceTiers}
              onPriceTierChange={setSelectedPriceTiers}
              selectedProviders={selectedProviders}
              onProviderChange={setSelectedProviders}
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
              selectedDifficulties={selectedDifficulties}
              onDifficultyChange={setSelectedDifficulties}
              showCertificateOnly={showCertificateOnly}
              onCertificateChange={setShowCertificateOnly}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search Bar */}
            <SearchBar
              placeholder="Search resources by title, provider, or topic..."
              onSearch={setSearchQuery}
              resultCount={filteredResources.length}
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
            {filteredResources.length > 0 ? (
              <>
                <p className="text-sm text-github-text-muted">
                  Showing {filteredResources.length} of{" "}
                  {initialResources.length}{" "}
                  {initialResources.length === 1 ? "resource" : "resources"}
                </p>

                {/* If no filters, show grouped by price tier */}
                {!hasFilters ? (
                  <>
                    {/* Free Resources */}
                    {freeResources.length > 0 && (
                      <div className="mb-12">
                        <h2 className="text-2xl font-bold text-github-text-primary mb-6">
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-green-500/10 text-green-400 border border-green-500/20">
                            Free Resources ({freeResources.length})
                          </span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {freeResources.map((resource) => (
                            <ResourceCard key={resource._id} resource={resource} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Freemium Resources */}
                    {freemiumResources.length > 0 && (
                      <div className="mb-12">
                        <h2 className="text-2xl font-bold text-github-text-primary mb-6">
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                            Freemium ({freemiumResources.length})
                          </span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {freemiumResources.map((resource) => (
                            <ResourceCard key={resource._id} resource={resource} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Paid Resources */}
                    {paidResources.length > 0 && (
                      <div>
                        <h2 className="text-2xl font-bold text-github-text-primary mb-6">
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-500/10 text-red-400 border border-red-500/20">
                            Paid Resources ({paidResources.length})
                          </span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {paidResources.map((resource) => (
                            <ResourceCard key={resource._id} resource={resource} />
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  /* If filters active, show flat list */
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map((resource) => (
                      <ResourceCard key={resource._id} resource={resource} />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 card">
                <p className="text-xl text-github-text-primary mb-2">
                  No resources found
                </p>
                <p className="text-github-text-secondary mb-4">
                  Try adjusting your filters or search query
                </p>
                <button onClick={clearAllFilters} className="btn-secondary">
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