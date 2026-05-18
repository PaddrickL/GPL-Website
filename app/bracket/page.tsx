"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface Team {
  id: number;
  name: string;
}

interface Match {
  id: number;
  team1: Team | null;
  team2: Team | null;
  winner: Team | null;
}

export default function Bracket() {
  const [revealed, setRevealed] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBracket();
  }, []);

  const fetchBracket = async () => {
    try {
      const { data, error } = await supabase
        .from('bracket')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setRevealed(data.revealed);
        if (data.matches) {
          setMatches(data.matches);
        }
      }
    } catch (err) {
      setError("Failed to load bracket");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <div className="text-white text-xl">Loading bracket...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 pt-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 glow-text">
            Tournament Bracket
          </h1>
        </motion.div>

        {!revealed || matches.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-2xl font-bold">
              Bracket Reveal Coming Soon
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="overflow-x-auto pb-8">
              <div className="flex gap-8 min-w-max">
                {matches.map((match, index) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 glow-box">
                      <div className="text-sm text-gray-400 mb-3">
                        Match {index + 1}
                      </div>
                      
                      <div className="space-y-2">
                        <div className={`p-3 rounded-lg transition-all ${
                          match.winner?.id === match.team1?.id
                            ? 'bg-primary/30 border-2 border-primary'
                            : 'bg-white/10 border-2 border-transparent'
                        }`}>
                          <div className="font-bold">{match.team1?.name || "TBD"}</div>
                        </div>
                        
                        <div className={`p-3 rounded-lg transition-all ${
                          match.winner?.id === match.team2?.id
                            ? 'bg-primary/30 border-2 border-primary'
                            : 'bg-white/10 border-2 border-transparent'
                        }`}>
                          <div className="font-bold">{match.team2?.name || "TBD"}</div>
                        </div>
                      </div>

                      {match.winner && (
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <div className="text-sm text-primary">Winner:</div>
                          <div className="font-bold text-primary glow-text">
                            {match.winner.name}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Semi-finals placeholder */}
                {matches.length >= 8 && (
                  <div className="flex flex-col gap-4 mt-16">
                    {[...Array(matches.length / 4)].map((_, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 glow-box"
                      >
                        <div className="text-sm text-gray-400 mb-3">
                          Semi-Final {i + 1}
                        </div>
                        <div className="space-y-2">
                          <div className="p-3 rounded-lg bg-white/10 border-2 border-transparent">
                            <div className="font-bold">TBD</div>
                          </div>
                          <div className="p-3 rounded-lg bg-white/10 border-2 border-transparent">
                            <div className="font-bold">TBD</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Final placeholder */}
                <div className="flex flex-col gap-4 mt-32">
                  <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 glow-box">
                    <div className="text-sm text-gray-400 mb-3">
                      Championship
                    </div>
                    <div className="space-y-2">
                      <div className="p-3 rounded-lg bg-white/10 border-2 border-transparent">
                        <div className="font-bold">TBD</div>
                      </div>
                      <div className="p-3 rounded-lg bg-white/10 border-2 border-transparent">
                        <div className="font-bold">TBD</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="text-center mt-6">
          <Link href="/" className="text-gray-400 hover:text-primary transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
