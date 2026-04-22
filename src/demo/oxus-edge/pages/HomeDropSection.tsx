
import { useState } from "react";
import Image from "@/demo/oxus-edge/lib/next-image";
import Link from "@/demo/oxus-edge/lib/next-link";
import CountdownTimer from "@/demo/oxus-edge/components/CountdownTimer";
import { useDropState } from "@/demo/oxus-edge/components/DropProvider";

function variantSwatch(color: string, secondary?: string) {
  if (!secondary || secondary.toLowerCase() === color.toLowerCase()) return color;
  return `linear-gradient(135deg, ${color} 0 50%, ${secondary} 50% 100%)`;
}

export default function HomeDropSection() {
  const { mode, activeDrop, activeKnife, upcomingDrop, upcomingKnife } = useDropState();
  const [selectedVariant, setSelectedVariant] = useState(0);

  const isUpcoming = mode === "upcoming";
  const forceCompleted = mode === "completed";
  const knife = isUpcoming ? upcomingKnife : activeKnife;
  if (mode === "none" || !knife) return null;

  // Reset selection bounds if variant list changed between modes
  const variants = knife.variants ?? [];
  const safeSelected = Math.min(selectedVariant, Math.max(0, variants.length - 1));
  const currentVariant = variants[safeSelected];

  const activeTotal = activeDrop?.totalUnits ?? 0;
  const activeSold = activeDrop?.totalSold ?? 0;
  const remaining = forceCompleted ? 0 : activeTotal - activeSold;
  const soldOut = forceCompleted || (activeTotal > 0 && remaining <= 0);
  const pctSold = forceCompleted ? 100 : (activeTotal > 0 ? (activeSold / activeTotal) * 100 : 0);

  const scheduledAtStr = isUpcoming ? (upcomingDrop?.scheduledAt ?? knife.releaseAt) : null;
  const scheduledDate = scheduledAtStr ? new Date(scheduledAtStr) : null;

  const headerLabel = isUpcoming ? "Next Drop" : forceCompleted ? "Drop Completed" : "Drop Happening Now";
  const accentClass = forceCompleted ? "text-text-muted" : "text-ember";
  const dropName = isUpcoming ? upcomingDrop?.name : activeDrop?.name;
  const dropDescription = isUpcoming ? upcomingDrop?.description : activeDrop?.description;

  return (
    <section data-section className="py-24 bg-depth-roast" style={{ '--s-bg': 'var(--color-depth-roast)', '--s-next': 'var(--color-depth-espresso)' } as React.CSSProperties}>
      <div className="s-inner mx-auto max-w-[1280px] px-6">
      {/* Featured header — one clear state line */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <p className={`text-[0.7rem] font-semibold tracking-[0.25em] uppercase mb-2 font-display ${accentClass}`}>
            {headerLabel}
          </p>
          <h3 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-medium tracking-[0.01em]">
            {dropName || knife.name}
          </h3>
        </div>
        <div className="flex items-center gap-3">
          {isUpcoming && scheduledDate ? (
            <>
              <span className="text-text-muted text-[0.65rem] tracking-[0.1em] uppercase font-display hidden sm:block">Drops in</span>
              <CountdownTimer targetDate={scheduledDate} size="sm" />
            </>
          ) : (
            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] ${forceCompleted ? "bg-bg-elevated/90" : "bg-ember/90"}`}>
              {!forceCompleted && <span className="w-2 h-2 rounded-full bg-white animate-pulse-live" />}
              <span className="text-white text-[0.65rem] font-bold tracking-[0.1em] uppercase font-display">
                {forceCompleted ? "Drop Ended" : "Drop Live"}
              </span>
            </span>
          )}
        </div>
      </div>

      {/* 2-column rich layout — same for Live and Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        {/* Image */}
        <div className="group relative">
          <div className="aspect-[3/4] rounded-[2px] overflow-hidden relative bg-bg-medium">
            <Image
              key={knife.img}
              src={knife.img}
              alt={knife.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`object-cover transition-all duration-700 ease-out group-hover:scale-[1.03] ${knife.imgHover ? "group-hover:opacity-0" : ""} ${isUpcoming ? "brightness-[0.88]" : ""}`}
            />
            {knife.imgHover && (
              <Image
                src={knife.imgHover}
                alt={`${knife.name} — alternate view`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={`object-cover opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100 ${isUpcoming ? "brightness-[0.88]" : ""}`}
              />
            )}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent" />
          </div>
          <div className={`absolute bottom-4 left-4 px-3 py-1.5 backdrop-blur-sm text-white text-[0.65rem] font-display font-semibold tracking-[0.1em] uppercase rounded-[2px] ${isUpcoming ? "bg-ember/90" : forceCompleted ? "bg-bg-elevated/90" : "bg-black/60"}`}>
            {isUpcoming && scheduledDate
              ? scheduledDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })
              : forceCompleted ? "Drop Ended" : "Live Now"}
          </div>
        </div>

        {/* Details */}
        <div className="lg:pt-6">
          <h4 className="font-display text-[clamp(1.4rem,2.5vw,1.9rem)] font-medium leading-snug mb-2">{knife.name}</h4>
          {knife.shortDescription && (
            <p className="text-text-muted text-[0.78rem] mb-5">{knife.shortDescription}</p>
          )}
          <p className="text-text-secondary text-[0.88rem] leading-[1.7] mb-8 max-w-lg">
            {dropDescription ?? knife.description}
          </p>

          {knife.specs && (
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                ["Steel", knife.specs["Blade Steel"]],
                ["Blade", knife.specs["Blade Length"]],
                ["Tang", knife.specs["Tang"]],
                ["Hardness", knife.specs["Hardness"]],
                ["Weight", knife.specs["Weight"]],
                ["Handle", knife.specs["Handle Material"]],
              ].map(([label, value]) => value ? (
                <div key={label} className="p-3 bg-bg-medium/50 rounded-[2px] border border-border/50 transition-colors duration-200 hover:border-ember/20">
                  <div className="text-[0.65rem] tracking-[0.12em] uppercase text-text-muted font-display">{label}</div>
                  <div className="text-[0.82rem] font-medium mt-1">{value}</div>
                </div>
              ) : null)}
            </div>
          )}

          {variants.length > 1 && (
            <div className="mb-6">
              <span className="text-[0.65rem] text-text-muted uppercase tracking-[0.1em] font-display block mb-2">
                Handle: {currentVariant?.name}
              </span>
              <div className="flex items-center gap-2">
                {variants.map((v, i) => (
                  <button
                    key={v.id}
                    onClick={() => v.inStock && setSelectedVariant(i)}
                    className={`w-7 h-7 rounded-full border-2 transition-all duration-200 ${
                      i === safeSelected ? "border-ember scale-110 ring-2 ring-ember/20" : "border-white/20 hover:border-white/40"
                    } ${!v.inStock ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
                    style={{ background: variantSwatch(v.color, v.colorSecondary) }}
                    title={v.name}
                    aria-label={`${v.name}${v.inStock ? "" : " (sold out)"}`}
                    disabled={!v.inStock}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Live-only: progress bar */}
          {!isUpcoming && activeDrop && (
            <div className="mb-6">
              <div className="flex items-center justify-between text-[0.72rem] mb-1.5">
                <span className="text-text-muted tabular-nums">
                  {forceCompleted ? "Drop ended — all units sold" : soldOut ? "Sold out" : `${remaining} of ${activeTotal} remaining`}
                </span>
                <span className={`font-medium tabular-nums ${forceCompleted ? "text-text-muted" : "text-ember"}`}>{Math.round(pctSold)}% sold</span>
              </div>
              <div className="h-1.5 bg-bg-dark rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-500 ${forceCompleted ? "bg-text-muted/60" : "bg-ember"}`} style={{ width: `${pctSold}%` }} />
              </div>
            </div>
          )}

          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-2xl font-semibold text-ember tabular-nums">${knife.price}.00</span>
            {!isUpcoming && activeDrop && (
              <span className="text-[0.72rem] text-text-muted tabular-nums">{activeTotal} units total</span>
            )}
            {isUpcoming && upcomingDrop && (
              <span className="text-[0.72rem] text-text-muted tabular-nums">
                {upcomingDrop.products.reduce((s, p) => s + p.unitsPlanned, 0)} units planned
              </span>
            )}
          </div>

          {isUpcoming ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {scheduledDate && (
                <div>
                  <p className="text-text-primary text-[0.85rem] font-medium mb-0.5">
                    {scheduledDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                  </p>
                  <p className="text-text-muted text-[0.75rem] tabular-nums">
                    {scheduledDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZoneName: "short" })}
                  </p>
                </div>
              )}
              <button className="px-6 py-3 border border-ember/30 text-ember font-display text-[0.65rem] font-semibold tracking-[0.12em] uppercase rounded-[2px] hover:bg-ember/10 hover:border-ember transition-all cursor-pointer">
                Notify Me
              </button>
            </div>
          ) : !soldOut ? (
            <Link href={`/product/${knife.id}`} className="group inline-flex items-center gap-2 px-8 py-3.5 bg-ember text-white font-display text-[0.68rem] font-semibold tracking-[0.12em] uppercase rounded-[2px] hover:bg-ember-light transition-all">
              Shop the Drop
              <svg viewBox="0 0 24 24" className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          ) : (
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-bg-elevated text-text-muted font-display text-[0.65rem] font-semibold tracking-[0.12em] uppercase rounded-[2px]">
              Sold Out
            </span>
          )}
        </div>
      </div>
      </div>
    </section>
  );
}
