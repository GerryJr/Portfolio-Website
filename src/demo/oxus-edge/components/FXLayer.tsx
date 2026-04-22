
import { useEffect, useRef } from "react";
import { getOxusRoot } from "@/demo/oxus-edge/lib/shims";

const EMBER_COUNT = 18;
const DUST_COUNT = 14;

export default function FXLayer() {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const root = getOxusRoot();
    if (!root) return;

    const handleMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        root.style.setProperty("--cursor-x", `${e.clientX}px`);
        root.style.setProperty("--cursor-y", `${e.clientY}px`);
      });
    };

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0;
      root.style.setProperty("--scroll-progress", `${pct}%`);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div className="fx-cursor" aria-hidden="true" />
      <div className="fx-scroll-progress" aria-hidden="true" />

      <div className="fx-aurora" aria-hidden="true" />
      <div className="fx-lights" aria-hidden="true" />

      <div className="fx-embers" aria-hidden="true">
        {Array.from({ length: EMBER_COUNT }).map((_, i) => {
          const x = (i * 37 + 5) % 100;
          const d = 9 + (i % 7);
          const delay = (i * 0.7) % 10;
          const drift = ((i % 5) - 2) * 14;
          return (
            <span
              key={i}
              className="fx-ember-dot"
              style={
                {
                  "--x": `${x}%`,
                  "--d": `${d}s`,
                  "--delay": `-${delay}s`,
                  "--drift": `${drift}px`,
                } as React.CSSProperties
              }
            />
          );
        })}
      </div>

      <div className="fx-dust" aria-hidden="true">
        {Array.from({ length: DUST_COUNT }).map((_, i) => {
          const x = (i * 41 + 12) % 100;
          const y = (i * 23 + 8) % 100;
          const d = 7 + (i % 6);
          const dx = ((i % 5) - 2) * 30;
          const dy = ((i % 4) - 2) * 40;
          return (
            <span
              key={i}
              className="fx-dust-mote"
              style={
                {
                  left: `${x}%`,
                  top: `${y}%`,
                  "--d": `${d}s`,
                  "--dx": `${dx}px`,
                  "--dy": `${dy}px`,
                  animationDelay: `-${(i * 0.9) % 8}s`,
                } as React.CSSProperties
              }
            />
          );
        })}
      </div>
    </>
  );
}
