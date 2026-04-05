import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartProvider';
import { LOCATIONS, formatPrice } from '../lib/menu-data';

const TIP_AMOUNTS = [0, 1, 2, 3, 5];

const TIME_SLOTS = [
  '10:00 AM', '10:15 AM', '10:30 AM', '10:45 AM',
  '11:00 AM', '11:15 AM', '11:30 AM', '11:45 AM',
  '12:00 PM', '12:15 PM', '12:30 PM', '12:45 PM',
  '1:00 PM', '1:15 PM', '1:30 PM', '1:45 PM',
  '2:00 PM', '2:15 PM', '2:30 PM', '2:45 PM',
  '3:00 PM', '3:15 PM', '3:30 PM', '3:45 PM',
  '4:00 PM', '4:15 PM', '4:30 PM', '4:45 PM',
  '5:00 PM', '5:15 PM', '5:30 PM', '5:45 PM',
  '6:00 PM',
];

function formatPhone(val: string): string {
  const digits = val.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function KrispCheckout() {
  const navigate = useNavigate();
  const { items, subtotal, tax, clearCart, location } = useCart();
  const loc = LOCATIONS.find(l => l.id === location) ?? LOCATIONS[0];

  /* Form state */
  const [fulfillment, setFulfillment] = useState<'pickup' | 'dine'>('pickup');
  const [when, setWhen] = useState<'asap' | 'schedule'>('asap');
  const [scheduleTime, setScheduleTime] = useState(TIME_SLOTS[0]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [tipAmount, setTipAmount] = useState(2);
  const [promo, setPromo] = useState('');
  const [promoApplied, setPromoApplied] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /* Derived totals */
  const discount = useMemo(() => {
    if (promoApplied === 'KRISP10') return subtotal * 0.10;
    if (promoApplied === 'WELCOME5') return 5;
    return 0;
  }, [subtotal, promoApplied]);

  const orderTotal = subtotal + tax + tipAmount - discount;

  /* Promo handler */
  const applyPromo = () => {
    if (promoApplied) {
      setPromoApplied(null);
      setPromo('');
      setPromoError('');
      return;
    }
    const code = promo.trim().toUpperCase();
    if (code === 'KRISP10' || code === 'WELCOME5') {
      setPromoApplied(code);
      setPromoError('');
    } else {
      setPromoApplied(null);
      setPromoError('Invalid promo code');
    }
  };

  /* Place order (mock) */
  const handlePlaceOrder = async () => {
    if (!name.trim()) { setError('Please enter your name'); return; }
    if (phone.replace(/\D/g, '').length !== 10) { setError('Please enter a valid phone number'); return; }
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 1500));
    const orderNumber = Math.floor(Math.random() * 9000) + 1000;
    const pointsEarned = Math.floor(orderTotal);
    clearCart();
    navigate(
      `/demo/krisp-fresh-living/confirmation?order=${orderNumber}&total=${orderTotal.toFixed(2)}&points=${pointsEarned}&location=${encodeURIComponent(loc.name)}`,
    );
  };

  if (items.length === 0 && !loading) {
    return (
      <div className="krisp-checkout-empty">
        <h2>Your cart is empty</h2>
        <p>Add items before checking out.</p>
        <Link to="/demo/krisp-fresh-living/order" className="krisp-checkout-backBtn">
          Back to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="krisp-checkout-page">
      <div className="krisp-checkout-container">
        {/* Back + title */}
        <Link to="/demo/krisp-fresh-living/order" className="krisp-checkout-backLink">
          &larr; Back to Menu
        </Link>
        <h1 className="krisp-checkout-title">Checkout</h1>

        <div className="krisp-checkout-grid">
          {/* LEFT — form */}
          <div>
            {/* Fulfillment toggle */}
            <div className="krisp-checkout-section">
              <h2 className="krisp-checkout-sectionTitle">Fulfillment</h2>
              <div className="krisp-checkout-fulfillmentRow">
                <button
                  className={`krisp-checkout-fulfillmentBtn ${fulfillment === 'pickup' ? 'krisp-checkout-fulfillmentActive' : ''}`}
                  onClick={() => setFulfillment('pickup')}
                >
                  Pickup
                </button>
                <button
                  className={`krisp-checkout-fulfillmentBtn ${fulfillment === 'dine' ? 'krisp-checkout-fulfillmentActive' : ''}`}
                  onClick={() => setFulfillment('dine')}
                >
                  Dine In
                </button>
              </div>
              <p className="krisp-checkout-locationText">
                {fulfillment === 'pickup' ? 'Pickup' : 'Dine In'} at <strong>{loc.name}</strong>
              </p>
            </div>

            {/* When toggle */}
            <div className="krisp-checkout-section">
              <h2 className="krisp-checkout-sectionTitle">When</h2>
              <div className="krisp-checkout-fulfillmentRow">
                <button
                  className={`krisp-checkout-fulfillmentBtn ${when === 'asap' ? 'krisp-checkout-fulfillmentActive' : ''}`}
                  onClick={() => setWhen('asap')}
                >
                  ASAP
                </button>
                <button
                  className={`krisp-checkout-fulfillmentBtn ${when === 'schedule' ? 'krisp-checkout-fulfillmentActive' : ''}`}
                  onClick={() => setWhen('schedule')}
                >
                  Schedule
                </button>
              </div>
              {when === 'schedule' && (
                <select
                  className="krisp-checkout-input"
                  value={scheduleTime}
                  onChange={e => setScheduleTime(e.target.value)}
                >
                  {TIME_SLOTS.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              )}
            </div>

            {/* Contact info */}
            <div className="krisp-checkout-section">
              <h2 className="krisp-checkout-sectionTitle">Contact Information</h2>

              <div className="krisp-checkout-fieldGroup">
                <label className="krisp-checkout-label">Name *</label>
                <input
                  type="text"
                  className="krisp-checkout-input"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Full name"
                />
              </div>

              <div className="krisp-checkout-fieldGroup">
                <label className="krisp-checkout-label">Phone *</label>
                <input
                  type="tel"
                  className="krisp-checkout-input"
                  value={phone}
                  onChange={e => setPhone(formatPhone(e.target.value))}
                  placeholder="(949) 555-0123"
                />
              </div>

              <div className="krisp-checkout-fieldGroup">
                <label className="krisp-checkout-label">Email</label>
                <input
                  type="email"
                  className="krisp-checkout-input"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@email.com"
                />
                <span className="krisp-checkout-hint">Optional — for receipt</span>
              </div>
            </div>

            {/* Tip */}
            <div className="krisp-checkout-section">
              <h2 className="krisp-checkout-sectionTitle">Add a Tip</h2>
              <div className="krisp-checkout-tipRow">
                {TIP_AMOUNTS.map(amt => (
                  <button
                    key={amt}
                    className={`krisp-checkout-tipBtn ${tipAmount === amt ? 'krisp-checkout-tipActive' : ''}`}
                    onClick={() => setTipAmount(amt)}
                  >
                    {amt === 0 ? 'None' : `$${amt}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Promo */}
            <div className="krisp-checkout-section">
              <h2 className="krisp-checkout-sectionTitle">Promo Code</h2>
              <div className="krisp-checkout-promoRow">
                <input
                  type="text"
                  className="krisp-checkout-input"
                  value={promo}
                  onChange={e => setPromo(e.target.value)}
                  placeholder="Enter code"
                  disabled={!!promoApplied}
                />
                <button className="krisp-checkout-promoBtn" onClick={applyPromo}>
                  {promoApplied ? 'Remove' : 'Apply'}
                </button>
              </div>
              {promoApplied && (
                <p className="krisp-checkout-promoSuccess">
                  Code <strong>{promoApplied}</strong> applied!
                </p>
              )}
              {promoError && <p className="krisp-checkout-promoError">{promoError}</p>}
            </div>

            {/* Payment */}
            <div className="krisp-checkout-section">
              <h2 className="krisp-checkout-sectionTitle">Payment</h2>
              <div className="krisp-checkout-paymentCard">
                <span className="krisp-checkout-paymentTitle">Apple Pay / Card on file</span>
                <span className="krisp-checkout-paymentHint">Demo mode — no payment will be processed.</span>
              </div>
            </div>
          </div>

          {/* RIGHT — order summary (sticky) */}
          <div className="krisp-checkout-summarySide">
            <div className="krisp-checkout-summaryCard">
              <h2 className="krisp-checkout-sectionTitle">Order Summary</h2>

              {items.map((item: any) => (
                <div key={item.cartId} className="krisp-checkout-summaryItem">
                  <span className="krisp-checkout-summaryQty">{item.quantity}x</span>
                  <div className="krisp-checkout-summaryNameCol">
                    <span className="krisp-checkout-summaryName">{item.name}</span>
                    {item.selectedModifiers && Object.keys(item.selectedModifiers).length > 0 && (
                      <span className="krisp-checkout-summaryMod">
                        {Object.values(item.selectedModifiers).flat().join(', ')}
                      </span>
                    )}
                    {item.specialInstructions && (
                      <span className="krisp-checkout-summaryNote">
                        Note: {item.specialInstructions}
                      </span>
                    )}
                  </div>
                  <span className="krisp-checkout-summaryPrice">
                    {formatPrice([item.price * item.quantity])}
                  </span>
                </div>
              ))}

              <div className="krisp-checkout-summaryDivider" />

              <div className="krisp-checkout-summaryRow">
                <span>Subtotal</span>
                <span>{formatPrice([subtotal])}</span>
              </div>
              <div className="krisp-checkout-summaryRow">
                <span>Tax</span>
                <span>{formatPrice([tax])}</span>
              </div>
              <div className="krisp-checkout-summaryRow">
                <span>Tip</span>
                <span>{formatPrice([tipAmount])}</span>
              </div>
              {discount > 0 && (
                <div className="krisp-checkout-summaryRow krisp-checkout-summaryDiscount">
                  <span>Discount</span>
                  <span>-{formatPrice([discount])}</span>
                </div>
              )}

              <div className="krisp-checkout-summaryDivider" />

              <div className="krisp-checkout-summaryRow krisp-checkout-summaryTotal">
                <span>Total</span>
                <span>{formatPrice([orderTotal])}</span>
              </div>

              <p className="krisp-checkout-pointsHint">
                You'll earn <strong>{Math.floor(orderTotal)}</strong> points with this order!
              </p>

              {error && <p className="krisp-checkout-error">{error}</p>}

              <button
                className="krisp-checkout-placeOrderBtn"
                onClick={handlePlaceOrder}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="krisp-checkout-spinner" />
                    Placing Order...
                  </>
                ) : (
                  `Place Order — ${formatPrice([orderTotal])}`
                )}
              </button>

              <p className="krisp-checkout-secureText">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: 4 }}>
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Secure demo checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
