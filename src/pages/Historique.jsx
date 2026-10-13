import React from "react";
import HistoryView from "@/components/HistoryView";
import useSeo from "@/hooks/use-seo";
import { getTranslations } from "@/lib/i18n";

export default function Historique() {
  const t = getTranslations("fr").history;
  useSeo({ title: t.seo.title, description: t.seo.description, path: "/historique" });
  return <HistoryView locale="fr" />;
}