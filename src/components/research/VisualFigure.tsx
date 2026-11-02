import Image from "next/image";
import { visualKindLabel, type Visual } from "@/data/visuals";
import { SourceList, Tag } from "@/components/ui";
import type { Locale } from "@/lib/i18n/config";

/** Every visual carries its classification next to it, so a design is never read as a record. */
export function VisualFigure({ v, locale }: { v: Visual; locale: Locale }) {
  return (
    <figure className="panel p-3 md:p-4">
      <p className="mb-3">
        <Tag tone={v.kind === "design-visual" || v.kind === "artwork" ? "brown" : "blue"}>{visualKindLabel[v.kind]}</Tag>
      </p>
      <Image src={v.src} alt={v.alt} width={v.width} height={v.height} sizes="(min-width: 1200px) 1136px, 100vw" className="h-auto w-full" />
      <figcaption className="mt-3 text-sm">
        <span className="font-semibold">{v.title}</span>
        <span className="mt-1 block text-muted">{v.disclosure}</span>
      </figcaption>
      <SourceList ids={v.sources} locale={locale} />
    </figure>
  );
}
