import React from "react";
import { Link } from "react-router-dom";
import { UserX, Zap, TrendingUp, Check, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LOGO_FULL_URL } from "@/lib/branding";
import useSeo from "@/hooks/use-seo";

export default function Home() {
  useSeo({
    title: "Free House Value Estimate in France | Chevillette.fr",
    description:
      "Get a free estimate of your house or apartment in France in under a minute, with no sign-up, based on real sales in your town (French DVF open data). Indicative estimate.",
    path: "/en",
    locale: "en_GB",
    lang: "en",
  });
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 20%, #CBA328 0, transparent 42%), radial-gradient(circle at 82% 0%, #1E293B 0, transparent 38%)",
          }}
        />
        <div className="relative flex flex-col items-center text-center mx-auto w-full max-w-3xl px-6 py-12 md:py-16">
          <div className="relative">
            <div
              className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.10] w-[400px] h-[400px]"
              style={{ backgroundImage: "radial-gradient(circle, #CBA328 0, transparent 65%)" }}
            />
            <img
              src={LOGO_FULL_URL}
              alt="Chevillette.fr"
              className="relative w-[250px] md:w-[360px] h-auto object-contain"
            />
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold tracking-tight text-balance max-w-3xl mt-8 text-primary leading-[1.1]">
            Estimate your property in under a minute
          </h1>
          <p className="text-lg text-accent font-medium max-w-2xl mt-3">
            Pull the latch, find out what your home is worth.
          </p>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mt-3">
            Enter an address and a surface area: you get an indicative value based on real sales in your town, taken from official French government data (DVF).
          </p>
          <Button asChild size="lg" className="shadow-soft mt-7">
            <Link to="/en/estimate">Start an estimate</Link>
          </Button>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-6">
            <span className="inline-flex items-center gap-1.5 text-sm text-white/80">
              <Check className="w-4 h-4 text-[#CBA328] shrink-0" /> Free
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-white/80">
              <Check className="w-4 h-4 text-[#CBA328] shrink-0" /> No sign-up
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-white/80">
              <Check className="w-4 h-4 text-[#CBA328] shrink-0" /> Instant result
            </span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid gap-6 md:grid-cols-3">
        <Card className="transition-all hover:shadow-md hover:-translate-y-0.5">
          <CardHeader>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 mb-3 ring-1 ring-accent/20">
              <UserX className="w-6 h-6 text-accent" />
            </div>
            <CardTitle className="text-primary text-lg">No sign-up</CardTitle>
            <CardDescription>
              No account, no email, no password: just enter your details and get your estimate.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="transition-all hover:shadow-md hover:-translate-y-0.5">
          <CardHeader>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 mb-3 ring-1 ring-accent/20">
              <Zap className="w-6 h-6 text-accent" />
            </div>
            <CardTitle className="text-primary text-lg">Results in seconds</CardTitle>
            <CardDescription>
              Address, surface area, condition: the indicative value appears straight away.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="transition-all hover:shadow-md hover:-translate-y-0.5">
          <CardHeader>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 mb-3 ring-1 ring-accent/20">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
            <CardTitle className="text-primary text-lg">Based on real sales</CardTitle>
            <CardDescription>
              The price per m² is calculated from sales recorded in your town in recent years (DVF), along with its three-year trend.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>

      {/* Looking to buy in south-west France (EN only) */}
      <section className="max-w-3xl mx-auto px-6 pb-12">
        <Card className="bg-accent/5 border-accent/20">
          <CardHeader>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 mb-3 ring-1 ring-accent/20">
              <MapPin className="w-6 h-6 text-accent" />
            </div>
            <CardTitle className="text-primary text-lg">Looking to buy in south-west France?</CardTitle>
            <CardDescription>
              Thinking of buying in the Gironde, the Landes or the Dordogne (Périgord)? Use Chevillette to see the average price per m² of recent sales in the town you are interested in, and compare it with the asking price before you make an offer. It works for houses and apartments anywhere in France, except Alsace-Moselle and Mayotte, where DVF data is not available.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>

      <div className="text-center pb-16">
        <Link to="/en/how-it-works" className="text-accent hover:underline text-sm font-medium">
          How it works – FAQ →
        </Link>
      </div>
    </div>
  );
}