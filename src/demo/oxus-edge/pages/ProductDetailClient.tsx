
import { useState } from "react";
import Link from "@/demo/oxus-edge/lib/next-link";
import { useToast } from "@/demo/oxus-edge/components/Toast";
import type { ResolvedProduct } from "@/demo/oxus-edge/api/helpers";

export default function ProductDetailClient({ product }: { product: ResolvedProduct }) {
  const [qty, setQty] = useState(1);
  const { showToast } = useToast();
  const soldOut = product.stock === 0;

  return (
    <>
      {/* Quantity */}
      {!soldOut && (
        <div className="mb-5">
          <div className="flex items-center gap-4">
            <span className="text-xs uppercase tracking-[0.06em] text-text-secondary font-display">
              Quantity
            </span>
            <div className="flex items-center border border-border rounded-none">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                aria-label="Decrease quantity"
                className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-ember cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-1 focus-visible:ring-offset-bg-deep"
              >
                -
              </button>
              <div className="w-10 text-center font-semibold bg-bg-dark/50 py-1 rounded tabular-nums">{qty}</div>
              <button
                onClick={() => setQty(Math.min(10, qty + 1))}
                aria-label="Increase quantity"
                className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-ember cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-1 focus-visible:ring-offset-bg-deep"
              >
                +
              </button>
            </div>
          </div>
          <p className="text-[0.65rem] text-text-muted mt-1">Max 10 per order</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 flex-col sm:flex-row">
        {soldOut ? (
          <button
            disabled
            className="flex-1 py-3.5 bg-sold-out text-text-muted font-display text-[0.8rem] font-semibold tracking-[0.12em] uppercase rounded-[2px] cursor-not-allowed"
          >
            Sold Out
          </button>
        ) : (
          <>
            <Link
              href="/checkout"
              onClick={() => showToast("Proceeding to checkout!")}
              className="flex-1 py-3.5 bg-ember text-white text-center font-display text-[0.8rem] font-semibold tracking-[0.12em] uppercase rounded-[2px] hover:bg-ember-light transition-all cursor-pointer"
            >
              Buy Now
            </Link>
            <button
              onClick={() => showToast("Added to cart!")}
              className="flex-1 py-3.5 border border-border-hover text-text-primary font-display text-[0.8rem] font-semibold tracking-[0.12em] uppercase rounded-[2px] hover:border-ember hover:text-ember hover:bg-ember/10 transition-all cursor-pointer"
            >
              Add to Cart
            </button>
          </>
        )}
      </div>
    </>
  );
}
