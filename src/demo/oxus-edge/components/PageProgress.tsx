
import { useEffect, useState, useRef } from "react";
import { usePathname } from "@/demo/oxus-edge/lib/next-navigation";

export default function PageProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPath.current) {
      // Route changed — animate progress
      setVisible(true);
      setProgress(70);

      const fill = setTimeout(() => setProgress(100), 150);
      const hide = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 400);

      prevPath.current = pathname;
      return () => {
        clearTimeout(fill);
        clearTimeout(hide);
      };
    }
  }, [pathname]);

  if (!visible && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[10000] h-[2px] pointer-events-none"
      role="progressbar"
      aria-valuenow={progress}
      aria-label="Page loading"
    >
      <div
        className="h-full bg-ember transition-all ease-out shadow-[0_0_8px_rgba(200,100,58,0.4)]"
        style={{
          width: `${progress}%`,
          transitionDuration: progress === 100 ? "200ms" : "300ms",
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
}
