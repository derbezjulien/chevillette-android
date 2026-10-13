import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, RotateCcw, History as HistoryIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getHistory, removeEntry, clearHistory } from "@/lib/history";
import { euro as makeEuro, getPropertyTypeLabel, formatDate, getTranslations } from "@/lib/i18n";

export default function HistoryView({ locale = "fr" }) {
  const tr = getTranslations(locale);
  const t = tr.history;
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    setEntries(getHistory());
  }, []);

  const estimatePath = locale === "en" ? "/en/estimate" : "/estimation";
  const euroFmt = makeEuro(locale);

  const handleRemove = (id) => {
    removeEntry(id);
    setEntries(getHistory());
  };
  const handleClear = () => {
    clearHistory();
    setEntries([]);
    setConfirmClear(false);
  };
  const handleReopen = (entry) => {
    navigate(estimatePath, { state: { prefill: entry } });
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between gap-3 mb-6">
          <h1 className="text-2xl md:text-3xl font-heading font-bold tracking-tight text-primary">{t.h1}</h1>
          {entries.length > 0 && (
            !confirmClear ? (
              <Button variant="outline" size="sm" onClick={() => setConfirmClear(true)} className="shrink-0">
                <Trash2 className="w-4 h-4" /> {t.clearAll}
              </Button>
            ) : (
              <div className="flex gap-2 shrink-0">
                <Button variant="destructive" size="sm" onClick={handleClear}>{t.confirmClear}</Button>
                <Button variant="ghost" size="sm" onClick={() => setConfirmClear(false)}>{t.cancel}</Button>
              </div>
            )
          )}
        </div>

        {entries.length === 0 ? (
          <Card className="shadow-soft">
            <CardContent className="py-12 text-center">
              <HistoryIcon className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground max-w-md mx-auto">{t.emptyText}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {entries.map((entry) => (
              <Card key={entry.id} className="shadow-soft">
                <CardContent className="py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-muted-foreground">{formatDate(locale, entry.date)}</div>
                      <div className="font-semibold text-primary truncate">{entry.addressLabel}</div>
                      <div className="text-sm text-muted-foreground">
                        {getPropertyTypeLabel(locale, entry.propertyType)} • {entry.surface} m²
                        {entry.terrainSurface ? ` • ${t.landShort(entry.terrainSurface)}` : ""}
                      </div>
                      <div className="text-2xl font-heading font-bold text-accent mt-1.5">{euroFmt.format(entry.estimatedValue)}</div>
                      <div className="text-xs text-muted-foreground">{t.pricePerSqm}: {euroFmt.format(entry.pricePerSqm)}/m²</div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <Button variant="outline" size="sm" onClick={() => handleReopen(entry)}>
                        <RotateCcw className="w-4 h-4" /> {t.reopen}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleRemove(entry.id)} className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" /> {t.remove}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center mt-6">{t.deviceNote}</p>
      </main>
    </div>
  );
}