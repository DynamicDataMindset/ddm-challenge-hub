import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Font configurations
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// Metadata configuration
export const metadata: Metadata = {
  title: {
    default: "Dynamic Data Mindset | Data Career Education & Tutorials",
    template: "%s | Dynamic Data Mindset",
  },
  description:
    "Empowering data professionals with practical SQL tutorials, Python guides, career advice, and industry insights. Learn from real-world examples and advance your data career.",
  keywords: [
    "data analytics",
    "SQL tutorials",
    "Python for data",
    "data career",
    "data science",
    "data engineering",
    "BI tools",
    "data visualization",
  ],
  authors: [{ name: "Dynamic Data Mindset" }],
  creator: "Dynamic Data Mindset",
  publisher: "Dynamic Data Mindset",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Dynamic Data Mindset",
    title: "Dynamic Data Mindset | Data Career Education & Tutorials",
    description:
      "Empowering data professionals with practical tutorials, career advice, and industry insights.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dynamic Data Mindset",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dynamic Data Mindset | Data Career Education & Tutorials",
    description:
      "Empowering data professionals with practical tutorials and career advice.",
    images: ["/og-image.png"],
    creator: "@dynamicdatamindset",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}