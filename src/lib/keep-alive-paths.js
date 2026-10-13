// Onglets principaux (FR + EN) conservés montés lors des changements d'onglet
// afin de préserver l'état interne et la position de défilement.
export const KEEP_ALIVE_PATHS = new Set([
  "/",
  "/estimation",
  "/historique",
  "/en",
  "/en/estimate",
  "/en/history",
]);