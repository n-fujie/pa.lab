import { PageHeader, Section, UntranslatedNotice } from "@/components/ui";
import { NodeCard } from "@/components/research/blocks";
import { projectNodes, nodeKindLabel } from "@/lib/research/queries";
import type { Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/metadata";
import type { NodeKind } from "@/types/research";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  return pageMetadata(locale, "/projects", "Projects");
}

const order: NodeKind[] = ["programme", "system", "concept", "earlier"];

export default async function Projects({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title={locale === "ja" ? "プロジェクト" : "Projects"}
        lead="Every programme, system and concept recovered from primary sources, with its grounding state. Items named in the site directive but not recovered are listed with no content."
      >
        <UntranslatedNotice locale={locale} />
      </PageHeader>
      {order.map((kind) => {
        const items = projectNodes.filter((n) => n.kind === kind);
        if (!items.length) return null;
        return (
          <Section key={kind} id={kind} title={`${nodeKindLabel[kind]}s`}>
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {items.map((n) => <li key={n.id}><NodeCard node={n} locale={locale} /></li>)}
            </ul>
          </Section>
        );
      })}
    </>
  );
}
