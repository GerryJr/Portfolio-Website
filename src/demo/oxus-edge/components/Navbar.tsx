
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "@/demo/oxus-edge/lib/next-link";
import Image from "@/demo/oxus-edge/lib/next-image";
import { usePathname } from "@/demo/oxus-edge/lib/next-navigation";
import { NAV_LINKS } from "@/demo/oxus-edge/lib/nav";
import { cartItems } from "@/demo/oxus-edge/data/cart";
import { SOCIAL_LINKS } from "./SocialIcons";

interface NavbarProps { onCartOpen: () => void; onSearchOpen?: () => void }

export default function Navbar({ onCartOpen, onSearchOpen }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Focus trap for mobile menu
  const handleMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !mobileMenuRef.current) return;
    const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  useEffect(() => {
    const h = () => {
      setScrolled(window.scrollY > 20);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, window.scrollY / docHeight) : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", h, { passive: true });
    h();
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Reset on route change: close mobile menu + reset scroll color to top
  useEffect(() => {
    setMobileOpen(false);
    setScrollProgress(0);
    setScrolled(window.scrollY > 20);
    // Recalculate after new page content has rendered
    requestAnimationFrame(() => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, window.scrollY / docHeight) : 0;
      setScrollProgress(progress);
      setScrolled(window.scrollY > 20);
    });
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/knives") return pathname.startsWith("/knives");
    if (href === "/accessories") return pathname.startsWith("/accessories");
    if (href === "/coffee") return pathname.startsWith("/coffee");
    if (href === "/about") return pathname.startsWith("/about");
    return false;
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-[1000] transition-[border-color,box-shadow,background-color] duration-300 ease-out ${
          scrolled
            ? "border-b border-white/[0.06] shadow-[0_1px_12px_rgba(0,0,0,0.4)]"
            : "border-b border-transparent"
        }`}
        style={{ backgroundColor: `color-mix(in srgb, var(--color-depth-grounds) ${scrollProgress * 100}%, var(--color-depth-mocha))` }}
        aria-label="Main navigation"
      >
        <div
          className="mx-auto max-w-[1280px] px-6 flex items-center justify-between"
          style={{ height: "calc(60px * var(--navbar-scale, 1))" }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Oxus Edge home">
            <div
              className="w-12 aspect-[1855/2400] shrink-0 bg-white"
              role="img"
              aria-label="Oxus Edge logo"
              style={{
                WebkitMaskImage: "url('/demo/oxus-edge/logo.png')",
                maskImage: "url('/demo/oxus-edge/logo.png')",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
              }}
            />
            <span
              className="font-display font-semibold tracking-[0.15em] text-text-primary hidden sm:block"
              style={{ fontSize: "calc(0.92rem * var(--navbar-text-scale, 1))" }}
            >
              OXUS EDGE
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-2" role="menubar">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href} role="none">
                  <Link
                    href={link.href}
                    role="menuitem"
                    aria-current={active ? "page" : undefined}
                    style={{ fontSize: "calc(0.92rem * var(--navbar-text-scale, 1))" }}
                    className={`px-4 py-2.5 rounded-[2px] transition-colors duration-200 ease-out ${
                      active ? "text-text-primary font-medium" : "text-text-muted hover:text-text-primary"
                    }`}
                  >
                    <span className={active ? "line-active" : "line-wipe-thin"}>
                      {link.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            {onSearchOpen && (
              <button
                onClick={onSearchOpen}
                className="w-11 h-11 flex items-center justify-center text-text-muted hover:text-text-primary rounded-[2px] transition-colors duration-200 ease-out cursor-pointer"
                aria-label="Search products (Ctrl+K)"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            )}
            <Link
              href="/account"
              className={`w-11 h-11 flex items-center justify-center rounded-[2px] transition-colors duration-200 ease-out ${
                pathname.startsWith("/account") ? "text-ember" : "text-text-muted hover:text-text-primary"
              }`}
              aria-label="My account"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>

            <button
              onClick={onCartOpen}
              className="relative w-11 h-11 flex items-center justify-center text-text-muted hover:text-text-primary rounded-[2px] transition-colors duration-200 ease-out cursor-pointer"
              aria-label={`Shopping cart, ${cartItems.length} items`}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartItems.length > 0 && (
                <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 bg-ember text-white text-[0.65rem] font-semibold flex items-center justify-center rounded-none">
                  {cartItems.length}
                </span>
              )}
            </button>

            <button
              className="flex lg:hidden items-center justify-center w-11 h-11 cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <div className="w-4 h-3 relative flex flex-col justify-between">
                <span className={`block w-full h-px bg-text-primary transition-all duration-200 ease-out origin-center ${mobileOpen ? "rotate-45 translate-y-[5px]" : ""}`} />
                <span className={`block w-full h-px bg-text-primary transition-opacity duration-200 ease-out ${mobileOpen ? "opacity-0" : ""}`} />
                <span className={`block w-full h-px bg-text-primary transition-all duration-200 ease-out origin-center ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        ref={mobileMenuRef}
        onKeyDown={handleMenuKeyDown}
        className={`lg:hidden fixed inset-0 z-[999] bg-depth-roast transition-opacity duration-200 ease-out flex flex-col ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="shrink-0" style={{ height: "calc(60px * var(--navbar-scale, 1))" }} />
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <nav aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between py-4 border-b border-white/[0.06] transition-colors duration-200 ease-out ${
                  isActive(link.href) ? "text-ember" : "text-text-primary hover:text-ember"
                }`}
              >
                <span className="font-display text-lg tracking-[0.02em]">{link.label}</span>
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="9 18 15 12 9 6" /></svg>
              </Link>
            ))}
          </nav>

          <Link href="/account" className="flex items-center gap-3 text-text-muted text-sm hover:text-ember py-3 mt-6 transition-colors duration-200 ease-out">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            My Account
          </Link>
          <button
            onClick={() => { setMobileOpen(false); onCartOpen(); }}
            className="flex items-center gap-3 text-text-muted text-sm hover:text-ember py-3 transition-colors duration-200 ease-out cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            Cart{cartItems.length > 0 && ` (${cartItems.length})`}
          </button>

          <div className="mt-auto pt-10 flex gap-2">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a key={label} href={href} className="w-9 h-9 flex items-center justify-center bg-bg-medium border border-border rounded-[2px] text-text-muted hover:text-ember hover:border-ember/30 transition-all duration-200 ease-out" aria-label={label}>
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
