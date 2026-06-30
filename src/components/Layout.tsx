import { ReactNode, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { JsonLd } from "./JsonLd";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const initialMount = useRef(true);

  // WCAG 2.4.2: route changes need to be announced. Programmatically focusing
  // <main> after navigation causes screen readers to read the new page from the
  // start. Skipping the initial mount avoids stealing focus on first paint.
  // preventScroll is critical — without it, focus() scrolls <main> into view
  // and shifts the page down by the sticky nav height, overriding ScrollToTop.
  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd />

      {/* Skip Link */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <Navigation />

      <main
        id="main-content"
        ref={mainRef}
        tabIndex={-1}
        className="flex-grow focus:outline-none"
      >
        {children}
      </main>

      <Footer />
    </div>
  );
};
