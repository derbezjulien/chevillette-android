import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useSeo from "@/hooks/use-seo";

function Section({ title, children }) {
  return (
    <section className="mb-6">
      <h2 className="text-lg font-heading font-semibold text-primary mb-2">{title}</h2>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">{children}</div>
    </section>
  );
}

export default function APropos() {
  useSeo({ title: "À propos | Chevillette.fr", description: "Pourquoi Chevillette existe : chiffrer simplement la valeur de son bien quand on n'est pas encore prêt à appeler un agent immobilier.", path: "/a-propos" });
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-3xl mx-auto px-6 py-10">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent mb-6">
          <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
        </Link>
        <Card className="shadow-soft">
          <CardHeader>
            <h1 className="text-2xl font-semibold leading-none tracking-tight">À propos de Chevillette</h1>
          </CardHeader>
          <CardContent>
            <Section title="Pourquoi ce site ?">
              <p>Chevillette est né d'un constat simple : beaucoup de gens pensent à vendre ou à déménager un jour, sans être encore prêts à appeler un agent immobilier ni à faire expertiser leur maison. Il y a des travaux à terminer, un bien à améliorer, un projet qui n'est pas encore mûr, ou tout simplement l'envie de savoir. Ce site leur donne un premier repère, gratuit, en moins d'une minute et sans inscription.</p>
            </Section>
            <Section title="À quoi sert-il ?">
              <p>À chiffrer son patrimoine immobilier : obtenir un ordre de grandeur de la valeur de sa maison ou de son appartement à partir des ventes réellement enregistrées dans sa commune. Vous pouvez refaire l'estimation régulièrement pour voir comment la valeur indicative évolue, et consulter la tendance du prix au m² sur les trois dernières années.</p>
            </Section>
            <Section title="Pourquoi est-ce utile aujourd'hui ?">
              <p>Dans le contexte économique actuel, savoir à peu près de quoi on dispose aide à mesurer sa marge de manœuvre, par exemple avant de commencer à regarder de nouvelles maisons ou de se lancer dans un projet de déménagement. Chevillette ne remplace pas un conseil financier : c'est un point de départ pour réfléchir.</p>
            </Section>
            <Section title="D'où viennent les chiffres ?">
              <p>Des Demandes de valeurs foncières (DVF), publiées par l'État sur data.gouv.fr, et de la Base Adresse Nationale pour la recherche d'adresse. Le détail du calcul est expliqué sur la page « <Link to="/comment-ca-marche" className="text-accent hover:underline">Comment ça marche ?</Link> ».</p>
            </Section>
            <Section title="Ce que Chevillette n'est pas">
              <p>Chevillette n'est ni une agence immobilière, ni un cabinet d'expertise, ni un service de l'administration. L'estimation est indicative et ne remplace ni l'avis d'un professionnel ni une expertise. Le site est un projet indépendant créé en Gironde. Les informations légales figurent dans les <Link to="/mentions-legales" className="text-accent hover:underline">mentions légales</Link>. Une question, une remarque ? Écrivez à <a href="mailto:webmaster@chevillette.fr" className="text-accent hover:underline">webmaster@chevillette.fr</a>.</p>
            </Section>

            <div className="mt-8 flex justify-center">
              <Button asChild size="lg" className="bg-[#CBA328] text-[#0F1B2A] hover:bg-[#CBA328]/90 font-bold shadow-soft">
                <Link to="/estimation">Faire une estimation gratuite</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}