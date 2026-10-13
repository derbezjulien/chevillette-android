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

export default function ConditionsUtilisation() {
  useSeo({ title: "Conditions d'utilisation | L'Indice Immo", description: "Conditions d'utilisation de L'Indice Immo, application d'estimation immobilière indicative.", path: "/conditions-utilisation" });
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-3xl mx-auto px-6 py-10">
        <Link to="/" className="hidden md:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent mb-6">
          <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
        </Link>
        <Card className="shadow-soft">
          <CardHeader>
            <h1 className="text-2xl font-semibold leading-none tracking-tight">Conditions d'utilisation</h1>
          </CardHeader>
          <CardContent>
            <Section title="Objet">
              <p>Les présentes conditions d'utilisation régissent l'utilisation de L'Indice Immo, application proposant une estimation immobilière indicative fondée sur des données publiques.</p>
            </Section>
            <Section title="Acceptation">
              <p>L'utilisation de l'application implique l'acceptation pleine et entière des présentes conditions. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser l'application.</p>
            </Section>
            <Section title="Description du service">
              <p>L'application permet d'obtenir une estimation indicative de la valeur d'un bien immobilier à partir de son adresse, de sa surface et des ventes réelles enregistrées dans la commune (Demandes de Valeurs Foncières, data.gouv.fr).</p>
              <p>Cette estimation est fournie à titre indicatif et ne constitue pas une expertise, une évaluation officielle ni un engagement de prix.</p>
            </Section>
            <Section title="Utilisation de l'application">
              <p>L'utilisateur s'engage à utiliser l'application à des fins personnelles et licites. Il est responsable de l'exactitude des informations qu'il saisit (adresse, surface, type de bien).</p>
            </Section>
            <Section title="Propriété intellectuelle">
              <p>Les éléments de l'application (textes, logos, charte graphique) sont la propriété de leur auteur. Toute reproduction, même partielle, est soumise à autorisation préalable.</p>
            </Section>
            <Section title="Données et confidentialité">
              <p>Le traitement des données est décrit dans la politique de confidentialité, accessible depuis le pied de page de l'application.</p>
            </Section>
            <Section title="Limitation de responsabilité">
              <p>Les estimations fournies sont indicatives et fondées sur des données publiques. Elles ne remplacent pas l'avis d'un professionnel de l'immobilier. L'éditeur ne saurait être tenu responsable des décisions prises sur la base de ces estimations.</p>
            </Section>
            <Section title="Modification des conditions">
              <p>L'éditeur se réserve le droit de modifier les présentes conditions à tout moment. Les modifications entrent en vigueur dès leur publication dans l'application.</p>
            </Section>
            <Section title="Droit applicable et litiges">
              <p>Les présentes conditions sont régies par le droit français. En cas de litige, [À COMPLÉTER — modalité de résolution : tentative de résolution amiable, juridiction compétente].</p>
            </Section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}