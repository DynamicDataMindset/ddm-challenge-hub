import { client } from "@/lib/sanity";
import ResourcesClientWrapper from "@/components/ResourcesClientWrapper";

// Revalidate every 60 seconds
export const revalidate = 60;

// Metadata
export const metadata = {
  title: "Resources",
  description:
    "Discover curated learning resources, tutorials, and courses to accelerate your data career. Free and paid options available.",
};

// Query all resources
const resourcesQuery = `
  *[_type == "resource"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    priceTier,
    provider,
    hasCertificate,
    resourceType,
    externalUrl,
    thumbnail {
      asset->,
      alt
    },
    isAffiliate,
    affiliateLink,
    duration,
    difficulty,
    categories[]-> {
      _id,
      name,
      "slug": slug.current
    },
    featured,
    publishedAt
  }
`;

// Query all categories
const categoriesQuery = `
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    "slug": slug.current
  }
`;

async function getAllResources() {
  try {
    return await client.fetch(resourcesQuery);
  } catch (error) {
    console.error("Error fetching resources:", error);
    return [];
  }
}

async function getCategories() {
  try {
    return await client.fetch(categoriesQuery);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function ResourcesPage() {
  const [resources, categories] = await Promise.all([
    getAllResources(),
    getCategories(),
  ]);

  return (
    <ResourcesClientWrapper
      initialResources={resources}
      categories={categories}
    />
  );
}