import React, { useEffect, useRef } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { KEEP_ALIVE_PATHS } from "@/lib/keep-alive-paths";

/**
 * Layout de route avec keep-alive pour les onglets principaux.
 *
 * Les pages d'onglet (KEEP_ALIVE_PATHS) restent montées et sont simplement
 * masquées (display: none) lors d'un changement d'onglet, ce qui préserve leur
 * état interne (saisie en cours, résultats, suggestions) et le défilement des
 * conteneurs internes. La position de défilement fenêtre est sauvegardée puis
 * restaurée explicitement, car `display: none` ne la conserve pas.
 *
 * Les autres pages (légales, à propos, etc.) conservent la transition animée
 * fondu + léger glissement, avec respect de prefers-reduced-motion.
 */
export default function AnimatedLayout() {
  const location = useLocation();
  const outlet = useOutlet();
  const reduce = useReducedMotion();
  const cache = useRef(new Map());
  const scrollCache = useRef(new Map());
  const prevPath = useRef(location.pathname);
  const isKeep = KEEP_ALIVE_PATHS.has(location.pathname);

  // Mémorise l'élément de l'onglet actif pour le garder monté.
  if (isKeep) {
    cache.current.set(location.pathname, outlet);
  }

  // Sauvegarde puis restaure la position de défilement fenêtre pour les onglets.
  useEffect(() => {
    const from = prevPath.current;
    const to = location.pathname;
    if (from === to) return;
    if (KEEP_ALIVE_PATHS.has(from)) {
      scrollCache.current.set(from, window.scrollY);
    }
    prevPath.current = to;
    if (KEEP_ALIVE_PATHS.has(to)) {
      const y = scrollCache.current.has(to) ? scrollCache.current.get(to) : 0;
      requestAnimationFrame(() =>
        window.scrollTo({ top: y, left: 0, behavior: "instant" })
      );
    }
  }, [location.pathname]);

  const variants = {
    initial: { opacity: 0, y: reduce ? 0 : 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: reduce ? 0 : 10 },
  };

  return (
    <>
      {/* Couche keep-alive : onglets mis en cache, seul l'actif est visible */}
      {Array.from(cache.current.entries()).map(([p, el]) => (
        <div
          key={p}
          style={{ display: p === location.pathname ? "block" : "none" }}
        >
          {el}
        </div>
      ))}

      {/* Couche animée pour les pages non mises en cache */}
      <AnimatePresence mode="wait">
        {!isKeep && (
          <motion.div
            key={location.pathname}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {outlet}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}