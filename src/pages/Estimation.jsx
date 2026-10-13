import React from "react";
import EstimationEngine from "@/components/EstimationEngine";
import PullToRefresh from "@/components/PullToRefresh";

export default function Estimation() {
  return (
    <PullToRefresh onRefresh={() => window.location.reload()}>
      <EstimationEngine locale="fr" />
    </PullToRefresh>
  );
}