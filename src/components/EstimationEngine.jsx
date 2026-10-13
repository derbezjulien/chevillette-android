import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Home as HomeIcon, MapPin, Calculator, Loader2, AlertCircle, Building2, TrendingUp, Trees } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import SaleDetailDialog from "@/components/SaleDetailDialog";
import VetusteSlider from "@/components/VetusteSlider";
import PriceTrendCard from "@/components/PriceTrendCard";
import { LOGO_MARK_URL } from "@/lib/branding";
import useSeo from "@/hooks/use-seo";
import { euro as makeEuro, getPropertyTypeLabel, getTranslations } from "@/lib/i18n";

function formatYear(dateIso) {
  return dateIso ? dateIso.substring(0, 4) : "—";
}

// === Paramètres ajustables du mode secours (estimation par moyenne communale) ===
const MAISON_BATI_DISCOUNT = 0.20;
const TERRAIN_TIERS = [
  { limit: 500, rate: 0.05 },
  { limit: 1500, rate: 0.02 },
  { limit: Infinity, rate: 0.005 },
];

function vetusteCoefficient(note) {
  if (note >= 10) return 1.15;
  if (note >= 8) return 1.08;
  if (note >= 6) return 1.00;
  if (note >= 4) return 0.85;
  if (note >= 2) return 0.70;
  return 0.50;
}

function computeTerrainValue(surfaceTerrain, prixMoyen) {
  let remaining = Math.max(0, surfaceTerrain);
  let value = 0;
  let previousLimit = 0;
  for (const tier of TERRAIN_TIERS) {
    if (remaining <= 0) break;
    const tierWidth = tier.limit - previousLimit;
    const tierSurface = Math.min(remaining, tierWidth);
    value += tierSurface * (prixMoyen * tier.rate);
    remaining -= tierSurface;
    previousLimit = tier.limit;
  }
  return value;
}

