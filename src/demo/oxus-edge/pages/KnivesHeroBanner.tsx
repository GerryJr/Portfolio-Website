
import { useState, useEffect } from "react";
import CountdownTimer from "@/demo/oxus-edge/components/CountdownTimer";
import { useDropState } from "@/demo/oxus-edge/components/DropProvider";

export default function KnivesHeroBanner() {
  const { mode, activeDrop, upcomingDrop } = useDropState();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (mode === "none") return null;

  if (mode === "live" && activeDrop) {
    const remaining = activeDrop.totalUnits - activeDrop.totalSold;
    const soldOut = remaining <= 0;
    return (
      <div className="flex items-center gap-4 bg-black/40 backdrop-blur-sm px-5 py-3 rounded-[2px]">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-ember animate-pulse-live" />
          <span className="text-ember text-[0.65rem] font-bold tracking-[0.1em] uppercase font-display">Live</span>
        </span>
        <div className="h-5 w-px bg-white/20" />
        <div>
          <p className="text-white text-[0.8rem] font-display tracking-[0.02em]">{activeDrop.name}</p>
          <p className="text-white/50 text-[0.65rem] tabular-nums">
            {soldOut ? "Sold out" : `${remaining} of ${activeDrop.totalUnits} remaining`}
          </p>
        </div>
      </div>
    );
  }

  if (mode === "completed" && activeDrop) {
    return (
      <div className="flex items-center gap-3 bg-black/40 backdrop-blur-sm px-5 py-3 rounded-[2px]">
        <p className="text-text-muted text-[0.65rem] font-bold tracking-[0.1em] uppercase font-display">Drop Ended</p>
        <div className="h-5 w-px bg-white/20" />
        <p className="text-white text-[0.78rem] font-display">{activeDrop.name}</p>
      </div>
    );
  }

  if (mode === "upcoming" && upcomingDrop) {
    const dropDate = new Date(upcomingDrop.scheduledAt);
    const isStillUpcoming = mounted ? dropDate.getTime() > Date.now() : true;
    if (!isStillUpcoming) {
      return (
        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-sm px-5 py-3 rounded-[2px]">
          <p className="text-ember text-[0.65rem] font-bold tracking-[0.1em] uppercase font-display">Newest Drop</p>
          <div className="h-5 w-px bg-white/20" />
          <p className="text-white text-[0.78rem] font-display">{upcomingDrop.name}</p>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-4 bg-black/40 backdrop-blur-sm px-5 py-3 rounded-[2px]">
        <div>
          <p className="text-white/70 text-[0.65rem] tracking-[0.12em] uppercase font-display mb-1">Next Drop</p>
          <p className="text-white text-[0.78rem] font-display tracking-[0.02em]">{upcomingDrop.name}</p>
        </div>
        <div className="h-8 w-px bg-white/20" />
        <CountdownTimer targetDate={dropDate} size="sm" />
      </div>
    );
  }

  return null;
}
