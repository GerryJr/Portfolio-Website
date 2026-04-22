
import { useState, useEffect, useRef } from "react";

export default function CheckoutTimer() {
  const startRef = useRef(Date.now());
  const [secs, setSecs] = useState(582);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startRef.current) / 1000);
      setSecs(Math.max(0, 582 - elapsed));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timerStr = `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}`;
  const isUrgent = secs < 120;
  const isExpired = secs === 0;

  const colorClass = isUrgent ? "text-danger" : "text-ember";
  const borderClass = isUrgent ? "border-danger/20" : "border-ember/20";

  return (
    <div aria-live="polite" className={`flex items-center gap-2 px-5 py-3 bg-ember/15 border ${borderClass} rounded-none text-sm ${colorClass}`}>
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      <span>
        {isExpired ? (
          "Reservation expired. Items may no longer be held."
        ) : (
          <>Your items are reserved for <strong>{timerStr}</strong> — complete checkout to secure your order</>
        )}
      </span>
    </div>
  );
}
