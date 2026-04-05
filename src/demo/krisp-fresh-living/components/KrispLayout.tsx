import { CartProvider } from './CartProvider';
import KrispHeader from './KrispHeader';
import KrispFooter from './KrispFooter';
import '../styles/krisp.css';

export default function KrispLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="krisp-app">
        <KrispHeader />
        <main>{children}</main>
        <KrispFooter />
      </div>
    </CartProvider>
  );
}
