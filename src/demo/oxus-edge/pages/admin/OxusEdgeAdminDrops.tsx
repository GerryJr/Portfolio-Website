import Badge from "@/demo/oxus-edge/components/Badge";
import { drops } from "@/demo/oxus-edge/data/drops";
import { products } from "@/demo/oxus-edge/data/products";

export default function AdminDropsPage() {
  const knives = products.filter((p) => p.category === "knives");

  return (
    <div>
      <h1 className="font-display text-xl tracking-[0.06em] mb-6">Drop Scheduler</h1>

      {/* Schedule form */}
      <div className="bg-bg-card border border-border rounded-none p-6 mb-8">
        <h3 className="font-display text-sm tracking-[0.08em] mb-5">Schedule New Drop</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold tracking-[0.06em] uppercase text-text-secondary font-display mb-1">
              Drop Name
            </label>
            <input className="input" placeholder="e.g. Summer Forge 2026" />
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-[0.06em] uppercase text-text-secondary font-display mb-1">
              Date & Time
            </label>
            <input type="datetime-local" className="input" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold tracking-[0.06em] uppercase text-text-secondary font-display mb-1">
              Assign Products
            </label>
            <div className="space-y-0.5">
              {knives.map((k) => <label key={k.id} className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer py-1"><input type="checkbox" className="accent-ember w-3.5 h-3.5" />{k.name} ({k.stock})</label>)}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-[0.06em] uppercase text-text-secondary font-display mb-1">
              Notes
            </label>
            <textarea className="input h-[100px] resize-none" placeholder="Internal notes about this drop..." />
          </div>
        </div>
        <button className="px-4 py-2 bg-ember text-white font-display text-[0.7rem] font-semibold tracking-[0.12em] uppercase rounded-none hover:bg-ember-light transition-all cursor-pointer">
          Schedule Drop
        </button>
      </div>

      {/* Drops table */}
      <h3 className="font-display text-sm tracking-[0.08em] mb-3">All Drops</h3>
      <div className="bg-bg-card border border-border rounded-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {["Drop Name", "Date", "Products", "Units", "Sold", "Status", "Actions"].map((h) => (
                  <th key={h} className="font-display text-[0.65rem] tracking-[0.12em] uppercase text-text-muted text-left px-5 py-3 border-b border-border whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {drops.map((d) => (
                <tr key={d.id} className="hover:bg-bg-medium transition-colors">
                  <td className="px-5 py-3 text-sm font-medium">{d.name}</td>
                  <td className="px-5 py-3 text-sm">{new Date(d.scheduledAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</td>
                  <td className="px-5 py-3 text-sm">{d.products.length} knives</td>
                  <td className="px-5 py-3 text-sm">{d.totalUnits}</td>
                  <td className="px-5 py-3 text-sm">{d.totalSold}</td>
                  <td className="px-5 py-3">
                    <Badge variant={d.status === "live" ? "live" : d.status === "upcoming" ? "upcoming" : "ended"}>
                      {d.status.charAt(0).toUpperCase() + d.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 text-xs text-text-muted border border-border rounded-none hover:text-ember hover:border-ember transition-all cursor-pointer">
                        {d.status === "upcoming" ? "Edit" : "View"}
                      </button>
                      {d.status === "upcoming" && (
                        <button className="px-3 py-1.5 text-xs text-text-muted border border-border rounded-none hover:text-danger hover:border-danger transition-all cursor-pointer">
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
