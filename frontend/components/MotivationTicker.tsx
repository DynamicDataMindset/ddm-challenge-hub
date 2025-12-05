"use client";

import { motion } from "framer-motion";

const keywords = [
  "Analyze",
  "Visualize",
  "Predict",
  "Succeed",
  "Transform",
  "Optimize",
  "Innovate",
  "Scale",
];

const tools = [
  { name: "Python", color: "#3776AB" },
  { name: "SQL", color: "#F29111" },
  { name: "Tableau", color: "#E97627" },
  { name: "Excel", color: "#217346" },
  { name: "Power BI", color: "#F2C811" },
  { name: "Pandas", color: "#150458" },
];

export default function MotivationTicker() {
  // Double the items for seamless loop
  const allItems = [...keywords, ...tools.map((t) => t.name), ...keywords];

  return (
    <div className="relative overflow-hidden py-8 bg-github-bg-secondary border-t border-b border-github-border-default">
      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-github-bg-secondary to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-github-bg-secondary to-transparent z-10" />

      {/* Scrolling Content */}
      <motion.div
        className="flex space-x-12 whitespace-nowrap"
        animate={{
          x: [0, -2000],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {allItems.map((item, index) => {
          const isKeyword = keywords.includes(item);
          const tool = tools.find((t) => t.name === item);

          return (
            <div
              key={`${item}-${index}`}
              className="inline-flex items-center space-x-3"
            >
              {isKeyword ? (
                <>
                  <span className="text-2xl font-bold text-github-text-primary">
                    {item}
                  </span>
                  <span className="text-2xl text-github-accent-neon">•</span>
                </>
              ) : (
                <>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="px-4 py-2 rounded-lg bg-github-bg-primary border border-github-border-default"
                  >
                    <span
                      className="text-xl font-semibold"
                      style={{ color: tool?.color || "#39FF14" }}
                    >
                      {item}
                    </span>
                  </motion.div>
                  <span className="text-2xl text-github-accent-neon">•</span>
                </>
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}