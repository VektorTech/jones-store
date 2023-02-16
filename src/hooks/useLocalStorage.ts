import { useEffect, useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [itemValue, setItemValue] = useState(() => initialValue);

  useEffect(() => {
    const value = localStorage[key];
    setItemValue(value);
  }, [key]);

  const setItem = (value: T) => {
    localStorage[key] = value;
    setItemValue(value);
  };

  return [itemValue, setItem];
}
