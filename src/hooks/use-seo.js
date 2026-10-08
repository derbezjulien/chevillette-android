import { useEffect } from "react";

const SITE_NAME = "L'Indice Immo";

function setMeta(doc, attr, key, content) {
  let el = doc.head.querySelector("meta[" + attr + '="' + key + '"]');
  if (!content) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = doc.createElement("meta");
    el.setAttribute(attr, key);
    doc.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

// Copie non indexable : noindex forcé sur toutes les pages, aucun canonical ni og:url.
export function applySeo(doc, { title, description = "" } = {}) {
  doc.title = title || "";
  setMeta(doc, "name", "description", description);
  setMeta(doc, "name", "robots", "noindex, nofollow");
  setMeta(doc, "property", "og:title", title);
  setMeta(doc, "property", "og:description", description);
  setMeta(doc, "property", "og:type", "website");
  setMeta(doc, "property", "og:locale", "fr_FR");
  setMeta(doc, "property", "og:site_name", SITE_NAME);
  setMeta(doc, "name", "twitter:card", "summary");
  // Retire tout canonical ou og:url résiduel d'un rendu précédent.
  const canonical = doc.head.querySelector('link[rel="canonical"]');
  if (canonical) canonical.remove();
  setMeta(doc, "property", "og:url", "");
}

export default function useSeo({ title, description } = {}) {
  useEffect(() => {
    applySeo(document, { title, description });
  }, [title, description]);
}