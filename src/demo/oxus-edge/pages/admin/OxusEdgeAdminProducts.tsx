import Badge from "@/demo/oxus-edge/components/Badge";
import { products } from "@/demo/oxus-edge/data/products";

const adminProducts = products.map((p) => ({
  id: p.id,
  name: p.name,
  category: p.category,
  price: p.price,
  stock: p.stock,
  status: p.stock === 0 ? "sold-out" : p.drop ? "drop-only" : "active",
}));

export default function AdminProductsPage() {
  return (
    <div>
      <h1 className="font-display text-xl tracking-[0.06em] mb-6">Products</h1>

      <div className="bg-bg-card border border-border rounded-none overflow-hidden">
        <div className="px-5 py-3 flex items-center justify-between border-b border-border">
          <span className="text-text-secondary text-sm">{adminProducts.length} products</span>
          <button className="px-4 py-2 bg-ember text-white font-display text-[0.7rem] font-semibold tracking-[0.12em] uppercase rounded-none hover:bg-ember-light transition-all cursor-pointer">
            + Add Product
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {["Product", "Category", "Price", "Stock", "Status", "Actions"].map((h) => (
                  <th key={h} className="font-display text-[0.65rem] tracking-[0.12em] uppercase text-text-muted text-left px-5 py-3 border-b border-border whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {adminProducts.map((p) => (
                <tr key={p.id} className="hover:bg-bg-medium transition-colors">
                  <td className="px-5 py-3 text-sm font-medium">{p.name}</td>
                  <td className="px-5 py-3 text-sm capitalize">{p.category}</td>
                  <td className="px-5 py-3 text-sm tabular-nums">${p.price}</td>
                  <td className="px-5 py-3 text-sm tabular-nums">{p.stock}</td>
                  <td className="px-5 py-3">
                    <Badge variant={p.status === "active" ? "success" : p.status === "drop-only" ? "live" : "sold-out"}>
                      {p.status === "drop-only" ? "Drop Only" : p.status === "sold-out" ? "Sold Out" : "Active"}
                    </Badge>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button className="px-2 py-1 text-[0.7rem] text-text-muted border border-border rounded-none hover:text-ember hover:border-ember transition-all cursor-pointer">
                        Edit
                      </button>
                      <button className="px-2 py-1 text-[0.7rem] text-text-muted border border-border rounded-none hover:text-danger hover:border-danger transition-all cursor-pointer">
                        Delete
                      </button>
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
