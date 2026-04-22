import Badge from "@/demo/oxus-edge/components/Badge";
import { orders } from "@/demo/oxus-edge/data/orders";
import { products } from "@/demo/oxus-edge/data/products";
import { drops } from "@/demo/oxus-edge/data/drops";

const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
const activeDrops = drops.filter((d) => d.status === "live").length;
const upcomingDrops = drops.filter((d) => d.status === "upcoming").length;
const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5).length;

const STATS = [
  { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, change: "+12.5% from last month", up: true },
  { label: "Orders", value: `${orders.length}`, change: "+8 this week", up: true },
  { label: "Active Drops", value: `${activeDrops}`, change: `${upcomingDrops} upcoming`, up: false },
  { label: "Products", value: `${products.length}`, change: `${lowStock} low stock`, up: false },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="font-display text-xl tracking-[0.06em] mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {STATS.map((s) => (
          <div key={s.label} className="bg-bg-card border border-border rounded-none p-5">
            <div className="text-[0.65rem] tracking-[0.1em] uppercase text-text-muted font-display">
              {s.label}
            </div>
            <div className="text-3xl font-semibold text-ember mt-1 tabular-nums">{s.value}</div>
            <div className={`text-xs mt-1 ${s.up ? "text-success" : "text-text-muted"}`}>
              {s.change}
            </div>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <h3 className="font-display text-base font-medium tracking-[0.08em] mb-3">Recent Orders</h3>
      <div className="bg-bg-card border border-border rounded-none overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              {["Order", "Customer", "Items", "Total", "Status", "Date"].map((h) => (
                <th key={h} className="font-display text-[0.65rem] tracking-[0.12em] uppercase text-text-muted text-left px-4 py-3 border-b border-border whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 5).map((o) => {
              const itemsSummary = o.items.length === 1
                ? o.items[0].productName
                : `${o.items[0].productName} + ${o.items.length - 1} items`;
              const dateStr = new Date(o.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
              return (
              <tr key={o.id} className="hover:bg-bg-medium transition-colors">
                <td className="px-4 py-3 text-ember text-sm tabular-nums">{o.orderNumber.replace(/OE-\d{8}-/, "#")}</td>
                <td className="px-4 py-3 text-sm">{o.customerName.split(" ")[0]} {o.customerName.split(" ")[1]?.[0]}.</td>
                <td className="px-4 py-3 text-sm">{itemsSummary}</td>
                <td className="px-4 py-3 text-sm tabular-nums">${o.total}</td>
                <td className="px-4 py-3">
                  <Badge variant={o.status === "delivered" ? "success" : o.status === "shipped" ? "success" : "upcoming"}>
                    {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm text-text-muted tabular-nums">{dateStr}</td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-right">
        <a href="/admin/orders" className="text-sm text-ember hover:text-ember-light transition-colors">View All Orders &rarr;</a>
      </div>
    </div>
  );
}
