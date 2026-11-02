/** Domains are configured by environment; the Institute domain is not yet decided. */
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  urlConfigured: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
  archiveUrl: process.env.NEXT_PUBLIC_ARCHIVE_URL || "https://archive.platodesignlab.com",
  personalUrl: process.env.NEXT_PUBLIC_PERSONAL_URL || "https://www.platodesignlab.com",
  contactEmail: "philaicontact@icloud.com",
  orcid: "https://orcid.org/0009-0003-0435-181X",
  github: "https://github.com/n-fujie",
  philpapers: "https://philpapers.org/profile/240588",
  /** Social links supplied by the author. */
  social: [
    { label: "X / @philailab", url: "https://x.com/philailab" },
    { label: "Patreon / xenoantiphilosophy", url: "https://www.patreon.com/cw/xenoantiphilosophy" },
  ],
};
