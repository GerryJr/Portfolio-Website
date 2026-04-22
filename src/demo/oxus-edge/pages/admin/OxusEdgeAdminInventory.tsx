import { products } from "@/demo/oxus-edge/data/products";

const inventory = products.map((p) => {
  const reserved = Math.min(Math.floor(Math.random() * 3), p.stock);
  const available = p.stock - reserved;
  const level = p.stock === 0 ? 0 : Math.min(100, Math.round((p.stock / 50) * 100));
  return { name: p.name, category: p.category, inStock: p.stock, reserved, available, level };
});

export default function AdminInventoryPage() {
  return (
    <div>
      <h1 className="font-display text-xl tracking-[0.06em] mb-6">Inventory Overview</h1>

      <div className="flex gap-4 text-xs text-text-muted mb-4"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-success" />Good (60%+)</span><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber" />Low (30-60%)</span><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-danger" />Critical (&lt;30%)</span></div>
      <div className="bg-bg-card border border-border rounded-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {["Product", "Category", "In Stock", "Reserved", "Available", "Level"].map((h) => (
                  <th key={h} className="font-display text-[0.65rem] tracking-[0.12em] uppercase text-text-muted text-left px-5 py-3 border-b border-border whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => {
                const barColor =
                  item.level >= 60 ? "bg-success" : item.level >= 30 ? "bg-amber" : "bg-danger";

                return (
                  <tr key={item.name} className="hover:bg-bg-medium transition-colors">
                    <td className="px-5 py-3 text-sm font-medium">{item.name}</td>
                    <td className="px-5 py-3 text-sm capitalize">{item.category}</td>
                    <td className="px-5 py-3 text-sm tabular-nums">{item.inStock}</td>
                    <td className="px-5 py-3 text-sm tabular-nums">{item.reserved}</td>
                    <td className="px-5 py-3 text-sm tabular-nums">{item.available}</td>
                    <td className="px-5 py-3 min-w-[120px]">
                      <div className="flex items-center">
                        <div className="inventory-bar">
                          <div
                            className={`inventory-bar-fill ${barColor}`}
                            style={{ width: `${item.level}%` }}
                          />
                        </div>
                        <span className="text-[0.65rem] text-text-muted ml-2 tabular-nums">{item.level}%</span>
                      </div>
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
