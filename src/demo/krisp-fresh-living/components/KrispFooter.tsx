import { Link, useLocation } from 'react-router-dom';

export default function KrispFooter() {
  const { pathname } = useLocation();
  const base = '/demo/krisp-fresh-living';

  return (
    <footer className="krisp-footer">
      <div className="krisp-footer-inner">
        <div className="krisp-footer-brand">
          <img src="/demo/krisp/krisp-icon.webp" alt="KRISP" width={36} height={36} />
          <div>
            <p className="krisp-footer-name">KRISP Fresh Living</p>
            <p className="krisp-footer-tagline">Specialty Coffee &amp; Fresh Food</p>
          </div>
        </div>

        <nav className="krisp-footer-nav">
          <Link to={`${base}/order`} className={`krisp-footer-navLink ${pathname === `${base}/order` ? 'krisp-footer-navLinkActive' : ''}`}>Order</Link>
          <Link to={`${base}/menu`} className={`krisp-footer-navLink ${pathname === `${base}/menu` ? 'krisp-footer-navLinkActive' : ''}`}>Menu</Link>
          <Link to={`${base}/rewards`} className={`krisp-footer-navLink ${pathname === `${base}/rewards` ? 'krisp-footer-navLinkActive' : ''}`}>Rewards</Link>
          <Link to={`${base}/our-story`} className={`krisp-footer-navLink ${pathname === `${base}/our-story` ? 'krisp-footer-navLinkActive' : ''}`}>Our Story</Link>
          <Link to={`${base}/contact`} className={`krisp-footer-navLink ${pathname === `${base}/contact` ? 'krisp-footer-navLinkActive' : ''}`}>Contact</Link>
        </nav>

        <div className="krisp-footer-social">
          <a href="https://www.instagram.com/krispfreshliving/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="krisp-footer-socialLink">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="https://www.yelp.com/biz/krisp-fresh-living-irvine" target="_blank" rel="noopener noreferrer" aria-label="Yelp" className="krisp-footer-socialLink">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          </a>
        </div>
      </div>

      <div className="krisp-footer-bottom">
        <p className="krisp-footer-copyright">&copy; {new Date().getFullYear()} KRISP Fresh Living. All rights reserved.</p>
        <p className="krisp-footer-powered">Powered by Toast</p>
      </div>
    </footer>
  );
}
