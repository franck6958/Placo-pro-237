"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.76, 0, 0.24, 1] as const;

/** Transition à chaque changement de page : rideau or puis bleu nuit qui se lève, puis le contenu apparaît. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[70] grid origin-top place-items-center bg-ink"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.75, ease, delay: 0.1 }}
      >
        <motion.span
          className="font-display text-3xl font-bold text-plaster"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          PLACO PRO <span className="text-plaster">237</span>
        </motion.span>
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[69] origin-top bg-ink"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.75, ease, delay: 0.22 }}
      />
      <motion.div
        initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
      >
        {children}
      </motion.div>
    </>
  );
}
