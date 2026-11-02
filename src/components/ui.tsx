import Link from "next/link";
import type { ReactNode } from "react";
import { sourceById } from "@/data/sources";
import { getDictionary, type Locale } from "@/lib/i18n/config";
import type { GroundingState } from "@/types/research";

export function PageHeader({ eyebrow, title, lead, children }: { eyebrow?: string; title: string; lead?: ReactNode; children?: ReactNode }) {
  return (
    <header className="border-b border-border pb-8 pt-10 md:pt-14">
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h1 className="serif text-3xl leading-tight md:text-5xl">{title}</h1>
      {lead && <div className="prose-block mt-4 text-lg text-muted">{lead}</div>}
      {children}
    </header>
  );
}

export function Section({ id, title, children, note }: { id?: string; title: string; children: ReactNode; note?: ReactNode }) {
  return (
    <section id={id} className="mt-12 scroll-mt-24" aria-labelledby={id ? `${id}-h` : undefined}>
      <h2 id={id ? `${id}-h` : undefined} className="eyebrow mb-4 border-b border-border pb-2 text-foreground">
        {title}
      </h2>
      {note && <p className="mb-4 max-w-[72ch] text-sm text-muted">{note}</p>}
      {children}
    </section>
  );
}

const groundingStyle: Record<GroundingState, { label: string; labelJa: string; cls: string; mark: string }> = {
  verified: { label: "Verified source", labelJa: "出典確認済", cls: "text-blue", mark: "●" },
  "title-only": { label: "Title only", labelJa: "題名のみ確認", cls: "text-brown", mark: "◐" },
  editorial: { label: "Editorial grouping", labelJa: "編集上の分類", cls: "text-muted", mark: "○" },
  "not-recovered": { label: "Source not recovered", labelJa: "一次資料未回収", cls: "text-red", mark: "△" },
};

export function GroundingTag({ state, locale = "en" }: { state: GroundingState; locale?: Locale }) {
  const g = groundingStyle[state];
  return (
    <span className={`tag ${g.cls}`}>
      <span aria-hidden="true">{g.mark}</span>
      {locale === "ja" ? g.labelJa : g.label}
    </span>
  );
}

export function Tag({ children, tone = "muted" }: { children: ReactNode; tone?: "muted" | "blue" | "red" | "brown" }) {
  const cls = { muted: "text-muted", blue: "text-blue", red: "text-red", brown: "text-brown" }[tone];
  return <span className={`tag ${cls}`}>{children}</span>;
}

export function SourceList({ ids, locale }: { ids: string[]; locale: Locale }) {
  const t = getDictionary(locale);
  if (ids.length === 0) return null;
  return (
    <div className="mt-4 text-sm">
      <p className="eyebrow mb-1">{t.sources}</p>
      <ul className="list-dash text-muted">
        {ids.map((id) => {
          const s = sourceById.get(id);
          if (!s) return null;
          return (
            <li key={id}>
              <a href={s.url} rel="noopener noreferrer">
                {s.title}
              </a>{" "}
              <span className="mono text-xs">
                · {s.scope} · {t.retrieved} {s.retrieved}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Shown on Japanese pages whose research content is English only. */
export function UntranslatedNotice({ locale }: { locale: Locale }) {
  if (locale !== "ja") return null;
  return (
    <p role="note" className="mt-6 border-l-2 border-brown bg-surface px-4 py-3 text-sm" lang="ja">
      {getDictionary("ja").untranslated}
    </p>
  );
}

export function NotRecovered({ locale, topics }: { locale: Locale; topics?: string[] }) {
  const t = getDictionary(locale);
  return (
    <div className="panel border-l-2 border-l-red p-5">
      <p className="mb-2">
        <GroundingTag state="not-recovered" locale={locale} />
      </p>
      <p className="max-w-[72ch] text-sm">{t.notRecoveredBody}</p>
      {topics && topics.length > 0 && (
        <ul className="list-dash mt-3 text-sm text-muted">
          {topics.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  const external = /^https?:/.test(href);
  if (external)
    return (
      <a href={href} rel="noopener noreferrer" className="inline-flex items-center gap-1">
        {children} <span aria-hidden="true">↗</span>
      </a>
    );
  return (
    <Link href={href} className="inline-flex items-center gap-1">
      {children} <span aria-hidden="true">→</span>
    </Link>
  );
}

export function Content({ locale, children }: { locale: Locale; children: ReactNode }) {
  // Research text is English; mark it so screen readers use the right voice on /ja.
  return <div lang={locale === "ja" ? "en" : undefined}>{children}</div>;
}
