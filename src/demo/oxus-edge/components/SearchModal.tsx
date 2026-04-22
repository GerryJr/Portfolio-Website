
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "@/demo/oxus-edge/lib/next-link";
import Image from "@/demo/oxus-edge/lib/next-image";
import { products } from "@/demo/oxus-edge/data/products";
import { resolveProduct } from "@/demo/oxus-edge/api/helpers";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && open) onClose();
  }, [open, onClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Global Cmd/Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (!open) {
          // Parent handles opening — but we can't. Just prevent default.
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const q = query.toLowerCase().trim();
  const results = q.length >= 2
    ? products
        .filter((p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.family && p.family.toLowerCase().includes(q)) ||
          (p.bladeType && p.bladeType.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
        )
        .slice(0, 6)
        .map((p) => resolveProduct(p))
    : [];

  const popular = products.filter((p) => p.stock > 0 && p.category === "knives").slice(0, 4).map((p) => resolveProduct(p));

  return (
    <>
      {/* Scrim */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[3000] transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className={`fixed top-[10vh] left-1/2 -translate-x-1/2 w-[90vw] max-w-[560px] z-[3001] transition-all duration-200 ${
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
      >
        <div className="bg-bg-card border border-border rounded-[2px] shadow-lg overflow-hidden">
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 border-b border-border">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-text-muted shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search knives, accessories, coffee..."
              className="flex-1 py-3.5 bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
              autoComplete="off"
            />
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[0.6rem] text-text-muted border border-border rounded font-mono">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-[50vh] overflow-y-auto">
            {q.length >= 2 && results.length === 0 && (
              <div className="px-4 py-8 text-center">
                <p className="text-text-muted text-sm">No results for &ldquo;{query}&rdquo;</p>
                <p className="text-text-muted/60 text-xs mt-1">Try a different search term</p>
              </div>
            )}

            {q.length >= 2 && results.length > 0 && (
              <div className="py-2">
                <p className="px-4 py-1.5 text-[0.65rem] text-text-muted font-display tracking-[0.1em] uppercase">
                  {results.length} result{results.length !== 1 ? "s" : ""}
                </p>
                {results.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-bg-medium transition-colors"
                  >
                    <div className="w-10 h-10 rounded-[2px] overflow-hidden relative shrink-0 bg-bg-medium">
                      <Image src={p.img} alt="" fill sizes="40px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{p.name}</p>
                      <p className="text-xs text-text-muted capitalize">{p.category}{p.family ? ` · ${p.family}` : ""}</p>
                    </div>
                    <span className="text-sm font-semibold text-ember tabular-nums shrink-0">${p.price}</span>
                  </Link>
                ))}
              </div>
            )}

            {q.length < 2 && (
              <div className="py-2">
                <p className="px-4 py-1.5 text-[0.65rem] text-text-muted font-display tracking-[0.1em] uppercase">Popular</p>
                {popular.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-bg-medium transition-colors"
                  >
                    <div className="w-10 h-10 rounded-[2px] overflow-hidden relative shrink-0 bg-bg-medium">
                      <Image src={p.img} alt="" fill sizes="40px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{p.name}</p>
                      <p className="text-xs text-text-muted capitalize">{p.category}</p>
                    </div>
                    <span className="text-sm font-semibold text-ember tabular-nums shrink-0">${p.price}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
