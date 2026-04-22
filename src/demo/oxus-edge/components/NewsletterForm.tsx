
import { useState } from "react";

export default function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex items-center justify-center gap-2 py-3 text-success text-sm font-medium">
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        You&apos;re on the list. We&apos;ll email you before the next drop.
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto">
      <label htmlFor="newsletter-email" className="sr-only">Email address for drop notifications</label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="your@email.com"
        autoComplete="email"
        className="flex-1 text-center sm:text-left px-4 py-3 bg-bg-medium border border-border rounded-[2px] text-sm text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-ember/50 transition-colors"
      />
      <button
        onClick={() => setSubmitted(true)}
        className="px-8 py-3.5 bg-ember text-white font-display text-[0.68rem] font-semibold tracking-[0.12em] uppercase rounded-[2px] hover:bg-ember-light transition-all cursor-pointer"
      >
        Notify Me
      </button>
    </div>
  );
}
