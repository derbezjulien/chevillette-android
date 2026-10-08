import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Transition courte (fondu + léger glissement) entre les pages.
 * Respecte prefers-reduced-motion : seul le fondu reste, le glissement est annulé.
 */
export default function AnimatedLayout() {
  const location = useLocation();
  const reduce = useReducedMotion();
  const variants = {
    initial: { opacity: 0, y: reduce ? 0 : 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: reduce ? 0 : 10 },
  };
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}