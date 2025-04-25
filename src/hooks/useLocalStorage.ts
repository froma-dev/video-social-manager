import {
  getLocalStorageWithExpiry,
  setLocalStorageWithExpiry,
  getLocalStorage,
  setLocalStorage,
} from "@utils/localStorage";
import { useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = getLocalStorage<T>(key);
      return storedValue ?? initialValue;
    } catch (err) {
      console.error("Error retrieving value from localStorage", err);
      return initialValue;
    }
  });

  useEffect(() => {
    setLocalStorage(key, value);
  }, [key, value]);

  return [value, setValue] as const;
};

export const useLocalStorageWithExpiration = <T>(
  key: string,
  initialValue: T
) => {
  const [value, setValue] = useState<T | null>(() => {
    return getLocalStorageWithExpiry(key) ?? initialValue;
  });

  const setValueWithExpiration = (newValue: T, ttl?: number) => {
    setLocalStorageWithExpiry<T>(key, newValue, ttl);
    setValue(newValue);
  };

  return [value, setValueWithExpiration] as const;
};
