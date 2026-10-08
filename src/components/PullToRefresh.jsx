import React, { useRef, useState, useEffect } from "react";
import { Loader2, ChevronDown } from "lucide-react";

const THRESHOLD = 70;
const MAX_PULL = 110;

/**
 * Tirer vers le bas pour actualiser.
 * - Ne se déclenche qu'en haut de page (scrollTop === 0).
 * - Désactivé pendant la saisie (input/textarea/select/contenteditable),
 *   dans une boîte de dialogue ou une zone défilante marquée [data-scrollable].
 * - Le rafraîchissement natif du navigateur est neutralisé via
 *   `overscroll-behavior-y: none` (body) + preventDefault sur le tirage.
 */
export default function PullToRefresh({ onRefresh, children }) {
  const containerRef = useRef(null);
  const refreshRef = useRef(onRefresh);
  const [pull, setPull] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const stateRef = useRef({ startY: 0, pulling: false, refreshing: false, pull: 0 });

  useEffect(() => { refreshRef.current = onRefresh; }, [onRefresh]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const isInteractive = (target) =>
      !!target.closest("input, textarea, select, [contenteditable], [role='dialog'], [data-scrollable]");

    const atTop = () => {
      const scroller = document.scrollingElement || document.documentElement;
      return scroller.scrollTop <= 0;
    };

    const onStart = (e) => {
      if (stateRef.current.refreshing) return;
      if (!atTop()) { stateRef.current.pulling = false; return; }
      if (isInteractive(e.target)) { stateRef.current.pulling = false; return; }
      stateRef.current.pulling = true;
      stateRef.current.startY = e.touches[0].clientY;
    };

    const onMove = (e) => {
      if (!stateRef.current.pulling || stateRef.current.refreshing) return;
      const dy = e.touches[0].clientY - stateRef.current.startY;
      if (dy <= 0) {
        if (stateRef.current.pull !== 0) { stateRef.current.pull = 0; setPull(0); }
        return;
      }
      const resisted = Math.min(MAX_PULL, dy * 0.5);
      stateRef.current.pull = resisted;
      setPull(resisted);
      if (resisted > 0 && e.cancelable) e.preventDefault();
    };

    const onEnd = () => {
      if (!stateRef.current.pulling) return;
      stateRef.current.pulling = false;
      const reached = stateRef.current.pull >= THRESHOLD;
      if (reached) {
        stateRef.current.refreshing = true;
        stateRef.current.pull = THRESHOLD;
        setRefreshing(true);
        setPull(THRESHOLD);
        Promise.resolve(refreshRef.current ? refreshRef.current() : null)
          .finally(() => {
            stateRef.current.refreshing = false;
            stateRef.current.pull = 0;
            setRefreshing(false);
            setPull(0);
          });
      } else {
        stateRef.current.pull = 0;
        setPull(0);
      }
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd, { passive: true });
    el.addEventListener("touchcancel", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("touchcancel", onEnd);
    };
  }, []);

  const showIndicator = pull > 0 || refreshing;

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <div
        aria-hidden="true"
        style={{
          height: pull,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: showIndicator ? "flex" : "none",
          alignItems: "flex-end",
          justifyContent: "center",
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {refreshing ? (
          <Loader2 className="w-6 h-6 text-accent animate-spin mb-2" />
        ) : (
          <ChevronDown
            className="w-6 h-6 text-accent mb-2"
            style={{
              transform: pull >= THRESHOLD ? "rotate(180deg)" : "none",
              transition: "transform 0.15s ease",
            }}
          />
        )}
      </div>
      <div
        style={{
          transform: pull > 0 ? `translateY(${pull}px)` : "none",
          transition: stateRef.current.pulling ? "none" : "transform 0.2s ease",
        }}
      >
        {children}
      </div>
    </div>
  );
}