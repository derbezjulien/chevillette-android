import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LOGO_MARK_URL } from "@/lib/branding";

export default function SiteFooter() {
  const location = useLocation();
  const isEn = location.pathname.startsWith("/en");
  const homePath = isEn ? "/en" : "/";

  if (isEn) {
    return (
      <footer className="bg-[#0F1B2A] text-white/70">
        <div className="max-w-5xl mx-auto px-6 py-10 text-center space-y-3">
          <Link to={homePath} className="inline-flex items-center gap-2.5">
            <img
              src={LOGO_MARK_URL}
              alt=""
              className="h-8 w-auto object-contain"
            />
            <span className="font-heading font-bold text-xl leading-none">
              <span className="text-white">Chevillette</span>
              <span className="text-[#CBA328]">.fr</span>
            </span>
          </Link>
          <p className="text-xs text-white/60">
            Indicative property estimate based on real sales (French open data, DVF)
          </p>
          <div className="text-xs flex flex-wrap items-center justify-center gap-2">
            <Link to="/en/about" className="hover:text-[#CBA328] hover:underline transition-colors">
              About
            </Link>
            <span>·</span>
            <Link to="/en/how-it-works" className="hover:text-[#CBA328] hover:underline transition-colors">
              How it works
            </Link>
            <span>·</span>
            <Link to="/mentions-legales" className="hover:text-[#CBA328] hover:underline transition-colors">
              Legal notice (in French)
            </Link>
            <span>·</span>
            <Link to="/en/privacy-policy" className="hover:text-[#CBA328] hover:underline transition-colors">
              Privacy policy
            </Link>
          </div>
          <div className="text-xs text-white/50">
            Data: Base Adresse Nationale &amp; DVF (data.gouv.fr)
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-[#0F1B2A] text-white/70">
      <div className="max-w-5xl mx-auto px-6 py-10 text-center space-y-3">
        <div className="flex items-center justify-center gap-2.5">
          <img
            src={LOGO_MARK_URL}
            alt=""
            className="h-8 w-auto object-contain"
          />
          <span className="font-heading font-bold text-xl leading-none">
            <span className="text-white">Chevillette</span>
            <span className="text-[#CBA328]">.fr</span>
          </span>
        </div>
        <p className="text-xs text-white/60">
          Estimation immobilière indicative à partir des ventes réelles (DVF)
        </p>
        <div className="text-xs flex flex-wrap items-center justify-center gap-2">
          <Link
            to="/a-propos"
            className="hover:text-[#CBA328] hover:underline transition-colors"
          >
            À propos
          </Link>
          <span>·</span>
          <Link
            to="/comment-ca-marche"
            className="hover:text-[#CBA328] hover:underline transition-colors"
          >
            Comment ça marche
          </Link>
          <span>·</span>
          <Link
            to="/mentions-legales"
            className="hover:text-[#CBA328] hover:underline transition-colors"
          >
            Mentions légales
          </Link>
          <span>·</span>
          <Link
            to="/confidentialite"
            className="hover:text-[#CBA328] hover:underline transition-colors"
          >
            Confidentialité
          </Link>
        </div>
        <div className="text-xs text-white/50">
          Données : Base Adresse Nationale &amp; DVF (data.gouv.fr)
        </div>
      </div>
    </footer>
  );
}