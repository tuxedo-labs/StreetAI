import { useState, useEffect } from "react";

// T: Generic type
function useLocalStorage<T>(key: string, initialValue: T) {
  // State
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize loop (Run only once on client mount)
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
        setIsInitialized(true);
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      setIsInitialized(true);
    }
  }, [key]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, isInitialized] as const;
}

export default useLocalStorage;
