import React from "react";
import HistoryView from "@/components/HistoryView";
import useSeo from "@/hooks/use-seo";
import { getTranslations } from "@/lib/i18n";

export default function History() {
  const t = getTranslations("en").history;
  useSeo({
    title: t.seo.title,
    description: t.seo.description,
    path: "/en/history",
    locale: "en_GB",
    lang: "en",
  });
  return <HistoryView locale="en" />;
}