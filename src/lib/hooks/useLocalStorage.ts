import { useEffect, useState } from "react";

export default function useLocalStorage(
  key: string
): [string | "", (value: string) => void] {
  const [itemValue, setItemValue] = useState("");

  useEffect(() => {
    setItemValue(localStorage.getItem(key) || "");
  }, [key]);

  const setItem = (value: string) => {
    localStorage.setItem(key, value);
    setItemValue(value);
  };

  return [itemValue, setItem];
}
