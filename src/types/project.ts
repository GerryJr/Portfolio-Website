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
  title: string; // ≤ 50 chars
  whatItIs: string; // ≤ 140 chars
  employer?: string; // Company/organization name
  role: string;
  date: string; // Project completion date (e.g., "March 2024")
  image: string; // Project screenshot/visual
  stackIcons: TechIcon[];
  apis: ApiUsage[]; // True external APIs you call over HTTP
  integrations: ApiUsage[]; // SDKs, device APIs, platform integrations (not HTTP APIs)
  databases: DatabaseUsage[]; // Databases used, with relational/non-relational type
  tags: FilterTag[]; // Filterable platform/tech tags
  teamSize: "Solo" | "Team"; // Solo developer or team collaboration
  scopeType: ScopeType; // What kind of work was done
  /** 1-2 sentence plain-English summary for non-technical readers */
  recruiterSummary: string;
  challenges: [string] | [string, string] | [string, string, string] | [string, string, string, string]; // At most 4, each ≤ 90 chars
  impact: string; // 1 line with a number
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
    console.error(`Project ${project.id}: challenges cannot have more than 4 items`);
    return false;
  }
  return true;
}
