"use client";

import { useState } from "react";

export default function useLocalstorage<T>(
  key: string,
  defaultValue: T,
): [T, (value: T) => void, boolean] {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      setLoading(false);
      return defaultValue;
    }

    try {
      const storedValue = window.localStorage.getItem(key);

      if (storedValue) {
        const parsedValue = JSON.parse(storedValue);
        setLoading(false);
        return parsedValue;
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }

    setLoading(false);
    return defaultValue;
  });

  const setStoredValue = (value: T) => {
    setValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [value, setStoredValue, loading];
}
