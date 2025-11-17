import { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { JsonLd } from "./JsonLd";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd />
      
      {/* Skip Link */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <Navigation />

      <main id="main-content" className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
};
