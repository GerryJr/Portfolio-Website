import type { Order } from "./types";
import { products } from "./products";

// ═══════════════════════════════════════════
// ORDER HISTORY
//
// ALL_ORDERS is the full "database." The exported
// `orders` array only includes orders whose items
// exist in the active product catalog.
//
// When config.ts changes, orders adapt automatically.
// ═══════════════════════════════════════════

const ALL_ORDERS: Order[] = [
  {
    id: "ord-001", orderNumber: "OE-20260408-0347", customerId: "cust-001", customerName: "Gerry Rodriguez", customerEmail: "gerry@oxusedge.com",
    items: [
      { productId: "k-001", productName: "Damascus Hunter", quantity: 1, priceEach: 349 },
    ],
    subtotal: 349, shipping: 12, tax: 0, total: 361, status: "processing",
    shippingAddress: { firstName: "Gerry", lastName: "Rodriguez", line1: "1847 Cedar Ridge Trail", city: "Austin", state: "TX", zip: "78745", phone: "(512) 555-0189" },
    createdAt: "2026-04-08T14:22:00-05:00",
  },
  {
    id: "ord-002", orderNumber: "OE-20260407-0346", customerId: "cust-002", customerName: "Mike Sullivan", customerEmail: "mike.s@email.com",
    items: [{ productId: "k-005", productName: "Trapper Clip Point", quantity: 1, priceEach: 279 }],
    subtotal: 279, shipping: 0, tax: 0, total: 279, status: "processing",
    shippingAddress: { firstName: "Mike", lastName: "Sullivan", line1: "422 Oak Hollow Rd", city: "Boone", state: "NC", zip: "28607" },
    createdAt: "2026-04-07T10:15:00-05:00",
  },
  {
    id: "ord-003", orderNumber: "OE-20260406-0345", customerId: "cust-003", customerName: "Sarah Lin", customerEmail: "sarah.l@email.com",
    items: [
      { productId: "k-006", productName: "Camp Chef", quantity: 1, priceEach: 389 },
    ],
    subtotal: 389, shipping: 0, tax: 0, total: 389, status: "shipped",
    shippingAddress: { firstName: "Sarah", lastName: "Lin", line1: "89 Mountain View Dr", city: "Asheville", state: "NC", zip: "28801" },
    createdAt: "2026-04-06T09:30:00-05:00",
  },
  {
    id: "ord-004", orderNumber: "OE-20260405-0344", customerId: "cust-004", customerName: "James Walker", customerEmail: "j.walker@email.com",
    items: [{ productId: "k-001", productName: "Damascus Hunter", quantity: 1, priceEach: 349 }],
    subtotal: 349, shipping: 12, tax: 0, total: 361, status: "delivered",
    shippingAddress: { firstName: "James", lastName: "Walker", line1: "1200 Elm St Apt 4B", city: "Charlotte", state: "NC", zip: "28202" },
    createdAt: "2026-04-05T16:45:00-05:00",
  },
  {
    id: "ord-005", orderNumber: "OE-20260405-0343", customerId: "cust-005", customerName: "Emma Torres", customerEmail: "emma.t@email.com",
    items: [{ productId: "k-001", productName: "Damascus Hunter", quantity: 1, priceEach: 349 }],
    subtotal: 349, shipping: 0, tax: 0, total: 349, status: "delivered",
    shippingAddress: { firstName: "Emma", lastName: "Torres", line1: "555 River Bend Ln", city: "Knoxville", state: "TN", zip: "37902" },
    createdAt: "2026-04-05T11:20:00-05:00",
  },
  {
    id: "ord-006", orderNumber: "OE-20260404-0342", customerId: "cust-006", customerName: "David Chen", customerEmail: "d.chen@email.com",
    items: [{ productId: "k-003", productName: "Timber Drop Point", quantity: 1, priceEach: 289 }],
    subtotal: 289, shipping: 8, tax: 0, total: 297, status: "delivered",
    shippingAddress: { firstName: "David", lastName: "Chen", line1: "301 Summit Ave", city: "Roanoke", state: "VA", zip: "24011" },
    createdAt: "2026-04-04T08:10:00-05:00",
  },
  {
    id: "ord-007", orderNumber: "OE-20260403-0341", customerId: "cust-007", customerName: "Lisa Park", customerEmail: "lisa.p@email.com",
    items: [{ productId: "k-003", productName: "Timber Drop Point", quantity: 1, priceEach: 289 }],
    subtotal: 289, shipping: 0, tax: 0, total: 289, status: "delivered",
    shippingAddress: { firstName: "Lisa", lastName: "Park", line1: "77 Laurel Cove Rd", city: "Gatlinburg", state: "TN", zip: "37738" },
    createdAt: "2026-04-03T13:55:00-05:00",
  },
  {
    id: "ord-008", orderNumber: "OE-20260402-0340", customerId: "cust-008", customerName: "Robert Hayes", customerEmail: "r.hayes@email.com",
    items: [
      { productId: "k-009", productName: "Ridgeline Bushcraft", quantity: 1, priceEach: 329 },
    ],
    subtotal: 329, shipping: 0, tax: 0, total: 329, status: "delivered",
    shippingAddress: { firstName: "Robert", lastName: "Hayes", line1: "1445 Blue Ridge Pkwy", city: "Blowing Rock", state: "NC", zip: "28605" },
    createdAt: "2026-04-02T07:30:00-05:00",
  },
];

// Filter: only export orders whose items all exist in the active catalog
const activeIds = new Set(products.map((p) => p.id));

export const orders: Order[] = ALL_ORDERS.filter((o) =>
  o.items.every((item) => activeIds.has(item.productId))
);
