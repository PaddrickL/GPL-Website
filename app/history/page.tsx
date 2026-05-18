"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function History() {
  const pastTournaments = [
    {
      year: "2026",
      champion: "TBD",
      runnerUp: "TBD",
      mvp: "TBD",
      image: null,
    },
    {
      year: "2024",
      champion: "Team Scud",
      runnerUp: "Two Bandits and a Cop",
      mvp: "Jake Johnson",
      image: "/images/2024-champion.jpg",
    },
    {
      year: "2023",
      champion: "Team Scud",
      runnerUp: "Bobo's Bitches",
      mvp: "Jake Johnson",
      image: "/images/2023-champion.jpg",
    },
    {
      year: "2022",
      champion: "Bobo's Bitches",
      runnerUp: "Team Snapp",
      mvp: "Jackson Bobo",
      image: "/images/2022-champion.jpg",
    },
    {
      year: "2021",
      champion: "Team Snapp",
      runnerUp: "Driguodala",
      mvp: "Ethan Snapp",
      image: "/images/2021-champion.jpg",
    },
    {
      year: "2020",
      champion: "Team Snapp",
      runnerUp: "BLM",
      mvp: "Ethan Snapp",
      image: "/images/2020-champion.jpg",
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 pt-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 glow-text">
            Tournament History
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 glow-box mb-12"
        >
          <h2 className="text-3xl font-bold text-primary script-text mb-4">
            History
          </h2>
          <p className="text-lg leading-relaxed text-gray-200">
            Greendale Park League was started by high school friends who would routinely gather at Greendale Park to play basketball. What started as messing around and posting funny videos on YouTube has evolved into an annual tradition in which the game of basketball is celebrated while also raising funds for various causes. In 2026, we will be donating the proceeds to the Scalf family in order to support Shelby Scalf and her stage 4 diagnosis.
          </p>
        </motion.div>

        <div className="space-y-6">
          {pastTournaments.map((tournament, index) => (
            <motion.div
              key={tournament.year}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 glow-box"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-white/10">
                    {tournament.image ? (
                      <img
                        src={tournament.image}
                        alt={`${tournament.year} Champion`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="md:w-2/3 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-primary script-text">
                        {tournament.year}
                      </h2>
                    </div>
                    <div className="text-4xl">🏆</div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Champion</div>
                      <div className="font-bold text-lg">{tournament.champion}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Runner-Up</div>
                      <div className="font-bold text-lg">{tournament.runnerUp}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">MVP</div>
                      <div className="font-bold text-lg">{tournament.mvp}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-gray-400 hover:text-primary transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
