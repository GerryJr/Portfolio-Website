
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "@/demo/oxus-edge/lib/next-link";
import Image from "@/demo/oxus-edge/lib/next-image";
import { cartItems } from "@/demo/oxus-edge/data/cart";
import { products } from "@/demo/oxus-edge/data/products";
import { resolveProduct } from "@/demo/oxus-edge/api/helpers";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const RESERVATION_DURATION = 582;
  const startTimeRef = useRef(Date.now());
  const [reservationSecs, setReservationSecs] = useState(RESERVATION_DURATION);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    startTimeRef.current = Date.now();
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setReservationSecs(Math.max(0, RESERVATION_DURATION - elapsed));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Focus the close button when drawer opens
  useEffect(() => {
    if (open) {
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    }
  }, [open]);

  // Escape key handler
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && open) onClose();
  }, [open, onClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const timerStr = `${Math.floor(reservationSecs / 60)}:${String(reservationSecs % 60).padStart(2, "0")}`;
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = 12;
  const total = subtotal + shipping;

  return (
    <>
      {/* Scrim overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[2000] transition-opacity duration-200 ease-out ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 bottom-0 w-[380px] max-w-[88vw] bg-depth-roast border-l border-white/[0.08] z-[2001] flex flex-col rounded-none ease-out ${
          open ? "translate-x-0 duration-200" : "translate-x-full duration-150"
        }`}
        style={{ transitionProperty: "transform" }}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
          <h2 className="font-display text-[0.8rem] tracking-[0.12em] uppercase">Cart</h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close cart"
            className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors duration-200 ease-out cursor-pointer rounded-[2px]"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Timer */}
        <div className="px-6 py-2.5 bg-ember/8 border-b border-white/[0.04] flex items-center gap-2 text-[0.75rem] text-ember" suppressHydrationWarning>
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Reserved for <strong className="tabular-nums" suppressHydrationWarning>{timerStr}</strong>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {cartItems.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <svg viewBox="0 0 24 24" className="w-10 h-10 text-text-muted/30 mb-4" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <p className="text-text-muted text-sm mb-4">Your cart is empty</p>
              <Link href="/knives" onClick={onClose} className="text-ember text-sm hover:text-ember-light transition-colors duration-200 ease-out">
                Browse our knives
              </Link>
            </div>
          )}
          {cartItems.map((item) => {
            const raw = products.find((p) => p.id === item.productId);
            const resolved = raw ? resolveProduct(raw) : null;
            return (
              <div key={item.productId} className="flex gap-4 py-4 border-b border-white/[0.05] last:border-b-0">
                <div className="w-16 h-16 rounded-none overflow-hidden shrink-0 bg-bg-medium relative">
                  {resolved ? (
                    <Image src={resolved.img} alt={item.name} fill sizes="56px" className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-bg-elevated" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display text-[0.78rem] tracking-[0.02em] truncate">{item.name}</div>
                  <div className="text-[0.68rem] text-text-muted truncate mt-0.5">{item.variant}</div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center border border-border rounded-[2px]">
                      <button aria-label="Decrease quantity" className="w-7 h-7 flex items-center justify-center text-text-muted hover:text-ember cursor-pointer transition-colors text-xs">−</button>
                      <span className="w-6 text-center text-xs font-semibold tabular-nums">{item.qty}</span>
                      <button aria-label="Increase quantity" className="w-7 h-7 flex items-center justify-center text-text-muted hover:text-ember cursor-pointer transition-colors text-xs">+</button>
                    </div>
                    <span className="font-semibold text-ember text-[0.82rem] tabular-nums">${item.price * item.qty}.00</span>
                    <button
                      aria-label={`Remove ${item.name} from cart`}
                      className="text-text-muted hover:text-danger cursor-pointer transition-colors duration-200 ease-out p-2 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-white/[0.06] bg-bg-medium">
          {/* Free shipping progress */}
          {cartItems.length > 0 && (() => {
            const FREE_THRESHOLD = 250;
            const remaining = Math.max(0, FREE_THRESHOLD - subtotal);
            const progress = Math.min(100, (subtotal / FREE_THRESHOLD) * 100);
            const qualified = remaining <= 0;
            return (
              <div className="mb-4 pb-4 border-b border-white/[0.06]">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  {qualified ? (
                    <span className="text-success font-medium flex items-center gap-1">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                      Free shipping!
                    </span>
                  ) : (
                    <span className="text-text-muted">Add <strong className="text-ember">${remaining}.00</strong> more for free shipping</span>
                  )}
                </div>
                <div className="w-full h-1.5 bg-bg-dark rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ease-out ${qualified ? "bg-success" : "bg-ember"}`} style={{ width: `${progress}%` }} />
                </div>
              </div>
            );
          })()}
          <div className="space-y-2 mb-5">
            <div className="flex justify-between text-sm"><span className="text-text-muted">Subtotal</span><span className="tabular-nums">${subtotal}.00</span></div>
            <div className="flex justify-between text-sm"><span className="text-text-muted">Shipping</span><span className="tabular-nums">{subtotal >= 250 ? "Free" : `$${shipping}.00`}</span></div>
            <div className="flex justify-between font-display text-base font-semibold pt-3 border-t border-white/[0.06]">
              <span>Total</span><span className="text-ember tabular-nums">${total}.00</span>
            </div>
          </div>
          <Link
            href="/checkout"
            onClick={onClose}
            className="block w-full py-3 bg-ember text-white text-center font-display text-[0.7rem] font-semibold tracking-[0.12em] uppercase rounded-[2px] hover:bg-ember-light transition-colors duration-200 ease-out"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </>
  );
}
