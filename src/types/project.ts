export interface TechIcon {
  name: string;
  svgPath?: string;
  icon?: string;
  iconDark?: string;
  invertOnDark?: boolean;
  years?: number;
  docUrl?: string;
}

/** An API / external service with a plain-English reason it was used. */
export interface ApiUsage {
  name: string;
  purpose: string; // recruiter-friendly, e.g. "Processed customer payments"
  icon?: string;
  iconDark?: string;
  invertOnDark?: boolean;
  svgPath?: string;
}

export type ScopeType = "Full Stack" | "Frontend" | "Backend" | "Data";
export type DatabaseType = "Relational" | "Non-Relational";

/** Filterable tags for recruiter filtering. */
export type FilterTag =
  // Platforms
  | "AWS" | "Google Cloud" | "Cloudflare" | "Supabase"
  // Languages
  | "Python" | "JavaScript / TypeScript" | "R"
  // Frameworks
  | "React" | "Mobile";

export interface DatabaseUsage {
  name: string;
  type: DatabaseType;
  icon?: string;
  iconDark?: string;
  invertOnDark?: boolean;
  svgPath?: string;
}

export interface Project {
  id: string;
  title: string; // keep short — wraps on cards; aim for ~1 short line
  whatItIs: string; // 1-sentence subtitle shown on the card
  employer?: string; // Company/organization name (commissions leave blank or use `client` instead)
  client?: string; // Commissions only — paying client name (e.g., "Kristen Fitness")
  role: string;
  date: string; // Project completion date (e.g., "March 2024")
  /** Mono meta line shown on Commissions timeline (e.g., "FEB 2026 → PRESENT"). Derived from `date` if absent. */
  dateLabel?: string;
  image: string; // Project screenshot/visual
  thumbnail?: string; // Optional 16:10 thumbnail for the Commissions timeline (falls back to `image`)
  stackIcons: TechIcon[];
  apis: ApiUsage[]; // True external APIs you call over HTTP
  integrations: ApiUsage[]; // SDKs, device APIs, platform integrations (not HTTP APIs)
  databases: DatabaseUsage[]; // Databases used, with relational/non-relational type
  tags: FilterTag[]; // Filterable platform/tech tags
  teamSize: "Solo" | "Team"; // Solo developer or team collaboration
  scopeType: ScopeType; // What kind of work was done
  /** 1-2 sentence plain-English summary for non-technical readers */
  recruiterSummary: string;
  challenges: [string] | [string, string] | [string, string, string] | [string, string, string, string]; // 1–4 items (max enforced by the tuple type); keep each to ~1 line
  impact: string; // 1 line, ideally with a real metric — rendered on the overview card
  /** Personal-learning sentence rendered as the final block in the deep-dive.
   *  Different framing from `impact`: this is "the biggest thing I took away
   *  from building it", not "what got shipped". Optional — deep-dive hides
   *  the section if absent. */
  takeaway?: string;
  links: {
    live?: string;
    repo?: string;
    demo?: string;
    private?: string;
  };
}

/** Compute human-readable duration from a date range like "Mar 2024 - Jun 2025" */
export function computeDuration(dateRange: string): string {
  const parts = dateRange.split(" - ");
  if (parts.length !== 2) return "";

  const parseDate = (s: string): Date | null => {
    const trimmed = s.trim();
    if (trimmed === "Present") return new Date();
    const d = new Date(trimmed + " 1");
    return isNaN(d.getTime()) ? null : d;
  };

  const start = parseDate(parts[0]);
  const end = parseDate(parts[1]);
  if (!start || !end) return "";

  const totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
  if (totalMonths < 1) return "";
  if (totalMonths < 12) return `${totalMonths} mo`;
  const years = Math.floor(totalMonths / 12);
  const remaining = totalMonths % 12;
  if (remaining === 0) return `${years} yr`;
  return `${years} yr ${remaining} mo`;
}

// Validation helper
export function validateProject(project: Project): boolean {
  if (project.challenges.length > 4) {
    if (import.meta.env.DEV) {
      console.error(`Project ${project.id}: challenges cannot have more than 4 items`);
    }
    return false;
  }
  return true;
}

const MONTH_ABBREVS: Record<string, string> = {
  january: "Jan", february: "Feb", march: "Mar", april: "Apr",
  may: "May", june: "Jun", july: "Jul", august: "Aug",
  september: "Sep", october: "Oct", november: "Nov", december: "Dec",
};

/** Convert a `date` like "Feb 2026 - Present" to the mono label "FEB 2026 → PRESENT". */
export function formatDateLabel(date: string): string {
  const parts = date.split(/\s*-\s*/);
  const normalize = (s: string) => {
    const trimmed = s.trim();
    const lower = trimmed.toLowerCase();
    if (MONTH_ABBREVS[lower]) return MONTH_ABBREVS[lower].toUpperCase();
    return trimmed.toUpperCase();
  };
  return parts.map(normalize).join(" → ");
}

/** Pull the most relevant year from a project for grouping (uses `dateLabel` first, then `date`). */
export function extractYear(project: Project): number {
  const source = project.dateLabel ?? project.date ?? "";
  const matches = source.match(/\b(20\d{2})\b/g);
  if (!matches || matches.length === 0) return new Date().getFullYear();
  // Use the earliest year mentioned so "Aug 2025 → Mar 2026" groups under 2025 —
  // the year the work began. Matches DeepDiveTimeline's `dateYear` (which reads the
  // head of the range) so Projects and Commissions group consistently.
  return Math.min(...matches.map(Number));
}

/** Group projects by year (descending), used by the Commissions timeline. */
export function groupByYear(items: Project[]): { year: number; items: Project[] }[] {
  const map = new Map<number, Project[]>();
  items.forEach((p) => {
    const y = extractYear(p);
    if (!map.has(y)) map.set(y, []);
    map.get(y)!.push(p);
  });
  return Array.from(map.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([year, items]) => ({ year, items }));
}
