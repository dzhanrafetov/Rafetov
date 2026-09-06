import { useEffect } from "react";

export const SITE_ORIGIN = "https://www.rafetov.com";

type SeoOptions = {
  title: string;
  description: string;
  /** Път спрямо домейна, напр. "/privacy". Ако липсва — canonical не се променя. */
  canonicalPath?: string;
};

/**
 * Задава title/description/canonical за отделна страница и връща
 * предишните стойности при напускане, за да не „изтичат" към началната страница.
 */
export function useSeo({ title, description, canonicalPath }: SeoOptions) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const descTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDesc = descTag?.getAttribute("content") ?? null;
    descTag?.setAttribute("content", description);

    let canonicalTag: HTMLLinkElement | null = null;
    let canonicalCreated = false;
    let prevCanonical: string | null = null;

    if (canonicalPath) {
      canonicalTag = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonicalTag) {
        canonicalTag = document.createElement("link");
        canonicalTag.rel = "canonical";
        document.head.appendChild(canonicalTag);
        canonicalCreated = true;
      } else {
        prevCanonical = canonicalTag.getAttribute("href");
      }
      canonicalTag.setAttribute("href", `${SITE_ORIGIN}${canonicalPath}`);
    }

    return () => {
      document.title = prevTitle;
      if (descTag && prevDesc !== null) descTag.setAttribute("content", prevDesc);
      if (canonicalTag) {
        if (canonicalCreated) canonicalTag.remove();
        else if (prevCanonical !== null) canonicalTag.setAttribute("href", prevCanonical);
      }
    };
  }, [title, description, canonicalPath]);
}
