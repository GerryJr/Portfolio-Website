import { useCallback, useState } from "react";

/**
 * Lightweight, refresh-clearing key/value store backed by a module-level
 * Map. Persistence semantics:
 *
 *   - Survives unmount → mount cycles (e.g. switching pages in the SPA
 *     router or hot-reloading a sibling component).
 *   - Lost on full-page refresh, since the module re-initializes.
 *
 * That's deliberately different from `sessionStorage`, which would also
 * survive a refresh. The intent here is "remember what I was looking at
 * while I navigate around, but start fresh if I reload the tab."
 */
const memoStore = new Map<string, unknown>();

export function useSessionMemo<T>(
  key: string,
  defaultValue: T,
): [T, (next: T | ((prev: T) => T)) => void] {
  const [value, setValueState] = useState<T>(() => {
    const stored = memoStore.get(key);
    return stored === undefined ? defaultValue : (stored as T);
  });

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValueState((prev) => {
        const resolved =
          typeof next === "function"
            ? (next as (prev: T) => T)(prev)
            : next;
        memoStore.set(key, resolved);
        return resolved;
      });
    },
    [key],
  );

  return [value, setValue];
}
