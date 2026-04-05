import { Link, useLocation } from 'react-router-dom';
import FadeIn from '../components/FadeIn';

const PAGE_META: Record<string, { name: string; image: string; tagline: string }> = {
  '/demo/krisp-fresh-living/menu': {
    name: 'Menu',
    image: '/demo/krisp/menu-2023-11-07-7.20.02.webp',
    tagline: 'Every sip, every bite — crafted fresh.',
  },
  '/demo/krisp-fresh-living/rewards': {
    name: 'Rewards',
    image: '/demo/krisp/menu-2023-11-07-7.19.42.webp',
    tagline: 'Good things come to those who earn.',
  },
  '/demo/krisp-fresh-living/our-story': {
    name: 'Our Story',
    image: '/demo/krisp/menu-2023-11-07-7.18.59.webp',
    tagline: 'From Irvine, with intention.',
  },
  '/demo/krisp-fresh-living/contact': {
    name: 'Contact',
    image: '/demo/krisp/menu-2023-11-07-7.18.20.webp',
    tagline: 'We\'d love to hear from you.',
  },
};

export default function KrispUnderConstruction() {
  const { pathname } = useLocation();
  const meta = PAGE_META[pathname] || {
    name: 'This Page',
    image: '/demo/krisp/store.webp',
    tagline: 'Something new is on the way.',
  };

  return (
    <div className="krisp-uc-page">
      <section className="krisp-uc-split">
        {/* Left — image */}
        <FadeIn className="krisp-uc-imageCol">
          <div className="krisp-uc-imageWrap">
            <img src={meta.image} alt="" className="krisp-uc-image" />
          </div>
        </FadeIn>

        {/* Right — content */}
        <FadeIn delay={100} className="krisp-uc-contentCol">
          <div className="krisp-uc-content">
            <div className="krisp-uc-labelWrap">
              <span className="krisp-uc-line" />
              <p className="krisp-uc-label">Coming Soon</p>
            </div>
            <h1 className="krisp-uc-title">{meta.name}</h1>
            <p className="krisp-uc-tagline">{meta.tagline}</p>
            <p className="krisp-uc-body">
              This page is still being put together. In the meantime,
              skip the line and order ahead — or head back home.
            </p>
            <div className="krisp-uc-actions">
              <Link to="/demo/krisp-fresh-living/order" className="krisp-uc-btnPrimary">Order Ahead</Link>
              <Link to="/demo/krisp-fresh-living" className="krisp-uc-btnOutline">Back Home</Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
