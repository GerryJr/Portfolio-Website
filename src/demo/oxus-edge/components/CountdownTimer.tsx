
import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: Date;
  size?: "lg" | "sm" | "inline";
}

export default function CountdownTimer({ targetDate, size = "lg" }: CountdownTimerProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft(targetDate));
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const isExpired = mounted && timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.mins === 0 && timeLeft.secs === 0;

  // Inline variant: single-line "10d 19h 42m" for compact mobile layouts.
  if (size === "inline") {
    if (isExpired) {
      return (
        <span className="font-display text-[0.82rem] font-semibold text-ember tabular-nums">
          Live now
        </span>
      );
    }
    return (
      <span
        className="text-[0.82rem] font-semibold tabular-nums text-ember whitespace-nowrap shrink-0"
        role="timer"
        aria-live="off"
        aria-label={mounted ? `${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.mins} minutes until drop` : "Countdown loading"}
        suppressHydrationWarning
      >
        {mounted ? (
          <>
            {timeLeft.days > 0 && (
              <>
                {timeLeft.days}
                <span className="text-text-muted font-normal ml-px mr-1">d</span>
              </>
            )}
            {String(timeLeft.hours).padStart(2, "0")}
            <span className="text-text-muted font-normal ml-px mr-1">h</span>
            {String(timeLeft.mins).padStart(2, "0")}
            <span className="text-text-muted font-normal ml-px">m</span>
          </>
        ) : (
          "—"
        )}
      </span>
    );
  }

  const numClass = size === "lg" ? "text-[2rem]" : "text-[1.3rem]";
  const labelText = size === "lg";

  if (isExpired) {
    return (
      <div className={`font-display ${numClass} font-semibold text-ember leading-none`}>
        Drop is Live!
      </div>
    );
  }

  return (
    <div className="flex gap-4" role="timer" aria-live="off" aria-label={mounted ? `${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.mins} minutes until drop` : "Countdown loading"}>
      {[
        { val: timeLeft.days, label: labelText ? "Days" : "D" },
        { val: timeLeft.hours, label: labelText ? "Hours" : "H" },
        { val: timeLeft.mins, label: labelText ? "Minutes" : "M" },
        { val: timeLeft.secs, label: labelText ? "Seconds" : "S" },
      ].map((unit) => (
        <div key={unit.label} className="text-center" style={{ minWidth: size === "lg" ? 60 : "auto" }}>
          <div className={`font-display ${numClass} font-semibold text-copper leading-none tabular-nums`} suppressHydrationWarning>
            {mounted ? String(unit.val).padStart(2, "0") : "--"}
          </div>
          <div className="text-[0.65rem] tracking-[0.15em] uppercase text-text-muted mt-1">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function getTimeLeft(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    secs: Math.floor((diff % (1000 * 60)) / 1000),
  };
}
