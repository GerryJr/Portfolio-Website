import Link from "@/demo/oxus-edge/lib/next-link";
import Image from "@/demo/oxus-edge/lib/next-image";
import { products } from "@/demo/oxus-edge/data/products";
import { SOCIAL_LINKS } from "./SocialIcons";

// Build nav links dynamically from active catalog
function getNavLinks(): { label: string; href: string }[] {
  const links: { label: string; href: string }[] = [];
  const hasKnives = products.some((p) => p.category === "knives");
  const hasAccessories = products.some((p) => p.category === "accessories" || p.category === "apparel");
  const hasCoffee = products.some((p) => p.category === "coffee");

  if (hasKnives) links.push({ label: "Knives", href: "/knives" });
  if (hasAccessories) links.push({ label: "Accessories", href: "/accessories" });
  if (hasCoffee) links.push({ label: "Coffee", href: "/coffee" });

  return links;
}

export default function Footer() {
  const navLinks = getNavLinks();

  return (
    <footer className="bg-depth-grounds">
      <div className="h-px bg-gradient-to-r from-transparent via-ember/50 to-transparent" />

      <div className="mx-auto max-w-[1280px] px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 mb-14">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 relative shrink-0 rounded-[2px] overflow-hidden">
                <Image src="/logo.png" alt="" fill sizes="32px" className="object-cover scale-[1.25] brightness-0 invert-[0.88] sepia-[0.2] saturate-50 hue-rotate-[10deg]" />
              </div>
              <span className="font-display text-[0.82rem] tracking-[0.14em] font-semibold">OXUS EDGE</span>
            </div>
            <p className="text-text-secondary text-[0.82rem] leading-relaxed max-w-[280px] mb-6">
              Handcrafted blades forged in small batches in the Appalachian tradition.
            </p>
            <div className="flex gap-2">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="w-8 h-8 flex items-center justify-center bg-white/[0.03] border border-white/[0.07] rounded-[2px] text-text-muted hover:text-ember hover:border-ember/30 hover:bg-ember/5 transition-all duration-200 ease-out"
                  aria-label={label}
                >
                  <Icon className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          {navLinks.length > 0 && (
            <div className="lg:col-span-2 lg:col-start-6">
              <h4 className="text-[0.65rem] font-semibold tracking-[0.16em] uppercase text-text-primary mb-5">Shop</h4>
              <ul className="space-y-2.5">
                {navLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="line-wipe-thin text-text-secondary text-[0.82rem] hover:text-ember transition-colors duration-200 ease-out">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="text-[0.65rem] font-semibold tracking-[0.16em] uppercase text-text-primary mb-5">Company</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="line-wipe-thin text-text-secondary text-[0.82rem] hover:text-ember transition-colors duration-200 ease-out">Our Story</Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div className="lg:col-span-2">
            <h4 className="text-[0.65rem] font-semibold tracking-[0.16em] uppercase text-text-primary mb-5">Help</h4>
            <ul className="space-y-2.5">
              {["FAQ", "Shipping & Returns", "Contact Us", "My Account"].map((item) => (
                <li key={item}>
                  {item === "My Account" ? (
                    <Link
                      href="/account"
                      className="line-wipe-thin text-text-secondary text-[0.82rem] hover:text-ember transition-colors duration-200 ease-out"
                    >
                      {item}
                    </Link>
                  ) : (
                    <span className="text-text-muted/50 text-[0.82rem] cursor-default" title="Coming soon">
                      {item}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="border-t border-white/[0.08] pt-6">
          <div className="flex flex-wrap gap-x-5 gap-y-2 mb-3">
            {[
              "Privacy Policy",
              "Terms & Conditions",
              "Accessibility",
              "Shipping & Returns",
              "Do Not Sell or Share My Personal Information",
            ].map((item) => (
              <span key={item} className="text-text-muted/40 text-[0.75rem] cursor-default" title="Coming soon">
                {item}
              </span>
            ))}
          </div>
          <p className="text-text-muted/60 text-[0.68rem]">
            &copy; 2026 Oxus Edge LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
