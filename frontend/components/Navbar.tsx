"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, BookOpen, FolderOpen, Package, Mail, Info, MessageSquare, Home, Trophy } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // COMPLETE navigation links - ALL 7 PAGES INCLUDING CONTACT
  const navLinks = [
    { href: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
    { href: "/challenges", label: "Challenges", icon: <Trophy className="w-4 h-4" /> },
    { href: "/categories", label: "Categories", icon: <FolderOpen className="w-4 h-4" /> },
    { href: "/resources", label: "Resources", icon: <Package className="w-4 h-4" /> },
    { href: "/blog", label: "Blog", icon: <BookOpen className="w-4 h-4" /> },
    { href: "/newsletter", label: "Newsletter", icon: <Mail className="w-4 h-4" /> },
    { href: "/about", label: "About", icon: <Info className="w-4 h-4" /> },
    { href: "/contact", label: "Contact", icon: <MessageSquare className="w-4 h-4" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-github-bg-primary/95 backdrop-blur-sm border-b border-github-border-default">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center group"
          >
            <span className="text-xl font-bold">
              <span className="text-github-text-primary">Dynamic Data</span>
              <span className="text-github-accent-neon ml-1">Mindset</span>
            </span>
          </Link>

          {/* Desktop Navigation - ALL 7 LINKS */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-github-text-secondary hover:text-github-text-primary hover:bg-github-bg-secondary transition-all duration-200 group"
              >
                {link.icon && (
                  <span className="text-github-text-muted group-hover:text-github-accent-neon transition-colors duration-200">
                    {link.icon}
                  </span>
                )}
                <span className="font-medium text-sm">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg text-github-text-secondary hover:text-github-text-primary hover:bg-github-bg-secondary transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation - ALL 7 LINKS */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-github-border-default animate-fade-in">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-github-text-secondary hover:text-github-text-primary hover:bg-github-bg-secondary transition-all duration-200 group"
                >
                  {link.icon && (
                    <span className="text-github-text-muted group-hover:text-github-accent-neon transition-colors duration-200">
                      {link.icon}
                    </span>
                  )}
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}