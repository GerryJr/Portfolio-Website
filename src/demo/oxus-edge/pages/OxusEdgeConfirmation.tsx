import Link from "@/demo/oxus-edge/lib/next-link";
import { cartItems } from "@/demo/oxus-edge/data/cart";


export default function ConfirmationPage() {
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = 12;
  const total = subtotal + shipping;

  return (
    <div className="bg-depth-mocha min-h-screen">
    <div className="mx-auto max-w-[1280px] px-6 py-20">
      <nav className="text-xs text-text-muted mb-4 flex items-center gap-1.5"><Link href="/" className="hover:text-ember transition-colors">Home</Link><svg viewBox="0 0 24 24" className="w-3 h-3 text-text-muted/50" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg><span className="text-text-primary font-semibold">Order Confirmed</span></nav>
      <div className="max-w-[640px] mx-auto bg-bg-card border border-border/60 rounded-none p-10 text-center">
        {/* Check icon */}
        <div className="w-[72px] h-[72px] bg-success/15 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-success" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="font-display text-2xl tracking-[0.06em] mb-2">Order Confirmed</h1>
        <p className="text-text-muted text-sm mb-8">
          Order #OE-20260410-0001 &middot; Confirmation sent to gerry@oxusedge.com
        </p>

        {/* Details — driven by cart data */}
        <div className="text-left bg-bg-medium rounded-none p-5 mb-8">
          {cartItems.map((item) => (
            <div key={item.productId} className="flex justify-between py-2 text-sm border-b border-border last:border-b-0">
              <span className="text-text-secondary">{item.name}{item.qty > 1 ? ` x${item.qty}` : ""}</span>
              <span className="tabular-nums">${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between py-2 text-sm border-b border-border">
            <span className="text-text-secondary">Shipping</span>
            <span className="tabular-nums">${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 text-sm font-semibold text-ember border-t border-border mt-2 pt-3">
            <span className="text-text-primary">Total Paid</span>
            <span className="tabular-nums">${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-bg-medium rounded-none p-4 text-left mb-8">
          <p className="text-sm text-text-secondary mb-1">
            <strong className="text-text-primary">Shipping to:</strong>
          </p>
          <p className="text-sm">
            Gerry Rodriguez<br />
            1847 Cedar Ridge Trail<br />
            Austin, TX 78745
          </p>
        </div>

        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/account"
            className="px-8 py-3.5 bg-ember text-white font-display text-[0.8rem] font-semibold tracking-[0.12em] uppercase rounded-[2px] hover:bg-ember-light transition-all"
          >
            View Order History
          </Link>
          <Link
            href="/knives"
            className="px-8 py-3.5 border border-border-hover text-text-primary font-display text-[0.8rem] font-semibold tracking-[0.12em] uppercase rounded-[2px] hover:border-ember hover:text-ember transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}
