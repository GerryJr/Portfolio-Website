
import { useEffect } from "react";
import { trackView } from "@/demo/oxus-edge/components/RecentlyViewed";

export default function ProductViewTracker({ productId }: { productId: string }) {
  useEffect(() => {
    trackView(productId);
  }, [productId]);
  return null;
}
