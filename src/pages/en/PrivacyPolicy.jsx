import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useSeo from "@/hooks/use-seo";

function Section({ title, children }) {
  return (
    <section className="mb-6">
      <h2 className="text-lg font-heading font-semibold text-primary mb-2">{title}</h2>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">{children}</div>
    </section>
  );
}

export default function PrivacyPolicy() {
  useSeo({
    title: "Privacy policy | Chevillette.fr",
    description:
      "Privacy policy of Chevillette.fr: data collected, purpose, retention and GDPR rights.",
    path: "/en/privacy-policy",
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
            <h1 className="text-2xl font-semibold leading-none tracking-tight">Privacy policy</h1>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">
              This is a translation for your convenience. The French version prevails.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              The protection of your personal data is a priority for Chevillette.fr. This page explains how we handle your data when you browse www.chevillette.fr.
            </p>
            <Section title="Data controller">
              <p>Data controller: Julien Derbez.</p>
            </Section>
            <Section title="1. Data collection">
              <p>Use of the estimation tool is free and does not require the creation of a user account.</p>
              <p>The data you enter in the form (property address, surface area, condition) is processed instantly by our algorithm to generate the estimate. This data is neither saved in our databases nor sold to third parties. The address you enter is kept only for the duration of your browsing session, in order to display the result.</p>
              <p>If you use the app's history, your previous estimates (address, area, result) are stored only on your device. They are never sent to our servers. You can delete them at any time from the app or by uninstalling it.</p>
            </Section>
            <Section title="2. Browsing data (analytics)">
              <p>We may use anonymous audience measurement tools to understand how our site is used and to improve it (pages visited, time spent, type of device). This data is anonymised and does not allow us to identify you personally.</p>
            </Section>
            <Section title="3. Your rights (GDPR)">
              <p>In accordance with European regulations (GDPR) and the French Data Protection Act, although we do not store personal data by name through our estimation form, you have a right of access, rectification and erasure of any data that may concern you.</p>
              <p>To exercise this right, you can contact us at the following address: <a href="mailto:webmaster@chevillette.fr" className="text-accent hover:underline">webmaster@chevillette.fr</a></p>
            </Section>
            <Section title="4. Changes to the privacy policy">
              <p>The publisher reserves the right to modify this privacy policy at any time, in particular in line with changes to the legislation.</p>
            </Section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}