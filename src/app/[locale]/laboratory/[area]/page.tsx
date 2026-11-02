import Link from "next/link";
import { notFound } from "next/navigation";
import { NotRecovered, PageHeader, Section, SourceList, Tag, UntranslatedNotice } from "@/components/ui";
import { ExperimentCard } from "@/components/research/blocks";
import { deployments, directiveFeatures, labAreas, simulatorViews, xzrCommands, type LabArea } from "@/data/laboratory";
import { experiments } from "@/data/experiments/experiments";
import { nodeById } from "@/data/research/nodes";
import { visuals } from "@/data/visuals";
import { VisualFigure } from "@/components/research/VisualFigure";
import { locales, type Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => labAreas.map((a) => ({ locale, area: a.id })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; area: string }> }) {
  const { locale: rawLocale, area } = await params;
  const locale = rawLocale as Locale;
  return pageMetadata(locale, `/laboratory/${area}`, labAreas.find((a) => a.id === area)?.title ?? "Laboratory");
}

function Simulators({ locale }: { locale: Locale }) {
  return (
    <>
      <Section id="deployments" title="Deployments" note="The public deployment is a read-only research-result viewer. The interactive simulation requires the local backend.">
        <ul className="grid gap-4 md:grid-cols-2">
          {deployments.map((d) => (
            <li key={d.id} className="panel p-5">
              <p className="mono mb-2 text-xs text-muted">{d.state}</p>
              <h3 className="font-semibold">{d.url ? <a href={d.url} rel="noopener noreferrer">{d.title} ↗</a> : d.title}</h3>
              <p className="mt-2 text-sm">{d.note}</p>
              <SourceList ids={d.sources} locale={locale} />
            </li>
          ))}
        </ul>
      </Section>
      <Section id="views" title="Research-result views (confirmed in public deployment)" note="A null result in any view means no difference detected above the stated noise floor at that resolution and time window — not that no difference exists.">
        <ul className="mono grid gap-2 text-sm sm:grid-cols-2 md:grid-cols-3">
          {simulatorViews.map((v) => <li key={v} className="panel px-3 py-2">{v}</li>)}
        </ul>
      </Section>
      <Section id="commands" title="Runtime experiments (xzr)">
        <ul className="space-y-3 text-sm">
          {xzrCommands.map((c) => (
            <li key={c.cmd} className="grid gap-1 md:grid-cols-[280px_1fr]">
              <code className="mono text-xs">{c.cmd}</code>
              <span className="text-muted">tests {c.tests}</span>
            </li>
          ))}
        </ul>
        <SourceList ids={["gh-runtime"]} locale={locale} />
      </Section>
      <Section id="features" title="Directive feature list — verification" note="Functions named in the site directive, checked against the recovered sources. “Not confirmed” means no recovered source names the function; it is not shown as available.">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead><tr className="border-b border-foreground"><th scope="col" className="py-2 pr-3">Function</th><th scope="col" className="py-2 pr-3">State</th><th scope="col" className="py-2">Evidence</th></tr></thead>
            <tbody>
              {directiveFeatures.map((f) => (
                <tr key={f.name} className="border-b border-border">
                  <td className="py-2 pr-3">{f.name}</td>
                  <td className="py-2 pr-3">{f.state === "implemented" ? <Tag tone="blue">Implemented (source)</Tag> : <Tag tone="red">Not confirmed</Tag>}</td>
                  <td className="mono py-2 text-xs text-muted">{f.evidence ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}

export default async function LabAreaPage({ params }: { params: Promise<{ locale: string; area: string }> }) {
  const { locale: rawLocale, area } = await params;
  const locale = rawLocale as Locale;
  const a = labAreas.find((x) => x.id === area);
  if (!a) notFound();
  const id = a.id as LabArea;
  const robotics = nodeById.get("robotics")!;

  return (
    <>
      <PageHeader eyebrow="Laboratory" title={locale === "ja" ? a.titleJa : a.title}>
        <UntranslatedNotice locale={locale} />
      </PageHeader>
      <div lang={locale === "ja" ? "en" : undefined}>
        {id === "simulators" && <Simulators locale={locale} />}
        {id === "experiments" && (
          <Section id="records" title="Experiment records" note="Implementation state, experimental state, observation state and hypothesis outcome are recorded independently. No single status implies the correctness of a research programme.">
            <div className="space-y-6">{experiments.map((e) => <ExperimentCard key={e.id} e={e} locale={locale} />)}</div>
          </Section>
        )}
        {id === "sensors" && (
          <Section title="Sensors">
            <NotRecovered locale={locale} topics={["Sensor hardware", "Sensor materials", "XenoSNN sensor input"]} />
            <p className="mt-4 max-w-[72ch] text-sm text-muted">
              Recorded limitation of the current simulator: “No hardware sensor morphogenesis. Sensor redesign is simulated as placement growth along the coupling graph and as channel changes; there is no hardware interface.”
            </p>
            <SourceList ids={["gh-simulator-limits"]} locale={locale} />
          </Section>
        )}
        {id === "robotics" && (
          <Section title="Robotics">
            <div className="panel p-5">
              <h3 className="serif text-xl"><Link href={`/${locale}/projects/robotics`} className="text-foreground">{robotics.title}</Link></h3>
              <p className="mt-2 text-sm">{robotics.summary}</p>
            </div>
            <div className="mt-6 space-y-6">
              {visuals.filter((v) => v.nodeId === "robotics").map((v) => <VisualFigure key={v.id} v={v} locale={locale} />)}
            </div>
            <p className="mt-4 max-w-[72ch] text-sm text-muted">Simulated planar embodiments (MuJoCo Walker2d-v5, Hopper-v5) are used in the Xeno-14 and Active Inference experiments; see Experiments. No physical robot record was recovered.</p>
          </Section>
        )}
        {id === "materials" && (
          <Section title="Materials">
            <NotRecovered locale={locale} topics={["Mechanical Liquids", "Electrohydraulic Systems", "Iontronics", "Sensor Materials", "Embodied Computation"]} />
          </Section>
        )}
      </div>
    </>
  );
}
