import { NotRecovered, PageHeader, Section, SourceList, UntranslatedNotice } from "@/components/ui";
import { methods, unrecoveredMethodTopics } from "@/data/research/methods";
import type { Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  return pageMetadata(locale, "/methods", "Methods");
}

export default async function Methods({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  return (
    <>
      <PageHeader
        eyebrow="Methods and research integrity"
        title={locale === "ja" ? "方法" : "Methods"}
        lead="Methodological principles stated by the author or implemented in the published software. Research claims, implemented capabilities, computational approximations and empirical results are distinguished. Protocols that have not been carried out are not presented as standard procedure."
      >
        <UntranslatedNotice locale={locale} />
      </PageHeader>
      <div lang={locale === "ja" ? "en" : undefined}>
        {methods.map((m) => (
          <Section key={m.id} id={m.id} title={m.title}>
            <p className="prose-block">{m.statement}</p>
            {m.items && (
              <ul className="mono mt-3 grid gap-2 text-sm sm:grid-cols-2">
                {m.items.map((i) => <li key={i} className="panel px-3 py-2">{i}</li>)}
              </ul>
            )}
            <SourceList ids={m.sources} locale={locale} />
          </Section>
        ))}
        <Section id="open" title="Directive topics without a recovered method statement">
          <NotRecovered locale={locale} topics={unrecoveredMethodTopics} />
        </Section>
      </div>
    </>
  );
}
