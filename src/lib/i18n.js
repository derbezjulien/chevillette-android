// Couche de traduction FR/EN et formateurs localisés.
// Les pages françaises utilisent `locale = "fr"` (défaut) ; les pages anglaises `locale = "en"`.

export const euro = (locale) =>
  new Intl.NumberFormat(locale === "en" ? "en-GB" : "fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

export const propertyTypeLabels = {
  fr: { Maison: "Maison", Appartement: "Appartement" },
  en: { Maison: "House", Appartement: "Apartment" },
};

export function getPropertyTypeLabel(locale, type) {
  return (propertyTypeLabels[locale] || propertyTypeLabels.fr)[type] || type;
}

export function formatDate(locale, iso) {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(locale === "en" ? "en-GB" : "fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const translations = {
  fr: {
    estimation: {
      seo: {
        title: "Estimer mon bien gratuitement : prix au m² | Chevillette.fr",
        description:
          "Indiquez adresse, surface et état de votre bien : obtenez gratuitement une valeur indicative d'après les ventes récentes de votre commune (DVF).",
        path: "/estimation",
      },
      h1: "Estimation immobilière",
      subtitle:
        "Saisissez votre adresse et la surface pour obtenir une estimation basée sur les ventes réelles de la commune.",
      addressLabel: "Adresse du bien",
      addressPlaceholder: "Ex : 10 cours Foch, Podensac",
      surfaceLabel: "Surface habitable (m²)",
      surfacePlaceholder: "Ex : 90",
      propertyTypeLabel: "Type de bien",
      propertyTypes: [
        { value: "Appartement", label: "Appartement" },
        { value: "Maison", label: "Maison" },
      ],
      landLabel: "Surface du terrain (m²)",
      landOptional: "(optionnel)",
      landPlaceholder: "Ex : 200",
      vetusteLabel: "Indice de vétusté",
      estimateBtn: "Estimer",
      estimating: "Estimation en cours…",
      indicativeNote: "Estimation indicative, ne remplace pas l'avis d'un professionnel.",
      howCalculated: "Comment est calculée cette estimation ?",
      howCalculatedPath: "/comment-ca-marche",
      resultBadge: "Estimation",
      avgPricePrefix: "Prix moyen : ",
      basedOnSales: (n) => `sur ${n} vente${n > 1 ? "s" : ""} récente${n > 1 ? "s" : ""}`,
      fallbackRefPrefix: "Prix moyen de référence : ",
      fallbackNote: (commune) =>
        `Le serveur des données foncières est momentanément indisponible. Estimation indicative basée sur le prix moyen au m² de la commune de ${commune}, issu des Demandes de Valeurs Foncières (DVF, data.gouv.fr). Moins précise qu'une estimation fondée sur les ventes récentes.`,
      errorNoSales: (typeLabel) =>
        `Aucune vente récente de type ${typeLabel.toLowerCase()} trouvée dans cette commune.`,
      errorAddressApi: "Impossible de contacter l'API d'adresse.",
      errorServerNoRef:
        "Le serveur officiel des données foncières est indisponible et aucune moyenne de référence n'existe pour cette commune. Réessayez plus tard.",
      errorServerDown: "Le serveur des données foncières est indisponible. Réessayez dans quelques minutes.",
      errorGeneric: "Erreur lors de l'estimation.",
      recentSalesTitle: "Ventes récentes dans la commune",
      soldFor: "vendue",
      inYear: "en",
    },
    vetuste: {
      milestones: [
        { title: "0 | À rénover", subtitle: "Gros œuvre (Toiture, Élec)" },
        { title: "5 | Rafraîchissements", subtitle: "Peinture, Sols, Cuisine" },
        { title: "10 | État neuf", subtitle: "Récent, Garantie décennale" },
      ],
      score: (v) => `Note : ${v} / 10`,
    },
    trend: {
      title: "Tendance du prix au m²",
      subtitle: (n) => `Évolution sur ${n} an${n > 1 ? "s" : ""}`,
      up: "Hausse",
      down: "Baisse",
      stable: "Stable",
      tooltipPrice: "Prix moyen",
      tooltipYear: (y) => `Année ${y}`,
      salesCount: (n) => `${n} vente${n > 1 ? "s" : ""}`,
      note: "Tendance calculée à partir des ventes réelles enregistrées dans la commune (DVF). Valeur indicative, ne constitue pas une prévision.",
    },
    saleDialog: {
      propertyFallback: "Bien immobilier",
      notProvided: "Non renseigné",
      labels: {
        address: "Adresse complète",
        date: "Date de la vente",
        rooms: "Nombre de pièces",
        land: "Surface du terrain",
      },
      roomsUnit: (n) => `${n} pièce${n > 1 ? "s" : ""}`,
    },
    pdf: {
      indicativeLabel: "Estimation indicative",
      referenceLabel: "Réf.",
      editedOn: "Éditée le",
      propertySummaryTitle: "Récapitulatif du bien",
      propertyTypeLabel: "Type de bien",
      cardLabels: {
        address: "Adresse",
        surface: "Surface habitable",
        land: "Surface du terrain",
      },
      landNotProvided: "Non renseignée",
      vetusteTitle: "Indice de vétusté",
      vetusteLegend: "0 = neuf, 10 = très dégradé, évalué par vos soins",
      estimateRetained: "Estimation retenue",
      fallbackNote: (commune) =>
        `Estimation indicative basée sur le prix moyen communal (DVF, data.gouv.fr) — commune de ${commune || ""}`,
      normalNote: "Basée sur les ventes réelles enregistrées dans la commune (DVF)",
      marketTitle: "Marché de la commune",
      medianPriceLabel: "Prix moyen au m²",
      evolutionLabel: "Évolution sur 3 ans",
      salesAnalyzedLabel: "Ventes analysées",
      noTrendData: "—",
      methodTitle: "Comment cette estimation est calculée",
      methodText:
        "Source : Demandes de Valeurs Foncières (DVF, data.gouv.fr). Période analysée : 3 dernières années de ventes. Méthode : moyenne du prix au m² des ventes de même type dans la commune, multipliée par la surface et ajustée par l'indice de vétusté.",
      nextStepsTitle: "La suite de votre projet",
      nextSteps: [
        "Comparez cette estimation avec les annonces de biens similaires dans votre commune pour vous situer sur le marché actuel.",
        "Sollicitez un agent immobilier local pour un avis affiné tenant compte des prestations spécifiques de votre bien.",
        "Conservez ce document comme base de discussion pour une estimation notariale ou une mise en vente.",
      ],
      footerBrand: "chevillette.fr",
      footerLegal: "Estimation indicative, ne constitue pas une expertise immobilière.",
      legalNote:
        "Sources des données : Demandes de Valeurs Foncières (DVF) — data.gouv.fr / Cerema.",
    },
    attestation: {
      generating: "Génération…",
      download: "Télécharger mon estimation (PDF)",
      filename: "estimation-immo.pdf",
    },
  },
  en: {
    estimation: {
      seo: {
        title: "Estimate your property's value in France for free | Chevillette.fr",
        description:
          "Enter an address, surface area and condition: get a free indicative value for your house or apartment in France, based on real local sales.",
        path: "/en/estimate",
      },
      h1: "Estimate your property",
      subtitle:
        "Enter your address, living area and the condition of the property to get an estimate based on real sales in the town.",
      addressLabel: "Property address",
      addressPlaceholder: "e.g. 10 cours Foch, Podensac",
      surfaceLabel: "Living area (m²)",
      surfacePlaceholder: "e.g. 90",
      propertyTypeLabel: "Property type",
      propertyTypes: [
        { value: "Appartement", label: "Apartment" },
        { value: "Maison", label: "House" },
      ],
      landLabel: "Land area (m²)",
      landOptional: "(optional)",
      landPlaceholder: "e.g. 200",
      vetusteLabel: "Condition score",
      estimateBtn: "Estimate",
      estimating: "Estimating…",
      indicativeNote: "Indicative estimate. It does not replace a professional's opinion.",
      howCalculated: "How is this estimate calculated?",
      howCalculatedPath: "/en/how-it-works",
      resultBadge: "Estimate",
      avgPricePrefix: "Average price: ",
      basedOnSales: (n) => `based on ${n} recent sale${n > 1 ? "s" : ""}`,
      fallbackRefPrefix: "Reference average price: ",
      fallbackNote: (commune) =>
        `The land data server is temporarily unavailable. Indicative estimate based on the average price per m² for the town of ${commune}, from the Demandes de Valeurs Foncières (DVF, data.gouv.fr). Less accurate than an estimate based on recent sales.`,
      errorNoSales: (typeLabel) => `No recent ${typeLabel.toLowerCase()} sales found in this town.`,
      errorAddressApi: "Unable to reach the address lookup service.",
      errorServerNoRef:
        "The official land data server is unavailable and no reference average exists for this town. Please try again later.",
      errorServerDown: "The land data server is unavailable. Please try again in a few minutes.",
      errorGeneric: "An error occurred during the estimate.",
      recentSalesTitle: "Recent sales in the town",
      soldFor: "sold for",
      inYear: "in",
    },
    vetuste: {
      milestones: [
        { title: "0 | Needs renovation", subtitle: "Major works (roof, electrics)" },
        { title: "5 | Refreshed", subtitle: "Paint, floors, kitchen" },
        { title: "10 | Like new", subtitle: "Recent build, 10-year warranty" },
      ],
      score: (v) => `Score: ${v} / 10`,
    },
    trend: {
      title: "Price per m² trend",
      subtitle: (n) => `Change over ${n} year${n > 1 ? "s" : ""}`,
      up: "Rising",
      down: "Falling",
      stable: "Stable",
      tooltipPrice: "Average price",
      tooltipYear: (y) => `Year ${y}`,
      salesCount: (n) => `${n} sale${n > 1 ? "s" : ""}`,
      note: "Trend calculated from real sales recorded in the town (DVF). Indicative value, not a forecast.",
    },
    saleDialog: {
      propertyFallback: "Property",
      notProvided: "Not specified",
      labels: {
        address: "Full address",
        date: "Sale date",
        rooms: "Number of rooms",
        land: "Land area",
      },
      roomsUnit: (n) => `${n} room${n > 1 ? "s" : ""}`,
    },
    pdf: {
      indicativeLabel: "Indicative estimate",
      referenceLabel: "Ref.",
      editedOn: "Issued on",
      propertySummaryTitle: "Property summary",
      propertyTypeLabel: "Property type",
      cardLabels: {
        address: "Address",
        surface: "Living area",
        land: "Land area",
      },
      landNotProvided: "Not specified",
      vetusteTitle: "Condition score",
      vetusteLegend: "0 = new, 10 = very worn, assessed by yourself",
      estimateRetained: "Selected estimate",
      fallbackNote: (commune) =>
        `Indicative estimate based on the town's average price (DVF, data.gouv.fr) — town of ${commune || ""}`,
      normalNote: "Based on real sales recorded in the town (DVF)",
      marketTitle: "Town market",
      medianPriceLabel: "Average price per m²",
      evolutionLabel: "3-year trend",
      salesAnalyzedLabel: "Sales analysed",
      noTrendData: "—",
      methodTitle: "How this estimate is calculated",
      methodText:
        "Source: Demandes de Valeurs Foncières (DVF, data.gouv.fr). Period: last 3 years of sales. Method: average price per m² of same-type sales in the town, multiplied by the surface area and adjusted by the condition score.",
      nextStepsTitle: "Next steps for your project",
      nextSteps: [
        "Compare this estimate with listings of similar properties in your area to gauge the current market.",
        "Ask a local estate agent for a refined opinion that accounts for your property's specific features.",
        "Keep this document as a starting point for a notarial valuation or a sale listing.",
      ],
      footerBrand: "chevillette.fr",
      footerLegal: "Indicative estimate, not a property survey.",
      legalNote:
        "Data sources: Demandes de Valeurs Foncières (DVF) — data.gouv.fr / Cerema.",
    },
    attestation: {
      generating: "Generating…",
      download: "Download my estimate (PDF)",
      filename: "property-estimate.pdf",
    },
  },
};

export function getTranslations(locale) {
  return translations[locale] || translations.fr;
}