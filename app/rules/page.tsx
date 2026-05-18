"use client";

import { motion } from "framer-motion";

export default function Rules() {
  const rules = [
    {
      title: "Scoring & Game Length",
      items: [
        "Games are played to 11 points (straight up, no win by 2)",
        "1 point for shots inside the arc, 2 points for shots outside the arc",
        "Games are played on a half-court"
      ]
    },
    {
      title: "Tournament Format",
      items: [
        "Double Elimination bracket",
        "Each team is guaranteed 2 games",
        "Loser's bracket provides second chance at championship"
      ]
    },
    {
      title: "Entry Fee",
      items: [
        "$60 per TEAM",
        "$15 per person for 4-player teams",
        "$20 per person for 3-player teams"
      ]
    },
    {
      title: "Team Composition",
      items: [
        "3 players on the court at all times",
        "Teams may have up to 1 substitute player (4 total roster)"
      ]
    },
    {
      title: "Gameplay Rules",
      items: [
        "Standard basketball fouls apply",
        "Ball must be cleared past the three-point line on defensive rebounds",
        "No timeouts during games",
        "Tournament director has final say on all disputes"
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-20 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 glow-text">
            Tournament Rules
          </h1>
          <p className="text-xl text-gray-300">
            Please review all rules before participating
          </p>
        </motion.div>

        <div className="space-y-6">
          {rules.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 glow-box"
            >
              <h2 className="text-2xl font-bold text-primary mb-4 script-text">
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start text-gray-300">
                    <span className="text-primary mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 rounded-xl bg-primary/10 border border-primary/30 glow-box"
        >
          <h3 className="text-xl font-bold text-primary mb-2">
            Questions?
          </h3>
          <p className="text-gray-300 mb-2">
            Contact Tournament Director Paddrick Libbert for any clarifications on the rules.
          </p>
          <p className="text-gray-300">
            Phone: (513) 344-0575
          </p>
        </motion.div>
      </div>
    </div>
  );
}
