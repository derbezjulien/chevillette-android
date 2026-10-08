import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, Home as HomeIcon } from "lucide-react";

const ROUTES = [
  "/",
  "/estimation",
  "/settings",
  "/mentions-legales",
  "/confidentialite",
  "/conditions-utilisation",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];
const TITLES = {
  "/": "L'Indice Immo",
  "/estimation": "Estimation",
  "/settings": "Paramètres",
  "/mentions-legales": "Mentions Légales",
  "/confidentialite": "Confidentialité",
  "/conditions-utilisation": "Conditions d'utilisation",
  "/login": "Connexion",
  "/register": "Inscription",
  "/forgot-password": "Mot de passe oublié",
  "/reset-password": "Réinitialisation",
};

export default function MobileHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  if (!ROUTES.includes(location.pathname)) return null;
  const TAB_ROOTS = ["/", "/estimation", "/settings"];
  const canBack = !TAB_ROOTS.includes(location.pathname);
  const isHome = location.pathname === "/";

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
              L'Indice Immo
            </span>
          ) : (
            <span className="font-heading font-semibold text-primary">{TITLES[location.pathname]}</span>
          )}
        </div>
        <div className="w-10" />
      </div>
    </header>
  );
}