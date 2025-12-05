"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Target, Compass, Award, TrendingUp, BookOpen, Users, ArrowRight } from "lucide-react";
import FAQ from "@/components/FAQ";

// Stats animation component
function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="text-4xl font-bold text-github-accent-neon mb-2">{value}</div>
      <div className="text-sm text-github-text-muted">{label}</div>
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-github-accent-neon rounded-full filter blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl font-bold text-github-text-primary mb-6">
              Your Compass in the{" "}
              <span className="text-github-accent-neon">Data Learning</span> Jungle
            </h1>
            <p className="text-xl text-github-text-secondary max-w-3xl mx-auto mb-12">
              We cut through the noise to bring you the best data education resources—curated,
              organized, and ready to accelerate your career. No fluff, just results.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <StatCard value="5,000+" label="Active Learners" delay={0.2} />
            <StatCard value="100+" label="Curated Resources" delay={0.3} />
            <StatCard value="50+" label="Free Tutorials" delay={0.4} />
            <StatCard value="100%" label="Vetted Quality" delay={0.5} />
          </div>
        </div>
      </section>

      {/* Our Story Section - IMAGE 1 */}
      <section className="py-20 bg-github-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-96 rounded-2xl overflow-hidden"
            >
              {/* Replace with your downloaded image */}
              <Image
                src="/images/about-story.jpg"
                alt="Data analytics dashboard"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-github-bg-primary/80 to-transparent" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <Compass className="w-6 h-6 text-github-accent-neon" />
                <h2 className="text-3xl font-bold text-github-text-primary">Our Story</h2>
              </div>

              <div className="space-y-4 text-github-text-secondary">
                <p className="text-lg">
                  <strong className="text-github-text-primary">The Problem:</strong> The data
                  education landscape is overwhelming. Thousands of courses, tutorials, and
                  bootcamps—but which ones are actually worth your time and money?
                </p>

                <p className="text-lg">
                  <strong className="text-github-text-primary">Our Solution:</strong> Dynamic Data
                  Mindset was born from frustration. We spent months testing courses from DataCamp,
                  Coursera, YouTube educators like Alex the Analyst, and countless others. We took
                  the best, organized them by skill level, and created a roadmap you can actually
                  follow.
                </p>

                <p className="text-lg">
                  <strong className="text-github-text-primary">What Makes Us Different:</strong> We
                  don't create courses—we curate the best ones. Think of us as your data career GPS,
                  pointing you to the exact resources you need, when you need them. Free options
                  clearly marked. No hidden agendas.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission Section - IMAGE 2 */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-6 h-6 text-github-accent-neon" />
                <h2 className="text-3xl font-bold text-github-text-primary">Our Mission</h2>
              </div>

              <div className="space-y-4 text-github-text-secondary">
                <p className="text-lg">
                  <strong className="text-github-text-primary">What We Believe:</strong> Quality
                  data education shouldn't be hidden behind paywalls or buried in algorithm chaos.
                  With the right roadmap, anyone can build a successful data career.
                </p>

                <p className="text-lg">
                  <strong className="text-github-text-primary">Our Approach:</strong>
                </p>
                <ul className="space-y-3 ml-6">
                  <li className="flex items-start space-x-2">
                    <span className="text-github-accent-neon mt-1">✓</span>
                    <span>
                      <strong>Quality Over Quantity</strong> - We test everything before
                      recommending it
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-github-accent-neon mt-1">✓</span>
                    <span>
                      <strong>Transparent Pricing</strong> - FREE/PAID clearly labeled, no
                      surprises
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-github-accent-neon mt-1">✓</span>
                    <span>
                      <strong>Skill-Based Organization</strong> - Beginner to advanced, all clearly
                      mapped
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-github-accent-neon mt-1">✓</span>
                    <span>
                      <strong>Honest Reviews</strong> - We tell you what works and what doesn't
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-github-accent-neon mt-1">✓</span>
                    <span>
                      <strong>Career-Focused</strong> - Resources that help you get hired, not just
                      learn syntax
                    </span>
                  </li>
                </ul>

                <p className="text-lg">
                  <strong className="text-github-text-primary">The Impact:</strong> Thousands of
                  professionals have used our curated resources to land their first data role, ace
                  technical interviews, and advance from analyst to senior positions. Your success
                  is our mission.
                </p>
              </div>
            </motion.div>

            {/* Image - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-96 rounded-2xl overflow-hidden order-1 lg:order-2"
            >
              {/* Replace with your downloaded image */}
              <Image
                src="/images/about-mission.jpg"
                alt="Person learning data skills"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-github-bg-primary/80 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-github-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-github-text-primary mb-4">What We Offer</h2>
            <p className="text-lg text-github-text-secondary max-w-2xl mx-auto">
              Three ways we help you succeed in your data career
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -8 }}
              className="card text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-github-accent-neon/10 mb-4">
                <BookOpen className="w-8 h-8 text-github-accent-neon" />
              </div>
              <h3 className="text-xl font-bold text-github-text-primary mb-3">
                Curated Resources
              </h3>
              <p className="text-github-text-secondary mb-4">
                Hand-picked courses from DataCamp, Coursera, YouTube experts, and more. We test them
                so you don't waste time on duds.
              </p>
              <Link
                href="/resources"
                className="text-github-accent-neon hover:underline inline-flex items-center space-x-1"
              >
                <span>Browse Resources</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -8 }}
              className="card text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-github-accent-neon/10 mb-4">
                <Award className="w-8 h-8 text-github-accent-neon" />
              </div>
              <h3 className="text-xl font-bold text-github-text-primary mb-3">
                Learning Roadmaps
              </h3>
              <p className="text-github-text-secondary mb-4">
                Clear paths from beginner to advanced. SQL → Python → Tools → Portfolio → Job. No
                guesswork, just follow the map.
              </p>
              <Link
                href="/blog"
                className="text-github-accent-neon hover:underline inline-flex items-center space-x-1"
              >
                <span>Read Guides</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -8 }}
              className="card text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-github-accent-neon/10 mb-4">
                <TrendingUp className="w-8 h-8 text-github-accent-neon" />
              </div>
              <h3 className="text-xl font-bold text-github-text-primary mb-3">Career Guidance</h3>
              <p className="text-github-text-secondary mb-4">
                From resume tips to interview prep to salary negotiation. Real advice from people
                who've done it, not just theory.
              </p>
              <Link
                href="/categories"
                className="text-github-accent-neon hover:underline inline-flex items-center space-x-1"
              >
                <span>Career Tips</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-github-text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-github-text-secondary">
              Everything you need to know about Dynamic Data Mindset
            </p>
          </motion.div>

          <FAQ />
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-github-bg-secondary">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Users className="w-12 h-12 text-github-accent-neon mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-github-text-primary mb-4">Our Commitment</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card"
            >
              <h3 className="text-xl font-bold text-github-accent-neon mb-3">
                100% Transparent
              </h3>
              <p className="text-github-text-secondary">
                We clearly mark affiliate links and disclose any partnerships. If we make a
                commission, you'll know. No hidden agendas, ever.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card"
            >
              <h3 className="text-xl font-bold text-github-accent-neon mb-3">Quality Obsessed</h3>
              <p className="text-github-text-secondary">
                We personally test every resource before recommending it. If it's on our site, it's
                because we believe it genuinely helps you succeed.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card"
            >
              <h3 className="text-xl font-bold text-github-accent-neon mb-3">
                Community First
              </h3>
              <p className="text-github-text-secondary">
                Your feedback shapes our platform. Suggest resources, request topics, report broken
                links—we listen and act on everything.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card"
            >
              <h3 className="text-xl font-bold text-github-accent-neon mb-3">
                Always Improving
              </h3>
              <p className="text-github-text-secondary">
                The data field evolves fast. We update our recommendations monthly, remove outdated
                resources, and add new gems as we find them.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card glow-neon"
          >
            <h2 className="text-3xl font-bold text-github-text-primary mb-4">
              Ready to Start Your Data Journey?
            </h2>
            <p className="text-github-text-secondary text-lg mb-8 max-w-2xl mx-auto">
              Join 5,000+ learners who trust us to guide their data education. Get weekly resource
              updates and career tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/resources" className="btn-primary inline-flex items-center space-x-2">
                <span>Browse Resources</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/newsletter" className="btn-secondary inline-flex items-center space-x-2">
                <span>Subscribe to Newsletter</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}