import React from "react";
import { MapPin, Calendar, DoorOpen, Maximize, Home as HomeIcon, Building2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { euro as makeEuro, getPropertyTypeLabel, formatDate, getTranslations } from "@/lib/i18n";

function buildAddress(s) {
  const num = s.adresse_numero || s.numero_voie || "";
  const voie = s.adresse_nom_voie || s.voie || "";
  const cp = s.code_postal || "";
  const commune = s.nom_commune || "";
  const line1 = `${num} ${voie}`.trim();
  if (!line1) return null;
  const line2 = `${cp} ${commune}`.trim();
  return [line1, line2].filter(Boolean).join(", ") || null;
}

function Row({ icon: Icon, label, value, notProvided }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-border/50 last:border-b-0">
      <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 ring-1 ring-accent/20">
        <Icon className="w-4 h-4 text-accent" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-sm font-medium text-primary break-words">{value || notProvided}</div>
      </div>
    </div>
  );
}

export default function SaleDetailDialog({ sale, open, onOpenChange, locale = "fr" }) {
  if (!sale) return null;
  const t = getTranslations(locale).saleDialog;
  const euroFmt = makeEuro(locale);
  const isHouse = sale.type_local === "Maison";
  const Icon = isHouse ? HomeIcon : Building2;
  const pieces = sale.nombre_pieces_principales != null ? t.roomsUnit(sale.nombre_pieces_principales) : null;
  const terrain = sale.surface_terrain != null ? `${Math.round(sale.surface_terrain)} m²` : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl border-border shadow-soft max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center ring-1 ring-accent/20">
              <Icon className="w-5 h-5 text-accent" />
            </div>
            <div>
              <DialogTitle className="text-primary">{getPropertyTypeLabel(locale, sale.type_local) || t.propertyFallback}</DialogTitle>
              <DialogDescription>
                {sale.valeur_fonciere ? euroFmt.format(sale.valeur_fonciere) : "—"} • {Math.round(sale.surface_reelle_bati)} m²
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="mt-1">
          <Row icon={MapPin} label={t.labels.address} value={buildAddress(sale)} notProvided={t.notProvided} />
          <Row icon={Calendar} label={t.labels.date} value={formatDate(locale, sale.date_mutation)} notProvided={t.notProvided} />
          <Row icon={DoorOpen} label={t.labels.rooms} value={pieces} notProvided={t.notProvided} />
          <Row icon={Maximize} label={t.labels.land} value={terrain} notProvided={t.notProvided} />
        </div>
      </DialogContent>
    </Dialog>
  );
}