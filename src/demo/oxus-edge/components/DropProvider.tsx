
import { createContext, useContext, useEffect, useState } from "react";
import type { Drop, UpcomingRelease } from "@/demo/oxus-edge/data/types";
import type { ResolvedProduct } from "@/demo/oxus-edge/api/helpers";

export type DropMode = "live" | "upcoming" | "completed" | "none";

export interface DropState {
  activeDrop: Drop | null;
  activeKnife: ResolvedProduct | null;
  upcomingDrop: UpcomingRelease | null;
  upcomingKnife: ResolvedProduct | null;
  /** Effective mode after Studio overrides (or auto based on data). */
  mode: DropMode;
  /** True when the user has picked a non-auto value in Studio. */
  isOverridden: boolean;
}

const EMPTY: DropState = {
  activeDrop: null,
  activeKnife: null,
  upcomingDrop: null,
  upcomingKnife: null,
  mode: "none",
  isOverridden: false,
};

const DropContext = createContext<DropState>(EMPTY);

export function useDropState(): DropState {
  return useContext(DropContext);
}

interface ProviderProps {
  activeDrop: Drop | null;
  activeKnife: ResolvedProduct | null;
  upcomingDrop: UpcomingRelease | null;
  upcomingKnife: ResolvedProduct | null;
  children: React.ReactNode;
}

/**
 * Single source of truth for drop state. Mount once near the root; every
 * consumer reads via useDropState() — no more per-component observers
 * or STORE_CONFIG reads that can drift.
 */
export default function DropProvider({
  activeDrop,
  activeKnife,
  upcomingDrop,
  upcomingKnife,
  children,
}: ProviderProps) {
  const [override, setOverride] = useState<string | null>(null);

  useEffect(() => {
    const root = document.querySelector(".oxus-edge") as HTMLElement | null;
    if (!root) return;
    const read = () => {
      const val = root.getAttribute("data-drop-state");
      setOverride(val === "auto" || val == null ? null : val);
    };
    read();
    const obs = new MutationObserver(read);
    obs.observe(root, { attributes: true, attributeFilter: ["data-drop-state"] });
    return () => obs.disconnect();
  }, []);

  const autoMode: DropMode = activeDrop ? "live" : upcomingDrop ? "upcoming" : "none";
  const mode: DropMode =
    override === "live" ? "live"
    : override === "completed" ? "completed"
    : override === "upcoming" ? "upcoming"
    : override === "none" ? "none"
    : autoMode;

  const value: DropState = {
    activeDrop,
    activeKnife,
    upcomingDrop,
    upcomingKnife,
    mode,
    isOverridden: override !== null,
  };

  return <DropContext.Provider value={value}>{children}</DropContext.Provider>;
}
