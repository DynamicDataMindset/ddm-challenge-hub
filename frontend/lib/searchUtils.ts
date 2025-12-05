// Search and filter utility functions

export function searchPosts(posts: any[], query: string) {
  if (!query.trim()) return posts;

  const lowerQuery = query.toLowerCase();

  return posts.filter((post) => {
    // Search in title
    if (post.title.toLowerCase().includes(lowerQuery)) return true;

    // Search in excerpt
    if (post.excerpt?.toLowerCase().includes(lowerQuery)) return true;

    // Search in categories
    if (
      post.categories?.some((cat: any) =>
        cat.name.toLowerCase().includes(lowerQuery)
      )
    )
      return true;

    // Search in tags
    if (
      post.tags?.some((tag: string) => tag.toLowerCase().includes(lowerQuery))
    )
      return true;

    return false;
  });
}

export function filterPostsByCategories(posts: any[], categories: string[]) {
  if (categories.length === 0) return posts;

  return posts.filter((post) =>
    post.categories?.some((cat: any) => categories.includes(cat.slug))
  );
}

export function filterPostsByDateRange(posts: any[], range: string) {
  if (range === "all") return posts;

  const now = new Date();
  let cutoffDate: Date;

  switch (range) {
    case "7days":
      cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case "30days":
      cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case "3months":
      cutoffDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      break;
    case "6months":
      cutoffDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
      break;
    default:
      return posts;
  }

  return posts.filter(
    (post) => new Date(post.publishedAt) >= cutoffDate
  );
}

export function filterPostsByReadingTime(posts: any[], times: string[]) {
  if (times.length === 0) return posts;

  return posts.filter((post) => {
    if (!post.readingTime) return false;

    const time = post.readingTime;

    if (times.includes("short") && time < 5) return true;
    if (times.includes("medium") && time >= 5 && time <= 10) return true;
    if (times.includes("long") && time > 10) return true;

    return false;
  });
}

export function sortPosts(posts: any[], sortBy: string) {
  const sorted = [...posts];

  switch (sortBy) {
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() -
          new Date(a.publishedAt).getTime()
      );
    case "oldest":
      return sorted.sort(
        (a, b) =>
          new Date(a.publishedAt).getTime() -
          new Date(b.publishedAt).getTime()
      );
    case "title-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return sorted;
  }
}

// Resource filtering functions
export function searchResources(resources: any[], query: string) {
  if (!query.trim()) return resources;

  const lowerQuery = query.toLowerCase();

  return resources.filter((resource) => {
    if (resource.title.toLowerCase().includes(lowerQuery)) return true;
    if (resource.description?.toLowerCase().includes(lowerQuery)) return true;
    if (resource.provider?.toLowerCase().includes(lowerQuery)) return true;
    if (
      resource.categories?.some((cat: any) =>
        cat.name.toLowerCase().includes(lowerQuery)
      )
    )
      return true;

    return false;
  });
}

export function filterResourcesByPriceTier(
  resources: any[],
  tiers: string[]
) {
  if (tiers.length === 0) return resources;
  return resources.filter((resource) => tiers.includes(resource.priceTier));
}

export function filterResourcesByProvider(
  resources: any[],
  providers: string[]
) {
  if (providers.length === 0) return resources;
  return resources.filter((resource) =>
    providers.includes(resource.provider.toLowerCase())
  );
}

export function filterResourcesByCategories(
  resources: any[],
  categories: string[]
) {
  if (categories.length === 0) return resources;
  return resources.filter((resource) =>
    resource.categories?.some((cat: any) => categories.includes(cat.slug))
  );
}

export function filterResourcesByDifficulty(
  resources: any[],
  difficulties: string[]
) {
  if (difficulties.length === 0) return resources;
  return resources.filter((resource) =>
    difficulties.includes(resource.difficulty?.toLowerCase())
  );
}

