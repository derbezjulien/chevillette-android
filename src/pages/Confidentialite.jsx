import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useSeo from "@/hooks/use-seo";
import { useAuth } from "@/lib/AuthContext";
import { base44 } from "@/api/base44Client";

function Section({ title, children }) {
  return (
    <section className="mb-6">
      <h2 className="text-lg font-heading font-semibold text-primary mb-2">{title}</h2>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">{children}</div>
    </section>
  );
}

export default function Confidentialite() {
  useSeo({ title: "Politique de confidentialité | L'Indice Immo", description: "Politique de confidentialité de L'Indice Immo : collecte des données, cookies, analytics et droits RGPD.", path: "/confidentialite" });
  const { isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      await base44.functions.invoke("deleteAccount", {});
      toast({ title: "Compte supprimé", description: "Votre compte a été supprimé définitivement." });
      logout(false);
    } catch (e) {
      toast({ title: "Erreur", description: e?.message || "Échec de la suppression.", variant: "destructive" });
      setDeleting(false);
      setConfirmDelete(false);
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-3xl mx-auto px-6 py-10">
        <Link to="/" className="hidden md:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent mb-6">
          <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
        </Link>
        <Card className="shadow-soft">
          <CardHeader>
            <h1 className="text-2xl font-semibold leading-none tracking-tight">Politique de confidentialité</h1>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              La protection de vos données personnelles est une priorité pour L'Indice Immo. Cette page vous explique comment nous traitons vos données lors de votre navigation sur www.indiceimmo.org.
            </p>
            <Section title="Collecte des données">
              <p>L'utilisation de l'outil d'estimation est gratuite et ne nécessite pas la création d'un compte utilisateur. Les données que vous saisissez dans le formulaire (adresse du bien, surface, état) sont traitées instantanément par notre algorithme pour générer l'estimation. Ces données ne sont ni sauvegardées dans nos bases de données, ni revendues à des tiers. L'adresse saisie n'est conservée que le temps de votre session de navigation pour vous afficher le résultat.</p>
              <p>Si vous utilisez l'historique de l'application, vos estimations précédentes (adresse, surface, résultat) sont conservées uniquement sur votre appareil. Elles ne sont jamais envoyées à nos serveurs. Vous pouvez les supprimer à tout moment depuis l'application ou en la désinstallant.</p>
            </Section>
            <Section title="Données de navigation (Analytics)">
              <p>Nous pouvons être amenés à utiliser des outils de mesure d'audience anonymes pour comprendre comment notre site est utilisé et l'améliorer (pages visitées, temps passé, type d'appareil). Ces données sont anonymisées et ne permettent pas de vous identifier personnellement.</p>
            </Section>
            <Section title="Vos droits (RGPD)">
              <p>Conformément à la réglementation européenne (RGPD) et à la loi Informatique et Libertés, bien que nous ne stockions pas de données personnelles nominatives via notre formulaire d'estimation, vous disposez d'un droit d'accès, de rectification et d'effacement des données qui pourraient vous concerner. Pour exercer ce droit, vous pouvez nous contacter à l'adresse suivante : webmaster@chevillette.fr</p>
            </Section>
            {isAuthenticated && (
              <Section title="Suppression de votre compte">
                <p>Conformément aux règles du Google Play Store, vous pouvez demander la suppression définitive de votre compte et des données qui y sont associées. Cette action est irréversible.</p>
                {!confirmDelete ? (
                  <div>
                    <Button variant="destructive" size="sm" onClick={() => setConfirmDelete(true)}>
                      <Trash2 className="w-4 h-4" /> Supprimer mon compte
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    <Button variant="destructive" size="sm" onClick={handleDeleteAccount} disabled={deleting}>
                      {deleting ? "Suppression en cours…" : "Confirmer la suppression définitive"}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(false)} disabled={deleting}>
                      Annuler
                    </Button>
                  </div>
                )}
              </Section>
            )}
            <Section title="Modification de la politique de confidentialité">
              <p>L'éditeur se réserve le droit de modifier la présente politique de confidentialité à tout moment, notamment en fonction de l'évolution de la législation.</p>
            </Section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}