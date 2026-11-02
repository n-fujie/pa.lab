export const locales = ["en", "ja"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Interface strings only. Research content is published in English; Japanese pages show
 * the English original with an explicit notice instead of an unreviewed translation.
 */
const en = {
  siteName: "P/A INSTITUTE",
  skip: "Skip to content",
  nav: {
    research: "Research",
    projects: "Projects",
    laboratory: "Laboratory",
    publications: "Publications",
    researchMap: "Research Map",
    methods: "Methods",
    history: "Research History",
    institute: "Institute",
    contact: "Contact",
  },
  language: "Language",
  untranslated: "",
  sources: "Sources",
  retrieved: "retrieved",
  notClaimed: "Not claimed",
  distinctions: "Distinctions maintained",
  notRecovered: "Source not recovered",
  notRecoveredBody:
    "This topic is named in the site's development directive, but no public source describing it was found during recovery. No content is published until a primary source is supplied.",
  related: "Related research",
  experiments: "Experiments",
  publications: "Publications",
  repository: "Repository",
  status: "Status",
  footerNote: "Independent research. Claims, implementations, and computational results are distinguished on every page.",
  personalSite: "Personal research website",
  archive: "P/A Archive",
} as const;

type Dict = { [K in keyof typeof en]: (typeof en)[K] extends string ? string : { [P in keyof (typeof en)[K]]: string } };

const ja: Dict = {
  siteName: "P/A INSTITUTE",
  skip: "本文へ移動",
  nav: {
    research: "研究",
    projects: "プロジェクト",
    laboratory: "実験環境",
    publications: "出版物",
    researchMap: "研究マップ",
    methods: "方法",
    history: "研究履歴",
    institute: "研究所について",
    contact: "連絡先",
  },
  language: "言語",
  untranslated: "このページの研究本文は日本語に翻訳されていません。英語原文を表示しています。",
  sources: "出典",
  retrieved: "取得日",
  notClaimed: "主張しないこと",
  distinctions: "保持される区別",
  notRecovered: "一次資料未回収",
  notRecoveredBody:
    "この項目はサイト開発指示書で言及されていますが、回収時に内容を記述した公開資料を確認できませんでした。一次資料が提供されるまで内容は掲載しません。",
  related: "関連研究",
  experiments: "実験",
  publications: "出版物",
  repository: "リポジトリ",
  status: "状態",
  footerNote: "独立研究活動。各ページで主張・実装・計算結果を区別しています。",
  personalSite: "個人研究サイト",
  archive: "P/A Archive",
};

const dictionaries: Record<Locale, Dict> = { en, ja };

export function getDictionary(locale: Locale): Dict {
  return dictionaries[locale];
}

export type Dictionary = Dict;
