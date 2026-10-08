import React from "react";
import { Link } from "react-router-dom";

export default function LegalLinks({ className = "" }) {
  return (
    <div className={className}>
      <Link to="/mentions-legales" className="hover:text-accent hover:underline">Mentions légales</Link>
      <span className="mx-2">·</span>
      <Link to="/confidentialite" className="hover:text-accent hover:underline">Confidentialité</Link>
      <span className="mx-2">·</span>
      <Link to="/conditions-utilisation" className="hover:text-accent hover:underline">Conditions d'utilisation</Link>
    </div>
  );
}