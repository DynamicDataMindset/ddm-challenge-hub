import { Mail, CheckCircle, TrendingUp, Zap, BookOpen } from "lucide-react";

export const metadata = {
  title: "Newsletter",
  description:
    "Subscribe to Dynamic Data Mindset newsletter for weekly insights, tutorials, and career tips delivered to your inbox.",
};

export default function NewsletterPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-github-accent-neon/10 mb-6">
            <Mail className="w-8 h-8 text-github-accent-neon" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-github-text-primary mb-4">
            Join Our Newsletter
          </h1>
          <p className="text-xl text-github-text-secondary max-w-2xl mx-auto">
            Get weekly insights, tutorials, and career tips delivered straight to
            your inbox. Join thousands of data professionals leveling up their
            skills.
          </p>
        </div>

        {/* Newsletter Form Card */}
        <div className="card glow-neon max-w-2xl mx-auto mb-12">
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
                className="input w-full"
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-github-text-primary mb-2"
              >
                First Name (Optional)
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John"
                className="input w-full"
              />
            </div>
            <button type="submit" className="btn-primary w-full inline-flex items-center justify-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>Subscribe Now</span>
            </button>
          </form>
          <p className="text-xs text-github-text-muted text-center mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-github-bg-secondary mb-4">
              <TrendingUp className="w-6 h-6 text-github-accent-neon" />
            </div>
            <h3 className="text-lg font-semibold text-github-text-primary mb-2">
              Career Growth Tips
            </h3>
            <p className="text-sm text-github-text-secondary">
              Actionable advice to advance your data career and increase your
              earning potential.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-github-bg-secondary mb-4">
              <BookOpen className="w-6 h-6 text-github-accent-neon" />
            </div>
            <h3 className="text-lg font-semibold text-github-text-primary mb-2">
              Practical Tutorials
            </h3>
            <p className="text-sm text-github-text-secondary">
              Step-by-step guides on SQL, Python, and data analytics tools you
              can apply immediately.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-github-bg-secondary mb-4">
              <Zap className="w-6 h-6 text-github-accent-neon" />
            </div>
            <h3 className="text-lg font-semibold text-github-text-primary mb-2">
              Industry Insights
            </h3>
            <p className="text-sm text-github-text-secondary">
              Stay ahead with the latest trends, tools, and best practices in
              data analytics.
            </p>
          </div>
        </div>

        {/* What You'll Get */}
        <div className="card max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-github-text-primary mb-6">
            What You'll Get
          </h2>
          <ul className="space-y-4">
            {[
              "Weekly newsletter with curated content and original insights",
              "Exclusive tutorials and guides not available on the blog",
              "Early access to new courses and resources",
              "Career advice from experienced data professionals",
              "Community tips and success stories",
              "No spam, ever. Quality over quantity.",
            ].map((benefit, index) => (
              <li key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-github-accent-neon flex-shrink-0 mt-0.5" />
                <span className="text-github-text-secondary">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Proof */}
        <div className="text-center mt-12">
          <p className="text-github-text-muted text-sm">
            Join <span className="text-github-accent-neon font-semibold">5,000+</span> data
            professionals who are already subscribed
          </p>
        </div>
      </div>
    </div>
  );
}