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

export default function About() {
  useSeo({
    title: "About | Chevillette.fr",
    description:
      "Why Chevillette exists: a simple way to put a figure on your home when you are not yet ready to call an estate agent.",
    path: "/en/about",
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
            <h1 className="text-2xl font-semibold leading-none tracking-tight">About Chevillette</h1>
          </CardHeader>
          <CardContent>
            <Section title="Why this site?">
              <p>Chevillette started from a simple observation: many people think about selling or moving one day, without being ready to call an estate agent or to have their home formally valued. There may be works to finish, a property to improve, a plan that is not yet mature, or simply the wish to know. This site gives them a first reference, free, in under a minute and with no sign-up.</p>
            </Section>
            <Section title="What is it for?">
              <p>To put a figure on the value of your home: get an order of magnitude for your house or apartment based on sales actually recorded in your town. You can redo the estimate regularly to see how the indicative value changes, and look at the price-per-m² trend over the last three years.</p>
            </Section>
            <Section title="Why is it useful today?">
              <p>In the current economic climate, knowing roughly what you have helps you gauge your room for manoeuvre, for example before you start looking at new homes or planning a move. Chevillette is not financial advice: it is a starting point for your thinking.</p>
            </Section>
            <Section title="Where do the figures come from?">
              <p>From the Demandes de valeurs foncières (DVF), published by the French State on data.gouv.fr, and from the Base Adresse Nationale for the address search. The calculation is explained on the “<Link to="/en/how-it-works" className="text-accent hover:underline">How it works</Link>” page.</p>
            </Section>
            <Section title="What Chevillette is not">
              <p>Chevillette is not an estate agency, a valuation firm or a public service. The estimate is indicative and does not replace a professional's opinion or a formal valuation. The site is an independent project created in the Gironde. Legal information is in the <Link to="/mentions-legales" className="text-accent hover:underline">legal notice (in French)</Link>. Any question or comment? Write to <a href="mailto:webmaster@chevillette.fr" className="text-accent hover:underline">webmaster@chevillette.fr</a>.</p>
            </Section>

            <div className="mt-8 flex justify-center">
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