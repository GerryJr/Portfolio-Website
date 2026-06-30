import type { ScopeType } from "@/types/project";
import { Database, Layers, Monitor, Server } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Canonical scope color system used across Projects filter chips,
 * ProjectCard scope tags, and anywhere else a scope is rendered.
 *
 * Kept here so the chip/tag/dot variants don't drift between surfaces.
 * Uses Tailwind's palette directly (rather than the --scope-* CSS tokens)
 * because Tailwind's palette ships well-tuned light/dark variants and lets
 * us hit AA contrast for both the muted chip text and the solid active fill.
 */
export const SCOPE_COLORS: Record<ScopeType, {
  /** Muted chip — used when the scope is not active. */
  chip: string;
  /** Solid filled chip — used when the scope is the active filter. */
  active: string;
  /** Solid dot — used for the small indicator inside the ScopeTag. */
  dot: string;
}> = {
  "Full Stack": {
    chip: "bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-400/30",
    active: "bg-violet-500 text-white border-violet-500",
    dot: "bg-violet-500",
  },
  "Frontend": {
    chip: "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-400/30",
    active: "bg-sky-500 text-white border-sky-500",
    dot: "bg-sky-500",
  },
  "Backend": {
    chip: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-400/30",
    active: "bg-amber-500 text-white border-amber-500",
    dot: "bg-amber-500",
  },
  "Data": {
    chip: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-400/30",
    active: "bg-emerald-500 text-white border-emerald-500",
    dot: "bg-emerald-500",
  },
};

export const SCOPE_ICONS: Record<ScopeType, LucideIcon> = {
  "Full Stack": Layers,
  "Frontend": Monitor,
  "Backend": Server,
  "Data": Database,
};

export const SCOPES: ScopeType[] = ["Full Stack", "Frontend", "Backend", "Data"];
