"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Send, MessageSquare } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen py-16 relative overflow-hidden">
            {/* Background Gradient Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-github-accent-neon/5 rounded-full filter blur-3xl" />
                <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-github-accent-neon/3 rounded-full filter blur-3xl" />
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
                        Get in Touch
                    </h1>
                    <p className="text-xl text-github-text-secondary max-w-2xl mx-auto">
                        Have a question, suggestion, or just want to say hi? We'd love to hear
                        from you.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="card hover:border-github-accent-neon/30 transition-all duration-300"
                    >
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="p-2 rounded-lg bg-github-accent-neon/10">
                                <MessageSquare className="w-5 h-5 text-github-accent-neon" />
                            </div>
                            <h2 className="text-2xl font-bold text-github-text-primary">
                                Send us a Message
                            </h2>
                        </div>
                        <form className="space-y-4">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-github-text-primary mb-2"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Your name"
                                    required
                                    className="input w-full focus:ring-2 focus:ring-github-accent-neon/50"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-github-text-primary mb-2"
                                >
                                    Email
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
                                    htmlFor="subject"
                                    className="block text-sm font-medium text-github-text-primary mb-2"
                                >
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    placeholder="What's this about?"
                                    required
                                    className="input w-full focus:ring-2 focus:ring-github-accent-neon/50"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-github-text-primary mb-2"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={6}
                                    placeholder="Tell us more..."
                                    required
                                    className="input w-full resize-none focus:ring-2 focus:ring-github-accent-neon/50"
                                />
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-primary w-full inline-flex items-center justify-center space-x-2 shadow-lg shadow-github-accent-neon/20"
                            >
                                <Send className="w-5 h-5" />
                                <span>Send Message</span>
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        {/* Email */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="card group hover:border-github-accent-neon/50 transition-all duration-300"
                        >
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="p-3 rounded-lg bg-github-bg-tertiary group-hover:bg-github-accent-neon/10 transition-colors duration-300">
                                        <Mail className="w-6 h-6 text-github-accent-neon" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-github-text-primary mb-1">
                                        Email
                                    </h3>
                                    <p className="text-github-text-secondary mb-2">
                                        Send us an email anytime
                                    </p>
                                    <a
                                        href="mailto:contact@dynamicdatamindset.com"
                                        className="text-github-accent-neon hover:text-github-accent-neonHover transition-colors duration-200 font-medium"
                                    >
                                        contact@dynamicdatamindset.com
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Location */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="card group hover:border-github-accent-neon/50 transition-all duration-300"
                        >
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="p-3 rounded-lg bg-github-bg-tertiary group-hover:bg-github-accent-neon/10 transition-colors duration-300">
                                        <MapPin className="w-6 h-6 text-github-accent-neon" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-github-text-primary mb-1">
                                        Location
                                    </h3>
                                    <p className="text-github-text-secondary">
                                        Remote-first team
                                        <br />
                                        Serving data professionals worldwide
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Response Time */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="card group hover:border-github-accent-neon/50 transition-all duration-300"
                        >
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="p-3 rounded-lg bg-github-bg-tertiary group-hover:bg-github-accent-neon/10 transition-colors duration-300">
                                        <Clock className="w-6 h-6 text-github-accent-neon" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-github-text-primary mb-1">
                                        Response Time
                                    </h3>
                                    <p className="text-github-text-secondary">
                                        We typically respond within 24-48 hours during business days.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* FAQ Link */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="card bg-gradient-to-br from-github-bg-tertiary to-github-bg-secondary border-github-border-muted hover:border-github-accent-neon/30 transition-all duration-300"
                        >
                            <h3 className="text-lg font-semibold text-github-text-primary mb-2">
                                Quick Question?
                            </h3>
                            <p className="text-sm text-github-text-secondary mb-4">
                                Check out our most frequently asked questions before sending a
                                message.
                            </p>
                            <motion.a
                                href="/about"
                                whileHover={{ x: 5 }}
                                className="text-github-accent-neon hover:text-github-accent-neonHover transition-colors duration-200 text-sm font-medium inline-flex items-center space-x-1"
                            >
                                <span>Visit FAQ Section</span>
                                <span>→</span>
                            </motion.a>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="mt-16 text-center"
                >
                    <p className="text-github-text-muted text-sm">
                        Prefer social media?{" "}
                        <a href="#" className="text-github-accent-neon hover:underline">
                            Connect with us on LinkedIn
                        </a>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
