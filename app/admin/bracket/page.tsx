"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/useAuth";

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

export default function AdminBracket() {
  const { isAuthenticated, isLoading, login, logout } = useAuth();
  const [numTeams, setNumTeams] = useState(8);
  const [teams, setTeams] = useState<Team[]>([]);
  const [bracketGenerated, setBracketGenerated] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    fetchTeams();
    fetchBracket();
  }, []);

  const fetchTeams = async () => {
    try {
      const { data, error } = await supabase
        .from('teams')
        .select('id, team_name')
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (data) {
        const fetchedTeams: Team[] = data.map((team: any) => ({
          id: team.id,
          name: team.team_name,
        }));
        setTeams(fetchedTeams);
        setNumTeams(fetchedTeams.length > 0 ? Math.pow(2, Math.ceil(Math.log2(fetchedTeams.length))) : 8);
      }
    } catch (err) {
      setError("Failed to load teams");
      console.error(err);
    }
  };

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
          setBracketGenerated(true);
        }
      }
    } catch (err) {
      console.error("Failed to load bracket:", err);
    }
  };

  const saveBracket = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('bracket')
        .upsert({
          revealed,
          matches,
        });

      if (error) throw error;
    } catch (err) {
      setError("Failed to save bracket");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const toggleReveal = async () => {
    const newRevealed = !revealed;
    setRevealed(newRevealed);
    setSaving(true);
    try {
      const { error } = await supabase
        .from('bracket')
        .upsert({
          revealed: newRevealed,
          matches,
        });

      if (error) throw error;
    } catch (err) {
      setError("Failed to update reveal status");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleNumTeamsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const powerOfTwo = Math.pow(2, Math.ceil(Math.log2(value)));
    setNumTeams(powerOfTwo);
  };

  const generateTeams = () => {
    const newTeams: Team[] = [];
    for (let i = 0; i < numTeams; i++) {
      newTeams.push({
        id: i,
        name: `Team ${i + 1}`,
      });
    }
    setTeams(newTeams);
  };

  const generateBracket = () => {
    const shuffled = [...teams].sort(() => Math.random() - 0.5);
    const newMatches: Match[] = [];
    
    for (let i = 0; i < shuffled.length; i += 2) {
      newMatches.push({
        id: i / 2,
        team1: shuffled[i],
        team2: shuffled[i + 1],
        winner: null,
      });
    }
    
    setMatches(newMatches);
    setBracketGenerated(true);
    saveBracket();
  };

  const updateTeamName = (id: number, name: string) => {
    setTeams(teams.map(team => 
      team.id === id ? { ...team, name } : team
    ));
  };

  const setMatchWinner = (matchId: number, team: Team) => {
    setMatches(matches.map(match =>
      match.id === matchId ? { ...match, winner: team } : match
    ));
    saveBracket();
  };

  const resetBracket = () => {
    setBracketGenerated(false);
    setMatches([]);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(password)) {
      setLoginError("Invalid password");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 glow-box">
            <h1 className="text-3xl font-bold mb-6 text-center glow-text">Admin Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                  placeholder="Enter admin password"
                />
              </div>
              {loginError && (
                <div className="text-red-400 text-sm">{loginError}</div>
              )}
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-black font-bold rounded-lg hover:scale-105 transition-transform duration-300"
              >
                Login
              </button>
            </form>
          </div>
        </motion.div>
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
            Admin: Tournament Bracket
          </h1>
          <p className="text-xl text-gray-300">
            Set up and manage your tournament bracket
          </p>
        </motion.div>

        {!bracketGenerated ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 glow-box mb-6">
              <h2 className="text-2xl font-bold mb-6 text-primary">Setup Tournament</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-bold mb-2 text-primary">
                  Number of Teams (must be power of 2: 4, 8, 16, 32)
                </label>
                <input
                  type="number"
                  min="4"
                  max="32"
                  step="2"
                  value={numTeams}
                  onChange={handleNumTeamsChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                />
                <p className="text-sm text-gray-400 mt-2">
                  Will be adjusted to nearest power of 2: {numTeams}
                </p>
              </div>

              <motion.button
                onClick={generateTeams}
                className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-black font-bold rounded-full glow-box hover:scale-105 transition-transform duration-300 mb-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Generate Team Slots
              </motion.button>

              {teams.length > 0 && (
                <div className="space-y-3 mb-6">
                  <h3 className="text-lg font-bold text-primary">Team Names</h3>
                  {teams.map((team) => (
                    <input
                      key={team.id}
                      type="text"
                      value={team.name}
                      onChange={(e) => updateTeamName(team.id, e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                      placeholder={`Team ${team.id + 1} name`}
                    />
                  ))}
                </div>
              )}

              {teams.length > 0 && (
                <motion.button
                  onClick={generateBracket}
                  className="w-full px-6 py-3 bg-gradient-to-r from-accent to-secondary text-white font-bold rounded-full glow-box hover:scale-105 transition-transform duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Generate Bracket
                </motion.button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-primary">
                {numTeams} Team Bracket
              </h2>
              <div className="space-x-4">
                <motion.button
                  onClick={toggleReveal}
                  disabled={saving}
                  className={`px-6 py-2 rounded-full font-bold transition-colors ${
                    revealed
                      ? 'bg-primary text-black'
                      : 'bg-white/10 border border-white/20 text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {revealed ? 'Visible to Public ✓' : 'Hidden from Public'}
                </motion.button>
                <motion.button
                  onClick={resetBracket}
                  className="px-6 py-2 bg-white/10 border border-white/20 text-white rounded-full hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Reset Bracket
                </motion.button>
                <motion.button
                  onClick={generateBracket}
                  className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-black font-bold rounded-full glow-box hover:scale-105 transition-transform duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Reshuffle
                </motion.button>
              </div>
            </div>

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
                        <motion.div
                          className={`p-3 rounded-lg cursor-pointer transition-all ${
                            match.winner?.id === match.team1?.id
                              ? 'bg-primary/30 border-2 border-primary'
                              : 'bg-white/10 border-2 border-transparent hover:border-primary/50'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => match.team1 && setMatchWinner(match.id, match.team1)}
                        >
                          <div className="font-bold">{match.team1?.name || "TBD"}</div>
                        </motion.div>
                        
                        <motion.div
                          className={`p-3 rounded-lg cursor-pointer transition-all ${
                            match.winner?.id === match.team2?.id
                              ? 'bg-primary/30 border-2 border-primary'
                              : 'bg-white/10 border-2 border-transparent hover:border-primary/50'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => match.team2 && setMatchWinner(match.id, match.team2)}
                        >
                          <div className="font-bold">{match.team2?.name || "TBD"}</div>
                        </motion.div>
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
                {numTeams >= 8 && (
                  <div className="flex flex-col gap-4 mt-16">
                    {[...Array(numTeams / 4)].map((_, i) => (
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

        <div className="text-center mt-6 space-x-4">
          <Link href="/admin" className="text-gray-400 hover:text-primary transition-colors">
            ← Back to Admin
          </Link>
          <button
            onClick={logout}
            className="text-gray-400 hover:text-red-400 transition-colors"
          >
            Logout
          </button>
          <Link href="/" className="text-gray-400 hover:text-primary transition-colors">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
