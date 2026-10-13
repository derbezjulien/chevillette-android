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

export default function CommentCaMarche() {
  useSeo({ title: "Comment ça marche ? Questions fréquentes | Chevillette.fr", description: "Comment est calculée l'estimation, d'où viennent les prix, faut-il s'inscrire ? Toutes les réponses sur l'estimation immobilière gratuite de Chevillette.fr.", path: "/comment-ca-marche" });
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-3xl mx-auto px-6 py-10">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent mb-6">
          <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
        </Link>
        <Card className="shadow-soft">
          <CardHeader>
            <h1 className="text-2xl font-semibold leading-none tracking-tight">Comment fonctionne l'estimation Chevillette ?</h1>
          </CardHeader>
          <CardContent>
            <Section title="Combien de temps faut-il pour obtenir une estimation ?">
              <p>Moins d'une minute : vous saisissez l'adresse, la surface, le type de bien et son état, et la valeur indicative s'affiche aussitôt.</p>
            </Section>
            <Section title="Faut-il créer un compte ou donner son e-mail ?">
              <p>Non. Aucune inscription, aucun e-mail, aucun mot de passe. Le service est gratuit.</p>
            </Section>
            <Section title="Comment l'estimation est-elle calculée ?">
              <p>Chevillette part du prix moyen au m² des ventes réellement enregistrées dans votre commune ces dernières années. Ce prix est multiplié par la surface habitable, puis ajusté selon l'état du bien (de « à rénover » à « état neuf »). Quand les ventes récentes sont indisponibles pour la commune, l'outil s'appuie sur un prix moyen de référence ; pour une maison, la surface du terrain est alors prise en compte.</p>
            </Section>
            <Section title="D'où viennent les prix ?">
              <p>Des Demandes de valeurs foncières (DVF), un fichier public publié par l'État sur data.gouv.fr, qui recense les ventes immobilières enregistrées. Les adresses sont recherchées dans la Base Adresse Nationale. Chevillette est un service indépendant, sans lien avec l'administration.</p>
            </Section>
            <Section title="L'estimation est-elle fiable ?">
              <p>Elle est indicative. Elle repose sur des moyennes à l'échelle de la commune : elle ne voit ni l'étage, ni l'exposition, ni la vue, ni le quartier précis, ni les travaux récents. Elle ne remplace pas l'avis d'un professionnel ni une expertise, et ne constitue pas un prix de vente.</p>
            </Section>
            <Section title="Mon adresse est-elle conservée ?">
              <p>Non, l'adresse que vous saisissez n'est pas enregistrée par Chevillette. Le détail figure dans la <Link to="/confidentialite" className="text-accent hover:underline">politique de confidentialité</Link>.</p>
            </Section>
            <Section title="Que faire si ma commune compte très peu de ventes ?">
              <p>Dans les petites communes, il peut n'y avoir que quelques ventes sur plusieurs années. Le résultat est alors moins représentatif, de même que la tendance du prix au m². Dans ce cas, comparez avec plusieurs sources et demandez l'avis d'un professionnel avant toute décision.</p>
            </Section>
            <Section title="Quels biens et quelles zones ?">
              <p>Maisons et appartements situés en France. Les données DVF ne couvrent pas l'Alsace-Moselle ni Mayotte.</p>
            </Section>

            <div className="mt-8 flex flex-col items-center gap-4">
              <Link to="/a-propos" className="text-sm text-muted-foreground hover:text-accent hover:underline">
                En savoir plus sur le projet Chevillette
              </Link>
              <Button asChild size="lg" className="bg-[#CBA328] text-[#0F1B2A] hover:bg-[#CBA328]/90 font-bold shadow-soft">
                <Link to="/estimation">Faire une estimation gratuite</Link>
              </Button>
              <Link to="/confidentialite" className="text-sm text-muted-foreground hover:text-accent hover:underline">
                Voir la politique de confidentialité
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}