import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    content: [
      { label: "Blog", href: "/blog" },
      { label: "Categories", href: "/categories" },
      { label: "Resources", href: "/resources" },
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
    <footer className="bg-github-bg-secondary border-t border-github-border-default mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center space-x-2 group mb-4">
              <span className="text-lg font-bold">
                <span className="text-github-text-primary">Dynamic Data</span>
                <span className="text-github-accent-neon ml-1">Mindset</span>
              </span>
            </Link>
            <p className="text-github-text-secondary text-sm leading-relaxed mb-4">
              Empowering data professionals with practical insights, tutorials, and career guidance.
            </p>
            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-github-bg-tertiary text-github-text-secondary hover:text-github-accent-neon hover:bg-github-bg-overlay transition-all duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Content Links */}
          <div>
            <h3 className="text-github-text-primary font-semibold mb-4">Content</h3>
            <ul className="space-y-2">
              {footerLinks.content.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-github-text-secondary hover:text-github-accent-neon transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-github-text-primary font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-github-text-secondary hover:text-github-accent-neon transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-github-text-primary font-semibold mb-4">Stay Updated</h3>
            <p className="text-github-text-secondary text-sm mb-4">
              Get the latest data career insights delivered to your inbox.
            </p>
            <Link
              href="/newsletter"
              className="inline-block btn-primary text-sm"
            >
              Subscribe Now
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-github-border-default">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-github-text-muted text-sm">
              © {currentYear} Dynamic Data Mindset. All rights reserved.
            </p>
            <div className="flex space-x-6">
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
        </div>
      </div>
    </footer>
  );
}