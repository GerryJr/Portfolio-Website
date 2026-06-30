import type { Project, TechIcon as TechIconType } from "@/types/project";

/** Category keys used across the two display surfaces.
 *  Overview merges languages + frameworks into "stack"; Deep Dive keeps
 *  them split as "lang" / "framework". Both surfaces share the rest. */
export type TechCategory =
  | "lang"
  | "framework"
  | "stack"
  | "cloud"
  | "database"
  | "api"
  | "integration"
  | "tool";

export const CATEGORY_LABELS: Record<TechCategory, string> = {
  lang: "Languages",
  framework: "Frameworks",
  stack: "Stack",
  cloud: "Cloud & Infra",
  database: "Database",
  api: "APIs",
  integration: "Integrations",
  tool: "Tools",
};

/** Row order on the Overview card (Languages + Frameworks merged). */
export const CATEGORY_ORDER: TechCategory[] = [
  "stack",
  "cloud",
  "database",
  "api",
  "integration",
  "tool",
];

/** Row order in the Deep Dive overlay (Languages + Frameworks split). */
export const DEEP_CATEGORY_ORDER: TechCategory[] = [
  "lang",
  "framework",
  "cloud",
  "database",
  "api",
  "integration",
  "tool",
];

export const CATEGORY_COLOR_CLASS: Record<TechCategory, string> = {
  lang: "text-[hsl(220_30%_30%)] dark:text-[hsl(220_65%_72%)]",
  framework: "text-[hsl(262_50%_42%)] dark:text-[hsl(262_70%_75%)]",
  stack: "text-[hsl(220_30%_30%)] dark:text-[hsl(220_65%_72%)]",
  cloud: "text-[hsl(28_80%_38%)] dark:text-[hsl(34_90%_65%)]",
  database: "text-[hsl(199_70%_32%)] dark:text-[hsl(199_75%_65%)]",
  api: "text-[hsl(155_55%_28%)] dark:text-[hsl(155_55%_60%)]",
  integration: "text-[hsl(178_55%_30%)] dark:text-[hsl(178_55%_62%)]",
  tool: "text-[hsl(220_8%_40%)] dark:text-[hsl(220_12%_70%)]",
};

const LANG_NAMES = new Set([
  "TypeScript", "JavaScript", "Python", "R", "C#", "HTML5", "CSS3",
  "Java", "Go", "Rust", "Ruby", "C++", "PHP", "Swift", "Kotlin", "MATLAB",
]);
const FRAMEWORK_NAMES = new Set([
  "React", "Expo", "Next.js", "Vue", "Svelte", "Express", "Flask", "Streamlit",
  "Bootstrap", "Vite", "Node.js", "Pandas", "NumPy", "SQLAlchemy",
]);
const CLOUD_NAMES = new Set([
  "AWS", "Lambda", "Cognito", "API Gateway", "S3", "Bedrock", "CDK", "Cloud Watch",
  "Docker", "Kubernetes", "Google Cloud", "Cloudflare", "Vercel", "Supabase",
  "Terraform", "Sentry", "GitHub Actions",
]);
const DB_NAMES = new Set([
  "PostgreSQL", "PostgreSQL (Supabase)", "MongoDB", "DynamoDB", "SQLite", "MySQL",
  "Redis", "Cloudflare Workers KV",
]);
const TOOL_NAMES = new Set([
  "Postman", "VS Code", "PyCharm", "Jupyter", "RStudio", "Git", "GitHub",
  "Playwright", "Vitest", "Google Colab", "SolidWorks", "Wix",
]);

/** Overview categorizer: collapses languages + frameworks into "stack". */
export const getTechCategory = (name: string): TechCategory => {
  if (LANG_NAMES.has(name) || FRAMEWORK_NAMES.has(name)) return "stack";
  if (CLOUD_NAMES.has(name)) return "cloud";
  if (DB_NAMES.has(name)) return "database";
  if (TOOL_NAMES.has(name)) return "tool";
  if (name.toLowerCase().includes("api")) return "api";
  return "tool";
};

/** Deep Dive categorizer: keeps languages and frameworks as distinct rows. */
export const getTechCategoryDeep = (name: string): TechCategory => {
  if (LANG_NAMES.has(name)) return "lang";
  if (FRAMEWORK_NAMES.has(name)) return "framework";
  if (CLOUD_NAMES.has(name)) return "cloud";
  if (DB_NAMES.has(name)) return "database";
  if (TOOL_NAMES.has(name)) return "tool";
  if (name.toLowerCase().includes("api")) return "api";
  return "tool";
};