export function sortResources(resources: any[], sortBy: string) {
  const sorted = [...resources];

  switch (sortBy) {
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.publishedAt || 0).getTime() -
          new Date(a.publishedAt || 0).getTime()
      );
    case "oldest":
      return sorted.sort(
        (a, b) =>
          new Date(a.publishedAt || 0).getTime() -
          new Date(b.publishedAt || 0).getTime()
      );
    case "title-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "price-free":
      return sorted.sort((a, b) => {
        const order = { free: 0, freemium: 1, paid: 2 };
        return order[a.priceTier as keyof typeof order] - order[b.priceTier as keyof typeof order];
      });
    case "price-paid":
      return sorted.sort((a, b) => {
        const order = { paid: 0, freemium: 1, free: 2 };
        return order[a.priceTier as keyof typeof order] - order[b.priceTier as keyof typeof order];
      });
    default:
      return sorted;
  }
}

// Category search
export function searchCategories(categories: any[], query: string) {
  if (!query.trim()) return categories;

  const lowerQuery = query.toLowerCase();

  return categories.filter((category) => {
    if (category.name.toLowerCase().includes(lowerQuery)) return true;
    if (category.description?.toLowerCase().includes(lowerQuery)) return true;
    return false;
  });
}

export function sortCategories(categories: any[], sortBy: string) {
  const sorted = [...categories];

  switch (sortBy) {
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "count-desc":
      return sorted.sort((a, b) => (b.postCount || 0) - (a.postCount || 0));
    case "count-asc":
      return sorted.sort((a, b) => (a.postCount || 0) - (b.postCount || 0));
    default:
      return sorted;
  }
}

// Get active filters for display
export function getActiveFilters(filters: any) {
  const active: Array<{ id: string; label: string; value: string }> = [];

  // Categories
  if (filters.selectedCategories?.length > 0) {
    filters.selectedCategories.forEach((slug: string) => {
      const category = filters.categories?.find((c: any) => c.slug === slug);
      if (category) {
        active.push({
          id: "category",
          label: category.name,
          value: slug,
        });
      }
    });
  }

  // Date range
  if (filters.dateRange && filters.dateRange !== "all") {
    const labels: Record<string, string> = {
      "7days": "Last 7 days",
      "30days": "Last 30 days",
      "3months": "Last 3 months",
      "6months": "Last 6 months",
    };
    active.push({
      id: "dateRange",
      label: labels[filters.dateRange] || filters.dateRange,
      value: filters.dateRange,
    });
  }

  // Reading time
  if (filters.readingTime?.length > 0) {
    const labels: Record<string, string> = {
      short: "< 5 min",
      medium: "5-10 min",
      long: "10+ min",
    };
    filters.readingTime.forEach((time: string) => {
      active.push({
        id: "readingTime",
        label: labels[time] || time,
        value: time,
      });
    });
  }

  // Featured
  if (filters.showFeaturedOnly) {
    active.push({
      id: "featured",
      label: "Featured",
      value: "true",
    });
  }

  // Price tiers
  if (filters.selectedPriceTiers?.length > 0) {
    filters.selectedPriceTiers.forEach((tier: string) => {
      active.push({
        id: "priceTier",
        label: tier.toUpperCase(),
        value: tier,
      });
    });
  }

  // Providers
  if (filters.selectedProviders?.length > 0) {
    filters.selectedProviders.forEach((provider: string) => {
      active.push({
        id: "provider",
        label: provider.charAt(0).toUpperCase() + provider.slice(1),
        value: provider,
      });
    });
  }

  // Difficulties
  if (filters.selectedDifficulties?.length > 0) {
    filters.selectedDifficulties.forEach((diff: string) => {
      active.push({
        id: "difficulty",
        label: diff.charAt(0).toUpperCase() + diff.slice(1),
        value: diff,
      });
    });
  }

  // Certificate
  if (filters.showCertificateOnly) {
    active.push({
      id: "certificate",
      label: "Certificate",
      value: "true",
    });
  }

  return active;
}