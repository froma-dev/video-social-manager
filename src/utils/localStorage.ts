const DEFAULT_TTL_MS = 30 * 60 * 1000;

export const getLocalStorage = <T>(key: string) => {
  try {
    const storedValue = localStorage.getItem(key);
    if (!storedValue) return null;

    return JSON.parse(storedValue) as T;
  } catch (err) {
    console.log("Error retrieving value from localStorage", err);
    return null;
  }
};

export const setLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

interface LocalStorageWithExpiry<T> {
  value: T;
  expiration: number;
}
export const getLocalStorageWithExpiry = <T>(key: string) => {
  try {
    const storedValue = localStorage.getItem(key);
    if (!storedValue) return null;

    const { value, expiration } = JSON.parse(
      storedValue
    ) as LocalStorageWithExpiry<T>;

    if (Date.now() > expiration) {
      localStorage.removeItem(key);
      return null;
    }

    return value;
  } catch (err) {
    console.error("Error retrieving value from localStorage", err);
    return null;
  }
};

export const setLocalStorageWithExpiry = <T>(
  key: string,
  value: T,
  ttl: number = DEFAULT_TTL_MS
) => {
  const expiration = Date.now() + ttl;
  const valueWithExpiration = { value, expiration };
  setLocalStorage(key, valueWithExpiration);
};
