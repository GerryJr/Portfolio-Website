
import { useState, useEffect } from "react";
import Link from "@/demo/oxus-edge/lib/next-link";
import { useDropState } from "./DropProvider";

export default function AnnouncementBar() {
  const { mode, activeDrop, upcomingDrop } = useDropState();
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; mins: number; secs: number } | null>(null);

  const upcomingTimestamp = upcomingDrop ? new Date(upcomingDrop.scheduledAt).getTime() : 0;

  useEffect(() => {
    setMounted(true);
    if (!upcomingTimestamp || upcomingTimestamp <= Date.now()) return;
    const tick = () => {
      const diff = Math.max(0, upcomingTimestamp - Date.now());
      if (diff <= 0) { setTimeLeft(null); return; }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [upcomingTimestamp]);

  if (!mounted || dismissed) return null;
  if (mode === "none") return null;
  if (mode === "upcoming" && !upcomingDrop) return null;
  if ((mode === "live" || mode === "completed") && !activeDrop) return null;

  return (
    <div className="relative bg-ember/10 border-b border-ember/15 text-center px-10 py-2">
      {mode === "live" && activeDrop && (
        <p className="text-[0.75rem] text-text-primary tracking-wide">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse-live" />
            <span className="text-ember font-bold font-display tracking-[0.08em] uppercase">{activeDrop.name} is Live</span>
          </span>
          <span className="text-text-muted mx-2">·</span>
          <Link href="/knives" className="text-ember hover:text-ember-light underline underline-offset-2 transition-colors">
            Shop Now
          </Link>
        </p>
      )}

      {mode === "completed" && activeDrop && (
        <p className="text-[0.75rem] text-text-primary tracking-wide">
          <span className="inline-flex items-center gap-1.5">
            <span className="text-text-muted font-bold font-display tracking-[0.08em] uppercase">{activeDrop.name} — Drop Ended</span>
          </span>
          <span className="text-text-muted mx-2">·</span>
          <Link href="/knives" className="text-ember hover:text-ember-light underline underline-offset-2 transition-colors">
            See Recap
          </Link>
        </p>
      )}

      {mode === "upcoming" && upcomingDrop && (
        <p className="text-[0.75rem] text-text-primary tracking-wide flex items-center justify-center gap-2 flex-wrap">
          <span className="font-display tracking-[0.06em] uppercase">
            <span className="text-ember font-semibold">{upcomingDrop.name}</span>
            {" "}drops in
          </span>
          {timeLeft && (
            <span className="inline-flex items-center gap-1 font-semibold tabular-nums text-ember">
              {timeLeft.days > 0 && <>{timeLeft.days}d </>}
              {String(timeLeft.hours).padStart(2, "0")}h{" "}
              {String(timeLeft.mins).padStart(2, "0")}m{" "}
              {String(timeLeft.secs).padStart(2, "0")}s
            </span>
          )}
          <span className="text-text-muted">·</span>
          <Link href="/knives" className="text-ember hover:text-ember-light underline underline-offset-2 transition-colors">
            View Drop
          </Link>
        </p>
      )}

      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors cursor-pointer"
        aria-label="Dismiss announcement"
      >
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
