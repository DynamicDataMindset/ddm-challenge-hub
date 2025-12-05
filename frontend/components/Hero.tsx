"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const phrases = [
  "Learn SQL",
  "Master Python",
  "Build Dashboards",
  "Get Hired",
  "Advance Your Career",
];

export default function Hero() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const phrase = phrases[currentPhrase];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (displayText.length < phrase.length) {
            setDisplayText(phrase.slice(0, displayText.length + 1));
          } else {
            // Pause before deleting
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          // Deleting
          if (displayText.length > 0) {
            setDisplayText(phrase.slice(0, displayText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentPhrase((prev) => (prev + 1) % phrases.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPhrase]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Floating Gradient Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, #39FF14 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, #39FF14 0%, transparent 50%)",
            "radial-gradient(circle at 50% 80%, #39FF14 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, #39FF14 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating Particles */}
      <motion.div
        className="absolute top-20 left-[10%] w-2 h-2 rounded-full bg-github-accent-neon"
        animate={{
          y: [0, -30, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-[15%] w-3 h-3 rounded-full bg-github-accent-neon"
        animate={{
          y: [0, 30, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-github-bg-secondary border border-github-border-default mb-8"
        >
          <Sparkles className="w-4 h-4 text-github-accent-neon" />
          <span className="text-sm text-github-text-secondary">
            Transform Your Data Career
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-github-text-primary mb-6 leading-tight"
        >
          Your Path to{" "}
          <span className="text-github-accent-neon">Data Mastery</span>
        </motion.h1>

        {/* Typewriter Sub-headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-2xl sm:text-3xl text-github-text-secondary mb-8 h-12 flex items-center justify-center"
        >
          <span className="font-semibold text-github-accent-neon">
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-0.5 h-8 bg-github-accent-neon ml-1"
            />
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg text-github-text-secondary mb-12 max-w-3xl mx-auto"
        >
          Master SQL, Python, and data analytics with practical tutorials,
          career guidance, and curated resources. Join thousands of professionals
          advancing their data careers.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* Primary CTA */}
          <Link href="/blog">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(57, 255, 20, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 rounded-lg bg-github-accent-neon text-github-bg-primary font-semibold text-lg overflow-hidden transition-all duration-300"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>Start Learning</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.button>
          </Link>

          {/* Secondary CTA */}
          <Link href="/resources">
            <motion.button
              whileHover={{
                scale: 1.05,
                borderColor: "#39FF14",
                boxShadow: "0 0 20px rgba(57, 255, 20, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 rounded-lg border-2 border-github-border-default bg-github-bg-secondary text-github-text-primary font-semibold text-lg hover:border-github-accent-neon transition-all duration-300"
            >
              <span className="flex items-center space-x-2">
                <span>Browse Resources</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-github-accent-neon mb-1">
              100+
            </div>
            <div className="text-sm text-github-text-muted">
              Free Tutorials
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-github-accent-neon mb-1">
              5k+
            </div>
            <div className="text-sm text-github-text-muted">
              Active Learners
            </div>
          </div>
          <div className="text-center col-span-2 sm:col-span-1">
            <div className="text-3xl font-bold text-github-accent-neon mb-1">
              50+
            </div>
            <div className="text-sm text-github-text-muted">
              Curated Resources
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}