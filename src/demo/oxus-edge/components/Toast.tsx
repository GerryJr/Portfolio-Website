
import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from "react";

interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
  exiting?: boolean;
}

interface ToastContextType {
  showToast: (message: string, type?: "success" | "error") => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

let toastId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<Map<number, NodeJS.Timeout>>(new Map());

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)));
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  }, []);

  const showToast = useCallback((message: string, type: "success" | "error" = "success") => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    const timer = setTimeout(() => {
      removeToast(id);
      timersRef.current.delete(id);
    }, 3500);
    timersRef.current.set(id, timer);
  }, [removeToast]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const visibleToasts = toasts.slice(-3);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[5000] flex flex-col gap-2.5 pointer-events-none" role="status" aria-live="polite">
        {visibleToasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-5 py-3.5 bg-bg-card/95 backdrop-blur-sm border rounded-none shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex items-center gap-3 text-sm transition-all duration-200 ease-out ${
              toast.exiting ? "opacity-0 translate-x-8" : "animate-toast-in"
            } ${
              toast.type === "success" ? "border-success/30" : "border-danger/30"
            }`}
          >
            <div className={`w-5 h-5 rounded-none flex items-center justify-center shrink-0 ${
              toast.type === "success" ? "bg-success/15" : "bg-danger/15"
            }`}>
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke={toast.type === "success" ? "var(--color-success)" : "var(--color-danger)"} strokeWidth="2.5">
                {toast.type === "success" ? (
                  <polyline points="20 6 9 17 4 12" />
                ) : (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                )}
              </svg>
            </div>
            <span className="text-text-primary">{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
