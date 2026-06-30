import { useEffect } from "react";

const SITE_NAME = "Gerardo Lopez Jr.";
const SITE_TAGLINE = "Software Engineer, Full Stack & Cloud";

/**
 * Sets document.title on mount and restores the previous title on unmount.
 *
 * WCAG 2.4.2 (Page Titled, Level A) requires every page to have a unique,
 * descriptive title. With client-side routing, the static <title> in index.html
 * never changes, so screen readers announce the same title across every route
 * unless we update it here.
 *
 * Pass `section` to render "<section> | Gerardo Lopez Jr.". Omit it on the
 * home page to render "Gerardo Lopez Jr. | Software Engineer, Full Stack & Cloud".
 */
export function usePageTitle(section?: string) {
  useEffect(() => {
    const previous = document.title;
    document.title = section
      ? `${section} | ${SITE_NAME}`
      : `${SITE_NAME} | ${SITE_TAGLINE}`;
    return () => {
      document.title = previous;
    };
  }, [section]);
}
