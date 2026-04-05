import { useState, useRef, useEffect, useCallback } from 'react';
import { LOCATIONS, getAllGroups, formatPrice, type MenuItem } from '../lib/menu-data';
import { useCart } from '../components/CartProvider';
import ItemModal from '../components/ItemModal';
import LocationPicker from '../components/LocationPicker';

const STORAGE_KEY = 'krisp_last_location';

export default function KrispOrder() {
  const { location, setLocation, items: cartItems, clearCart } = useCart();
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [ready, setReady] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [proximity, setProximity] = useState<{ distance: number; isNearby: boolean } | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const navRef = useRef<HTMLUListElement>(null);
  const activeTabRef = useRef<HTMLLIElement>(null);
  const isScrollingToSection = useRef(false);

  // Show scroll-to-top after scrolling down
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Detect proximity to selected location
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const locData = LOCATIONS.find(l => l.id === location) || LOCATIONS[0];
        const R = 3959;
        const dLat = (locData.lat - latitude) * Math.PI / 180;
        const dLon = (locData.lng - longitude) * Math.PI / 180;
        const a = Math.sin(dLat / 2) ** 2 +
          Math.cos(latitude * Math.PI / 180) * Math.cos(locData.lat * Math.PI / 180) *
          Math.sin(dLon / 2) ** 2;
        const dist = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        setProximity({ distance: dist, isNearby: dist < 2 });
      },
      () => { /* denied or unavailable */ },
      { timeout: 5000, maximumAge: 300000 }
    );
  }, [location]);

  // On mount: check if user has a saved location
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && LOCATIONS.find(l => l.id === saved)) {
      setLocation(saved);
      setReady(true);
    } else {
      setShowLocationPicker(true);
      setReady(true);
    }
  }, [setLocation]);

  const handleLocationSelect = (id: string) => {
    if (cartItems.length > 0 && id !== location) {
      if (!window.confirm('Changing location will clear your cart. Continue?')) return;
      clearCart();
    }
    localStorage.setItem(STORAGE_KEY, id);
    setLocation(id);
    setShowLocationPicker(false);
  };

  const loc = LOCATIONS.find(l => l.id === location) || LOCATIONS[0];
  const allGroups = getAllGroups(location);

  // --- Category nav scroll arrow logic ---
  const checkNavOverflow = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;
    setCanScrollLeft(nav.scrollLeft > 4);
    setCanScrollRight(nav.scrollLeft < nav.scrollWidth - nav.clientWidth - 4);
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    checkNavOverflow();
    nav.addEventListener('scroll', checkNavOverflow, { passive: true });
    window.addEventListener('resize', checkNavOverflow);
    return () => {
      nav.removeEventListener('scroll', checkNavOverflow);
      window.removeEventListener('resize', checkNavOverflow);
    };
  }, [checkNavOverflow, ready]);

  const scrollNav = (dir: number) => {
    const nav = navRef.current;
    if (!nav) return;
    nav.scrollBy({ left: dir * 200, behavior: 'smooth' });
  };

  // Scroll active tab into view when active group changes
  useEffect(() => {
    if (activeTabRef.current && navRef.current) {
      const tab = activeTabRef.current;
      const nav = navRef.current;
      const tabLeft = tab.offsetLeft;
      const tabRight = tabLeft + tab.offsetWidth;
      const navLeft = nav.scrollLeft;
      const navRight = navLeft + nav.clientWidth;
      if (tabLeft < navLeft + 44) {
        nav.scrollTo({ left: tabLeft - 48, behavior: 'smooth' });
      } else if (tabRight > navRight - 44) {
        nav.scrollTo({ left: tabRight - nav.clientWidth + 48, behavior: 'smooth' });
      }
    }
  }, [activeGroup]);

  // --- Auto-highlight active section on scroll ---
  const activeGroupRef = useRef(activeGroup);
  activeGroupRef.current = activeGroup;

  useEffect(() => {
    if (allGroups.length === 0) return;
    const guids = allGroups.map(g => g.guid);

    const handleScroll = () => {
      if (isScrollingToSection.current) return;
      const offset = 160;
      let current: string | null = null;
      for (const guid of guids) {
        const el = sectionRefs.current[guid];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            current = guid;
          }
        }
      }
      if (current && current !== activeGroupRef.current) {
        setActiveGroup(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [allGroups.length, location]);

  // Set first group as active on load
  useEffect(() => {
    if (allGroups.length > 0 && !activeGroup) {
      setActiveGroup(allGroups[0].guid);
    }
  }, [allGroups.length]);

  const scrollToGroup = (groupGuid: string) => {
    setActiveGroup(groupGuid);
    isScrollingToSection.current = true;
    const el = sectionRefs.current[groupGuid];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => { isScrollingToSection.current = false; }, 800);
    }
  };

  if (!ready) return null;

  return (
    <>
      {/* Location Picker Overlay */}
      {showLocationPicker && (
        <LocationPicker onSelect={handleLocationSelect} />
      )}

      {/* Header Banner */}
      <div className="krisp-order-headerBanner">
        <div className="krisp-order-bannerContent">
          <p className="krisp-order-bannerTagline">
            Experience good vibes at both our Irvine locations.
          </p>
          <h1 className="krisp-order-bannerTitle">
            Live in moments that matter
          </h1>
          <p className="krisp-order-bannerWarning">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: 4 }}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            Please double check your pick up location. Orders cannot be refunded.
          </p>
        </div>
      </div>

      {/* Location Bar */}
      <div className="krisp-order-locationBarWrap">
        <div className="krisp-order-locationBar">
          <div className="krisp-order-locationIconCircle">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <div className="krisp-order-locationInfo">
            <span className="krisp-order-locationLabel">Pickup Location</span>
            <span className="krisp-order-activeLocationName">{loc.name}</span>
            <span className="krisp-order-locationAddress">{loc.address}, {loc.city}</span>
          </div>
          {proximity?.isNearby && (
            <span className="krisp-order-nearbyBadge">
              <span className="krisp-order-nearbyDot" />
              {proximity.distance < 0.5 ? "You're here" : `${proximity.distance.toFixed(1)} mi`}
            </span>
          )}
          <button className="krisp-order-changeLocationBtn" onClick={() => setShowLocationPicker(true)}>
            Change Location
          </button>
        </div>
      </div>

      {/* Category Nav — sticky with arrow buttons */}
      <nav className="krisp-order-categoryNav">
        {canScrollLeft && (
          <button className="krisp-order-navArrow krisp-order-navArrowLeft" onClick={() => scrollNav(-1)} aria-label="Scroll categories left">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
        )}
        <ul className="krisp-order-categoryList" ref={navRef}>
          {allGroups.map(group => (
            <li
              key={group.guid}
              ref={activeGroup === group.guid ? activeTabRef : null}
              className={`krisp-order-categoryItem ${activeGroup === group.guid ? 'krisp-order-categoryItemActive' : ''}`}
              onClick={() => scrollToGroup(group.guid)}
            >
              {group.name}
            </li>
          ))}
        </ul>
        {canScrollRight && (
          <button className="krisp-order-navArrow krisp-order-navArrowRight" onClick={() => scrollNav(1)} aria-label="Scroll categories right">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        )}
      </nav>

      {/* Menu Items */}
      <div className="krisp-order-menuContent">
        {allGroups.map(group => (
          <section
            key={group.guid}
            id={group.guid}
            className="krisp-order-menuSection"
            ref={el => { sectionRefs.current[group.guid] = el; }}
          >
            <h2 className="krisp-order-sectionTitle">{group.name}</h2>
            <div className="krisp-order-itemGrid">
              {group.items.map(item => (
                <div
                  key={item.guid}
                  className={`krisp-order-itemCard ${item.outOfStock ? 'krisp-order-outOfStock' : ''}`}
                  onClick={() => !item.outOfStock && setSelectedItem(item)}
                  onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && !item.outOfStock) { e.preventDefault(); setSelectedItem(item); } }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${item.name}`}
                >
                  <div className="krisp-order-itemImageWrapper">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="krisp-order-itemImage" loading="lazy" />
                    ) : (
                      <div className="krisp-order-noImage">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.25">
                          <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
                        </svg>
                      </div>
                    )}
                    {item.outOfStock && <span className="krisp-order-outOfStockBadge">Sold Out</span>}
                  </div>
                  <div className="krisp-order-itemInfo">
                    <h3 className="krisp-order-itemName">{item.name}</h3>
                    {item.description && <p className="krisp-order-itemDescription">{item.description.replace(/\r\n/g, ' ').replace(/\*\*/g, '')}</p>}
                    <p className="krisp-order-itemPrice">{formatPrice(item.prices)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          className="krisp-order-scrollTopBtn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
        </button>
      )}

      <div className="krisp-order-toastFooter">
        <p>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: 4 }}>
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          Secure online ordering powered by <strong>Toast</strong>
        </p>
      </div>
    </>
  );
}
