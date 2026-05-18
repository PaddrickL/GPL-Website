"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/useAuth";

interface Team {
  id: string;
  team_name: string;
  captain_name: string;
  captain_email: string;
  captain_phone: string;
  player2_name: string;
  player3_name: string;
  player4_name: string | null;
  created_at: string;
}

export default function Admin() {
  const { isAuthenticated, isLoading, login, logout } = useAuth();
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      fetchTeams();
    }
  }, [isAuthenticated]);

  const fetchTeams = async () => {
    try {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setTeams(data || []);
    } catch (err) {
      setError("Failed to load teams");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTeam = async (teamId: string) => {
    if (!confirm("Are you sure you want to delete this team?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from('teams')
        .delete()
        .eq('id', teamId);

      if (error) throw error;

      // Refresh the teams list
      await fetchTeams();
    } catch (err) {
      setError("Failed to delete team");
      console.error(err);
    }
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

  if (loading) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <div className="text-white text-xl">Loading teams...</div>
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
    <div className="min-h-screen pt-20 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold mb-4 glow-text">
            Registered Teams
          </h1>
          <p className="text-xl text-gray-300">
            {teams.length} team{teams.length !== 1 ? 's' : ''} registered
          </p>
        </motion.div>

        {teams.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-xl">No teams registered yet</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-x-auto"
          >
            <table className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-primary">Team Name</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-primary">Captain</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-primary">Phone</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-primary">Player 2</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-primary">Player 3</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-primary">Player 4</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-primary">Registered</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-primary">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {teams.map((team, index) => (
                  <motion.tr
                    key={team.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-white font-semibold">{team.team_name}</td>
                    <td className="px-6 py-4 text-gray-300">{team.captain_name}</td>
                    <td className="px-6 py-4 text-gray-400">{team.captain_phone}</td>
                    <td className="px-6 py-4 text-gray-300">{team.player2_name}</td>
                    <td className="px-6 py-4 text-gray-300">{team.player3_name}</td>
                    <td className="px-6 py-4 text-gray-400">{team.player4_name || '-'}</td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {new Date(team.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteTeam(team.id)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-center space-x-4"
        >
          <button
            onClick={fetchTeams}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-colors"
          >
            Refresh
          </button>
          <button
            onClick={logout}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 border border-red-700 rounded-lg text-white transition-colors"
          >
            Logout
          </button>
          <a
            href="/admin/bracket"
            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-black font-bold rounded-lg hover:scale-105 transition-transform duration-300 inline-block"
          >
            Edit Bracket
          </a>
        </motion.div>
      </div>
    </div>
  );
}
