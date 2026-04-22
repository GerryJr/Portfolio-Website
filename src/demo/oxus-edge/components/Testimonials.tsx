const TESTIMONIALS = [
  {
    name: "Jake M.",
    location: "Asheville, NC",
    text: "The Damascus Hunter is the best knife I've ever owned. The balance, the edge retention, the way the burl handle fits your hand — it's clear this was made by someone who actually uses knives.",
    rating: 5,
    product: "Damascus Hunter",
  },
  {
    name: "Sarah K.",
    location: "Denver, CO",
    text: "I bought the Ridgeline Bushcraft for a backpacking trip and it exceeded every expectation. Batoned through hardwood, prepped dinner, and the edge barely needed a touch-up after a week.",
    rating: 5,
    product: "Ridgeline Bushcraft",
  },
  {
    name: "Marcus T.",
    location: "Portland, OR",
    text: "Gave the Heritage Trapper to my father as a retirement gift. He called it the most beautiful thing he'd ever held. The bone handle and the hidden tang — just gorgeous craftsmanship.",
    rating: 5,
    product: "Heritage Trapper",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`w-3.5 h-3.5 ${i < count ? "text-amber" : "text-text-muted/30"}`}
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section data-section className="py-24 bg-depth-noir" style={{ '--s-bg': 'var(--color-depth-noir)', '--s-next': 'var(--color-depth-grounds)' } as React.CSSProperties}>
      <div className="s-inner mx-auto max-w-[1280px] px-6">
        <div className="text-center mb-12">
          <p className="text-ember text-[0.75rem] font-semibold tracking-[0.25em] uppercase mb-2 font-display">What Customers Say</p>
          <h2 className="font-display text-[clamp(1.4rem,3vw,1.9rem)] font-medium tracking-[0.01em]">Trusted by Knife Enthusiasts</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-bg-card border border-border/50 rounded-[2px] p-6 flex flex-col">
              <Stars count={t.rating} />
              <p className="text-text-secondary text-[0.88rem] leading-[1.7] mt-4 flex-1">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-5 pt-4 border-t border-border/50">
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-xs text-text-muted">{t.location} · {t.product}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
