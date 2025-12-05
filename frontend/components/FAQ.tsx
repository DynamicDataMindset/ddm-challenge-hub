"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Is Dynamic Data Mindset free?",
    answer:
      "Yes! Most of our content is completely free. We curate both free and paid resources, and everything is clearly labeled. You can browse tutorials, guides, and free course recommendations without spending a dime. Some curated resources link to paid platforms (like DataCamp or Coursera), but we always show FREE alternatives when available.",
  },
  {
    question: "What's the difference between your tutorials and resources?",
    answer:
      "Tutorials are guides we write—explaining concepts, workflows, or career strategies. Resources are external courses, videos, and tools we've tested and recommend. Think of tutorials as our original content, and resources as our curated recommendations from proven educators like Alex the Analyst, DataCamp, and others.",
  },
  {
    question: "Do I need prior experience to start?",
    answer:
      "Nope! We organize everything by skill level—Beginner, Intermediate, Advanced. Start with our 'Getting Started' guides if you're brand new to data. We'll point you to beginner-friendly resources first, then help you level up as you progress.",
  },
  {
    question: "How do the paid resources work? Do you sell courses?",
    answer:
      "We don't sell courses—we recommend them. When you see a PAID badge, it means the resource is on an external platform (like Udemy or DataCamp). Some links are affiliate links, meaning we may earn a small commission if you purchase. This helps us keep the site running, and you always know when a link is affiliate because we disclose it clearly.",
  },
  {
    question: "Do you offer certificates or credentials?",
    answer:
      "We don't issue certificates ourselves, but many resources we recommend DO offer them (like Google Career Certificates, DataCamp certifications, etc.). We clearly mark which resources include certificates with a 🏆 badge, so you know exactly what you're getting.",
  },
  {
    question: "How often do you publish new content?",
    answer:
      "We add new resources weekly and publish tutorials 2-3 times per month. Our newsletter goes out every week with curated picks, new resources, and industry updates. Subscribe to stay in the loop!",
  },
  {
    question: "Can I suggest topics or resources?",
    answer:
      "Absolutely! We love community input. Use our contact form to suggest tutorials, recommend resources you've found helpful, or request topics you want to learn. If something is genuinely valuable, we'll test it and add it to the site.",
  },
  {
    question: "Do you offer one-on-one mentoring or coaching?",
    answer:
      "Not currently. We focus on curating the best existing resources so you can learn from proven educators. However, some resources we recommend (like DataCamp or Maven Analytics) do offer mentorship programs—we'll point you in the right direction!",
  },
  {
    question: "What tools or software do I need?",
    answer:
      "It depends on what you're learning! For SQL, you can start with free tools like DB Browser for SQLite. For Python, Jupyter Notebooks or Google Colab (free). For data viz, Power BI has a free version. Each resource we recommend lists the required tools, and we always prioritize free options for beginners.",
  },
  {
    question: "How do I stay updated with new resources and content?",
    answer:
      "Subscribe to our weekly newsletter! You'll get new resource recommendations, tutorial updates, career tips, and industry insights every week. We respect your inbox—no spam, unsubscribe anytime.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="card border-2 border-github-border-default hover:border-github-accent-neon/30 transition-colors duration-300"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full flex items-center justify-between text-left p-6 focus:outline-none"
          >
            <span className="text-lg font-semibold text-github-text-primary pr-8">
              {faq.question}
            </span>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
            >
              {openIndex === index ? (
                <Minus className="w-6 h-6 text-github-accent-neon" />
              ) : (
                <Plus className="w-6 h-6 text-github-accent-neon" />
              )}
            </motion.div>
          </button>

          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 text-github-text-secondary leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom accent line when open */}
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.3 }}
                className="h-1 bg-gradient-to-r from-github-accent-neon to-transparent origin-left"
              />
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}