import { useState, useEffect, Dispatch, SetStateAction } from "react";

type StorageErrorMessage = "readErrorMsg" | "writeErrorMsg";

export const storageErrorMessage: Record<StorageErrorMessage, string> = {
  readErrorMsg: "Error reading from sessionStorage",
  writeErrorMsg: "Error writing to sessionStorage",
};

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const { readErrorMsg, writeErrorMsg } = storageErrorMessage;
  // Use a function to initialize the state.
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Check if we are in a browser environment to prevent SSR errors.
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = localStorage.getItem(key);
      // Parse the stored JSON or return the initial value.
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error((error as Error) ?? readErrorMsg);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      // Check for browser environment again before writing to localStorage.
      if (typeof window !== "undefined") {
        const valueToStore =
          typeof storedValue === "function"
            ? storedValue(storedValue)
            : storedValue;
        localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error((error as Error) ?? writeErrorMsg);
    }
  }, [key, storedValue, writeErrorMsg]);

  return [storedValue, setStoredValue];
}
