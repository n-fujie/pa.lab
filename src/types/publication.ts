export type Publication = {
  id: string;
  title: string;
  authors: string[];
  /** Only the year is verified for the current records; never pad it to a full date. */
  publicationDate: string | null;
  publicationType: "preprint" | "book" | "archive-record";
  venue: string;
  peerReviewed: false | null;
  abstract: string | null;
  /** The abstract shown is the author's own listing blurb, not the paper abstract. */
  abstractSource: "author-listing" | null;
  doi: string | null;
  canonicalUrl: string | null;
  version: string | null;
  correctionStatus: string | null;
  representative: boolean;
  relatedProjects: string[];
  sources: string[];
};