export default function EstimationEngine({ locale = "fr" }) {
  const tr = getTranslations(locale);
  const t = tr.estimation;
  useSeo({
    title: t.seo.title,
    description: t.seo.description,
    path: t.seo.path,
    locale: locale === "en" ? "en_GB" : "fr_FR",
    lang: locale,
  });
  const euroFmt = makeEuro(locale);
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [surface, setSurface] = useState("");
  const [propertyType, setPropertyType] = useState("Appartement");
  const [terrainSurface, setTerrainSurface] = useState("");
  const [vetuste, setVetuste] = useState(7);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [recentSales, setRecentSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const [debounceTimer, setDebounceTimer] = useState(null);

  const onQueryChange = (value) => {
    setQuery(value);
    setSelected(null);
    setError(null);
    if (debounceTimer) clearTimeout(debounceTimer);
    if (value.length < 3) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const response = await base44.functions.invoke("searchAddress", { query: value });
        setSuggestions(response.data.features || []);
      } catch (e) {
        setError(t.errorAddressApi);
      }
    }, 300);
    setDebounceTimer(timer);
  };

  const selectAddress = (feature) => {
    setSelected(feature);
    setQuery(feature.properties.label);
    setSuggestions([]);
  };

  const estimate = useCallback(async () => {
    if (!selected || !surface || Number(surface) <= 0) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setRecentSales([]);
    try {
      const citycode = selected.properties.citycode;
      const commune = selected.properties.city || selected.properties.name || "";
      const response = await base44.functions.invoke("fetchDvf", { citycode, commune });
      const data = response.data;
      const features = data.features || [];

      const cutoff = new Date();
      cutoff.setFullYear(cutoff.getFullYear() - 3);

      const sales = features
        .map((f) => f.properties)
        .filter((m) => {
          const hasPrice = m.valeur_fonciere && m.valeur_fonciere > 0;
          const hasSurface = m.surface_reelle_bati && m.surface_reelle_bati > 0;
          const dateOk = m.date_mutation && new Date(m.date_mutation) >= cutoff;
          return m.type_local === propertyType && hasPrice && hasSurface && dateOk;
        });

      if (sales.length === 0) {
        const typeLabel = getPropertyTypeLabel(locale, propertyType);
        setError(t.errorNoSales(typeLabel));
        setLoading(false);
        return;
      }

      const avgPerSqm =
        sales.reduce((acc, s) => acc + s.valeur_fonciere / s.surface_reelle_bati, 0) /
        sales.length;
      const coefVetuste = vetusteCoefficient(Number(vetuste));
      const estimatedPrice = avgPerSqm * Number(surface) * coefVetuste;

      const yearlyStats = {};
      sales.forEach((s) => {
        const year = (s.date_mutation || "").substring(0, 4);
        if (!year) return;
        if (!yearlyStats[year]) yearlyStats[year] = { sum: 0, count: 0 };
        yearlyStats[year].sum += s.valeur_fonciere / s.surface_reelle_bati;
        yearlyStats[year].count++;
      });
      const trendData = Object.keys(yearlyStats)
        .sort()
        .map((year) => ({
          year,
          avgPerSqm: Math.round(yearlyStats[year].sum / yearlyStats[year].count),
          count: yearlyStats[year].count,
        }));

      setResult({ estimatedPrice, averagePricePerSqm: avgPerSqm, sampleSize: sales.length, trendData });
      setRecentSales(
        [...sales]
          .sort((a, b) => (b.date_mutation || "").localeCompare(a.date_mutation || ""))
          .slice(0, 6)
      );
    } catch (e) {
      const msg = (e && e.message) || "";
      const diagData = e?.data?.diagnostic || e?.diagnostic;
      console.warn(
        "[Cerema] API principale injoignable",
        diagData
          ? `DVF_UNAVAILABLE [${diagData.type}] ${diagData.detail || ""} (statut ${diagData.status}, ${diagData.attempts ?? "?"} tentatives, ${diagData.durationMs ?? "?"}ms)`
          : msg
      );
      const isServerDown =
        msg.includes("DVF_TIMEOUT") ||
        msg.includes("DVF_UNAVAILABLE") ||
        msg.includes("502") ||
        msg.includes("503") ||
        msg.includes("504") ||
        /status code 5\d\d/.test(msg);

      if (isServerDown) {
        try {
          const fallbackModule = await import("@/data/fallback_national.json");
          const citycode = selected.properties.citycode;
          const avgPerSqm = fallbackModule.default?.[citycode] ?? fallbackModule[citycode];
          if (avgPerSqm && avgPerSqm > 0) {
            const surfaceBati = Number(surface);
            const coefVetuste = vetusteCoefficient(Number(vetuste));
            let estimatedPrice;
            if (propertyType === "Maison") {
              const valeurBati = surfaceBati * (avgPerSqm * (1 - MAISON_BATI_DISCOUNT)) * coefVetuste;
              const valeurTerrain = computeTerrainValue(Number(terrainSurface) || 0, avgPerSqm);
              estimatedPrice = valeurBati + valeurTerrain;
            } else {
              estimatedPrice = avgPerSqm * surfaceBati * coefVetuste;
            }
            setResult({
              estimatedPrice,
              averagePricePerSqm: avgPerSqm,
              fallback: true,
              fallbackCommune: selected.properties.city || selected.properties.name || "",
            });
            setRecentSales([]);
          } else {
            setError(t.errorServerNoRef);
          }
        } catch {
          setError(t.errorServerDown);
        }
      } else {
        setError(msg || t.errorGeneric);
      }
    } finally {
      setLoading(false);
    }
  }, [selected, surface, propertyType, terrainSurface, vetuste, locale, t]);

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-2 text-primary">
            {t.h1}
          </h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        <Card className="mb-6 shadow-soft">
          <CardContent className="pt-6 space-y-4">
            {/* Adresse */}
            <div className="relative">
              <Label htmlFor="address" className="text-primary font-medium">{t.addressLabel}</Label>
              <div className="relative mt-1.5">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                <Input
                  id="address"
                  value={query}
                  onChange={(e) => onQueryChange(e.target.value)}
                  placeholder={t.addressPlaceholder}
                  className="pl-10"
                />
              </div>
              {suggestions.length > 0 && (
                <div className="absolute z-10 mt-1.5 w-full rounded-xl border border-border/60 bg-popover shadow-soft max-h-60 overflow-auto">
                  {suggestions.map((f, i) => (
                    <button
                      key={i}
                      onClick={() => selectAddress(f)}
                      className="w-full text-left px-3.5 py-2.5 hover:bg-accent/10 border-b border-border/40 last:border-b-0 transition-colors"
                    >
                      <div className="text-sm font-medium text-primary">{f.properties.label}</div>
                      {f.properties.context && (
                        <div className="text-xs text-muted-foreground">{f.properties.context}</div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Surface */}
            <div>
              <Label htmlFor="surface" className="text-primary font-medium">{t.surfaceLabel}</Label>
              <div className="relative mt-1.5">
                <Calculator className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                <Input
                  id="surface"
                  type="number"
                  min="0"
                  value={surface}
                  onChange={(e) => setSurface(e.target.value)}
                  placeholder={t.surfacePlaceholder}
                  className="pl-10"
                  disabled={!selected}
                />
              </div>
            </div>

            {/* Type de bien */}
            <div>
              <Label className="text-primary font-medium">{t.propertyTypeLabel}</Label>
              <div className="mt-1.5 grid grid-cols-2 gap-2">
                {t.propertyTypes.map((p) => {
                  const active = propertyType === p.value;
                  const Icon = p.value === "Maison" ? HomeIcon : Building2;
                  return (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setPropertyType(p.value)}
                      className={cn(
                        "flex items-center justify-center gap-2 h-11 rounded-xl border text-sm font-semibold transition-all",
                        active
                          ? "bg-primary text-primary-foreground border-primary shadow-soft"
                          : "bg-card text-muted-foreground border-input hover:border-accent/40 hover:text-accent-foreground"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Surface du terrain (optionnel) */}
            <div>
              <Label htmlFor="terrain" className="text-primary font-medium">
                {t.landLabel} <span className="text-muted-foreground font-normal">{t.landOptional}</span>
              </Label>
              <div className="relative mt-1.5">
                <Trees className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                <Input
                  id="terrain"
                  type="number"
                  min="0"
                  value={terrainSurface}
                  onChange={(e) => setTerrainSurface(e.target.value)}
                  placeholder={t.landPlaceholder}
                  className="pl-10"
                  disabled={!selected}
                />
              </div>
            </div>

            {/* Indice de vétusté */}
            <div>
              <Label className="text-primary font-medium mb-3 block">{t.vetusteLabel}</Label>
              <VetusteSlider value={vetuste} onChange={setVetuste} disabled={!selected} locale={locale} />
            </div>

            <Button
              onClick={estimate}
              disabled={!selected || !surface || Number(surface) <= 0 || loading}
              className="w-full h-12 text-base shadow-soft bg-[#0F1B2A] text-white hover:opacity-90 font-bold ring-1 ring-[#CBA328]/40"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t.estimating}
                </>
              ) : (
                t.estimateBtn
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-3">{t.indicativeNote}</p>
            <p className="text-xs text-center mt-2">
              <Link to={t.howCalculatedPath} className="text-accent hover:underline">
                {t.howCalculated}
              </Link>
            </p>
          </CardContent>
        </Card>

        {error && (
          <div className="flex items-start gap-2.5 p-4 mb-6 rounded-xl border border-destructive/30 bg-destructive/5 text-destructive text-sm">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {result && (
          <>
            <Card className="mb-8 relative overflow-hidden border-0 bg-primary text-primary-foreground shadow-glow">
              <div
                className="absolute inset-0 pointer-events-none opacity-25"
                style={{ backgroundImage: "radial-gradient(circle at 85% -20%, #CBA328 0, transparent 60%)" }}
              />
              <CardContent className="relative pt-8 pb-8 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 text-accent text-xs font-semibold px-3 py-1 mb-4 ring-1 ring-accent/30">
                  <img src={LOGO_MARK_URL} alt="" className="h-6 w-auto object-contain" /> {t.resultBadge}
                </span>
                <div className="text-5xl md:text-6xl font-heading font-extrabold text-accent mb-4 tracking-tight">
                  {euroFmt.format(result.estimatedPrice)}
                </div>
                {result.fallback ? (
                  <>
                    <div className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm text-primary-foreground/80 ring-1 ring-white/10">
                      <TrendingUp className="w-4 h-4 text-accent" />
                      {t.fallbackRefPrefix}<span className="font-semibold text-primary-foreground">{euroFmt.format(result.averagePricePerSqm)}/m²</span>
                    </div>
                    <p className="mt-4 text-xs text-primary-foreground/70 italic">
                      {t.fallbackNote(result.fallbackCommune)}
                    </p>
                  </>
                ) : (
                  <div className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm text-primary-foreground/80 ring-1 ring-white/10">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    {t.avgPricePrefix}<span className="font-semibold text-primary-foreground">{euroFmt.format(result.averagePricePerSqm)}/m²</span>
                    <span className="text-primary-foreground/40">•</span>
                    {t.basedOnSales(result.sampleSize)}
                  </div>
                )}
              </CardContent>
            </Card>

            {!result.fallback && result.trendData && result.trendData.length >= 2 && (
              <PriceTrendCard trendData={result.trendData} locale={locale} />
            )}

            {!result.fallback && (
              <>
                <h2 className="text-xl font-heading font-semibold mb-4 text-primary flex items-center gap-2">
                  <span className="inline-block w-1.5 h-5 rounded-full bg-accent" />
                  {t.recentSalesTitle}
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {recentSales.map((sale, i) => {
                    const isHouse = sale.type_local === "Maison";
                    const Icon = isHouse ? HomeIcon : Building2;
                    return (
                      <Card
                        key={i}
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedSale(sale)}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedSale(sale); } }}
                        className="cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-accent/40"
                      >
                        <CardContent className="py-4 flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 ring-1 ring-accent/20">
                            <Icon className="w-5 h-5 text-accent" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-primary">
                              {getPropertyTypeLabel(locale, sale.type_local)} • {Math.round(sale.surface_reelle_bati)} m²
                            </div>
                            <div className="text-sm text-muted-foreground truncate">
                              {sale.nom_commune || ""} — {t.soldFor} {euroFmt.format(sale.valeur_fonciere)} {t.inYear}{" "}
                              {formatYear(sale.date_mutation)}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}

        <SaleDetailDialog
          sale={selectedSale}
          open={!!selectedSale}
          onOpenChange={(o) => { if (!o) setSelectedSale(null); }}
          locale={locale}
        />
      </main>
    </div>
  );
}