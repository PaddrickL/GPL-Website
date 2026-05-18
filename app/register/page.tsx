"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Register() {
  const [teamName, setTeamName] = useState("");
  const [captainName, setCaptainName] = useState("");
  const [captainPhone, setCaptainPhone] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player3, setPlayer3] = useState("");
  const [player4, setPlayer4] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { error } = await supabase.from('teams').insert({
        team_name: teamName,
        captain_name: captainName,
        captain_email: "",
        captain_phone: captainPhone,
        player2_name: player2,
        player3_name: player3,
        player4_name: player4 || null,
      });

      if (error) throw error;

      setSubmitted(true);
    } catch (err) {
      setError("Failed to register team. Please try again.");
      console.error(err);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 glow-box"
        >
          <div className="text-center">
            <motion.div
              className="text-6xl mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              🏀
            </motion.div>
            <h2 className="text-3xl font-bold mb-4 glow-text">Registration Complete!</h2>
            <p className="text-gray-300 mb-6">
              Your team has been registered for the tournament. We'll contact you with more details soon.
            </p>
            <Link href="/">
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-black font-bold rounded-full glow-box hover:scale-105 transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back to Home
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 pt-24">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 glow-text">
            Register Your Team
          </h1>
          <p className="text-xl text-gray-300">
            Sign up your 3v3 squad for the tournament
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 glow-box"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2 text-primary">
                Team Name *
              </label>
              <input
                type="text"
                required
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                placeholder="Enter your team name"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-primary">
                Captain Name *
              </label>
              <input
                type="text"
                required
                value={captainName}
                onChange={(e) => setCaptainName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                placeholder="Captain's full name"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-primary">
                Captain Phone *
              </label>
              <input
                type="tel"
                required
                value={captainPhone}
                onChange={(e) => setCaptainPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-primary">
                Player 2 Name *
              </label>
              <input
                type="text"
                required
                value={player2}
                onChange={(e) => setPlayer2(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                placeholder="Second player's name"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-primary">
                Player 3 Name *
              </label>
              <input
                type="text"
                required
                value={player3}
                onChange={(e) => setPlayer3(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                placeholder="Third player's name"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-primary">
                Player 4 Name (Optional)
              </label>
              <input
                type="text"
                value={player4}
                onChange={(e) => setPlayer4(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                placeholder="Fourth player's name (optional substitute)"
              />
            </div>

            <motion.button
              type="submit"
              className="w-full px-8 py-4 bg-gradient-to-r from-primary to-secondary text-black font-bold rounded-full text-lg glow-box hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Register Team
            </motion.button>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-red-500/20 border border-red-500 text-red-300 text-center"
              >
                {error}
              </motion.div>
            )}
          </div>
        </motion.form>

        <div className="text-center mt-6">
          <Link href="/" className="text-gray-400 hover:text-primary transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
