export type CertificationStatus = "earned" | "upcoming";

export interface Certification {
  title: string;
  date: string;
  keyPoints: string[];
  /** Optional logo URL. Falls back to the Award icon when absent. */
  icon?: string;
  /** Same logo for dark mode if the light-mode variant doesn't read well. */
  iconDark?: string;
  /** Set on dark mode if the icon is a solid black mark that should invert. */
  invertOnDark?: boolean;
  /** Local PDF path (drop the file in /public/certs/ and reference it as "/certs/foo.pdf"). */
  pdfUrl?: string;
  /** Static PNG of the PDF's first page, used as the inline preview. Locks the
   *  preview's dimensions so opening the card can't trigger a layout shift, and
   *  removes the async iframe paint that previously felt jumpy. Generate with
   *  `pdftocairo -png -f 1 -l 1 -r 150 -singlefile <pdf> public/cert-previews/<slug>`. */
  previewImage?: string;
  /** External verification URL — issuer's badge page or credential ID lookup. */
  verifyUrl?: string;
  /** "upcoming" hides the export button and shows an "In Progress" badge instead. Defaults to "earned". */
  status?: CertificationStatus;
}
