import { Routes, Route } from "react-router-dom";
import KrispLayout from "./components/KrispLayout";
import KrispHome from "./pages/KrispHome";
import KrispOrder from "./pages/KrispOrder";
import KrispCheckout from "./pages/KrispCheckout";
import KrispConfirmation from "./pages/KrispConfirmation";
import KrispUnderConstruction from "./pages/KrispUnderConstruction";

export default function KrispApp() {
  return (
    <KrispLayout>
      <Routes>
        <Route index element={<KrispHome />} />
        <Route path="order" element={<KrispOrder />} />
        <Route path="checkout" element={<KrispCheckout />} />
        <Route path="confirmation" element={<KrispConfirmation />} />
        {/* Under construction — pages kept in codebase but not routed */}
        <Route path="menu" element={<KrispUnderConstruction />} />
        <Route path="rewards" element={<KrispUnderConstruction />} />
        <Route path="our-story" element={<KrispUnderConstruction />} />
        <Route path="contact" element={<KrispUnderConstruction />} />
      </Routes>
    </KrispLayout>
  );
}
