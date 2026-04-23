import { useState, useEffect } from "react";
import CountdownTimer from "@/demo/oxus-edge/components/CountdownTimer";
import { useDropState } from "@/demo/oxus-edge/components/DropProvider";

export default function KnivesHeroBanner() {
  const { mode, activeDrop, upcomingDrop } = useDropState();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (mode === "none") return null;

  // ── LIVE ─────────────────────────────────────────────────────
  if (mode === "live" && activeDrop) {
    const remaining = activeDrop.totalUnits - activeDrop.totalSold;
    const soldOut = remaining <= 0;
    return (
      <>
        {/* Mobile — editorial two-row */}
        <div className="sm:hidden w-full bg-black/40 backdrop-blur-sm border-l-2 border-ember/70 rounded-[2px] pl-4 pr-4 py-3">
          <div className="flex items-center justify-between gap-3 mb-1">
            <span className="inline-flex items-center gap-1.5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse-live" />
              <span className="text-[0.55rem] font-display font-semibold tracking-[0.22em] uppercase text-ember">Live</span>
            </span>
            <span className="text-[0.7rem] tabular-nums text-text-muted shrink-0">
              {soldOut ? "Sold out" : `${remaining} / ${activeDrop.totalUnits}`}
            </span>
          </div>
          <p className="font-display text-[0.9rem] text-white tracking-[0.03em] truncate">{activeDrop.name}</p>
        </div>

        {/* Desktop — original pill */}
        <div className="hidden sm:flex items-center gap-4 bg-black/40 backdrop-blur-sm px-5 py-3 rounded-[2px] max-w-full">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-ember animate-pulse-live" />
            <span className="text-ember text-[0.65rem] font-bold tracking-[0.1em] uppercase font-display">Live</span>
          </span>
          <div className="h-5 w-px bg-white/20" />
          <div className="min-w-0">
            <p className="text-white text-[0.8rem] font-display tracking-[0.02em] truncate">{activeDrop.name}</p>
            <p className="text-white/50 text-[0.65rem] tabular-nums">
              {soldOut ? "Sold out" : `${remaining} of ${activeDrop.totalUnits} remaining`}
            </p>
          </div>
        </div>
      </>
    );
  }

  // ── COMPLETED ────────────────────────────────────────────────
  if (mode === "completed" && activeDrop) {
    return (
      <>
        {/* Mobile — editorial two-row */}
        <div className="sm:hidden w-full bg-black/40 backdrop-blur-sm border-l-2 border-text-muted/40 rounded-[2px] px-4 py-3">
          <span className="text-[0.55rem] font-display font-semibold tracking-[0.22em] uppercase text-text-muted block mb-1">
            Drop Ended
          </span>
          <p className="font-display text-[0.9rem] text-white/80 tracking-[0.03em] truncate">{activeDrop.name}</p>
        </div>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-3 bg-black/40 backdrop-blur-sm px-5 py-3 rounded-[2px] max-w-full">
          <p className="text-text-muted text-[0.65rem] font-bold tracking-[0.1em] uppercase font-display">Drop Ended</p>
          <div className="h-5 w-px bg-white/20" />
          <p className="text-white text-[0.78rem] font-display truncate">{activeDrop.name}</p>
        </div>
      </>
    );
  }

  // ── UPCOMING ─────────────────────────────────────────────────
  if (mode === "upcoming" && upcomingDrop) {
    const dropDate = new Date(upcomingDrop.scheduledAt);
    const isStillUpcoming = mounted ? dropDate.getTime() > Date.now() : true;

    // Drop date has passed — render a terse "Newest Drop" callout
    if (!isStillUpcoming) {
      return (
        <>
          <div className="sm:hidden w-full bg-black/40 backdrop-blur-sm border-l-2 border-ember/70 rounded-[2px] px-4 py-3">
            <span className="text-[0.55rem] font-display font-semibold tracking-[0.22em] uppercase text-ember block mb-1">
              Newest Drop
            </span>
            <p className="font-display text-[0.9rem] text-white tracking-[0.03em] truncate">{upcomingDrop.name}</p>
          </div>

          <div className="hidden sm:flex items-center gap-3 bg-black/40 backdrop-blur-sm px-5 py-3 rounded-[2px] max-w-full">
            <p className="text-ember text-[0.65rem] font-bold tracking-[0.1em] uppercase font-display">Newest Drop</p>
            <div className="h-5 w-px bg-white/20" />
            <p className="text-white text-[0.78rem] font-display truncate">{upcomingDrop.name}</p>
          </div>
        </>
      );
    }

    // Full countdown
    return (
      <>
        {/* Mobile — editorial two-row: label + inline countdown, name below */}
        <div className="sm:hidden w-full bg-black/40 backdrop-blur-sm border-l-2 border-ember/70 rounded-[2px] px-4 py-3">
          <div className="flex items-baseline justify-between gap-3 mb-1">
            <span className="text-[0.55rem] font-display font-semibold tracking-[0.22em] uppercase text-text-muted shrink-0">
              Next Drop
            </span>
            <CountdownTimer targetDate={dropDate} size="inline" />
          </div>
          <p className="font-display text-[0.9rem] text-white tracking-[0.03em] truncate">{upcomingDrop.name}</p>
        </div>

        {/* Desktop — original pill with multi-block countdown */}
        <div className="hidden sm:flex items-center gap-4 bg-black/40 backdrop-blur-sm px-5 py-3 rounded-[2px] max-w-full">
          <div className="min-w-0">
            <p className="text-white/70 text-[0.65rem] tracking-[0.12em] uppercase font-display mb-1">Next Drop</p>
            <p className="text-white text-[0.78rem] font-display tracking-[0.02em] truncate">{upcomingDrop.name}</p>
          </div>
          <div className="h-8 w-px bg-white/20" />
          <CountdownTimer targetDate={dropDate} size="sm" />
        </div>
      </>
    );
  }

  return null;
}
