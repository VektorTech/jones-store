import { RefObject, useState, useEffect, useRef } from "react";

const useIntersectionObserver = (
  ref: RefObject<HTMLElement>,
  freeze?: boolean,
  options?: IntersectionObserverInit
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const frozen = useRef<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      frozen.current = !!freeze && entry.isIntersecting;
      if (frozen.current) {
        observer.disconnect();
      }
    }, options);

    const element = ref.current;

    if (element) {
      observer.observe(element);
      return () => observer.unobserve(element);
    }
  }, [freeze, options, ref]);

  return isIntersecting;
};

export default useIntersectionObserver;
