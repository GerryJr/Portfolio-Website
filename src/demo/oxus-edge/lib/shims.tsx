import {
  Link as RouterLink,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams as useRouterSearchParams,
} from "react-router-dom";
import type { AnchorHTMLAttributes } from "react";

export const DEMO_BASE = "/demo/oxus-edge";

export function getOxusRoot(): HTMLElement {
  if (typeof document === "undefined") return null as unknown as HTMLElement;
  return (document.querySelector(".oxus-edge") as HTMLElement) ?? document.documentElement;
}

export function prefixPath(path: string): string {
  if (!path || typeof path !== "string") return path;
  if (path.startsWith(DEMO_BASE)) return path;
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("//") || path.startsWith("mailto:") || path.startsWith("tel:")) return path;
  if (path.startsWith("#")) return path;
  if (!path.startsWith("/")) return path;
  if (path === "/") return DEMO_BASE;
  return `${DEMO_BASE}${path}`;
}

export function prefixAsset(src: string): string {
  if (!src || typeof src !== "string") return src;
  if (src.startsWith(DEMO_BASE)) return src;
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:") || src.startsWith("blob:")) return src;
  if (!src.startsWith("/")) return src;
  return `${DEMO_BASE}${src}`;
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  prefetch?: boolean;
  scroll?: boolean;
  replace?: boolean;
  shallow?: boolean;
  locale?: string | false;
};

export function ShimLink({ href, prefetch: _p, scroll: _s, replace, shallow: _sh, locale: _l, ...rest }: LinkProps) {
  const target = prefixPath(href);
  if (target.startsWith("http") || target.startsWith("//") || target.startsWith("mailto:") || target.startsWith("tel:")) {
    return <a href={target} {...rest} />;
  }
  return <RouterLink to={target} replace={replace} {...rest} />;
}

export function usePathname(): string {
  const pathname = useLocation().pathname;
  if (pathname === DEMO_BASE) return "/";
  if (pathname.startsWith(DEMO_BASE + "/")) return pathname.slice(DEMO_BASE.length);
  return pathname;
}

export function useRouter() {
  const navigate = useNavigate();
  return {
    push: (path: string) => navigate(prefixPath(path)),
    replace: (path: string) => navigate(prefixPath(path), { replace: true }),
    back: () => navigate(-1),
    forward: () => navigate(1),
    refresh: () => {},
    prefetch: () => {},
  };
}

export function useSearchParams(): URLSearchParams {
  const [params] = useRouterSearchParams();
  return params;
}

export { useParams };

export class NotFoundError extends Error {
  constructor() {
    super("NEXT_NOT_FOUND");
    this.name = "NotFoundError";
  }
}

export function notFound(): never {
  throw new NotFoundError();
}

export function redirect(path: string): never {
  if (typeof window !== "undefined") {
    window.location.href = prefixPath(path);
  }
  throw new Error(`REDIRECT:${path}`);
}
