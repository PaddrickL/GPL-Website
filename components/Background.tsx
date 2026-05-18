"use client";

import { motion } from "framer-motion";

export default function Background() {
  const basketballs = [
    { top: "10%", left: "5%", size: 60, delay: 0 },
    { top: "20%", left: "85%", size: 80, delay: 1 },
    { top: "60%", left: "10%", size: 70, delay: 2 },
    { top: "70%", left: "80%", size: 50, delay: 3 },
    { top: "40%", left: "90%", size: 65, delay: 4 },
    { top: "80%", left: "30%", size: 75, delay: 5 },
    { top: "15%", left: "50%", size: 55, delay: 6 },
    { top: "85%", left: "60%", size: 45, delay: 7 },
    { top: "30%", left: "20%", size: 70, delay: 8 },
    { top: "50%", left: "75%", size: 60, delay: 9 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {basketballs.map((ball, index) => (
        <motion.div
          key={index}
          className="absolute opacity-10 text-primary"
          style={{
            top: ball.top,
            left: ball.left,
            fontSize: ball.size,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 6 + index * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: ball.delay,
          }}
        >
          🏀
        </motion.div>
      ))}
    </div>
  );
}
