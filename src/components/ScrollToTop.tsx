import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Always scroll to top when the path changes. behavior: "instant" bypasses
    // the global `html { scroll-behavior: smooth }` rule so route changes snap
    // to the top instead of animating up from wherever the previous page was.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null; // this component doesn't render anything
};
