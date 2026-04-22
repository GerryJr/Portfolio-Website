
import { useState } from "react";

export default function ShareButton({ name, className }: { name: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    // Use native share if available (mobile)
    if (navigator.share) {
      try {
        await navigator.share({ title: `${name} — Oxus Edge`, url });
        return;
      } catch { /* user cancelled or not supported */ }
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  return (
    <button
      onClick={handleShare}
      className={`inline-flex items-center gap-2 text-xs text-text-muted hover:text-ember transition-colors cursor-pointer ${className || ""}`}
      aria-label={`Share ${name}`}
    >
      {copied ? (
        <>
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-success" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Link copied
        </>
      ) : (
        <>
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          Share
        </>
      )}
    </button>
  );
}
