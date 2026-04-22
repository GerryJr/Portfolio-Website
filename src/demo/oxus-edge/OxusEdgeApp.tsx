import { useEffect, useState, type CSSProperties } from "react";
import { Routes, Route } from "react-router-dom";
import DropProvider from "./components/DropProvider";
import ShellClient from "./components/ShellClient";
import * as api from "./api";
import { resolveProducts, type ResolvedProduct } from "./api/helpers";
import type { Drop, UpcomingRelease } from "./data/types";

import OxusEdgeHome from "./pages/OxusEdgeHome";
import OxusEdgeAbout from "./pages/OxusEdgeAbout";
import OxusEdgeAccessories from "./pages/OxusEdgeAccessories";
import OxusEdgeAccount from "./pages/OxusEdgeAccount";
import OxusEdgeCheckout from "./pages/OxusEdgeCheckout";
import OxusEdgeCoffee from "./pages/OxusEdgeCoffee";
import OxusEdgeConfirmation from "./pages/OxusEdgeConfirmation";
import OxusEdgeEmailConfirm from "./pages/OxusEdgeEmailConfirm";
import OxusEdgeKnives from "./pages/OxusEdgeKnives";
import OxusEdgeKnivesFamily from "./pages/OxusEdgeKnivesFamily";
import OxusEdgeProduct from "./pages/OxusEdgeProduct";
import OxusEdgeLogin from "./pages/OxusEdgeLogin";
import OxusEdgeRegister from "./pages/OxusEdgeRegister";
import OxusEdgeNotFound from "./pages/OxusEdgeNotFound";

import OxusEdgeAdminLayout from "./pages/admin/OxusEdgeAdminLayout";
import OxusEdgeAdminDashboard from "./pages/admin/OxusEdgeAdminDashboard";
import OxusEdgeAdminProducts from "./pages/admin/OxusEdgeAdminProducts";
import OxusEdgeAdminDrops from "./pages/admin/OxusEdgeAdminDrops";
import OxusEdgeAdminInventory from "./pages/admin/OxusEdgeAdminInventory";
import OxusEdgeAdminOrders from "./pages/admin/OxusEdgeAdminOrders";

import "./styles/oxus-edge.css";

interface DropFetch {
  activeDrop: Drop | null;
  activeKnife: ResolvedProduct | null;
  upcomingDrop: UpcomingRelease | null;
  upcomingKnife: ResolvedProduct | null;
}

const INITIAL_DROPS: DropFetch = {
  activeDrop: null,
  activeKnife: null,
  upcomingDrop: null,
  upcomingKnife: null,
};

export default function OxusEdgeApp() {
  const [drops, setDrops] = useState<DropFetch>(INITIAL_DROPS);

  useEffect(() => {
    Promise.all([
      api.getActiveDrop(),
      api.getUpcomingReleases(),
      api.getKnives(),
    ]).then(([activeDrop, upcomingReleases, allKnives]) => {
      const resolvedKnives = resolveProducts(allKnives);
      const upcomingDrop = upcomingReleases[0] ?? null;
      const activeKnife = activeDrop
        ? resolvedKnives.find((p) => p.id === activeDrop.products[0]?.productId) ?? null
        : null;
      const upcomingKnife = upcomingDrop
        ? resolvedKnives.find((p) => p.id === upcomingDrop.products[0]?.productId) ?? null
        : null;
      setDrops({ activeDrop, activeKnife, upcomingDrop, upcomingKnife });
    });
  }, []);

  return (
    <div
      className="oxus-edge"
      data-blend="side-engulf"
      data-vignette="on"
      data-theme="default"
      data-accent="default"
      data-radius="default"
      data-motion="default"
      data-shadow="default"
      data-hero="outdoor-lights"
      data-drop-state="upcoming"
      data-debug-bounds="off"
      data-debug-img-names="off"
      data-no-reveal="off"
      data-glow="off"
      data-cursor="off"
      data-ambient="off"
      data-reveal-style="fade-up"
      data-grain-anim="static"
      data-scroll-progress="on"
      data-ember-pulse="off"
      style={{ "--navbar-scale": "1.20", "--navbar-text-scale": "1.35" } as CSSProperties}
    >
      <div className="oxus-grain" aria-hidden />
      <div className="oxus-dark-overlay" aria-hidden />
      <div className="page-vignette">
        <DropProvider
          activeDrop={drops.activeDrop}
          activeKnife={drops.activeKnife}
          upcomingDrop={drops.upcomingDrop}
          upcomingKnife={drops.upcomingKnife}
        >
          <ShellClient>
            <Routes>
              <Route index element={<OxusEdgeHome />} />
              <Route path="about" element={<OxusEdgeAbout />} />
              <Route path="accessories" element={<OxusEdgeAccessories />} />
              <Route path="account" element={<OxusEdgeAccount />} />
              <Route path="checkout" element={<OxusEdgeCheckout />} />
              <Route path="coffee" element={<OxusEdgeCoffee />} />
              <Route path="confirmation" element={<OxusEdgeConfirmation />} />
              <Route path="email-confirm" element={<OxusEdgeEmailConfirm />} />
              <Route path="knives" element={<OxusEdgeKnives />} />
              <Route path="knives/:family" element={<OxusEdgeKnivesFamily />} />
              <Route path="product/:id" element={<OxusEdgeProduct />} />
              <Route path="login" element={<OxusEdgeLogin />} />
              <Route path="register" element={<OxusEdgeRegister />} />
              <Route path="admin" element={<OxusEdgeAdminLayout />}>
                <Route index element={<OxusEdgeAdminDashboard />} />
                <Route path="products" element={<OxusEdgeAdminProducts />} />
                <Route path="drops" element={<OxusEdgeAdminDrops />} />
                <Route path="inventory" element={<OxusEdgeAdminInventory />} />
                <Route path="orders" element={<OxusEdgeAdminOrders />} />
              </Route>
              <Route path="*" element={<OxusEdgeNotFound />} />
            </Routes>
          </ShellClient>
        </DropProvider>
      </div>
    </div>
  );
}
