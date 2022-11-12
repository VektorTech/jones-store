import { useEffect, DependencyList } from "react";

export const useDebounce = (
  callback: Function,
  delay: number,
  deps: DependencyList
) => {
  useEffect(() => {
    let cleanup: () => void;
    const timerID = setTimeout(() => {
      cleanup = callback();
    }, delay);
    return () => {
      cleanup?.();
      clearTimeout(timerID);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
