import { useEffect } from 'react';
import { useCart } from './CartProvider';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function CartDrawer({ isOpen, onClose, onCheckout }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, subtotal, tax, total, itemCount } = useCart();

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="krisp-cart-backdrop" onClick={onClose} />
      <div className="krisp-cart-drawer">
        <div className="krisp-cart-header">
          <h2 className="krisp-cart-title">Your Order ({itemCount})</h2>
          <button className="krisp-cart-closeBtn" onClick={onClose} aria-label="Close cart">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="krisp-cart-empty">
            <div className="krisp-cart-emptyIcon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9b9b9b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            </div>
            <p className="krisp-cart-emptyText">Your cart is empty</p>
            <p className="krisp-cart-emptyHint">Add items from the menu to get started</p>
          </div>
        ) : (
          <>
            <div className="krisp-cart-items">
              {items.map((item: any) => (
                <div key={item.cartId} className="krisp-cart-cartItem">
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.name} className="krisp-cart-itemImage" />
                  )}
                  <div className="krisp-cart-itemInfo">
                    <p className="krisp-cart-itemName">{item.name}</p>
                    {item.selectedModifiers && Object.values(item.selectedModifiers).filter(Boolean).map((val: any, i: number) => {
                      if (Array.isArray(val)) {
                        return val.map((m: any, j: number) => (
                          <p key={`${i}-${j}`} className="krisp-cart-itemMod">{m.name}{m.price > 0 ? ` (+$${m.price.toFixed(2)})` : ''}</p>
                        ));
                      }
                      return <p key={i} className="krisp-cart-itemMod">{val.name}{val.price > 0 ? ` (+$${val.price.toFixed(2)})` : ''}</p>;
                    })}
                    {item.specialInstructions && (
                      <p className="krisp-cart-itemNote">"{item.specialInstructions}"</p>
                    )}
                    <p className="krisp-cart-itemPrice">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="krisp-cart-qtyControls">
                    <button className="krisp-cart-qtyBtn" onClick={() => updateQuantity(item.cartId, item.quantity - 1)}>−</button>
                    <span className="krisp-cart-qty">{item.quantity}</span>
                    <button className="krisp-cart-qtyBtn" onClick={() => updateQuantity(item.cartId, item.quantity + 1)}>+</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="krisp-cart-summary">
              <div className="krisp-cart-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="krisp-cart-row">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="krisp-cart-row krisp-cart-totalRow">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="krisp-cart-checkoutBtn" onClick={onCheckout}>
                Checkout — ${total.toFixed(2)}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
