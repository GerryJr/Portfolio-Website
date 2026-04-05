import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

const CartContext = createContext<any>({});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<any[]>([]);
  const [location, setLocation] = useState('michelson');

  const addItem = useCallback((item: any) => {
    setItems(prev => {
      const key = item.guid + '_' + JSON.stringify(item.selectedModifiers || {});
      const existing = prev.findIndex(i =>
        (i.guid + '_' + JSON.stringify(i.selectedModifiers || {})) === key
        && !i.specialInstructions && !item.specialInstructions
      );
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { ...updated[existing], quantity: updated[existing].quantity + (item.quantity || 1) };
        return updated;
      }
      return [...prev, {
        ...item,
        cartId: `c_${Date.now()}_${Math.random().toString(36).slice(2)}`,
        quantity: item.quantity || 1,
        specialInstructions: item.specialInstructions || '',
      }];
    });
  }, []);

  const removeItem = useCallback((cartId: string) => {
    setItems(prev => prev.filter(i => i.cartId !== cartId));
  }, []);

  const updateQuantity = useCallback((cartId: string, qty: number) => {
    if (qty <= 0) { removeItem(cartId); return; }
    setItems(prev => prev.map(i => i.cartId === cartId ? { ...i, quantity: qty } : i));
  }, [removeItem]);

  const clearCart = useCallback(() => setItems([]), []);

  const subtotal = items.reduce((s: number, i: any) => s + i.price * i.quantity, 0);
  const tax = subtotal * 0.0775;
  const total = subtotal + tax;
  const itemCount = items.reduce((s: number, i: any) => s + i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, clearCart,
      subtotal, tax, total, itemCount,
      location, setLocation,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
