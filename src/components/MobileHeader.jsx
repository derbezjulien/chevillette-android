import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { LOGO_MARK_URL } from "@/lib/branding";

const ROUTES = [
  "/", "/estimation", "/historique", "/comment-ca-marche", "/a-propos",
  "/mentions-legales", "/confidentialite", "/conditions-utilisation",
  "/en", "/en/estimate", "/en/history", "/en/how-it-works", "/en/about", "/en/privacy-policy",
];
const TITLES = {
  "/": "Chevillette.fr",
  "/estimation": "Estimation",
  "/comment-ca-marche": "Comment ça marche",
  "/a-propos": "À propos",
  "/mentions-legales": "Mentions légales",
  "/confidentialite": "Confidentialité",
  "/conditions-utilisation": "Conditions d'utilisation",
  "/en": "Chevillette.fr",
  "/en/estimate": "Estimate",
  "/en/how-it-works": "How it works",
  "/en/about": "About",
  "/en/privacy-policy": "Privacy policy",
  "/historique": "Historique",
  "/en/history": "History",
};
const EQUIVALENT = {
  "/": "/en",
  "/estimation": "/en/estimate",
  "/comment-ca-marche": "/en/how-it-works",
  "/a-propos": "/en/about",
  "/confidentialite": "/en/privacy-policy",
  "/en": "/",
  "/en/estimate": "/estimation",
  "/en/how-it-works": "/comment-ca-marche",
  "/en/about": "/a-propos",
  "/en/privacy-policy": "/confidentialite",
  "/historique": "/en/history",
  "/en/history": "/historique",
};

export default function MobileHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  if (!ROUTES.includes(location.pathname)) return null;
  const isEn = location.pathname.startsWith("/en");
  const isHome = location.pathname === "/" || location.pathname === "/en";
  const canBack = !isHome;
  const equivalent = EQUIVALENT[location.pathname] || (isEn ? "/" : "/en");

  return (
    <header
      className="md:hidden sticky top-0 z-30 bg-[#0F1B2A] border-b border-[#CBA328]/20"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="flex items-center justify-between py-3" style={{ paddingLeft: "calc(env(safe-area-inset-left) + 0.5rem)", paddingRight: "calc(env(safe-area-inset-right) + 0.5rem)" }}>
        <button
          type="button"
          onClick={() => canBack && navigate(-1)}
          className={`w-10 h-10 flex items-center justify-center rounded-xl text-white ${canBack ? "" : "opacity-0 pointer-events-none"}`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2 min-w-0">
          <img
            src={LOGO_MARK_URL}
            alt="Chevillette"
            className="h-9 w-auto object-contain shrink-0"
            style={{ height: "36px" }}
          />
          {isHome ? (
            <span className="font-heading font-bold text-xl whitespace-nowrap">
              <span className="text-white">chevillette</span>
              <span className="text-[#CBA328]">.fr</span>
            </span>
          ) : (
            <span className="font-heading font-semibold text-white whitespace-nowrap">{TITLES[location.pathname]}</span>
          )}
        </div>
        <div className="flex items-center rounded-full border border-[#CBA328]/30 bg-white/5 overflow-hidden text-xs font-bold shrink-0">
          <button
            type="button"
            onClick={() => isEn && navigate(equivalent, { replace: true })}
            className={`h-10 px-3 flex items-center transition-colors ${!isEn ? "bg-[#CBA328] text-[#0F1B2A]" : "text-white/70"}`}
          >
            FR
          </button>
          <button
            type="button"
            onClick={() => !isEn && navigate(equivalent, { replace: true })}
            className={`h-10 px-3 flex items-center transition-colors ${isEn ? "bg-[#CBA328] text-[#0F1B2A]" : "text-white/70"}`}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}