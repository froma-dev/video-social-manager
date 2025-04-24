import { useEffect, useState } from "react";

const DEFAULT_TTL_MS = 30 * 60 * 1000;
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (!storedValue) return initialValue;

      return JSON.parse(storedValue);
    } catch (err) {
      console.log("Error retrieving value from localStorage", err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.log("Error saving value to localStorage", err);
    }
  }, [key, value]);

  return [value, setValue] as const;
};

export const useLocalStorageWithExpiration = <T>(
  key: string,
  initialValue: T
) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (!storedValue) return initialValue;

      const { value, expiration } = JSON.parse(storedValue);
      if (Date.now() > expiration) {
        localStorage.removeItem(key);
        return initialValue;
      }
      return value;
    } catch (err) {
      console.error("Error retrieving value from localStorage", err);
      return initialValue;
    }
  });

  const setValueWithExpiration = (
    newValue: T,
    ttl: number = DEFAULT_TTL_MS
  ) => {
    const expiration = Date.now() + ttl;
    const valueWithExpiration = { value: newValue, expiration };

    localStorage.setItem(key, JSON.stringify(valueWithExpiration));
    setValue(newValue);
  };

  return [value, setValueWithExpiration] as const;
};
