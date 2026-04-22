import Link from "@/demo/oxus-edge/lib/next-link";
import Image from "@/demo/oxus-edge/lib/next-image";
import { cartItems } from "@/demo/oxus-edge/data/cart";
import { products } from "@/demo/oxus-edge/data/products";
import { resolveProduct } from "@/demo/oxus-edge/api/helpers";
import EstimatedDelivery from "@/demo/oxus-edge/components/EstimatedDelivery";
import CheckoutTimer from "./CheckoutTimer";


export default function CheckoutPage() {
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = 12;
  const total = subtotal + shipping;

  return (
    <div className="bg-depth-mocha">
    <div className="mx-auto max-w-[1280px] px-6 pt-12 pb-20">
      <nav className="text-xs text-text-muted mb-4 flex items-center gap-1.5"><Link href="/" className="hover:text-ember transition-colors">Home</Link><svg viewBox="0 0 24 24" className="w-3 h-3 text-text-muted/50" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg><span className="text-text-primary font-semibold">Checkout</span></nav>
      <h1 className="font-display text-[clamp(1.5rem,4vw,2.25rem)] font-medium tracking-[0.06em] mb-6">
        Checkout
      </h1>

      <div aria-live="polite" aria-atomic="true">
        <CheckoutTimer />
      </div>

      {/* Step progress indicator */}
      <div className="flex items-center gap-0 max-w-md mb-2 mt-4" aria-label="Checkout steps">
        {["Contact", "Shipping", "Payment"].map((step, i) => (
          <div key={step} className="flex items-center flex-1 last:flex-initial">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 flex items-center justify-center rounded-full bg-ember text-white text-xs font-bold font-display tabular-nums">
                {i + 1}
              </span>
              <span className="text-[0.72rem] font-display tracking-[0.06em] uppercase text-text-primary hidden sm:block">{step}</span>
            </div>
            {i < 2 && <div className="flex-1 h-px bg-border mx-3 min-w-[20px]" />}
          </div>
        ))}
      </div>
      <p className="text-[0.7rem] text-text-muted mb-4"><span className="text-ember">*</span> Required field</p>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
        {/* Form */}
        <div role="form" aria-label="Checkout form">
          {/* Contact */}
          <Section title="Contact Information" step={1}>
            <FormGroup label="Email" required>
              <input id="checkout-email" className="input" defaultValue="gerry@oxusedge.com" required aria-required="true" autoComplete="email" />
            </FormGroup>
            <label htmlFor="checkout-drop-alerts" className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
              <input id="checkout-drop-alerts" type="checkbox" defaultChecked className="accent-ember" />
              Email me with drop alerts and order updates
            </label>
          </Section>

          {/* Shipping */}
          <Section title="Shipping Address" step={2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormGroup label="First Name" required><input id="checkout-first-name" className="input" defaultValue="Gerry" required aria-required="true" autoComplete="given-name" /></FormGroup>
              <FormGroup label="Last Name" required><input id="checkout-last-name" className="input" defaultValue="Rodriguez" required aria-required="true" autoComplete="family-name" /></FormGroup>
            </div>
            <FormGroup label="Address" required><input id="checkout-address" className="input" defaultValue="1847 Cedar Ridge Trail" required aria-required="true" autoComplete="street-address" /></FormGroup>
            <FormGroup label="Apartment, suite, etc. (optional)"><input id="checkout-apartment-suite-etc-optional" className="input" autoComplete="address-line2" /></FormGroup>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormGroup label="City" required><input id="checkout-city" className="input" defaultValue="Austin" required aria-required="true" autoComplete="address-level2" /></FormGroup>
              <FormGroup label="State" required>
                <select id="checkout-state" className="input"><option>Texas</option></select>
              </FormGroup>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormGroup label="ZIP Code" required><input id="checkout-zip-code" className="input" defaultValue="78745" required aria-required="true" autoComplete="postal-code" /></FormGroup>
              <FormGroup label="Phone"><input id="checkout-phone" className="input" defaultValue="(512) 555-0189" autoComplete="tel" type="tel" /></FormGroup>
            </div>
          </Section>

          {/* Payment */}
          <Section title="Payment" step={3}>
            <div className="flex gap-2 mb-5" role="radiogroup" aria-label="Payment method">
              {["Credit Card", "Apple Pay", "Google Pay"].map((m, i) => (
                <button
                  key={m}
                  type="button"
                  role="radio"
                  aria-checked={i === 0}
                  className={`px-3 py-1.5 border rounded-none text-xs font-display tracking-[0.05em] cursor-pointer transition-colors ${
                    i === 0
                      ? "border-ember text-ember bg-ember/5"
                      : "border-border text-text-muted hover:border-border-hover hover:text-text-primary"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
            <FormGroup label="Card Number">
              <div className="stripe-card-mock">
                <span className="flex-1">4242 4242 4242 4242</span>
                <span>04/28</span>
                <span>***</span>
              </div>
            </FormGroup>
            <p className="text-[0.68rem] text-text-muted mt-1.5">Demo mode — no real charges will be made</p>
            <FormGroup label="Name on Card">
              <input id="checkout-name-on-card" className="input" defaultValue="Gerry Rodriguez" />
            </FormGroup>
          </Section>

          <Link
            href="/confirmation"
            className="block w-full px-8 py-3.5 bg-ember text-white text-center font-display text-[0.8rem] font-semibold tracking-[0.12em] uppercase rounded-[2px] hover:bg-ember-light transition-all"
          >
            Pay ${total}.00
          </Link>
          <div className="flex items-center justify-center gap-2 mt-4 text-text-muted text-xs">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-success" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>Secured by Stripe. Your payment info is encrypted.</span>
          </div>
          <p className="text-center text-xs text-text-muted mt-3 flex items-center justify-center gap-1.5">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="1" y="3" width="15" height="13" rx="1"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
            <EstimatedDelivery className="text-xs" />
          </p>
        </div>

        {/* Summary */}
        <div className="bg-bg-card border border-border/60 rounded-none p-6 lg:sticky lg:top-[90px]">
          <h2 className="font-display text-xs tracking-[0.1em] uppercase mb-5">Order Summary</h2>
          {cartItems.map((item) => {
            const raw = products.find((p) => p.id === item.productId);
            const resolved = raw ? resolveProduct(raw) : null;
            return (
            <div key={item.productId} className="flex gap-3 py-2">
              <div className="w-14 h-14 rounded-none overflow-hidden shrink-0 relative bg-bg-medium">
                {resolved ? (
                  <Image src={resolved.img} alt={item.name} fill sizes="56px" className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-bg-elevated" />
                )}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">{item.name}</div>
                <div className="text-xs text-text-muted">Qty: {item.qty} &middot; {item.variant}</div>
              </div>
              <div className="font-semibold text-sm tabular-nums">${item.price}</div>
            </div>
            );
          })}
          <hr className="border-border my-4" />
          {/* Promo code */}
          <div className="flex gap-2 mb-4">
            <input type="text" placeholder="Promo code" className="input text-xs flex-1" aria-label="Promo code" />
            <button className="px-4 py-2 border border-border text-[0.7rem] font-display tracking-[0.06em] uppercase text-text-muted hover:text-ember hover:border-ember/40 transition-colors cursor-pointer rounded-[2px]">
              Apply
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <Row label="Subtotal" value={`$${subtotal}.00`} />
            <Row label="Shipping" value={`$${shipping}.00`} />
            <Row label="Tax" value="$0.00" />
            <div className="flex justify-between font-display text-lg font-semibold tracking-[0.04em] pt-2 border-t border-border">
              <span>Total</span>
              <span className="text-ember tabular-nums">${total}.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

function Section({ title, step, children }: { title: string; step?: number; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="font-display text-xs tracking-[0.1em] uppercase mb-5 pb-2 border-b border-border flex items-center gap-2">
        {step && <span className="text-ember tabular-nums">{step}.</span>}
        {title}
      </h2>
      {children}
    </div>
  );
}

function FormGroup({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  const id = `checkout-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`;
  return (
    <div className="mb-3">
      <label htmlFor={id} className="block text-xs font-semibold tracking-[0.06em] uppercase text-text-secondary font-display mb-1">
        {label}{required && <span className="text-ember ml-0.5" aria-hidden="true">*</span>}
      </label>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-text-secondary">{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}