/** Name-based categorizer used by Deep Dive, which pre-flattens its tech
 *  list before passing in. Splits languages from frameworks and iterates
 *  DEEP_CATEGORY_ORDER so the resulting rows appear lang → framework → … */
export const categorize = (
  items: TechIconType[],
): { cat: TechCategory; items: TechIconType[] }[] => {
  const map = new Map<TechCategory, TechIconType[]>();
  items.forEach((t) => {
    const c = getTechCategoryDeep(t.name);
    if (!map.has(c)) map.set(c, []);
    map.get(c)!.push(t);
  });
  return DEEP_CATEGORY_ORDER
    .filter((c) => map.has(c))
    .map((c) => ({ cat: c, items: map.get(c)! }));
};

/** TechIcon with an optional small mono meta string (e.g., "REL"). */
export interface CategorizedIcon extends TechIconType {
  meta?: string;
}

const stripParens = (s: string): string => s.replace(/\s*\(.+\)$/, "").trim();

/** Merge stackIcons + databases + apis + integrations into one deduped list.
 *  Used for the flat (uncategorized) state of the Overview card. */
export function flattenProject(p: Project): TechIconType[] {
  const seen = new Set<string>();
  const out: TechIconType[] = [];
  const push = (t: TechIconType) => {
    const key = stripParens(t.name);
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ ...t, name: key });
  };
  p.stackIcons.forEach((t) => push(t));
  p.databases.forEach((d) =>
    push({
      name: d.name,
      icon: d.icon,
      iconDark: d.iconDark,
      invertOnDark: d.invertOnDark,
      svgPath: d.svgPath,
    }),
  );
  p.apis.forEach((a) =>
    push({
      name: a.name,
      icon: a.icon,
      iconDark: a.iconDark,
      invertOnDark: a.invertOnDark,
      svgPath: a.svgPath,
    }),
  );
  p.integrations.forEach((i) =>
    push({
      name: i.name,
      icon: i.icon,
      iconDark: i.iconDark,
      invertOnDark: i.invertOnDark,
      svgPath: i.svgPath,
    }),
  );
  return out;
}

/** Categorize a project's full tech list into the Overview's six display
 *  rows. Typed arrays (databases / apis / integrations) are authoritative
 *  for their categories; stackIcons that duplicate them are skipped, and
 *  stack items whose name resolves to a typed category are filtered out so
 *  the buckets only contain declared services. */
export function categorizeProject(
  p: Project,
): { cat: TechCategory; items: CategorizedIcon[] }[] {
  const buckets = new Map<TechCategory, CategorizedIcon[]>();
  const ownedByTyped = new Set<string>();

  const add = (cat: TechCategory, item: CategorizedIcon) => {
    if (!buckets.has(cat)) buckets.set(cat, []);
    buckets.get(cat)!.push(item);
  };

  p.databases.forEach((d) => {
    const name = stripParens(d.name);
    ownedByTyped.add(name);
    add("database", {
      name,
      icon: d.icon,
      iconDark: d.iconDark,
      invertOnDark: d.invertOnDark,
      svgPath: d.svgPath,
      meta: d.type === "Relational" ? "REL" : "NON-REL",
    });
  });
  p.apis.forEach((a) => {
    ownedByTyped.add(a.name);
    add("api", {
      name: a.name,
      icon: a.icon,
      iconDark: a.iconDark,
      invertOnDark: a.invertOnDark,
      svgPath: a.svgPath,
    });
  });
  p.integrations.forEach((i) => {
    ownedByTyped.add(i.name);
    add("integration", {
      name: i.name,
      icon: i.icon,
      iconDark: i.iconDark,
      invertOnDark: i.invertOnDark,
      svgPath: i.svgPath,
    });
  });

  p.stackIcons.forEach((t) => {
    if (ownedByTyped.has(stripParens(t.name))) return;
    const cat = getTechCategory(t.name);
    if (cat === "database" || cat === "api" || cat === "integration") return;
    add(cat, t);
  });

  return CATEGORY_ORDER
    .filter((c) => buckets.has(c))
    .map((c) => ({ cat: c, items: buckets.get(c)! }));
}
