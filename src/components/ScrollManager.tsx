import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * При смяна на страница скролва в началото, а при адрес с hash (напр. "/#services",
 * използван от header/footer, когато сме на правна страница) изчаква lazy секцията
 * да се монтира и скролва до нея.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    let frame = 0;
    let attempts = 0;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: "smooth" });
        return;
      }
      // Секциите се зареждат lazy — опитваме ~3 секунди.
      if (attempts++ < 180) frame = requestAnimationFrame(tryScroll);
    };

    frame = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
