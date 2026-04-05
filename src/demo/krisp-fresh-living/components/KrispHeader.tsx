import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from './CartProvider';
import CartDrawer from './CartDrawer';

export default function KrispHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const ticking = useRef(false);

  const base = '/demo/krisp-fresh-living';

  // Scroll to top on route change — prevents stale scroll state
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 80);
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(update);
        ticking.current = true;
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`krisp-header ${scrolled || mobileOpen ? 'krisp-header-scrolled' : ''}`}>
        <div className="krisp-header-inner">
          <button
            className="krisp-header-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <span className="krisp-header-bar" />
            <span className="krisp-header-bar" />
            <span className="krisp-header-bar" />
          </button>

          <Link to={base} className="krisp-header-logo">
            <img
              src="/demo/krisp/krisp-icon.webp"
              alt="KRISP"
              width={36}
              height={36}
              className="krisp-header-logoIcon"
            />
            <img
              src="/demo/krisp/krisp-logo.webp"
              alt="KRISP"
              width={160}
              height={46}
              className="krisp-header-logoFull"
            />
          </Link>

          <nav className="krisp-header-desktopNav">
            <Link to={`${base}/order`} className={`krisp-header-link ${pathname === `${base}/order` ? 'krisp-header-linkActive' : ''}`}>Order</Link>
            <Link to={`${base}/menu`} className={`krisp-header-link ${pathname === `${base}/menu` ? 'krisp-header-linkActive' : ''}`}>Menu</Link>
            <Link to={`${base}/rewards`} className={`krisp-header-link ${pathname === `${base}/rewards` ? 'krisp-header-linkActive' : ''}`}>Rewards</Link>
            <Link to={`${base}/our-story`} className={`krisp-header-link ${pathname === `${base}/our-story` ? 'krisp-header-linkActive' : ''}`}>Our Story</Link>
            <Link to={`${base}/contact`} className={`krisp-header-link ${pathname === `${base}/contact` ? 'krisp-header-linkActive' : ''}`}>Contact</Link>
          </nav>

          <button className="krisp-header-cartBtn" onClick={() => setCartOpen(true)} aria-label={`Shopping cart${itemCount > 0 ? `, ${itemCount} items` : ''}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            {itemCount > 0 && <span className="krisp-header-cartBadge">{itemCount}</span>}
          </button>
        </div>

        {mobileOpen && (
          <nav className="krisp-header-mobileNav">
            <Link to={base} className={`krisp-header-mobileLink ${pathname === base ? 'krisp-header-mobileLinkActive' : ''}`} onClick={() => setMobileOpen(false)}>Home</Link>
            <Link to={`${base}/order`} className={`krisp-header-mobileLink ${pathname === `${base}/order` ? 'krisp-header-mobileLinkActive' : ''}`} onClick={() => setMobileOpen(false)}>Order</Link>
            <Link to={`${base}/rewards`} className={`krisp-header-mobileLink ${pathname === `${base}/rewards` ? 'krisp-header-mobileLinkActive' : ''}`} onClick={() => setMobileOpen(false)}>Rewards</Link>
            <Link to={`${base}/our-story`} className={`krisp-header-mobileLink ${pathname === `${base}/our-story` ? 'krisp-header-mobileLinkActive' : ''}`} onClick={() => setMobileOpen(false)}>Our Story</Link>
            <Link to={`${base}/contact`} className={`krisp-header-mobileLink ${pathname === `${base}/contact` ? 'krisp-header-mobileLinkActive' : ''}`} onClick={() => setMobileOpen(false)}>Contact</Link>
          </nav>
        )}
      </header>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => { setCartOpen(false); navigate(`${base}/checkout`); }}
      />
    </>
  );
}
