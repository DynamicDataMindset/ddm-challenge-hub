"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail, ArrowRight, Sparkles } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    content: [
      { label: "Blog", href: "/blog" },
      { label: "Categories", href: "/categories" },
      { label: "Resources", href: "/resources" },
      { label: "Challenges", href: "/challenges" },
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Newsletter", href: "/newsletter" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  };

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: "#", label: "GitHub" },
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
    { icon: <Mail className="w-5 h-5" />, href: "#", label: "Email" },
  ];

  return (
    <footer className="relative bg-github-bg-secondary border-t border-github-border-default mt-20 overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-github-accent-neon/30 to-transparent" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-github-accent-neon/3 rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 group mb-4">
              <span className="text-lg font-bold">
                <span className="text-github-text-primary">Dynamic Data</span>
                <span className="text-github-accent-neon ml-1">Mindset</span>
              </span>
            </Link>
            <p className="text-github-text-secondary text-sm leading-relaxed mb-6">
              Empowering data professionals with practical insights, tutorials, and career guidance for the modern data landscape.
            </p>
            {/* Social Links */}
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-lg bg-github-bg-tertiary text-github-text-secondary hover:text-github-accent-neon hover:bg-github-accent-neon/10 hover:shadow-lg hover:shadow-github-accent-neon/10 border border-transparent hover:border-github-accent-neon/20 transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Content Links */}
          <div>
            <h3 className="text-github-text-primary font-semibold mb-4 flex items-center space-x-2">
              <span>Content</span>
            </h3>
            <ul className="space-y-3">
              {footerLinks.content.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-github-text-secondary hover:text-github-accent-neon transition-colors duration-200 text-sm inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-github-text-primary font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-github-text-secondary hover:text-github-accent-neon transition-colors duration-200 text-sm inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-github-text-primary font-semibold mb-4 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-github-accent-neon" />
              <span>Stay Updated</span>
            </h3>
            <p className="text-github-text-secondary text-sm mb-4">
              Get the latest data career insights delivered to your inbox weekly.
            </p>
            <Link
              href="/newsletter"
              className="inline-flex items-center space-x-2 bg-github-accent-neon/10 text-github-accent-neon px-4 py-2.5 rounded-lg font-medium text-sm border border-github-accent-neon/20 hover:bg-github-accent-neon hover:text-github-bg-primary hover:shadow-lg hover:shadow-github-accent-neon/20 transition-all duration-300 group"
            >
              <span>Subscribe Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-github-border-default to-transparent mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-github-text-muted text-sm">
            © {currentYear} Dynamic Data Mindset. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-github-text-muted hover:text-github-accent-neon transition-colors duration-200 text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Credit Line */}
        <div className="mt-8 pt-6 border-t border-github-border-default/50 text-center">
          <p className="text-github-text-muted text-xs">
            Built with{" "}
            <span className="text-github-accent-neon">Next.js</span>,{" "}
            <span className="text-github-accent-neon">Tailwind CSS</span>, and{" "}
            <span className="text-github-accent-neon">Sanity</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
