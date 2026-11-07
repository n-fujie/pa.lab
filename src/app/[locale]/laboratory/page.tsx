import Link from "next/link";
import { PageHeader, UntranslatedNotice } from "@/components/ui";
import { labAreas } from "@/data/laboratory";
import type { Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  return pageMetadata(locale, "/laboratory", "Laboratory");
}

const blurbs: Record<string, string> = {
  simulators: "P/A SYSTEM deployments, runtime experiments, and TII.",
  sensors: "No sensor hardware records recovered.",
  robotics: "One robotics project listed; details not recovered.",
  materials: "No material experiment records recovered.",
  experiments: "Experiment records with verified execution records, including negative results.",
};

export default async function Laboratory({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  return (
    <>
      <PageHeader
        eyebrow="Laboratory"
        title={locale === "ja" ? "実験環境" : "Laboratory"}
        lead="Computational systems and experiment records. All current experiments are computational; no physical apparatus record was recovered."
      >
        <UntranslatedNotice locale={locale} />
      </PageHeader>
      <ul className="mt-10 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-5">
        {labAreas.map((a) => (
          <li key={a.id} className="bg-surface p-5">
            <h2 className="serif text-xl"><Link href={`/${locale}/laboratory/${a.id}`} className="text-foreground">{locale === "ja" ? a.titleJa : a.title}</Link></h2>
            <p className="mt-2 text-sm text-muted">{blurbs[a.id]}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
