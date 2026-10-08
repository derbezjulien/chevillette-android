import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useSeo from "@/hooks/use-seo";

function Section({ title, children }) {
  return (
    <section className="mb-6">
      <h2 className="text-lg font-heading font-semibold text-primary mb-2">{title}</h2>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">{children}</div>
    </section>
  );
}

export default function Confidentialite() {
  useSeo({ title: "Politique de confidentialité | L'Indice Immo", description: "Politique de confidentialité de L'Indice Immo : données collectées, finalité, conservation et droits RGPD.", path: "/confidentialite" });
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-3xl mx-auto px-6 py-10">
        <Link to="/" className="hidden md:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent mb-6">
          <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
        </Link>
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-2xl">Politique de confidentialité</CardTitle>
          </CardHeader>
          <CardContent>
            <Section title="Responsable du traitement">
              <p>Le responsable du traitement des données est : [À COMPLÉTER — nom de l'éditeur]</p>
            </Section>
            <Section title="Finalité">
              <p>Les données servent à l'accès aux fonctionnalités d'estimation immobilière.</p>
            </Section>
            <Section title="Vos droits">
              <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données.</p>
            </Section>
            <Section title="Sources de données utilisées">
              <p>L'application interroge des données publiques pour produire ses estimations :</p>
              <p>• Base Adresse Nationale (BAN) — recherche d'adresses ;</p>
              <p>• Demandes de Valeurs Foncières (DVF, data.gouv.fr) — ventes enregistrées.</p>
              <p>Ces données ne sont pas stockées durablement au-delà d'un cache temporaire nécessaire au fonctionnement du service.</p>
            </Section>
            <Section title="Cookies">
              <p>L'application n'utilise pas de cookies publicitaires. Seuls les cookies techniques nécessaires à son fonctionnement peuvent être déposés.</p>
            </Section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}