"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Send, MessageSquare, User, Briefcase, Building2, Calendar, Globe, Target, Search } from "lucide-react";

export default function ContactPage() {
    // State for "Other" field toggles
    const [showOtherRole, setShowOtherRole] = useState(false);
    const [showOtherIndustry, setShowOtherIndustry] = useState(false);
    const [showOtherInterest, setShowOtherInterest] = useState(false);
    const [showOtherSource, setShowOtherSource] = useState(false);

    // Dropdown options
    const roleOptions = [
        { value: "", label: "Select your role..." },
        { value: "student", label: "Student" },
        { value: "career-changer", label: "Career Changer" },
        { value: "intern", label: "Intern" },
        { value: "junior-analyst", label: "Junior Analyst" },
        { value: "data-analyst", label: "Data Analyst" },
        { value: "senior-analyst", label: "Senior Data Analyst" },
        { value: "data-engineer", label: "Data Engineer" },
        { value: "data-scientist", label: "Data Scientist" },
        { value: "ml-engineer", label: "ML/AI Engineer" },
        { value: "bi-developer", label: "BI Developer" },
        { value: "analytics-manager", label: "Analytics Manager" },
        { value: "data-lead", label: "Data Team Lead" },
        { value: "director", label: "Director / VP of Data" },
        { value: "cto-cdo", label: "CTO / CDO / Executive" },
        { value: "product-manager", label: "Product Manager" },
        { value: "software-engineer", label: "Software Engineer" },
        { value: "consultant", label: "Consultant" },
        { value: "freelancer", label: "Freelancer" },
        { value: "recruiter", label: "Recruiter / HR" },
        { value: "educator", label: "Educator / Trainer" },
        { value: "other", label: "Other" },
    ];

    const industryOptions = [
        { value: "", label: "Select your industry..." },
        { value: "tech-software", label: "Technology / Software" },
        { value: "ai-ml", label: "AI / Machine Learning" },
        { value: "fintech", label: "FinTech" },
        { value: "finance-banking", label: "Finance / Banking" },
        { value: "healthcare", label: "Healthcare / Biotech" },
        { value: "ecommerce-retail", label: "E-commerce / Retail" },
        { value: "saas", label: "SaaS" },
        { value: "consulting", label: "Consulting" },
        { value: "media-entertainment", label: "Media / Entertainment" },
        { value: "gaming", label: "Gaming" },
        { value: "telecommunications", label: "Telecommunications" },
        { value: "manufacturing", label: "Manufacturing" },
        { value: "energy", label: "Energy / Utilities" },
        { value: "government", label: "Government / Public Sector" },
        { value: "education", label: "Education" },
        { value: "nonprofit", label: "Non-profit" },
        { value: "startup", label: "Startup (Early Stage)" },
        { value: "other", label: "Other" },
    ];

    const experienceOptions = [
        { value: "", label: "Select experience..." },
        { value: "0-1", label: "0-1 years (Entry Level)" },
        { value: "1-3", label: "1-3 years (Junior)" },
        { value: "3-5", label: "3-5 years (Mid-Level)" },
        { value: "5-8", label: "5-8 years (Senior)" },
        { value: "8-12", label: "8-12 years (Lead/Principal)" },
        { value: "12-plus", label: "12+ years (Executive/Director)" },
    ];

    const interestOptions = [
        { value: "", label: "Select primary interest..." },
        { value: "sql", label: "SQL & Databases" },
        { value: "python", label: "Python for Data" },
        { value: "excel", label: "Excel / Spreadsheets" },
        { value: "power-bi", label: "Power BI" },
        { value: "tableau", label: "Tableau" },
        { value: "data-analytics", label: "Data Analytics" },
        { value: "data-engineering", label: "Data Engineering" },
        { value: "data-science", label: "Data Science" },
        { value: "machine-learning", label: "Machine Learning" },
        { value: "ai-llm", label: "AI / LLMs / GenAI" },
        { value: "cloud-data", label: "Cloud Data (AWS/GCP/Azure)" },
        { value: "statistics", label: "Statistics" },
        { value: "career-guidance", label: "Career Guidance / Job Search" },
        { value: "certifications", label: "Certifications" },
        { value: "portfolio-projects", label: "Portfolio Projects" },
        { value: "other", label: "Other" },
    ];

    const sourceOptions = [
        { value: "", label: "Select an option..." },
        { value: "google", label: "Google Search" },
        { value: "linkedin", label: "LinkedIn" },
        { value: "twitter-x", label: "Twitter / X" },
        { value: "youtube", label: "YouTube" },
        { value: "tiktok", label: "TikTok" },
        { value: "reddit", label: "Reddit" },
        { value: "facebook", label: "Facebook" },
        { value: "instagram", label: "Instagram" },
        { value: "friend-referral", label: "Friend / Colleague Referral" },
        { value: "blog-article", label: "Blog / Article" },
        { value: "podcast", label: "Podcast" },
        { value: "newsletter", label: "Newsletter" },
        { value: "conference-event", label: "Conference / Event" },
        { value: "course-platform", label: "Course Platform (Coursera, Udemy, etc.)" },
        { value: "other", label: "Other" },
    ];

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setShowOtherRole(e.target.value === "other");
    };

    const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setShowOtherIndustry(e.target.value === "other");
    };

    const handleInterestChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setShowOtherInterest(e.target.value === "other");
    };

    const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setShowOtherSource(e.target.value === "other");
    };

    return (
        <div className="min-h-screen py-16 relative overflow-hidden">
            {/* Background Gradient Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-github-accent-neon/5 rounded-full filter blur-3xl" />
                <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-github-accent-neon/3 rounded-full filter blur-3xl" />
            </div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                        from you and learn more about your data journey.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Form - Takes 2 columns */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-2 card hover:border-github-accent-neon/30 transition-all duration-300"
                    >
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="p-2 rounded-lg bg-github-accent-neon/10">
                                <MessageSquare className="w-5 h-5 text-github-accent-neon" />
                            </div>
                            <h2 className="text-2xl font-bold text-github-text-primary">
                                Send us a Message
                            </h2>
                        </div>

                        <form className="space-y-6">
                            {/* Row 1: Name & Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-github-text-primary mb-2">
                                        <span className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-github-text-muted" />
                                            Full Name <span className="text-github-danger">*</span>
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Your full name"
                                        required
                                        className="input w-full focus:ring-2 focus:ring-github-accent-neon/50"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-github-text-primary mb-2">
                                        <span className="flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-github-text-muted" />
                                            Email <span className="text-github-danger">*</span>
                                        </span>
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
                            </div>

                            {/* Row 2: Current Role & Job Title */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-github-text-primary mb-2">
                                        <span className="flex items-center gap-2">
                                            <Briefcase className="w-4 h-4 text-github-text-muted" />
                                            Current Role
                                        </span>
                                    </label>
                                    <select
                                        id="role"
                                        name="role"
                                        onChange={handleRoleChange}
                                        className="input w-full focus:ring-2 focus:ring-github-accent-neon/50"
                                    >
                                        {roleOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    {showOtherRole && (
                                        <input
                                            type="text"
                                            name="role_other"
                                            placeholder="Please specify your role..."
                                            className="input w-full mt-2 focus:ring-2 focus:ring-github-accent-neon/50"
                                        />
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="job_title" className="block text-sm font-medium text-github-text-primary mb-2">
                                        <span className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-github-text-muted" />
                                            Job Title / Profession
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        id="job_title"
                                        name="job_title"
                                        placeholder="e.g., Product Manager, Data Analyst"
                                        className="input w-full focus:ring-2 focus:ring-github-accent-neon/50"
                                    />
                                </div>
                            </div>

                            {/* Row 3: Industry & Experience */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="industry" className="block text-sm font-medium text-github-text-primary mb-2">
                                        <span className="flex items-center gap-2">
                                            <Building2 className="w-4 h-4 text-github-text-muted" />
                                            Industry
                                        </span>
                                    </label>
                                    <select
                                        id="industry"
                                        name="industry"
                                        onChange={handleIndustryChange}
                                        className="input w-full focus:ring-2 focus:ring-github-accent-neon/50"
                                    >
                                        {industryOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    {showOtherIndustry && (
                                        <input
                                            type="text"
                                            name="industry_other"
                                            placeholder="Please specify your industry..."
                                            className="input w-full mt-2 focus:ring-2 focus:ring-github-accent-neon/50"
                                        />
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="experience" className="block text-sm font-medium text-github-text-primary mb-2">
                                        <span className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-github-text-muted" />
                                            Years of Experience
                                        </span>
                                    </label>
                                    <select
                                        id="experience"
                                        name="experience"
                                        className="input w-full focus:ring-2 focus:ring-github-accent-neon/50"
                                    >
                                        {experienceOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Row 4: Location (City & Country) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-github-text-primary mb-2">
                                        <span className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-github-text-muted" />
                                            City
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        placeholder="e.g., San Francisco, London"
                                        className="input w-full focus:ring-2 focus:ring-github-accent-neon/50"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="country" className="block text-sm font-medium text-github-text-primary mb-2">
                                        <span className="flex items-center gap-2">
                                            <Globe className="w-4 h-4 text-github-text-muted" />
                                            Country / Region
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        placeholder="e.g., United States, United Kingdom"
                                        className="input w-full focus:ring-2 focus:ring-github-accent-neon/50"
                                    />
                                </div>
                            </div>

                            {/* Row 5: Primary Interest & How did you find us */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="interest" className="block text-sm font-medium text-github-text-primary mb-2">
                                        <span className="flex items-center gap-2">
                                            <Target className="w-4 h-4 text-github-text-muted" />
                                            Primary Interest
                                        </span>
                                    </label>
                                    <select
                                        id="interest"
                                        name="interest"
                                        onChange={handleInterestChange}
                                        className="input w-full focus:ring-2 focus:ring-github-accent-neon/50"
                                    >
                                        {interestOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    {showOtherInterest && (
                                        <input
                                            type="text"
                                            name="interest_other"
                                            placeholder="Please specify your interest..."
                                            className="input w-full mt-2 focus:ring-2 focus:ring-github-accent-neon/50"
                                        />
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="source" className="block text-sm font-medium text-github-text-primary mb-2">
                                        <span className="flex items-center gap-2">
                                            <Search className="w-4 h-4 text-github-text-muted" />
                                            How did you find us?
                                        </span>
                                    </label>
                                    <select
                                        id="source"
                                        name="source"
                                        onChange={handleSourceChange}
                                        className="input w-full focus:ring-2 focus:ring-github-accent-neon/50"
                                    >
                                        {sourceOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    {showOtherSource && (
                                        <input
                                            type="text"
                                            name="source_other"
                                            placeholder="Please specify..."
                                            className="input w-full mt-2 focus:ring-2 focus:ring-github-accent-neon/50"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-gradient-to-r from-transparent via-github-border-default to-transparent" />

                            {/* Subject */}
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-github-text-primary mb-2">
                                    Subject <span className="text-github-danger">*</span>
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

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-github-text-primary mb-2">
                                    Message <span className="text-github-danger">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    placeholder="Tell us more about your question, feedback, or how we can help..."
                                    required
                                    className="input w-full resize-none focus:ring-2 focus:ring-github-accent-neon/50"
                                />
                            </div>

                            {/* Privacy Note */}
                            <p className="text-xs text-github-text-muted">
                                Your information helps us provide better content and resources tailored to your needs.
                                We respect your privacy and will never share your data with third parties.
                            </p>

                            {/* Submit Button */}
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

                    {/* Contact Information - Takes 1 column */}
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
                                    <p className="text-github-text-secondary mb-2 text-sm">
                                        Send us an email anytime
                                    </p>
                                    <a
                                        href="mailto:contact@dynamicdatamindset.com"
                                        className="text-github-accent-neon hover:text-github-accent-neonHover transition-colors duration-200 font-medium text-sm"
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
                                    <p className="text-github-text-secondary text-sm">
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
                                    <p className="text-github-text-secondary text-sm">
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
