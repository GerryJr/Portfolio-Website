
import { useState } from "react";
import Link from "@/demo/oxus-edge/lib/next-link";
import Badge from "@/demo/oxus-edge/components/Badge";
import PasswordInput from "@/demo/oxus-edge/components/PasswordInput";
import { orders } from "@/demo/oxus-edge/data/orders";

const NAV_ITEMS = ["Order History", "Notifications", "Profile"];

const USER_ORDERS = orders.map((o) => ({
  id: `#${o.orderNumber}`,
  date: new Date(o.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
  items: o.items.map((i) => i.productName).join(", "),
  total: `$${o.total}.00`,
  status: o.status as "processing" | "shipped" | "delivered",
}));

const NOTIFICATION_PREFS = [
  { title: "Email — Drop Alerts", desc: "Get notified 24 hours and 1 hour before each drop goes live", defaultOn: true },
  { title: "SMS — Drop Alerts", desc: "Text message 15 minutes before each drop (standard rates apply)", defaultOn: true },
  { title: "Email — Order Updates", desc: "Shipping confirmations, delivery updates, and tracking info", defaultOn: true },
  { title: "Email — Newsletter", desc: "Behind-the-scenes content, workshop updates, and new product announcements", defaultOn: false },
];

export default function AccountPage() {
  const [tab, setTab] = useState(0);

  return (
    <div className="bg-depth-mocha min-h-screen">
    <div className="mx-auto max-w-[1280px] px-6">
      <nav className="text-xs text-text-muted pt-8 mb-4 flex items-center gap-1.5"><a href="/" className="hover:text-ember transition-colors">Home</a><svg viewBox="0 0 24 24" className="w-3 h-3 text-text-muted/50" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg><span className="text-text-primary font-semibold">My Account</span></nav>

      <h1 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-medium tracking-[0.01em] mb-6">My Account</h1>

      {/* Mobile tab bar */}
      <div role="tablist" aria-label="Account sections" className="md:hidden flex gap-1 overflow-x-auto pb-4">
        {NAV_ITEMS.map((item, i) => (
          <button
            key={item}
            role="tab"
            aria-selected={tab === i}
            aria-controls={`tabpanel-${i}`}
            onClick={() => setTab(i)}
            className={`whitespace-nowrap px-3 py-1.5 text-sm rounded-none transition-all cursor-pointer ${
              tab === i
                ? "text-ember bg-ember/15 font-medium"
                : "text-text-secondary hover:text-text-primary bg-bg-card"
            }`}
          >
            {item}
          </button>
        ))}
        <Link
          href="/login"
          className="whitespace-nowrap px-3 py-1.5 text-sm text-text-muted hover:text-danger bg-bg-card rounded-none transition-all"
        >
          Sign Out
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 pb-12">
        {/* Sidebar */}
        <aside className="hidden md:block">
          <h2 className="font-display text-base tracking-[0.06em] mb-5">My Account</h2>
          <nav role="tablist" aria-label="Account sections" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item, i) => (
              <button
                key={item}
                role="tab"
                aria-selected={tab === i}
                aria-controls={`tabpanel-${i}`}
                onClick={() => setTab(i)}
                className={`text-left px-3 py-2 text-sm rounded-none transition-all cursor-pointer ${
                  tab === i
                    ? "text-ember bg-ember/15 border-l-2 border-ember"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-card"
                }`}
              >
                {item}
              </button>
            ))}
            <Link
              href="/login"
              className="text-left px-3 py-2 text-sm text-text-muted hover:text-danger rounded-none hover:bg-bg-card transition-all"
            >
              Sign Out
            </Link>
          </nav>
        </aside>

        {/* Content */}
        <div>
          {/* Orders */}
          {tab === 0 && (
            <div role="tabpanel" id="tabpanel-0" aria-label="Order History">
              <h2 className="font-display text-xl tracking-[0.06em] mb-6">Order History</h2>
              {/* Desktop table */}
              <div className="hidden md:block bg-bg-card border border-border rounded-none overflow-hidden">
                <div className="overflow-x-auto">
                <table className="w-full" aria-label="Order history">
                  <thead>
                    <tr>
                      {["Order", "Date", "Items", "Total", "Status"].map((h) => (
                        <th
                          key={h}
                          className="font-display text-[0.65rem] tracking-[0.12em] uppercase text-text-muted text-left px-4 py-3 border-b border-border"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {USER_ORDERS.map((o) => (
                      <tr key={o.id} className="hover:bg-bg-medium transition-colors">
                        <td className="px-4 py-3 text-ember text-sm tabular-nums">{o.id}</td>
                        <td className="px-4 py-3 text-sm tabular-nums">{o.date}</td>
                        <td className="px-4 py-3 text-sm">{o.items}</td>
                        <td className="px-4 py-3 text-sm tabular-nums">{o.total}</td>
                        <td className="px-4 py-3">
                          <Badge variant={o.status === "delivered" ? "success" : "processing"}>
                            {o.status === "delivered" ? "Delivered" : "Processing"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden space-y-3">
                {USER_ORDERS.map((o) => (
                  <div key={o.id} className="bg-bg-card border border-border rounded-none p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-ember text-sm font-semibold tabular-nums">{o.id}</span>
                      <Badge variant={o.status === "delivered" ? "success" : "processing"}>
                        {o.status === "delivered" ? "Delivered" : "Processing"}
                      </Badge>
                    </div>
                    <p className="text-sm text-text-secondary mb-1">{o.items}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-muted tabular-nums">{o.date}</span>
                      <span className="font-semibold tabular-nums">{o.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notifications */}
          {tab === 1 && (
            <div role="tabpanel" id="tabpanel-1" aria-label="Notifications">
              <h2 className="font-display text-xl tracking-[0.06em] mb-6">Notification Preferences</h2>
              {NOTIFICATION_PREFS.map((pref) => (
                <NotificationPref key={pref.title} {...pref} />
              ))}
              <p className="text-text-muted text-xs mt-5">
                Phone: (512) 555-0189 &middot;{" "}
                <button className="text-ember hover:text-ember-light cursor-pointer">Change phone number</button>
                <br />
                Email: gerry@oxusedge.com &middot;{" "}
                <button className="text-ember hover:text-ember-light cursor-pointer">Change email</button>
              </p>
            </div>
          )}

          {/* Profile */}
          {tab === 2 && (
            <div role="tabpanel" id="tabpanel-2" aria-label="Profile" className="max-w-[480px]">
              <h2 className="font-display text-xl tracking-[0.06em] mb-6">Profile</h2>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label htmlFor="profile-first-name" className="block text-xs font-semibold tracking-[0.06em] uppercase text-text-secondary font-display mb-1">First Name</label>
                  <input id="profile-first-name" type="text" className="input" defaultValue="Gerry" autoComplete="given-name" />
                </div>
                <div>
                  <label htmlFor="profile-last-name" className="block text-xs font-semibold tracking-[0.06em] uppercase text-text-secondary font-display mb-1">Last Name</label>
                  <input id="profile-last-name" type="text" className="input" defaultValue="Rodriguez" autoComplete="family-name" />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="profile-email" className="block text-xs font-semibold tracking-[0.06em] uppercase text-text-secondary font-display mb-1">Email</label>
                <input id="profile-email" type="email" className="input" defaultValue="gerry@oxusedge.com" autoComplete="email" />
              </div>
              <div className="mb-3">
                <label htmlFor="profile-phone" className="block text-xs font-semibold tracking-[0.06em] uppercase text-text-secondary font-display mb-1">Phone</label>
                <input id="profile-phone" type="tel" className="input" defaultValue="(512) 555-0189" autoComplete="tel" />
              </div>
              <hr className="border-border my-6" />
              <h3 className="font-display text-xs tracking-[0.1em] uppercase mb-5 pb-2 border-b border-border">
                Change Password
              </h3>
              <div className="mb-3">
                <label htmlFor="profile-current-password" className="block text-xs font-semibold tracking-[0.06em] uppercase text-text-secondary font-display mb-1">Current Password</label>
                <PasswordInput id="profile-current-password" placeholder="Enter current password" autoComplete="current-password" />
              </div>
              <div className="mb-3">
                <label htmlFor="profile-new-password" className="block text-xs font-semibold tracking-[0.06em] uppercase text-text-secondary font-display mb-1">New Password</label>
                <PasswordInput id="profile-new-password" placeholder="Enter new password" autoComplete="new-password" />
              </div>
              <div className="mb-5">
                <label htmlFor="profile-confirm-password" className="block text-xs font-semibold tracking-[0.06em] uppercase text-text-secondary font-display mb-1">Confirm New Password</label>
                <PasswordInput id="profile-confirm-password" placeholder="Confirm new password" autoComplete="new-password" />
              </div>
              <button className="px-6 py-3 bg-ember text-white font-display text-[0.8rem] font-semibold tracking-[0.12em] uppercase rounded-[2px] hover:bg-ember-light transition-all cursor-pointer">
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

function NotificationPref({ title, desc, defaultOn }: { title: string; desc: string; defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn);

  return (
    <div className="flex items-center justify-between p-5 bg-bg-card border border-border rounded-none mb-3">
      <div>
        <h3 className="font-display text-sm tracking-[0.04em]">{title}</h3>
        <p className="text-xs text-text-secondary mt-0.5 leading-[1.7]">{desc}</p>
      </div>
      <button
        role="switch"
        aria-checked={on}
        aria-label={title}
        className={`toggle cursor-pointer ${on ? "active" : ""}`}
        onClick={() => setOn(!on)}
      />
    </div>
  );
}
