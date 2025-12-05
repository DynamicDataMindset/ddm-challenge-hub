import { client } from "@/lib/sanity";
import CategoriesClientWrapper from "@/components/CategoriesClientWrapper";

// Revalidate every 60 seconds
export const revalidate = 60;

// Metadata
export const metadata = {
  title: "Categories",
  description:
    "Browse blog posts by category. Find articles on SQL, Python, data analytics, career advice, and more.",
};

// Query all categories with post counts
const categoriesQuery = `
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    color {
      hex
    },
    "postCount": count(*[_type == "post" && status == "published" && references(^._id)])
  }
`;

async function getCategories() {
  try {
    return await client.fetch(categoriesQuery);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return <CategoriesClientWrapper initialCategories={categories} />;
}