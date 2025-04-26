export type LocalStorageKey =
  | "access_token_data"
  | "refresh_token_data"
  | "user_data"
  | "search_history";

const DEFAULT_TTL_MS = 30 * 60 * 1000;

export const getLocalStorage = <T>(key: LocalStorageKey) => {
  try {
    const storedValue = localStorage.getItem(key);
    if (!storedValue) return null;

    return JSON.parse(storedValue) as T;
  } catch (err) {
    console.log("Error retrieving value from localStorage", err);
    return null;
  }
};

export const setLocalStorage = <T>(key: LocalStorageKey, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

interface LocalStorageWithExpiry<T> {
  value: T;
  expiration: number;
}
export const getLocalStorageWithExpiry = <T>(key: LocalStorageKey) => {
  try {
    const storedValue = getLocalStorage<LocalStorageWithExpiry<T>>(key);
    if (!storedValue) return null;

    const { value, expiration } = storedValue;

    if (Date.now() > expiration) {
      removeLocalStorage(key);
      return null;
    }

    return value;
  } catch (err) {
    console.error("Error retrieving value from localStorage", err);
    return null;
  }
};

export const setLocalStorageWithExpiry = <T>(
  key: LocalStorageKey,
  value: T,
  ttl: number = DEFAULT_TTL_MS
) => {
  const expiration = Date.now() + ttl;
  const valueWithExpiration = { value, expiration };
  setLocalStorage(key, valueWithExpiration);
};

export const removeLocalStorage = (key: LocalStorageKey) => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
