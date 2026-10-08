import React, { createContext, useContext, useState, useCallback } from "react";

const EstimationFormContext = createContext(null);

/**
 * Conserve l'état du formulaire d'estimation (adresse, surface, type, terrain,
 * vétusté, résultat, ventes récentes) lors des changements d'onglet.
 * Le calcul d'estimation reste intégralement dans la page Estimation.
 */
export function EstimationFormProvider({ children }) {
  const [form, setForm] = useState({});
  const update = useCallback((patch) => setForm((prev) => ({ ...prev, ...patch })), []);
  return (
    <EstimationFormContext.Provider value={{ form, update }}>
      {children}
    </EstimationFormContext.Provider>
  );
}

export function useEstimationForm() {
  return useContext(EstimationFormContext);
}