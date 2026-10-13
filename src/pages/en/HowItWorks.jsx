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

export default function HowItWorks() {
  useSeo({
    title: "How it works – FAQ | Chevillette.fr",
    description:
      "How the estimate is calculated, where the prices come from, do you need to sign up? Answers about Chevillette.fr's free property estimate in France.",
    path: "/en/how-it-works",
    locale: "en_GB",
    lang: "en",
  });
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-3xl mx-auto px-6 py-10">
        <Link to="/en" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>
        <Card className="shadow-soft">
          <CardHeader>
            <h1 className="text-2xl font-semibold leading-none tracking-tight">How does the Chevillette estimate work?</h1>
          </CardHeader>
          <CardContent>
            <Section title="How long does it take to get an estimate?">
              <p>Less than a minute: you enter the address, the surface area, the type of property and its condition, and the indicative value appears straight away.</p>
            </Section>
            <Section title="Do I need to create an account or give my email?">
              <p>No. No sign-up, no email, no password. The service is free.</p>
            </Section>
            <Section title="How is the estimate calculated?">
              <p>Chevillette starts from the average price per m² of sales actually recorded in your town in recent years. This price is multiplied by the living area, then adjusted for the condition of the property (from “needs renovation” to “like new”). When recent sales are unavailable for the town, the tool relies on a reference average price; for a house, the land area is then taken into account.</p>
            </Section>
            <Section title="Where do the prices come from?">
              <p>From the Demandes de valeurs foncières (DVF), the French State's open dataset of recorded property sales, published on data.gouv.fr. Addresses are searched in the Base Adresse Nationale, the national address database. Chevillette is an independent service with no link to the administration.</p>
            </Section>
            <Section title="Is the estimate reliable?">
              <p>It is indicative. It relies on town-level averages: it cannot see the floor, the orientation, the view, the exact neighbourhood or recent works. It does not replace a professional's opinion or a formal valuation, and it is not a selling price.</p>
            </Section>
            <Section title="Is my address stored?">
              <p>No, the address you enter is not stored by Chevillette. Details are in the <Link to="/en/privacy-policy" className="text-accent hover:underline">privacy policy</Link>.</p>
            </Section>
            <Section title="What if my town has very few sales?">
              <p>In small towns there may be only a handful of sales over several years. The result is then less representative, as is the price-per-m² trend. In that case, compare several sources and get a professional's opinion before making any decision.</p>
            </Section>
            <Section title="Which properties and areas are covered?">
              <p>Houses and apartments located in France. DVF data does not cover Alsace-Moselle or Mayotte.</p>
            </Section>
            <Section title="Is this useful if I am buying a property in France?">
              <p>Yes, as a first reference. Enter the address of a property you are interested in to see the average price per m² of recent sales in that town and compare it with the asking price. Asking prices are not sale prices and every property is different, so use it alongside the advice of a local professional, such as an estate agent or a notaire (the notary who handles property sales in France).</p>
            </Section>

            <div className="mt-8 flex flex-col items-center gap-4">
              <Link to="/en/about" className="text-sm text-muted-foreground hover:text-accent hover:underline">
                More about the project
              </Link>
              <Button asChild size="lg" className="bg-[#CBA328] text-[#0F1B2A] hover:bg-[#CBA328]/90 font-bold shadow-soft">
                <Link to="/en/estimate">Get a free estimate</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}