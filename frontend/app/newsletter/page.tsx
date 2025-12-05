"use client";

import { motion } from "framer-motion";
import { Mail, CheckCircle, TrendingUp, Zap, BookOpen, Sparkles, ArrowRight, Users } from "lucide-react";

export default function NewsletterPage() {
  const benefits = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Career Growth Tips",
      description: "Actionable advice to advance your data career and increase your earning potential.",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Practical Tutorials",
      description: "Step-by-step guides on SQL, Python, and data analytics tools you can apply immediately.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Industry Insights",
      description: "Stay ahead with the latest trends, tools, and best practices in data analytics.",
    },
  ];

  const features = [
    "Weekly newsletter with curated content and original insights",
    "Exclusive tutorials and guides not available on the blog",
    "Early access to new courses and resources",
    "Career advice from experienced data professionals",
    "Community tips and success stories",
    "No spam, ever. Quality over quantity.",
  ];

  return (
    <div className="min-h-screen py-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-github-accent-neon/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-github-accent-neon/3 rounded-full filter blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-github-accent-neon/10 mb-6 ring-2 ring-github-accent-neon/20"
          >
            <Mail className="w-8 h-8 text-github-accent-neon" />
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-bold text-github-text-primary mb-4">
            Join Our Newsletter
          </h1>
          <p className="text-xl text-github-text-secondary max-w-2xl mx-auto">
            Get weekly insights, tutorials, and career tips delivered straight to
            your inbox. Join thousands of data professionals leveling up their
            skills.
          </p>
        </motion.div>

        {/* Newsletter Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="card glow-neon max-w-2xl mx-auto mb-16 relative overflow-hidden"
        >
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-github-accent-neon/5 rounded-full filter blur-2xl -translate-y-1/2 translate-x-1/2" />

          <div className="relative">
            <div className="flex items-center space-x-2 mb-6">
              <Sparkles className="w-5 h-5 text-github-accent-neon" />
              <span className="text-sm font-semibold text-github-accent-neon uppercase tracking-wider">
                Free Weekly Digest
              </span>
            </div>

            <form className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-github-text-primary mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  required
                  className="input w-full focus:ring-2 focus:ring-github-accent-neon/50"
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-github-text-primary mb-2"
                >
                  First Name <span className="text-github-text-muted">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John"
                  className="input w-full focus:ring-2 focus:ring-github-accent-neon/50"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full inline-flex items-center justify-center space-x-2 shadow-lg shadow-github-accent-neon/25"
              >
                <Mail className="w-5 h-5" />
                <span>Subscribe Now</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </form>
            <p className="text-xs text-github-text-muted text-center mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-github-text-primary text-center mb-8">
            What You'll Receive
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="card text-center group hover:border-github-accent-neon/50 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-github-bg-tertiary group-hover:bg-github-accent-neon/10 mb-4 transition-colors duration-300">
                  <span className="text-github-accent-neon">{benefit.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-github-text-primary mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-github-text-secondary">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* What You'll Get - Feature List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="card max-w-2xl mx-auto mb-12 hover:border-github-accent-neon/30 transition-all duration-300"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-github-accent-neon/10">
              <CheckCircle className="w-5 h-5 text-github-accent-neon" />
            </div>
            <h2 className="text-2xl font-bold text-github-text-primary">
              What You'll Get
            </h2>
          </div>
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.05 }}
                className="flex items-start space-x-3 group"
              >
                <CheckCircle className="w-5 h-5 text-github-accent-neon flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-github-text-secondary group-hover:text-github-text-primary transition-colors duration-200">
                  {feature}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center"
        >
          <div className="inline-flex items-center space-x-3 bg-github-bg-secondary/50 border border-github-border-default rounded-full px-6 py-3">
            <div className="p-2 rounded-full bg-github-accent-neon/10">
              <Users className="w-5 h-5 text-github-accent-neon" />
            </div>
            <p className="text-github-text-secondary text-sm">
              Join{" "}
              <span className="text-github-accent-neon font-bold">5,000+</span>{" "}
              data professionals already subscribed
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
