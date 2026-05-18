"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/register", label: "Register" },
    { href: "/rules", label: "Rules" },
    { href: "/bracket", label: "Bracket" },
    { href: "/history", label: "History" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <motion.div
              className="text-2xl font-bold glow-text cursor-pointer script-text"
              whileHover={{ scale: 1.05 }}
            >
              Greendale Park League
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.button
                  className="text-white hover:text-primary transition-colors font-medium script-text"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.button>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.div
              animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? "✕" : "☰"}
            </motion.div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 space-y-2"
            >
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <motion.button
                    className="w-full text-left px-4 py-3 text-white hover:text-primary transition-colors font-medium script-text"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </motion.button>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
