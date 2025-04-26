import {
  getLocalStorageWithExpiry,
  setLocalStorageWithExpiry,
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
  LocalStorageKey,
} from "@utils/localStorage";
import { useCallback, useEffect, useState } from "react";

export const useLocalStorage = <T>(key: LocalStorageKey, initialValue: T) => {
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

    return () => {
      removeLocalStorage(key);
    };
  }, [key, value]);

  return [value, setValue] as const;
};

export const useLocalStorageWithExpiration = <T>(
  key: LocalStorageKey,
  initialValue: T
) => {
  const [value, setValue] = useState<T | null>(() => {
    const storedValue = getLocalStorageWithExpiry<T>(key);
    return storedValue ?? initialValue;
  });

  const setValueWithExpiration = useCallback(
    (newValue: T, ttl?: number) => {
      setLocalStorageWithExpiry<T>(key, newValue, ttl);
      setValue(newValue);
    },
    [key]
  );

  return [value, setValueWithExpiration] as const;
};
