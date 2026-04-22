
import { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

const KNIFE_FAQ: FAQItem[] = [
  { q: "How do I care for my knife?", a: "Wipe the blade dry after each use. Apply a thin coat of knife oil every few weeks. Store in a sheath or on a magnetic strip — never loose in a drawer." },
  { q: "What steel do you use?", a: "It depends on the family. Our Damascus collection uses 256-layer 1095/15N20 Damascus. The Ridgeline series uses CPM-S35VN or CPM-154. Every blade is heat-treated and tempered in-house." },
  { q: "Do you offer sharpening?", a: "We offer a lifetime sharpening service for any Oxus Edge blade. Ship it to us and we'll restore the factory edge at no charge — you only pay return shipping." },
  { q: "What is a limited drop?", a: "Each batch of knives is forged as a small run. When a drop goes live, the available units are first-come, first-served. Once sold out, that run is gone until the next batch." },
  { q: "What's your return policy?", a: "We accept returns within 30 days of delivery for unused knives in original packaging. Handmade items may have slight natural variations — that's part of the craft, not a defect." },
];

const GENERAL_FAQ: FAQItem[] = [
  { q: "How long does shipping take?", a: "Orders ship within 1–2 business days. Standard delivery takes 3–5 business days. Express options are available at checkout." },
  { q: "Do you ship internationally?", a: "Not yet — we currently ship within the US only. We're working on expanding to Canada and select EU countries." },
  { q: "Can I cancel or modify my order?", a: "You can contact us within 1 hour of placing your order to request changes. Once an order enters fulfillment, it cannot be modified." },
];

export default function FAQ({ category }: { category: string }) {
  const items = category === "knives" ? KNIFE_FAQ : GENERAL_FAQ;

  return (
    <div className="mt-16">
      <h2 className="font-display text-lg tracking-[0.06em] mb-6 flex items-center gap-3">
        <span>Common Questions</span>
        <span className="flex-1 h-px bg-border" />
      </h2>
      <div className="space-y-0 border border-border rounded-[2px] overflow-hidden">
        {items.map((item, i) => (
          <FAQAccordion key={i} item={item} defaultOpen={i === 0} isLast={i === items.length - 1} />
        ))}
      </div>
    </div>
  );
}

function FAQAccordion({ item, defaultOpen, isLast }: { item: FAQItem; defaultOpen: boolean; isLast: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={!isLast ? "border-b border-border" : ""}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer hover:bg-bg-medium/50 transition-colors"
        aria-expanded={open}
      >
        <span className="text-sm font-medium">{item.q}</span>
        <svg
          viewBox="0 0 24 24"
          className={`w-4 h-4 text-text-muted shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        className={`grid transition-all duration-200 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-4 text-sm text-text-secondary leading-[1.7]">{item.a}</p>
        </div>
      </div>
    </div>
  );
}
