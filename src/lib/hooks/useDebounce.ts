import { useEffect, DependencyList } from "react";

export const useDebounce = (
  callback: Function,
  delay: number,
  deps: DependencyList
) => {
  useEffect(() => {
    const timerID = setTimeout(callback, delay);
    return () => clearTimeout(timerID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};