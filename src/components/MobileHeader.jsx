import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, Home as HomeIcon } from "lucide-react";

const ROUTES = [
  "/", "/estimation", "/comment-ca-marche", "/a-propos",
  "/mentions-legales", "/confidentialite", "/conditions-utilisation",
  "/en", "/en/estimate", "/en/how-it-works", "/en/about", "/en/privacy-policy",
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
      className="md:hidden sticky top-0 z-30 bg-card/90 backdrop-blur-sm border-b border-border/60"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="flex items-center justify-between py-4" style={{ paddingLeft: "calc(env(safe-area-inset-left) + 0.5rem)", paddingRight: "calc(env(safe-area-inset-right) + 0.5rem)" }}>
        <button
          type="button"
          onClick={() => canBack && navigate(-1)}
          className={`w-10 h-10 flex items-center justify-center rounded-xl text-primary ${canBack ? "" : "opacity-0 pointer-events-none"}`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center justify-center gap-3">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary dark:bg-card text-accent ring-1 ring-accent/30">
            <HomeIcon className="w-8 h-8" />
          </span>
          {isHome ? (
            <span className="font-serif text-2xl font-semibold tracking-tight text-accent">
              Chevillette.fr
            </span>
          ) : (
            <span className="font-heading font-semibold text-primary">{TITLES[location.pathname]}</span>
          )}
        </div>
        <div className="flex items-center rounded-full border border-border/60 bg-card/60 overflow-hidden text-xs font-bold">
          <button
            type="button"
            onClick={() => isEn && navigate(equivalent, { replace: true })}
            className={`h-10 px-3 flex items-center transition-colors ${!isEn ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
          >
            FR
          </button>
          <button
            type="button"
            onClick={() => !isEn && navigate(equivalent, { replace: true })}
            className={`h-10 px-3 flex items-center transition-colors ${isEn ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}