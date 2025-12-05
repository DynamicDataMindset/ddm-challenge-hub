"use client";

import { X } from "lucide-react";

interface ActiveFilter {
  id: string;
  label: string;
  value: string;
}

interface ActiveFiltersProps {
  filters: ActiveFilter[];
  onRemove: (id: string, value: string) => void;
  onClearAll: () => void;
}

export default function ActiveFilters({
  filters,
  onRemove,
  onClearAll,
}: ActiveFiltersProps) {
  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-github-text-muted">Active filters:</span>
      {filters.map((filter) => (
        <button
          key={`${filter.id}-${filter.value}`}
          onClick={() => onRemove(filter.id, filter.value)}
          className="inline-flex items-center space-x-1 px-3 py-1 rounded-md bg-github-accent-neon/10 text-github-accent-neon border border-github-accent-neon/20 hover:bg-github-accent-neon/20 transition-colors duration-200 text-sm"
        >
          <span>{filter.label}</span>
          <X className="w-3 h-3" />
        </button>
      ))}
      {filters.length > 1 && (
        <button
          onClick={onClearAll}
          className="text-sm text-github-text-muted hover:text-github-text-primary underline transition-colors duration-200"
        >
          Clear all
        </button>
      )}
    </div>
  );
}