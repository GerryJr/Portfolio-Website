
import { Outlet } from "react-router-dom";
import Link from "@/demo/oxus-edge/lib/next-link";
import Image from "@/demo/oxus-edge/lib/next-image";
import { usePathname } from "@/demo/oxus-edge/lib/next-navigation";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" },
  { label: "Products", href: "/admin/products", icon: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" },
  { label: "Drops", href: "/admin/drops", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 6v6l4 2" },
  { label: "Inventory", href: "/admin/inventory", icon: "M22 12h-4l-3 9L9 3l-3 9H2" },
  { label: "Orders", href: "/admin/orders", icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6" },
];

export default function AdminLayout() {
  const pathname = usePathname();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] min-h-[calc(100vh-96px)]">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col bg-depth-grounds border-r border-border p-4">
        <div className="flex items-center gap-2 px-2 mb-5 pb-4 border-b border-border">
          <Image
            src="/logo.png"
            alt=""
            width={24}
            height={24}
            style={{ width: 'auto', height: 'auto' }}
            className="brightness-0 invert-[0.9] sepia-[0.3] saturate-50 hue-rotate-[10deg]"
          />
          <span className="font-display text-[0.65rem] tracking-[0.14em] text-text-muted uppercase">Admin Panel</span>
        </div>

        <div className="text-[0.55rem] tracking-[0.15em] uppercase text-text-muted/60 font-display px-2 mb-2">
          Management
        </div>
        <nav className="flex flex-col gap-0.5">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 text-[0.8rem] rounded-none transition-all duration-200 ${
                  active
                    ? "text-ember bg-ember/10 font-medium border-l-2 border-ember"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/[0.03]"
                }`}
              >
                <svg viewBox="0 0 24 24" className={`w-4 h-4 ${active ? "text-ember" : "text-text-muted"}`} fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d={item.icon} />
                </svg>
                {item.label}
                {/* active indicator via border-l on the link itself */}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-4 border-t border-border">
          <Link
            href="/"
            className="flex items-center gap-2.5 px-3 py-2 text-[0.8rem] text-text-muted hover:text-text-primary hover:bg-white/[0.03] rounded-none transition-all"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Back to Store
          </Link>
        </div>
      </aside>

      {/* Content */}
      <main className="overflow-x-auto bg-depth-mocha">
        {/* Mobile nav */}
        <div className="lg:hidden flex gap-1 overflow-x-auto px-5 py-3 border-b border-white/[0.06] bg-bg-dark">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap px-3 py-1.5 text-xs rounded-none transition-all ${
                  active
                    ? "text-ember bg-ember/15 font-medium"
                    : "text-text-secondary hover:text-text-primary bg-white/[0.04]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="px-5 py-5 lg:px-6 lg:py-6"><Outlet /></div>
      </main>
    </div>
  );
}
