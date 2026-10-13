import React, { useState } from "react";
import HistoryView from "@/components/HistoryView";
import PullToRefresh from "@/components/PullToRefresh";
import useSeo from "@/hooks/use-seo";
import { getTranslations } from "@/lib/i18n";

export default function Historique() {
  const t = getTranslations("fr").history;
  useSeo({ title: t.seo.title, description: t.seo.description, path: "/historique" });
  const [refreshKey, setRefreshKey] = useState(0);
  return (
    <PullToRefresh onRefresh={() => setRefreshKey((k) => k + 1)}>
      <HistoryView locale="fr" key={refreshKey} />
    </PullToRefresh>
  );
}