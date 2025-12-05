import { Mail, MapPin, Phone, Send } from "lucide-react";

export const metadata = {
    title: "Contact",
    description:
        "Get in touch with Dynamic Data Mindset. We'd love to hear from you!",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-github-accent-neon/10 mb-6">
                        <Mail className="w-8 h-8 text-github-accent-neon" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-github-text-primary mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-github-text-secondary max-w-2xl mx-auto">
                        Have a question, suggestion, or just want to say hi? We'd love to hear
                        from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <div className="card">
                        <h2 className="text-2xl font-bold text-github-text-primary mb-6">
                            Send us a Message
                        </h2>
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
                                    className="input w-full"
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
                                    className="input w-full"
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
                                    className="input w-full"
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
                                    className="input w-full resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn-primary w-full inline-flex items-center justify-center space-x-2"
                            >
                                <Send className="w-5 h-5" />
                                <span>Send Message</span>
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        {/* Email */}
                        <div className="card">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="p-3 rounded-lg bg-github-bg-tertiary">
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
                                        className="text-github-accent-neon hover:text-github-accent-neonHover transition-colors duration-200"
                                    >
                                        contact@dynamicdatamindset.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="card">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="p-3 rounded-lg bg-github-bg-tertiary">
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
                        </div>

                        {/* Response Time */}
                        <div className="card">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="p-3 rounded-lg bg-github-bg-tertiary">
                                        <Phone className="w-6 h-6 text-github-accent-neon" />
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
                        </div>

                        {/* FAQ Link */}
                        <div className="card bg-github-bg-tertiary border-github-border-muted">
                            <h3 className="text-lg font-semibold text-github-text-primary mb-2">
                                Quick Question?
                            </h3>
                            <p className="text-sm text-github-text-secondary mb-4">
                                Check out our most frequently asked questions before sending a
                                message.
                            </p>
                            <a
                                href="/about"
                                className="text-github-accent-neon hover:text-github-accent-neonHover transition-colors duration-200 text-sm font-medium"
                            >
                                Visit About Page →
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
