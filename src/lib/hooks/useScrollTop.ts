import { useEffect, useState } from "react";

export default function useScrollTop() {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const scrollHandler = () => {
      const _scrollTop = document.documentElement.scrollTop;
      setScrollTop(_scrollTop);
    };

    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return scrollTop;
}
