"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mail,
    MapPin,
    Clock,
    Send,
    MessageSquare,
    User,
    Briefcase,
    Building2,
    Calendar,
    Globe,
    Target,
    Search,
    HelpCircle,
    CheckCircle,
    AlertCircle,
    ArrowRight,
    Loader2
} from "lucide-react";

export default function ContactPage() {
    // Spam protection
    const [formLoadTime] = useState<number>(Date.now());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'spam'>('idle');
    const honeypotRef = useRef<HTMLInputElement>(null);

    // State for "Other" field toggles
    const [showOtherRole, setShowOtherRole] = useState(false);
    const [showOtherIndustry, setShowOtherIndustry] = useState(false);
    const [showOtherInterest, setShowOtherInterest] = useState(false);
    const [showOtherSource, setShowOtherSource] = useState(false);
    const [showOtherReason, setShowOtherReason] = useState(false);

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

    const reasonOptions = [
        { value: "", label: "Select a reason..." },
        { value: "general-question", label: "General Question" },
        { value: "resource-suggestion", label: "Resource Suggestion" },
        { value: "partnership", label: "Partnership / Collaboration" },
        { value: "bug-report", label: "Bug Report / Issue" },
        { value: "career-advice", label: "Career Advice Request" },
        { value: "content-feedback", label: "Course / Content Feedback" },
        { value: "sponsorship", label: "Sponsorship Inquiry" },
        { value: "testimonial", label: "Share Success Story" },
        { value: "media-press", label: "Media / Press Inquiry" },
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

    const handleReasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setShowOtherReason(e.target.value === "other");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Spam check 1: Honeypot field should be empty
        if (honeypotRef.current && honeypotRef.current.value) {
            console.log("Spam detected: honeypot triggered");
            setSubmitStatus('spam');
            return;
        }

        // Spam check 2: Form should take at least 3 seconds to fill
        const timeSpent = Date.now() - formLoadTime;
        if (timeSpent < 3000) {
            console.log("Spam detected: form submitted too quickly");
            setSubmitStatus('spam');
            return;
        }

        setIsSubmitting(true);

        // Simulate form submission (replace with actual API call)
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSubmitStatus('success');
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Reusable card style for form sections
    const sectionCardClass = "card hover:border-github-accent-neon/30 transition-all duration-300";

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

                {/* Success/Error Messages */}
                <AnimatePresence mode="wait">
                    {submitStatus === 'success' && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="max-w-2xl mx-auto mb-8"
                        >
                            <div className="card bg-github-success/10 border-github-success/30 text-center">
                                <CheckCircle className="w-12 h-12 text-github-success mx-auto mb-3" />
                                <h3 className="text-xl font-semibold text-github-text-primary mb-2">Message Sent Successfully!</h3>
                                <p className="text-github-text-secondary">Thank you for reaching out. We'll get back to you within 24-48 hours.</p>
                            </div>
                        </motion.div>
                    )}
                    {submitStatus === 'error' && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="max-w-2xl mx-auto mb-8"
                        >
                            <div className="card bg-github-danger/10 border-github-danger/30 text-center">
                                <AlertCircle className="w-12 h-12 text-github-danger mx-auto mb-3" />
                                <h3 className="text-xl font-semibold text-github-text-primary mb-2">Oops! Something went wrong.</h3>
                                <p className="text-github-text-secondary">Please try again or email us directly.</p>
                            </div>
                        </motion.div>
                    )}
                    {submitStatus === 'spam' && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="max-w-2xl mx-auto mb-8"
                        >
                            <div className="card bg-github-warning/10 border-github-warning/30 text-center">
                                <AlertCircle className="w-12 h-12 text-github-warning mx-auto mb-3" />
                                <h3 className="text-xl font-semibold text-github-text-primary mb-2">Submission Blocked</h3>
                                <p className="text-github-text-secondary">Please fill out the form normally and try again.</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {submitStatus !== 'success' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Contact Form - Takes 2 columns */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:col-span-2"
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Honeypot field - hidden from users, bots will fill it */}
                                <div className="absolute -left-[9999px] opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true">
                                    <label htmlFor="website">Website</label>
                                    <input
                                        type="text"
                                        id="website"
                                        name="website"
                                        ref={honeypotRef}
                                        tabIndex={-1}
                                        autoComplete="off"
                                    />
                                </div>

                                {/* Section 1: Personal Information */}
                                <div className={sectionCardClass}>
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="p-2 rounded-lg bg-github-accent-neon/10">
                                            <User className="w-5 h-5 text-github-accent-neon" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-github-text-primary">Personal Information</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-github-text-primary mb-2">
                                                Full Name <span className="text-github-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                placeholder="Your full name"
                                                required
                                                className="input w-full"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-github-text-primary mb-2">
                                                Email <span className="text-github-danger">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder="your.email@example.com"
                                                required
                                                className="input w-full"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Professional Background */}
                                <div className={sectionCardClass}>
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="p-2 rounded-lg bg-github-accent-neon/10">
                                            <Briefcase className="w-5 h-5 text-github-accent-neon" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-github-text-primary">Professional Background</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="role" className="block text-sm font-medium text-github-text-primary mb-2">
                                                Current Role
                                            </label>
                                            <select
                                                id="role"
                                                name="role"
                                                onChange={handleRoleChange}
                                                className="input w-full"
                                            >
                                                {roleOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <AnimatePresence>
                                                {showOtherRole && (
                                                    <motion.input
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        type="text"
                                                        name="role_other"
                                                        placeholder="Please specify..."
                                                        className="input w-full mt-2"
                                                    />
                                                )}
                                            </AnimatePresence>
                                        </div>
                                        <div>
                                            <label htmlFor="job_title" className="block text-sm font-medium text-github-text-primary mb-2">
                                                Job Title / Profession
                                            </label>
                                            <input
                                                type="text"
                                                id="job_title"
                                                name="job_title"
                                                placeholder="e.g., Product Manager"
                                                className="input w-full"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="industry" className="block text-sm font-medium text-github-text-primary mb-2">
                                                Industry
                                            </label>
                                            <select
                                                id="industry"
                                                name="industry"
                                                onChange={handleIndustryChange}
                                                className="input w-full"
                                            >
                                                {industryOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <AnimatePresence>
                                                {showOtherIndustry && (
                                                    <motion.input
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        type="text"
                                                        name="industry_other"
                                                        placeholder="Please specify..."
                                                        className="input w-full mt-2"
                                                    />
                                                )}
                                            </AnimatePresence>
                                        </div>
                                        <div>
                                            <label htmlFor="experience" className="block text-sm font-medium text-github-text-primary mb-2">
                                                Years of Experience
                                            </label>
                                            <select
                                                id="experience"
                                                name="experience"
                                                className="input w-full"
                                            >
                                                {experienceOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 3: Location */}
                                <div className={sectionCardClass}>
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="p-2 rounded-lg bg-github-accent-neon/10">
                                            <Globe className="w-5 h-5 text-github-accent-neon" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-github-text-primary">Location</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="city" className="block text-sm font-medium text-github-text-primary mb-2">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                id="city"
                                                name="city"
                                                placeholder="e.g., San Francisco"
                                                className="input w-full"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="country" className="block text-sm font-medium text-github-text-primary mb-2">
                                                Country / Region
                                            </label>
                                            <input
                                                type="text"
                                                id="country"
                                                name="country"
                                                placeholder="e.g., United States"
                                                className="input w-full"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 4: Interests & Discovery */}
                                <div className={sectionCardClass}>
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="p-2 rounded-lg bg-github-accent-neon/10">
                                            <Target className="w-5 h-5 text-github-accent-neon" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-github-text-primary">Interests & Discovery</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="interest" className="block text-sm font-medium text-github-text-primary mb-2">
                                                Primary Interest
                                            </label>
                                            <select
                                                id="interest"
                                                name="interest"
                                                onChange={handleInterestChange}
                                                className="input w-full"
                                            >
                                                {interestOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <AnimatePresence>
                                                {showOtherInterest && (
                                                    <motion.input
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        type="text"
                                                        name="interest_other"
                                                        placeholder="Please specify..."
                                                        className="input w-full mt-2"
                                                    />
                                                )}
                                            </AnimatePresence>
                                        </div>
                                        <div>
                                            <label htmlFor="source" className="block text-sm font-medium text-github-text-primary mb-2">
                                                How did you find us?
                                            </label>
                                            <select
                                                id="source"
                                                name="source"
                                                onChange={handleSourceChange}
                                                className="input w-full"
                                            >
                                                {sourceOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <AnimatePresence>
                                                {showOtherSource && (
                                                    <motion.input
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        type="text"
                                                        name="source_other"
                                                        placeholder="Please specify..."
                                                        className="input w-full mt-2"
                                                    />
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 5: Your Message */}
                                <div className={sectionCardClass}>
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="p-2 rounded-lg bg-github-accent-neon/10">
                                            <MessageSquare className="w-5 h-5 text-github-accent-neon" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-github-text-primary">Your Message</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="reason" className="block text-sm font-medium text-github-text-primary mb-2">
                                                Reason for Contact <span className="text-github-danger">*</span>
                                            </label>
                                            <select
                                                id="reason"
                                                name="reason"
                                                required
                                                onChange={handleReasonChange}
                                                className="input w-full"
                                            >
                                                {reasonOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <AnimatePresence>
                                                {showOtherReason && (
                                                    <motion.input
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        type="text"
                                                        name="reason_other"
                                                        placeholder="Please specify..."
                                                        className="input w-full mt-2"
                                                    />
                                                )}
                                            </AnimatePresence>
                                        </div>
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
                                                className="input w-full resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Privacy & Submit */}
                                <div className="space-y-4">
                                    <p className="text-xs text-github-text-muted">
                                        Your information helps us provide better content and resources tailored to your needs.
                                        We respect your privacy and will never share your data with third parties.
                                    </p>

                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                        className="btn-primary w-full inline-flex items-center justify-center space-x-2 shadow-lg shadow-github-accent-neon/20 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                <span>Send Message</span>
                                            </>
                                        )}
                                    </motion.button>
                                </div>
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
                                            className="text-github-accent-neon hover:text-github-accent-neonHover transition-colors duration-200 font-medium text-sm inline-flex items-center gap-1 group/link"
                                        >
                                            contact@dynamicdatamindset.com
                                            <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
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
                                <div className="flex items-center gap-2 mb-2">
                                    <HelpCircle className="w-5 h-5 text-github-accent-neon" />
                                    <h3 className="text-lg font-semibold text-github-text-primary">
                                        Quick Question?
                                    </h3>
                                </div>
                                <p className="text-sm text-github-text-secondary mb-4">
                                    Check out our FAQ section for instant answers.
                                </p>
                                <a
                                    href="/about"
                                    className="text-github-accent-neon hover:text-github-accent-neonHover transition-colors duration-200 text-sm font-medium inline-flex items-center gap-1 group/link"
                                >
                                    <span>Visit FAQ Section</span>
                                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                </a>
                            </motion.div>
                        </div>
                    </div>
                )}

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
