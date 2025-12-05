"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  resultCount?: number;
}

export default function SearchBar({
  placeholder = "Search...",
  onSearch,
  resultCount,
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-github-text-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3 rounded-lg bg-github-bg-secondary border border-github-border-default text-github-text-primary placeholder:text-github-text-muted focus:border-github-accent-neon focus:ring-1 focus:ring-github-accent-neon outline-none transition-all duration-200"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-github-text-muted hover:text-github-text-primary transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      {resultCount !== undefined && query && (
        <p className="mt-2 text-sm text-github-text-muted">
          Found {resultCount} {resultCount === 1 ? "result" : "results"}
        </p>
      )}
    </div>
  );
}