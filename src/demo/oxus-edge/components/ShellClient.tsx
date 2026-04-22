
import { useState, useEffect, useCallback } from "react";
import Navbar from "./Navbar";
import CartDrawer from "./CartDrawer";
import BackToTop from "./BackToTop";
import AnnouncementBar from "./AnnouncementBar";
import SearchModal from "./SearchModal";
import PageProgress from "./PageProgress";
import FXLayer from "./FXLayer";
import { ToastProvider } from "./Toast";

export default function ShellClient({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Global Cmd/Ctrl+K to open search
  const handleGlobalKey = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setSearchOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleGlobalKey);
    return () => document.removeEventListener("keydown", handleGlobalKey);
  }, [handleGlobalKey]);

  return (
    <ToastProvider>
      <PageProgress />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-ember focus:text-white focus:rounded-[2px]">
        Skip to content
      </a>
      <AnnouncementBar />
      <Navbar onCartOpen={() => setCartOpen(true)} onSearchOpen={() => setSearchOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <main id="main-content" className="min-h-screen bg-depth-grounds">{children}</main>
      <BackToTop />
      <FXLayer />
    </ToastProvider>
  );
}
