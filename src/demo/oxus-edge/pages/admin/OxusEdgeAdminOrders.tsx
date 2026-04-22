
import { useState } from "react";
import Badge from "@/demo/oxus-edge/components/Badge";
import { orders } from "@/demo/oxus-edge/data/orders";

export default function AdminOrdersPage() {
  const [statusFilter, setStatusFilter] = useState("all");

  const processing = orders.filter((o) => o.status === "processing").length;
  const shipped = orders.filter((o) => o.status === "shipped").length;
  const delivered = orders.filter((o) => o.status === "delivered").length;

  const filteredOrders = statusFilter === "all"
    ? orders
    : orders.filter((o) => o.status === statusFilter);

  return (
    <div>
      <h1 className="font-display text-xl tracking-[0.06em] mb-6">Orders</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Processing", value: processing },
          { label: "Shipped", value: shipped },
          { label: "Delivered", value: delivered },
        ].map((s) => (
          <div key={s.label} className="bg-bg-card border border-border rounded-none p-5">
            <div className="text-[0.65rem] tracking-[0.1em] uppercase text-text-muted font-display">
              {s.label}
            </div>
            <div className="text-2xl font-semibold text-ember mt-1 tabular-nums">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-bg-card border border-border rounded-none overflow-hidden">
        <div className="px-5 py-3 flex items-center justify-between border-b border-border">
          <span className="text-text-secondary text-sm">{filteredOrders.length} total orders</span>
          <select
            className="px-3 py-1.5 bg-bg-dark border border-border rounded-none text-sm text-text-secondary"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter orders by status"
          >
            <option value="all">All Statuses</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {["Order", "Customer", "Email", "Items", "Total", "Status", "Date", "Actions"].map((h) => (
                  <th key={h} className="font-display text-[0.65rem] tracking-[0.12em] uppercase text-text-muted text-left px-5 py-3 border-b border-border whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((o) => {
                const itemCount = o.items.reduce((sum, i) => sum + i.quantity, 0);
                const dateStr = new Date(o.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                return (
                <tr key={o.id} className="hover:bg-bg-medium transition-colors">
                  <td className="px-5 py-3 text-ember text-sm tabular-nums">{o.orderNumber.replace(/OE-\d{8}-/, "#")}</td>
                  <td className="px-5 py-3 text-sm">{o.customerName}</td>
                  <td className="px-5 py-3 text-sm text-text-muted">{o.customerEmail}</td>
                  <td className="px-5 py-3 text-sm">{itemCount}</td>
                  <td className="px-5 py-3 text-sm tabular-nums">${o.total}</td>
                  <td className="px-5 py-3">
                    <Badge variant={o.status === "delivered" ? "success" : o.status === "shipped" ? "success" : "upcoming"}>
                      {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 text-sm text-text-muted tabular-nums">{dateStr}</td>
                  <td className="px-5 py-3">
                    <button className="px-2 py-1 text-[0.7rem] text-text-muted border border-border rounded-none hover:text-ember hover:border-ember transition-all cursor-pointer">
                      View
                    </button>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
