import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* 404 Graphic */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-github-accent-neon mb-4">
            404
          </h1>
          <div className="h-1 w-32 bg-github-accent-neon mx-auto rounded-full"></div>
        </div>

        {/* Message */}
        <h2 className="text-3xl font-bold text-github-text-primary mb-4">
          Page Not Found
        </h2>
        <p className="text-github-text-secondary text-lg mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been
          moved, deleted, or never existed.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/" className="btn-primary inline-flex items-center space-x-2">
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
          <Link href="/blog" className="btn-secondary inline-flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>Browse Blog</span>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="card inline-block">
          <h3 className="text-lg font-semibold text-github-text-primary mb-4">
            Popular Pages
          </h3>
          <div className="flex flex-col space-y-2 text-left">
            <Link
              href="/blog"
              className="text-github-text-secondary hover:text-github-accent-neon transition-colors duration-200 flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4 rotate-180" />
              <span>All Blog Posts</span>
            </Link>
            <Link
              href="/categories"
              className="text-github-text-secondary hover:text-github-accent-neon transition-colors duration-200 flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4 rotate-180" />
              <span>Browse Categories</span>
            </Link>
            <Link
              href="/newsletter"
              className="text-github-text-secondary hover:text-github-accent-neon transition-colors duration-200 flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4 rotate-180" />
              <span>Subscribe to Newsletter</span>
            </Link>
            <Link
              href="/about"
              className="text-github-text-secondary hover:text-github-accent-neon transition-colors duration-200 flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4 rotate-180" />
              <span>About Us</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}