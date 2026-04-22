
import { useState, useEffect, useCallback } from "react";
import Image from "@/demo/oxus-edge/lib/next-image";
import type { ResolvedProduct } from "@/demo/oxus-edge/api/helpers";

export default function ProductGallery({ product }: { product: ResolvedProduct }) {
  const images = product.gallery?.length ? product.gallery : [product.img];
  const [activeIdx, setActiveIdx] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  // Keyboard navigation: arrow keys
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (images.length <= 1) return;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((prev) => (prev + 1) % images.length);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
    }
  }, [images.length]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Zoom on hover (desktop only)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="flex gap-3">
      {/* Thumbnail strip (left side, vertical — Amazon style) */}
      {images.length > 1 && (
        <div className="hidden sm:flex flex-col gap-2 shrink-0 w-[72px]">
          {images.map((src, i) => (
            <button
              key={i}
              onMouseEnter={() => setActiveIdx(i)}
              onFocus={() => setActiveIdx(i)}
              onClick={() => setActiveIdx(i)}
              className={`relative w-[72px] h-[72px] rounded-none overflow-hidden border-2 cursor-pointer transition-all ${
                activeIdx === i
                  ? "border-ember"
                  : "border-border hover:border-border-hover"
              }`}
              aria-label={`View image ${i + 1} of ${images.length}`}
            >
              <Image
                src={src}
                alt={`${product.name} — view ${i + 1}`}
                fill
                sizes="72px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="flex-1 relative">
        <div
          className="aspect-square rounded-none overflow-hidden border-2 border-border bg-bg-medium relative cursor-zoom-in"
          onMouseEnter={() => setZoomed(true)}
          onMouseLeave={() => setZoomed(false)}
          onMouseMove={handleMouseMove}
          role="img"
          aria-label={`${product.name} — image ${activeIdx + 1} of ${images.length}. Use arrow keys to navigate.`}
          tabIndex={0}
        >
          <Image
            key={activeIdx}
            src={images[activeIdx]}
            alt={`${product.name} — main view`}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className={`object-cover transition-opacity duration-300 ease-out ${product.stock === 0 ? "grayscale saturate-[0.3]" : ""}`}
            style={zoomed ? {
              transform: "scale(2)",
              transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
              transition: "transform-origin 0.1s ease-out",
            } : undefined}
            priority
          />

          {/* Zoom hint */}
          {!zoomed && product.stock > 0 && (
            <div className="absolute bottom-3 right-3 hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-black/50 backdrop-blur-sm text-white/70 text-[0.65rem] rounded-[2px] pointer-events-none">
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
              Hover to zoom
            </div>
          )}

          {/* Sold out overlay */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-bg-deep/40 z-[3] flex items-center justify-center">
              <span className="font-display text-lg font-semibold tracking-[0.2em] uppercase text-white/90">
                Sold Out
              </span>
            </div>
          )}
        </div>

        {/* Keyboard hint (desktop) */}
        {images.length > 1 && (
          <p className="hidden sm:block text-[0.65rem] text-text-muted/50 mt-1.5 text-center">
            Use <kbd className="px-1 py-0.5 border border-border rounded text-[0.6rem] font-mono">←</kbd> <kbd className="px-1 py-0.5 border border-border rounded text-[0.6rem] font-mono">→</kbd> arrow keys
          </p>
        )}

        {/* Mobile: image counter + thumbnail strip */}
        {images.length > 1 && (
          <>
            <p className="sm:hidden text-center text-[0.72rem] text-text-muted tabular-nums mt-2 mb-1" aria-live="polite">
              {activeIdx + 1} of {images.length}
            </p>
            <div className="flex sm:hidden gap-2 overflow-x-auto pb-1">
              {images.map((src, i) => (
                <button
                  key={i}
                  onFocus={() => setActiveIdx(i)}
                  onClick={() => setActiveIdx(i)}
                  className={`relative w-16 h-16 rounded-none overflow-hidden border-2 shrink-0 cursor-pointer transition-all ${
                    activeIdx === i
                      ? "border-ember"
                      : "border-border"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${product.name} — view ${i + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
